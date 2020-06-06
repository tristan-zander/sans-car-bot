import { Queue } from './Queue';

export class MusicPlayer {
    // One given to every guild to manage audio
    // Stores queue, song, dispatcher, connection, and information on who played the song

    parent

    dispatcher;
    connection;

    channel; // typeof VoiceChannel

    queue;

    isPlaying;

    timeoutTime;

    constructor(parent) {
        this.queue = new Queue();

        this.isPlaying = false;

        this.parent = parent;

        this.timeoutTime = 10 * 60 * 1000;
    }

    play = async (stream, vc) => {
        this.connection = await vc.join()
            .then(conn => conn)
            .catch(err => {
                // message.reply('There was an error connecting to the voice channel.');
                console.log(err);
                throw 'There was an error connecting to the voice channel.';
            });

        this.dispatcher = this.connection.play(stream, { type: 'opus' });

        this.dispatcher.on('start', () => {
            console.log('The song is now playing!');
            this.isPlaying = true;
        });

        this.dispatcher.on('finish', () => {
            // Clean up dispatcher and disconnect

            this.startTimeout();
        });

        // handle errors appropriately
        this.dispatcher.on('error', err => { console.error(err); this.destroy() } );

        this.dispatcher.on('debug', console.debug);

        this.dispatcher.on('warn', console.warn);

        this.dispatcher.on('failed', err => {
            console.log(err);
            this.dispatcher.destroy();
        });

    }

    stop = async () => {
        if (this.dispatcher) {
            this.dispatcher.destroy();
        }

        // empty queue
        this.queue.empty();
    }


    leaveVoiceChannel = async () => {
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

    destroy = () => {
        this.isPlaying = false;
        this.parent.destroyChild(this);
    }

    startTimeout = () => {
        setTimeout(() => this.timeout(), this.timeoutTime);
    }

    timeout = () => {
        if (!this.isPlaying) {
            this.destroy();
        }
    }
}