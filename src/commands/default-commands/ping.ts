import {Command, SansMessage} from '../command.js'

export class Ping implements Command {
  name = 'ping';
  description = 'Responds with pong.';

  constructor() {}

  // TODO Make this send network statistics too
  execute(message: SansMessage) { message.discord.channel.send('Pong'); }
}

export default Ping;
