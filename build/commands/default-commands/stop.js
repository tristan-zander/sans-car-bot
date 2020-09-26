import { MusicPlayer as SansMusic } from '../../audio-processing/MusicPlayer.js';
export class Stop {
    constructor() {
        this.name = 'stop';
        this.description = 'Stops audio.';
    }
    async execute(message) {
        if (!this.musicPlayer) {
            throw `Music Player has not been instantiated in command ${this.name}`;
        }
        else {
            this.musicPlayer.stop();
        }
    }
    addDeps(dep) {
        if (dep instanceof SansMusic) {
            this.musicPlayer = dep;
        }
        else {
            throw `Stop command does not need dependecy of ${dep}.`;
        }
    }
}
export default Stop;
//# sourceMappingURL=stop.js.map