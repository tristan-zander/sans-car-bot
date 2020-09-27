import { SansDependencies } from "../command.js";
export class Stop {
    constructor() {
        this.name = 'stop';
        this.description = 'Stops audio.';
        this.dependecies = [SansDependencies.Music];
    }
    async execute(message) {
        if (!this.musicPlayer) {
            throw `Music Player has not been instantiated in command ${this.name}`;
        }
        else {
            const player = this.musicPlayer.get(message.discord.guild.id);
            if (!player) {
                message.discord.reply("There was an error getting the music player. Please contact the developer if this happens consistently.");
                throw `${this.name} does not have a reference to the MusicPlayer.`;
            }
            else {
                player.stop();
            }
        }
    }
    addDeps(dep) {
        if (dep instanceof Map) {
            this.musicPlayer = dep;
        }
        else {
            throw `Stop command does not need dependecy of ${dep}.`;
        }
    }
}
export default Stop;
//# sourceMappingURL=stop.js.map