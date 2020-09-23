import { MusicPlayer as SansMusic } from '../../audio-processing/MusicPlayer.js';
import { Command, SansDependencies as Deps, SansMessage } from '../command.js';
export declare class Disconnect implements Command {
    name: string;
    description: string;
    dependecies: Deps[];
    music: SansMusic;
    constructor(music: SansMusic);
    execute(message: SansMessage): void;
}
export default Disconnect;
