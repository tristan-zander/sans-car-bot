import * as Discord from 'discord.js'
import {PlayManager} from '../audio-processing/PlayManager'

export interface Command {
  name: string;
  description: string;
  // Can throw exceptions
  execute: (message: SansMessage) => void;
}

export interface SearchCommand {
  name: string;
  description: string;
  includes: Array<string>;
  // Can throw exceptions
  execute: (message: Discord.Message, args: Array<string>) => void;
}

export interface SansMessage {
  message: Discord.Message;
  args: Array<string>;
  songManager: PlayManager;
}
