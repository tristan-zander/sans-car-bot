import * as Discord from 'discord.js'

import {Queue} from './Queue.js'

export class MusicPlayer {
  // One given to every guild to manage audio
  // Stores queue, song, dispatcher, connection, and information on who played
  // the song

  dispatcher: Discord.StreamDispatcher;
  connection: Discord.VoiceConnection;

  channel: Discord.VoiceChannel;
  queue: Queue;

  isPlaying: boolean;

  timeoutTime: number;

  constructor() {
    this.queue = new Queue();

    this.isPlaying = false;

    this.timeoutTime = 10 * 60 * 1000;
  }

  play =
      async (stream: string|any /*|internal.Readable*/,
             vc: Discord.VoiceChannel) => {
    this.connection = await vc.join().then(conn => conn).catch(err => {
      // message.reply('There was an error connecting to the voice channel.');
      console.log(err);
      throw 'There was an error connecting to the voice channel.';
    });

    this.dispatcher = this.connection.play(stream, {type : 'opus'});

    this.dispatcher.on('start', () => {
      console.log('The song is now playing!');
      this.isPlaying = true;
    });

    this.dispatcher.on('finish', () => {
      // Clean up dispatcher and disconnect

      this.isPlaying = false;
      this.startTimeout();
    });

    // handle errors appropriately
    this.dispatcher.on('error', err => {
      console.error(err);
      this.destroy();
      throw `MusicPlayer encountered an error.`;
    });

    this.dispatcher.on('debug', console.debug);

    this.dispatcher.on('warn', console.warn);

    this.dispatcher.on('failed', err => {
      console.log(err);
      this.leaveVoiceChannel().then(
          () => {
              throw 'The music player has failed for some reason. Contact the developer if this continues to happen.'});
    });
  }

  stop =
      async () => {
    if (this.dispatcher) {
      this.dispatcher.destroy();
    }

    // empty queue
    this.queue.empty();

    this.startTimeout();
  }

  leaveVoiceChannel =
      async () => {
    if (this.dispatcher) {
      this.dispatcher.destroy();
    }

    if (this.connection) {
      this.connection.disconnect();
    }

    if (!this.connection) {
      throw 'Sans is not in a voice channel';
    }

    this.destroy()
  }

  destroy =
      () => {
        this.isPlaying = false;

        if (this.connection) {
          this.connection.disconnect();
        }
      }

  startTimeout = () => {
    setTimeout(() => {
      if (!this.isPlaying) {
        this.destroy();
      }
    }, this.timeoutTime);
  }
}

export default MusicPlayer;
