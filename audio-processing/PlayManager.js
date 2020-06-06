"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayManager = void 0;
const MusicPlayer_1 = require("./MusicPlayer");
const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');
const isURL = require('is-url');
const fs = require('fs');
class PlayManager {
    constructor() {
        this.destroyChild = (child) => {
            if (!child) {
                throw 'No child given in PlayManager.destroyChild';
            }
        };
        this.play = async (message, args) => {
            if (this.activeMusicPlayers[message.guild.id]) {
            }
            if (message.member.voice.channel) {
                function getURL() {
                    if (!args[0]) {
                        message.reply('You must provide a url for sans to play anything.');
                        throw 'url not provided in play function';
                    }
                    for (const arg of args) {
                        if (isURL(arg)) {
                            return arg.trim();
                        }
                    }
                }
                async function getStream() {
                    const url = getURL();
                    if (url.includes('youtu')) {
                        const str = await ytdl(url)
                            .then((stream) => {
                            return stream;
                        });
                        return str;
                    }
                    else {
                        return url;
                    }
                }
                this.activeMusicPlayers[message.guild.id] = new MusicPlayer_1.MusicPlayer(this);
                this.activeMusicPlayers[message.guild.id].play(await getStream(), message.member.voice.channel)
                    .then(() => console.log('played audio'))
                    .catch(err => console.error(err));
            }
            else {
                message.reply('Please join a voice channel before playing audio.');
            }
        };
        this.stop = async (message, args) => {
            const player = this.activeMusicPlayers[message.guild.id];
            if (player) {
                player.stop();
            }
            else {
                message.reply(`Sans isn't playing anything.`);
                console.error('No player found to stop.');
            }
        };
        this.dc = async (message, args) => {
            const player = this.activeMusicPlayers[message.guild.id];
            if (player) {
                player.dc();
            }
            else {
                console.error('No player found to disconnect.');
            }
        };
        this.pause = async (message, args) => {
        };
        this.queue = async (message, args) => {
        };
        this.activeMusicPlayers = {};
    }
}
exports.PlayManager = PlayManager;
