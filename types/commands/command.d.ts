import * as Discord from 'discord.js';
export declare enum SansDependencies {
    Music = 0
}
export interface Command {
    readonly name: string;
    readonly description: string;
    readonly dependecies?: SansDependencies[];
    execute: (message: SansMessage) => void;
}
export interface SearchCommand {
    readonly name: string;
    readonly description: string;
    readonly dependecies: Array<SansDependencies>;
    readonly includes: Array<string>;
    execute: (message: SansMessage) => void;
}
export interface SansMessage {
    discord: Discord.Message;
    readonly args: Array<string>;
}
