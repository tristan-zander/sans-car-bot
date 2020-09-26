import * as Discord from 'discord.js'

import {Command, SansMessage} from "../command.js";

export class SansCar implements Command {
  name = 'car';
  description =
      'THE FUNNY THING LOLOL but only when you type it at the beginning of a sentence. (Daily count of sans car calls soon)';

  // TODO Figure out what this was for
  hide = true;

  constructor() {}

  async execute(message: SansMessage): Promise<void> {
    const sanscar = new Discord.MessageAttachment(
        "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsanscar.jpg?v=1584324797279");

    message.discord.channel.send(sanscar);
  }
}

export default SansCar;
