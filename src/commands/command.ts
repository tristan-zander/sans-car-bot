import * as Discord from 'discord.js'

export enum SansDependencies {
  Music,
}

export interface Command {
  readonly name: string;
  readonly description: string;
  readonly dependecies?: SansDependencies[];
  // Can throw exceptions
  execute: (message: SansMessage) => void;
}

export interface SearchCommand {
  readonly name: string;
  readonly description: string;
  readonly dependecies: Array<SansDependencies>;
  readonly includes: Array<string>;
  // Can throw exceptions
  execute: (message: SansMessage) => void;
}

export interface SansMessage {
  discord: Discord.Message;
  readonly args: Array<string>;
}
