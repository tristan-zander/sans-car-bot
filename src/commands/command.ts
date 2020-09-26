import * as Discord from 'discord.js'
import {MusicPlayer as MusicDep} from '../audio-processing/MusicPlayer.js'
import {
  CommandDescription as CommandDescriptionsDep
} from './default-commands/help.js'

export enum SansDependencies {
  Music,
  CommandDescriptions
}

// Add each dependecy to this type
export type SansDependencyReference =
    MusicDep|Map<string, CommandDescriptionsDep>;

export interface Command {
  readonly name: string;
  readonly description: string;
  readonly dependecies?: SansDependencies[];

  // Should throw exceptions on error
  execute: (message: SansMessage) => Promise<void>;
  // You NEED to type check in this function
  addDeps?: (dep: SansDependencyReference) => void;
}

export interface SearchCommand {
  readonly name: string;
  readonly description: string;
  readonly dependecies?: Array<SansDependencies>;
  readonly includes: Array<string>;
  // Can throw exceptions
  execute: (message: SansMessage) => Promise<void>;
  // Make sure to type check if you have multiple dependecies
  addDeps?: (dep: SansDependencyReference) => void;
}

export interface SansMessage {
  discord: Discord.Message;
  readonly args: Array<string>;
}
