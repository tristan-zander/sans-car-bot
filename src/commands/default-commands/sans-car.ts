import * as Discord from 'discord.js'
import * as path from 'path'

import {Command, SansMessage} from "../command.js";

export class SansCar implements Command {
  name = 'car';
  description =
      'THE FUNNY THING LOLOL but only when you type it at the beginning of a sentence. (Daily count of sans car calls soon)';

  // TODO Figure out what this was for
  hide = true;

  constructor() {}

  async execute(message: SansMessage): Promise<void> {
    const sanscar =
        new Discord.MessageAttachment(path.resolve("res/sans-car.jpg"));
    message.discord.channel.send(sanscar);
  }
}

export default SansCar;
