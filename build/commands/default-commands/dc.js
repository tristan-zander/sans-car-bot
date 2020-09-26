import { MusicPlayer as SansMusic } from '../../audio-processing/MusicPlayer.js';
import { SansDependencies as Deps } from '../command.js';
export class Disconnect {
    constructor() {
        this.name = 'dc';
        this.description = 'Disconnects the bot from the voice channel.';
        this.dependecies = [Deps.Music];
    }
    addDeps(dependecy) {
        if (dependecy instanceof SansMusic)
            this.music = dependecy;
        else
            console.error(`${this.name} was given the wrong dependecy.`);
    }
    async execute(message) {
    }
}
export default Disconnect;
//# sourceMappingURL=dc.js.map