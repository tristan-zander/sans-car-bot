import * as Discord from 'discord.js'
import {MusicPlayer as MusicDep} from '../audio-processing/MusicPlayer.js'

export enum SansDependencies {
  Music,
}

// Add each dependecy to this type
export type SansDependencyReference = MusicDep;

export interface Command {
  readonly name: string;
  readonly description: string;
  readonly dependecies?: SansDependencies[];

  // Should throw exceptions on error
  execute: (message: SansMessage) => void;
  // You NEED to type check in this function
  addDeps?: (dep: SansDependencyReference) => void;
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
