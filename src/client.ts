import * as Discord from 'discord.js'
import * as fs from 'fs'
import * as path from 'path'

import {MusicPlayer as SansMusic} from './audio-processing/MusicPlayer.js'
import {
  Command,
  SansDependencies,
  SansDependencyReference,
  SansMessage,
  SearchCommand
} from './commands/command.js'
import {
  CommandDescription,
  CommandType
} from './commands/default-commands/help.js'

export class SansClient {
  private _client: Discord.Client;
  private _prefix: string;
  private _loginToken: string;
  private _commands: Map<string, Command>;
  private _searchCommands: Map<string, SearchCommand>;

  // Dependencies for injection
  private _musicManager: Map<string, SansMusic>;
  private _commandDescriptions: Map<string, CommandDescription>;

  constructor(prefix: string, token: string) {
    this._client = new Discord.Client();
    this._musicManager = new Map();
    this._commandDescriptions = new Map();
    this._commands = new Map();
    this._searchCommands = new Map();
    this._prefix = prefix;
    this._loginToken = token;

    this._client.once("ready", this.handleReady.bind(this));
    this._client.on('message', this.handleMessage.bind(this));
    this._client.on('shardError', this.handleShardError.bind(this));

    this.generateCommands().catch(console.error).then(() => { this.login(); })
  }

  public setStatus(name: string) {
    this._client.user
        .setPresence({status : "online", activity : {name, type : "PLAYING"}})
        .catch(console.error);
  }

  public login() {
    this._client.login(this._loginToken)
        .then(() => console.log(
                  `Successfully logged in as ${this._client.user.tag}.`))
        .catch(err => {throw err});
    // Set up a thing to retry logging in up to 5 times before waiting for
    // 15mins to 1hr
  }

  private async importCommandsFromPath(pathStr: string):
      Promise<Array<Command|SearchCommand>> {
    const files =
        fs.readdirSync(pathStr)
            .filter(file => file.endsWith('.js'))
            .map(async file => {
              const {default : def}: {default: Command|SearchCommand} =
                  await import(`${pathStr}/${file}`).catch(console.error);
              return def;
            });
    return await Promise.all(files);
  }

  private resolveDependency(depReq: SansDependencies,
                            comm: Command|SearchCommand) {
    switch (depReq) {
    case SansDependencies.Music:
      comm.addDeps(this._musicManager);
      break;

    case SansDependencies.CommandDescriptions:
      comm.addDeps(this._commandDescriptions);
      break;

    default:
      console.error(`Dependency of name ${depReq} has not been implemented!`);
      break;
    }
  }

  private async generateCommands() {
    const commandDir = path.resolve("build/commands/");

    // Default Commands
    {
      let commands = await this
                         .importCommandsFromPath(
                             path.join(commandDir, 'default-commands/'))
                         .catch(err => {throw err});
      commands.forEach((CommandClass: any|Command) => {
        // I can't type annotate this for some reason. It throws a
        // constructor error because Command has no constructor and
        // Typescript doesn't allow for constructor definitions in
        // interfaces
        let comm = new CommandClass();

        if (comm.dependecies) {
          comm.dependecies.forEach((depReq: SansDependencies) => {
            try {
              this.resolveDependency(depReq, comm);
            } catch (err) {
              console.error(`Error setting dependency ${depReq} of command ${
                  comm.name} err`)
            }
          });
        }

        console.log(`Adding command of name ${comm.name}.`);
        this._commands.set(comm.name, comm);

        const description = new CommandDescription(comm.name, comm.description,
                                                   CommandType.Standard);
        this._commandDescriptions.set(description.name, description);
      });
    }

    // Search Commands
    {
      const commands = await this
                           .importCommandsFromPath(
                               path.join(commandDir, 'no-pref-commands/'))
                           .catch(err => { throw err; });
      commands.forEach((SearchCommandClass: any|SearchCommand) => {
        let classInstance = new SearchCommandClass();
        // TODO it would be better if we looped and stored the include strings
        // here instead of at every message

        if (classInstance.dependecies) {
          classInstance.dependecies.forEach((depReq: SansDependencies) => {
            try {
              this.resolveDependency(depReq, classInstance);
            } catch (err) {
              console.error(`Error setting dependency ${depReq} of command ${
                  classInstance.name} err`)
            }
          });
        }

        console.log(`Adding search command of name ${classInstance.name}.`);
        this._searchCommands.set(classInstance.name, classInstance);

        const description = new CommandDescription(classInstance.name,
                                                   classInstance.description,
                                                   CommandType.NoPrefix);
        this._commandDescriptions.set(description.name, description);
      });
    }
  }

  private handleReady() {
    console.log("Client is ready!");
    this.setStatus("undertale");
  }

  private async handleMessage(message: Discord.Message) {
    const args = message.content.slice(this._prefix.length).split(" ");
    const comm = args.shift().toLowerCase();
    const sansMessage: SansMessage = {discord : message, args};

    // If it starts with a prefix
    if (message.content.toLowerCase().startsWith(this._prefix)) {
      // console.log("command sent");
      const command = this._commands.get(comm);

      if (!command) {
        message.reply(`Command '${comm}' was not found.`);
        return;
      } else {
        await command.execute(sansMessage).catch(err => {
          console.error(err);
          message.reply(
              `There was an error trying to execute ${command.name}.`);
        });
      }
    } else {
      this._searchCommands.forEach(searchComm => {
        searchComm.includes.forEach(include => {
          if (message.content.includes(include)) {
            searchComm.execute(sansMessage).catch(err => {console.error(err)});
          }
        });
      });
    }
  }

  private handleShardError(error: Error) {
    console.error(`SHARD ERROR: ${error}`);
  }
}

export default SansClient;
