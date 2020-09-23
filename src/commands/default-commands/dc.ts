import * as Discord from 'discord.js'

import {MusicPlayer as SansMusic} from '../../audio-processing/MusicPlayer.js'
import {Command, SansDependencies as Deps, SansMessage} from '../command.js'

export class Disconnect implements Command {
  name = 'dc';
  description = 'Disconnects the bot from the voice channel.';
  dependecies = [ Deps.Music ]
  music: SansMusic;

  // TODO dependecy injection
  public addMusicDependency() { throw "This is unimplemented!" }

  execute(message: SansMessage) {
    // this.music.disconnect(message.discord.guild.id)
  }
}

export default Disconnect;
