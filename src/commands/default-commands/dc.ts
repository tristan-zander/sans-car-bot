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
  musicPlayer: Map<string, SansMusic>;

  constructor() {}

  // TODO dependecy injection
  public addDeps(dependecy: SansDependencyReference) {
    if (dependecy instanceof Map)
      this.musicPlayer = dependecy as Map<string, SansMusic>;
    else
      console.error(`${this.name} was given the wrong dependecy.`);
  }

  async execute(message: SansMessage) {
    // this.music.disconnect(message.discord.guild.id)

    if (!this.musicPlayer) {
      message.discord.reply(
          "There was an error getting the music player. Please contact the developer if this happens consistently.")
      throw `${this.name} does not have a reference to the MusicPlayer.`;
    } else {
      let music = this.musicPlayer.get(message.discord.guild.id);
      if (music.dispatcher) {
        music.dispatcher.destroy();
      }

      if (music.connection) {
        music.connection.disconnect();
      }

      // empty queue
      music.queue.empty();

      music.startTimeout();
    }
  }
}

export default Disconnect;
