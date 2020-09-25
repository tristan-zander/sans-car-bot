// const Discord = require('discord.js');
// const ytdl = require('ytdl-core-discord');
// const ytdl = require('ytdl-core');
// const isURL = require('is-url');
// const fs = require('fs');

import {MusicPlayer as SansMusic} from "../../audio-processing/MusicPlayer.js";
import {
  Command,
  SansDependencies,
  SansDependencyReference,
  SansMessage
} from "../command.js";

export class Play implements Command {
  name = 'play';
  description = 'Play media from YouTube or direct mp3 files';
  dependecies = [ SansDependencies.Music ];

  musicPlayer: SansMusic;

  constructor() {}

  execute(message: SansMessage): void {
    if (!this.musicPlayer) {
      throw `Music Player has not been instantiated in command ${this.name}`
    } else {
      // this.musicPlayer.play(message);
    }
  }

  addDeps(dep: SansDependencyReference): void {
    if (dep instanceof SansMusic) {
      this.musicPlayer = dep;
    }
  }
}

export default Play;
