import { MusicPlayer as SansMusic } from '../../audio-processing/MusicPlayer.js';
import { Command, SansDependencies as Deps, SansDependencyReference, SansMessage } from '../command.js';
export declare class Disconnect implements Command {
    name: string;
    description: string;
    dependecies: Deps[];
    musicPlayer: Map<string, SansMusic>;
    constructor();
    addDeps(dependecy: SansDependencyReference): void;
    execute(message: SansMessage): Promise<void>;
}
export default Disconnect;
