"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicPlayer = void 0;
const Queue_1 = require("./Queue");
class MusicPlayer {
    constructor(parent) {
        this.play = async (stream, vc) => {
            this.connection = await vc.join()
                .then(conn => conn)
                .catch(err => {
                console.log(err);
                throw 'There was an error connecting to the voice channel.';
            });
            this.dispatcher = this.connection.play(stream, { type: 'opus' });
            this.dispatcher.on('start', () => {
                console.log('The song is now playing!');
                this.isPlaying = true;
            });
            this.dispatcher.on('finish', () => {
                this.startTimeout();
            });
            this.dispatcher.on('error', err => { console.error(err); this.destroy(); });
            this.dispatcher.on('debug', console.debug);
            this.dispatcher.on('warn', console.warn);
            this.dispatcher.on('failed', err => {
                console.log(err);
                this.dispatcher.destroy();
            });
        };
        this.stop = async () => {
            if (this.dispatcher) {
                this.dispatcher.destroy();
            }
            this.queue.empty();
        };
        this.dc = async () => {
            if (this.dispatcher) {
                this.dispatcher.destroy();
            }
            if (this.connection) {
                this.connection.disconnect();
            }
            if (!this.connection) {
                throw 'Sans is not in a voice channel';
            }
            this.destroy();
        };
        this.destroy = () => {
            this.isPlaying = false;
            this.parent.destroyChild(this);
        };
        this.startTimeout = () => {
            setTimeout(() => this.timeout(), this.timeoutTime);
        };
        this.timeout = () => {
            if (!this.isPlaying) {
                this.destroy();
            }
        };
        this.queue = new Queue_1.Queue();
        this.isPlaying = false;
        this.parent = parent;
        this.timeoutTime = 10 * 60 * 1000;
    }
}
exports.MusicPlayer = MusicPlayer;
