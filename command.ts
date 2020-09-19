import * as Discord from 'discord.js'

export interface Command {
  name: string;
  description: string;
  // Can throw exceptions
  execute: (message: Discord.Message, args: Array<string>) => void;
}

export interface SearchCommand {
  name: string;
  description: string;
  includes: Array<string>;
  // Can throw exceptions
  execute: (message: Discord.Message, args: Array<string>) => void;
}
