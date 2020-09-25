import { MusicPlayer as SansMusic } from "../../audio-processing/MusicPlayer.js";
import { SansDependencies } from "../command.js";
export class Play {
    constructor() {
        this.name = 'play';
        this.description = 'Play media from YouTube or direct mp3 files';
        this.dependecies = [SansDependencies.Music];
    }
    execute(message) {
        if (!this.musicPlayer) {
            throw `Music Player has not been instantiated in command ${this.name}`;
        }
        else {
        }
    }
    addDeps(dep) {
        if (dep instanceof SansMusic) {
            this.musicPlayer = dep;
        }
    }
}
export default Play;
//# sourceMappingURL=play.js.map