import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as isURL from 'is-url';
import ytdl from 'ytdl-core-discord';

import {MusicPlayer} from './MusicPlayer.js';

// Manages all functions related to playing audio through vcs in a guild
// Put a single instance of this as an export in server.js
// Call this class and then send a message after the promise is resolved

export class PlayManager {

  activeMusicPlayers: Map<string, MusicPlayer>;

  constructor() { this.activeMusicPlayers = new Map(); }

  destroyChild =
      (child) => {
        // Destroy an instance of a music player and remove it from
        // this.activeMusicPlayers

        if (!child) {
          throw 'No child given in PlayManager.destroyChild';
        } else {
          if (this.activeMusicPlayers[child.connection.channel.guild.id]) {
            this.activeMusicPlayers.delete(child.connection.channel.guild.id);
            console.log('Deleted music player in guild ' +
                        child.connection.channel.guild.id);
          } else {
            console.log('Cannot find music player.');
          }
        }
      }

  play =
      async (message: Discord.Message, args: Array<string>) => {
    // Start playing song
    // Call queue if there is already a song being played

    if (this.activeMusicPlayers.get(message.guild.id)) {
      // message.reply('Sans is already playing music in your server.');
    }

    if (message.member.voice.channel) {
      // TODO set constants for info and the thumbnail for sending info back to
      // the user
      // TODO make a file that serves as a single instance that manages the
      // guild's audio controls (queue and controls)

      // Check the args and check whether it is from youtube, soundcloud, or is
      // a direct soundfile link
      function getURL() {
        // const httpRemover = /(^http:\/\/|^https:\/\/)w{1,3}./g;

        if (!args[0]) {
          message.reply('You must provide a url for sans to play anything.');
          throw 'url not provided in play function';
        }

        for (const arg of args) {
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
      let manager = new MusicPlayer(this);
      this.activeMusicPlayers.set(message.guild.id, manager);
      manager.play(await getStream(), message.member.voice.channel)
          .then(() => console.log('played audio'))
          .catch(console.error);

    } else {
      message.reply('Please join a voice channel before playing audio.');
    }
  }

  stop =
      async (message: Discord.Message, args: Array<string>) => {
    // Destroy dispatch and Player

    // const dispatcher = require('./play').dispatcher;
    const player = this.activeMusicPlayers.get(message.guild.id);

    if (player) {
      player.stop();
    } else {
      message.reply(`Sans isn't playing anything.`);
      console.error('No player found to stop.');
    }
  }

  dc =
      async (guildId: string) => {
    // Leave voice channel and destroy Player instance
    const player: MusicPlayer = this.activeMusicPlayers.get(guildId);

    if (player) {
      // This can throw an exception
      player.leaveVoiceChannel();
    } else {
      console.error('No player found to disconnect.');
    }
  }

  pause =
      async (message: Discord.Message, args: Array<string>) => {
    // Pause song and set a dc timeout
  }

  queue = async (message: Discord.Message, args: Array<string>) => {
    // Queue up songs (store their names into a database when necessary?)
  }
}

export default MusicPlayer;
