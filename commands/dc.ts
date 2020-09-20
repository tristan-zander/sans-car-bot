import * as Discord from 'discord.js'

import {Command, SansMessage} from './command'

const command: Command = {
  name : 'dc',
  description : 'Disconnects the bot from the voice channel.',
  execute(message: SansMessage,
          args: Array<string>) { message.songManager.dc() }

}

export default command;
