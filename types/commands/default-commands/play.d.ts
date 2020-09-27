import { MusicPlayer as SansMusic } from "../../audio-processing/MusicPlayer.js";
import { Command, SansDependencies, SansDependencyReference, SansMessage } from "../command.js";
export declare class Play implements Command {
    name: string;
    description: string;
    dependecies: SansDependencies[];
    musicPlayer: Map<string, SansMusic>;
    constructor();
    execute(message: SansMessage): Promise<void>;
    addDeps(dep: SansDependencyReference | any): void;
}
export default Play;
