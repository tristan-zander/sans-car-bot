import * as Discord from 'discord.js'

import {MusicPlayer as SansMusic} from '../../audio-processing/MusicPlayer.js'
import {Command, SansDependencyReference, SansMessage} from "../command.js";

export class Stop implements Command {
  name = 'stop';
  description = 'Stops audio.';
  musicPlayer: SansMusic;

  constructor() {}

  execute(message: SansMessage) {
    if (!this.musicPlayer) {
      throw `Music Player has not been instantiated in command ${this.name}`
    } else {
      this.musicPlayer.stop();
    }
  }

  addDeps(dep: SansDependencyReference) {
    if (dep instanceof SansMusic) {
      this.musicPlayer = dep
    } else {
      throw `Stop command does not need dependecy of ${dep}.`
    }
  }
}

export default Stop;
