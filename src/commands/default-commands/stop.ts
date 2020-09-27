import * as Discord from 'discord.js'

import {MusicPlayer as SansMusic} from '../../audio-processing/MusicPlayer.js'
import {
  Command,
  SansDependencies,
  SansDependencyReference,
  SansMessage
} from "../command.js";

export class Stop implements Command {
  name = 'stop';
  description = 'Stops audio.';
  musicPlayer: Map<string, SansMusic>;

  dependecies = [ SansDependencies.Music ];

  constructor() {}

  async execute(message: SansMessage): Promise<void> {
    if (!this.musicPlayer) {
      throw `Music Player has not been instantiated in command ${this.name}`
    } else {
      const player = this.musicPlayer.get(message.discord.guild.id);
      if (!player) {
        message.discord.reply(
            "There was an error getting the music player. Please contact the developer if this happens consistently.")
        throw `${this.name} does not have a reference to the MusicPlayer.`;
      } else {
        player.stop();
      }
    }
  }

  addDeps(dep: SansDependencyReference) {
    if (dep instanceof Map) {
      this.musicPlayer = dep as Map<string, SansMusic>
    } else {
      throw `Stop command does not need dependecy of ${dep}.`
    }
  }
}

export default Stop;
