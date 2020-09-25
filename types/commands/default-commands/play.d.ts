import { MusicPlayer as SansMusic } from "../../audio-processing/MusicPlayer.js";
import { Command, SansDependencies, SansDependencyReference, SansMessage } from "../command.js";
export declare class Play implements Command {
    name: string;
    description: string;
    dependecies: SansDependencies[];
    musicPlayer: SansMusic;
    constructor();
    execute(message: SansMessage): void;
    addDeps(dep: SansDependencyReference): void;
}
export default Play;
