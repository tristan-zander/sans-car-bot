import { MusicPlayer as SansMusic } from '../../audio-processing/MusicPlayer.js';
import { Command, SansDependencyReference, SansMessage } from "../command.js";
export declare class Stop implements Command {
    name: string;
    description: string;
    musicPlayer: SansMusic;
    constructor();
    execute(message: SansMessage): void;
    addDeps(dep: SansDependencyReference): void;
}
export default Stop;
