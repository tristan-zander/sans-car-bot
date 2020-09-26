import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { MusicPlayer as SansMusic } from './audio-processing/MusicPlayer.js';
import { SansDependencies } from './commands/command.js';
import { CommandDescription, CommandType } from './commands/default-commands/help.js';
export class SansClient {
    constructor(prefix, token) {
        this._client = new Discord.Client();
        this._musicManager = new SansMusic(this);
        this._commandDescriptions = new Map();
        this._commands = new Map();
        this._searchCommands = new Map();
        this._prefix = prefix;
        this._loginToken = token;
        this._client.once("ready", this.handleReady.bind(this));
        this._client.on('message', this.handleMessage.bind(this));
        this._client.on('shardError', this.handleShardError.bind(this));
        this.generateCommands().catch(console.error).then(() => { this.login(); });
    }
    setStatus(name) {
        this._client.user
            .setPresence({ status: "online", activity: { name, type: "PLAYING" } })
            .catch(console.error);
    }
    login() {
        this._client.login(this._loginToken)
            .then(() => console.log(`Successfully logged in as ${this._client.user.tag}.`))
            .catch(err => { throw err; });
    }
    async importCommandsFromPath(pathStr) {
        const files = fs.readdirSync(pathStr)
            .filter(file => file.endsWith('.js'))
            .map(async (file) => {
            const { default: def } = await import(`${pathStr}/${file}`).catch(console.error);
            return def;
        });
        return await Promise.all(files);
    }
    resolveDependency(depReq, comm) {
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
    async generateCommands() {
        const commandDir = path.resolve("build/commands/");
        {
            let commands = await this
                .importCommandsFromPath(path.join(commandDir, 'default-commands/'))
                .catch(err => { throw err; });
            commands.forEach((CommandClass) => {
                let comm = new CommandClass();
                if (comm.dependecies) {
                    comm.dependecies.forEach((depReq) => {
                        try {
                            this.resolveDependency(depReq, comm);
                        }
                        catch (err) {
                            console.error(`Error setting dependency ${depReq} of command ${comm.name} err`);
                        }
                    });
                }
                console.log(`Adding command of name ${comm.name}.`);
                this._commands.set(comm.name, comm);
                const description = new CommandDescription(comm.name, comm.description, CommandType.Standard);
                this._commandDescriptions.set(description.name, description);
            });
        }
        {
            const commands = await this
                .importCommandsFromPath(path.join(commandDir, 'no-pref-commands/'))
                .catch(err => { throw err; });
            commands.forEach((SearchCommandClass) => {
                let classInstance = new SearchCommandClass();
                if (classInstance.dependecies) {
                    classInstance.dependecies.forEach((depReq) => {
                        try {
                            this.resolveDependency(depReq, classInstance);
                        }
                        catch (err) {
                            console.error(`Error setting dependency ${depReq} of command ${classInstance.name} err`);
                        }
                    });
                }
                console.log(`Adding search command of name ${classInstance.name}.`);
                this._searchCommands.set(classInstance.name, classInstance);
                const description = new CommandDescription(classInstance.name, classInstance.description, CommandType.NoPrefix);
                this._commandDescriptions.set(description.name, description);
            });
        }
    }
    handleReady() {
        console.log("Client is ready!");
        this.setStatus("undertale");
    }
    async handleMessage(message) {
        const args = message.content.slice(this._prefix.length).split(" ");
        const comm = args.shift().toLowerCase();
        const sansMessage = { discord: message, args };
        if (message.content.toLowerCase().startsWith(this._prefix)) {
            const command = this._commands.get(comm);
            if (!command) {
                message.reply(`Command '${comm}' was not found.`);
                return;
            }
            else {
                await command.execute(sansMessage).catch(err => {
                    console.error(err);
                    message.reply(`There was an error trying to execute ${command.name}.`);
                });
            }
        }
        else {
            this._searchCommands.forEach(searchComm => {
                searchComm.includes.forEach(include => {
                    if (message.content.includes(include)) {
                        searchComm.execute(sansMessage).catch(err => { console.error(err); });
                    }
                });
            });
        }
    }
    handleShardError(error) {
        console.error(`SHARD ERROR: ${error}`);
    }
}
export default SansClient;
//# sourceMappingURL=client.js.map