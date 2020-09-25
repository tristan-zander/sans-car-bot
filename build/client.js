import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { MusicPlayer as SansMusic } from './audio-processing/MusicPlayer.js';
import { SansDependencies } from './commands/command.js';
export class SansClient {
    constructor(prefix, token) {
        this._client = new Discord.Client();
        this._musicManager = new SansMusic(this);
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
    async generateCommands() {
        {
            const files = fs.readdirSync(path.resolve('build') + '/commands/default-commands/')
                .filter(file => file.endsWith('.js'))
                .map(async (file) => await import(`./commands/default-commands/${file}`)
                .catch(console.error));
            let commands = await Promise.all(files);
            commands.forEach(command => {
                const { default: CommandClass } = command;
                if (!command) {
                }
                else {
                    let comm = new CommandClass();
                    if (comm.dependecies) {
                        comm.dependecies.forEach((depReq) => {
                            try {
                                switch (depReq) {
                                    case SansDependencies.Music:
                                        comm.addDeps(this._musicManager);
                                        break;
                                    default:
                                        console.error(`Dependency of name ${depReq} has not been implemented!`);
                                        break;
                                }
                            }
                            catch (err) {
                                console.error(`Error setting dependency ${depReq} of command ${comm.name} err`);
                            }
                        });
                    }
                    console.log(`Adding command of name ${comm.name}.`);
                    this._commands.set(comm.name, comm);
                }
            });
        }
        { }
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
                message.reply(`'${command}' not found.`);
                return;
            }
            else {
                try {
                    command.execute(sansMessage);
                }
                catch (err) {
                    console.error(err);
                    message.reply(`There was an error trying to execute ${command.name}.`);
                }
            }
        }
        else {
            this._searchCommands.forEach(searchComm => {
                searchComm.includes.forEach(include => {
                    if (message.content.includes(include)) {
                        try {
                            searchComm.execute(sansMessage);
                        }
                        catch (err) {
                            console.error(err);
                        }
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