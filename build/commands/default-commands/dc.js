import { SansDependencies as Deps } from '../command.js';
export class Disconnect {
    constructor() {
        this.name = 'dc';
        this.description = 'Disconnects the bot from the voice channel.';
        this.dependecies = [Deps.Music];
    }
    addDeps(dependecy) {
        if (dependecy instanceof Map)
            this.musicPlayer = dependecy;
        else
            console.error(`${this.name} was given the wrong dependecy.`);
    }
    async execute(message) {
        if (!this.musicPlayer) {
            message.discord.reply("There was an error getting the music player. Please contact the developer if this happens consistently.");
            throw `${this.name} does not have a reference to the MusicPlayer.`;
        }
        else {
            let music = this.musicPlayer.get(message.discord.guild.id);
            if (music.dispatcher) {
                music.dispatcher.destroy();
            }
            if (music.connection) {
                music.connection.disconnect();
            }
            music.queue.empty();
            music.startTimeout();
        }
    }
}
export default Disconnect;
//# sourceMappingURL=dc.js.map