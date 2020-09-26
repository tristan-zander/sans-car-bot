import {MusicPlayer as SansMusic} from '../../audio-processing/MusicPlayer.js'
import {
  Command,
  SansDependencies as Deps,
  SansDependencyReference,
  SansMessage
} from '../command.js'

export class Disconnect implements Command {
  name = 'dc';
  description = 'Disconnects the bot from the voice channel.';
  dependecies = [ Deps.Music ]
  music: SansMusic;

  constructor() {}

  // TODO dependecy injection
  public addDeps(dependecy: SansDependencyReference) {
    if (dependecy instanceof SansMusic)
      this.music = dependecy;
    else
      console.error(`${this.name} was given the wrong dependecy.`);
  }

  async execute(message: SansMessage) {
    // this.music.disconnect(message.discord.guild.id)
  }
}

export default Disconnect;
