"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = exports.MusicPlayer = exports.PlayManager = void 0;
const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');
const isURL = require('is-url');
const fs = require('fs');
class PlayManager {
    constructor() {
        this.activeMusicPlayers = {};
        this.play = (message, args) => __awaiter(this, void 0, void 0, function* () {
            if (this.activeMusicPlayers[message.guild.id]) {
                message.reply('Sans is already playing music in your server.');
            }
            if (message.member.voice.channel) {
                function getURL() {
                    for (const arg of args) {
                        if (isURL(arg)) {
                            return arg.trim();
                        }
                    }
                }
                function getStream() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const url = getURL();
                        if (url.includes('youtu')) {
                            const str = yield ytdl(url)
                                .then((stream) => {
                                return stream;
                            });
                            return str;
                        }
                        else {
                            return url;
                        }
                    });
                }
                this.activeMusicPlayers[message.guild.id] = new MusicPlayer(this);
                this.activeMusicPlayers[message.guild.id].play(yield getStream(), message.member.voice.channel)
                    .then(() => console.log('played audio'))
                    .catch(err => console.error(err));
            }
            else {
                message.reply('Please join a voice channel before playing audio.');
            }
        });
        this.stop = (message, args) => __awaiter(this, void 0, void 0, function* () {
            const player = this.activeMusicPlayers[message.guild.id];
            if (player) {
                player.stop();
            }
            else {
                console.error('No player found to stop.');
            }
        });
        this.dc = (message, args) => __awaiter(this, void 0, void 0, function* () {
            const player = this.activeMusicPlayers[message.guild.id];
            if (player) {
                player.dc();
            }
            else {
                console.error('No player found to disconnect.');
            }
        });
        this.pause = (message, args) => __awaiter(this, void 0, void 0, function* () {
        });
        this.queue = (message, args) => __awaiter(this, void 0, void 0, function* () {
        });
        this.activeMusicPlayers = {};
    }
}
exports.PlayManager = PlayManager;
class MusicPlayer {
    constructor(parent) {
        this.play = (stream, vc) => __awaiter(this, void 0, void 0, function* () {
            this.connection = yield vc.join()
                .then(conn => conn)
                .catch(err => {
                console.log(err);
                throw 'There was an error connecting to the voice channel.';
            });
            this.dispatcher = this.connection.play(stream, { type: 'opus' });
            this.dispatcher.on('start', () => {
                console.log('The song is now playing!');
            });
            this.dispatcher.on('finish', () => {
            });
            this.dispatcher.on('error', console.error);
            this.dispatcher.on('debug', console.debug);
            this.dispatcher.on('warn', console.warn);
            this.dispatcher.on('failed', err => {
                console.log(err);
                this.dispatcher.destroy();
            });
        });
        this.stop = () => {
        };
        this.dc = () => {
        };
        this.destroy = () => {
        };
        this.queue = new Queue();
        this.isPlaying = false;
        this.parent = parent;
    }
}
exports.MusicPlayer = MusicPlayer;
class Queue {
}
exports.Queue = Queue;
