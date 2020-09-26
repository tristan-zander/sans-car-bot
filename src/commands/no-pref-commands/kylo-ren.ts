import * as Discord from 'discord.js'
import * as path from 'path'

import {SansMessage, SearchCommand} from '../command.js'

export class KyloRen implements SearchCommand {
  name = 'kylo ren';
  description = 'bring me the girl';
  includes = [ 'bring me the girl', 'kylo ren' ];
  async execute(message: SansMessage): Promise<void> {
    const bringMeTheGirl = new Discord.MessageAttachment(
        path.resolve('res/bring-me-the-girl.png'));

    message.discord.channel.send(bringMeTheGirl);
  }
}

export default KyloRen;
