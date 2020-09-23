import * as Discord from 'discord.js'
import * as fs from 'fs'
import * as path from 'path'

import {MusicPlayer as SansMusic} from './audio-processing/MusicPlayer.js'
import {Command, SansMessage, SearchCommand} from './commands/command.js'

export class SansClient {
  private _client: Discord.Client;
  private _prefix: string;
  private _loginToken: string;
  private _commands: Map<string, Command>;
  private _searchCommands: Map<string, SearchCommand>;

  private _musicManager: SansMusic;

  constructor(prefix: string, token: string) {
    this._client = new Discord.Client();
    this._musicManager = new SansMusic(this);
    this._prefix = prefix;
    this._loginToken = token;

    this._client.once("ready", () => {
      console.log("Client is ready!");
      this.setStatus("undertale").catch(console.error)
    });
    this._client.on('message', this.handleMessage);
    this._client.on('shardError', this.handleShardError);

    this.generateCommands().catch(console.error);
  }

  public async setStatus(name: string) {
    this._client.user
        .setPresence({status : "online", activity : {name, type : "PLAYING"}})
        .catch(err => {throw err});
  }

  public async login() {
    await this._client.login(this._loginToken)
        .then(() => console.log(
                  `Successfully logged in as ${this._client.user.tag}.`))
        .catch(err => {throw err});
    // Set up a thing to retry logging in up to 5 times before waiting for
    // 15mins to 1hr
  }

  private async generateCommands() {
    const files =
        fs.readdirSync(path.resolve('build') + '/commands/default-commands/')
            .filter(file => file.endsWith('.js'))
            .map(async file =>
                     await import(`./commands/default-commands/${file}`)
                         .catch(console.error));
    let commands: Command[] = await Promise.all(files);
    commands.forEach(command => {
      if (!command) {
        // throw errors
      } else {
        // TODO loop through dependecies
        console.log(`Adding command of name ${command.name}.`);
        this._commands.set(command.name, command);
      }
    })
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
        message.reply(`'${command}' not found.`);
        return;
      } else {
        try {
          command.execute(sansMessage);
        } catch (err) {
          console.error(err);
          message.reply(
              `There was an error trying to execute ${command.name}.`);
        }
      }
    } else {
      this._searchCommands.forEach(searchComm => {
        searchComm.includes.forEach(include => {
          if (message.content.includes(include)) {
            try {
              searchComm.execute(sansMessage);
            } catch (err) {
              console.error(err);
            }
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
