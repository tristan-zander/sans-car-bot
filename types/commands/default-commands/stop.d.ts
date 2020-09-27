import { MusicPlayer as SansMusic } from '../../audio-processing/MusicPlayer.js';
import { Command, SansDependencies, SansDependencyReference, SansMessage } from "../command.js";
export declare class Stop implements Command {
    name: string;
    description: string;
    musicPlayer: Map<string, SansMusic>;
    dependecies: SansDependencies[];
    constructor();
    execute(message: SansMessage): Promise<void>;
    addDeps(dep: SansDependencyReference): void;
}
export default Stop;
