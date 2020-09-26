import * as Discord from 'discord.js'

import {SansMessage, SearchCommand} from '../command.js'

export class KyloRen implements SearchCommand {
  name = 'kylo ren';
  description = 'bring me the girl';
  includes = [ 'bring me the girl', 'kylo ren' ];
  async execute(message: SansMessage): Promise<void> {
    const bringMeTheGirl = new Discord.MessageAttachment(
        "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fbring%20me%20the%20girl.jpg?v=1584327058499");

    message.discord.channel.send(bringMeTheGirl);
  }
}

export default KyloRen;
