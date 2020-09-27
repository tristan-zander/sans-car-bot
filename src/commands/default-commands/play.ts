// const Discord = require('discord.js');
// const ytdl = require('ytdl-core-discord');
// const ytdl = require('ytdl-core');
// const isURL = require('is-url');
// const fs = require('fs');
import isURL from 'is-url'
import ytdl from 'ytdl-core-discord'
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

  musicPlayer: Map<string, SansMusic>;

  constructor() {}

  async execute(message: SansMessage): Promise<void> {
    if (!this.musicPlayer) {
      throw `Music Player has not been instantiated in command ${this.name}`
    } else {
      // this.musicPlayer.play(message);
      // Start playing song
      // Call queue if there is already a song being played

      if (this.musicPlayer.get(message.discord.guild.id)) {
        // message.reply('Sans is already playing music in your server.');
      }

      if (message.discord.member.voice.channel) {
        // TODO set constants for info and the thumbnail for sending info back
        // to the user
        // TODO make a file that serves as a single instance that manages the
        // guild's audio controls (queue and controls)

        // Check the args and check whether it is from youtube, soundcloud, or
        // is a direct soundfile link
        function getURL() {
          // const httpRemover = /(^http:\/\/|^https:\/\/)w{1,3}./g;

          if (!message.args[0]) {
            message.discord.reply(
                'You must provide a url for sans to play anything.');
            throw `url not provided in ${this.name} command.`;
          }

          for (const arg of message.args) {
            if (isURL(arg)) {
              // The argument is a url
              return arg.trim();
            }
          }

          // TODO Search for the relavent video on youtube
        }

        async function getStream() {
          const url = getURL();

          if (url.includes('youtu')) {
            const str = await ytdl(url);
            return str;
          } else {
            return url;
          }

          // return str;
        }

        // YTDL stream needs to get destroyed before leaving

        // if (dispatcher)
        // module.exports.dispatcher = dispatcher;
        let manager = new SansMusic();
        this.musicPlayer.set(message.discord.guild.id, manager);
        manager.play(await getStream(), message.discord.member.voice.channel)
            .then(() => console.log('played audio'))
            .catch(err => {
              console.error(err);
              manager.destroy();
              message.discord.reply(
                  "The bot encountered an error when trying to play the media. Contact the developer if this happens consistently.")
            });

      } else {
        message.discord.reply(
            'Please join a voice channel before playing audio.');
      }
    }
  }

  addDeps(dep: SansDependencyReference|any): void {
    if (dep instanceof Map) {
      this.musicPlayer = dep;
    } else {
      throw `${this.name} was given the wrong dependecy.`;
    }
  }
}

export default Play;
