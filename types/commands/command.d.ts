import * as Discord from 'discord.js';
import { MusicPlayer as MusicDep } from '../audio-processing/MusicPlayer.js';
import { CommandDescription as CommandDescriptionsDep } from './default-commands/help.js';
export declare enum SansDependencies {
    Music = 0,
    CommandDescriptions = 1
}
export declare type SansDependencyReference = MusicDep | Map<string, CommandDescriptionsDep>;
export interface Command {
    readonly name: string;
    readonly description: string;
    readonly dependecies?: SansDependencies[];
    execute: (message: SansMessage) => Promise<void>;
    addDeps?: (dep: SansDependencyReference) => void;
}
export interface SearchCommand {
    readonly name: string;
    readonly description: string;
    readonly dependecies?: Array<SansDependencies>;
    readonly includes: Array<string>;
    execute: (message: SansMessage) => Promise<void>;
    addDeps?: (dep: SansDependencyReference) => void;
}
export interface SansMessage {
    discord: Discord.Message;
    readonly args: Array<string>;
}
