import { MusicPlayer } from './MusicPlayer';

// Manages all functions related to playing audio through vcs in a guild
// Put a single instance of this as an export in server.js
// Call this class and then send a message after the promise is resolved 

const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');
const isURL = require('is-url');
const fs = require('fs');

export class PlayManager {

    activeMusicPlayers;

    constructor() {
        this.activeMusicPlayers = {};
    }

    destroyChild = (child) => {
        // Destroy an instance of a music player and remove it from this.activeMusicPlayers

        if (!child) {
            throw 'No child given in PlayManager.destroyChild';
        }

    }

    play = async (message, args) => {
        // Start playing song
        // Call queue if there is already a song being played

        if (this.activeMusicPlayers[message.guild.id]) {
            // message.reply('Sans is already playing music in your server.');
        }

        if (message.member.voice.channel) {
            // TODO set constants for info and the thumbnail for sending info back to the user
            // TODO make a file that serves as a single instance that manages the guild's audio controls (queue and controls)

            // Check the args and check whether it is from youtube, soundcloud, or is a direct soundfile link
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
                    const str = await ytdl(url)
                        .then((stream) => {
                            return stream;
                        });
                    return str;
                } else {
                    return url;
                }


                // return str;
            }

            // YTDL stream needs to get destroyed before leaving


            //if (dispatcher)
            //module.exports.dispatcher = dispatcher;

            this.activeMusicPlayers[message.guild.id] = new MusicPlayer(this);
            this.activeMusicPlayers[message.guild.id].play(await getStream(), message.member.voice.channel)
                .then(() => console.log('played audio'))
                .catch(err => console.error(err));


        } else {
            message.reply('Please join a voice channel before playing audio.');
        }
    }

    stop = async (message, args) => {
        // Destroy dispatch and Player

        // const dispatcher = require('./play').dispatcher;
        const player = this.activeMusicPlayers[message.guild.id]

        if (player) {
            player.stop();
        } else {
            message.reply(`Sans isn't playing anything.`);
            console.error('No player found to stop.');
        }
    }

    dc = async (message, args) => {
        // Leave voice channel and destroy Player instance
        const player = this.activeMusicPlayers[message.guild.id];

        if (player) {
            player.dc();
        } else {
            console.error('No player found to disconnect.');
        }
    }

    pause = async (message, args) => {
        // Pause song and set a dc timeout
    }

    queue = async (message, args) => {
        // Queue up songs (store their names into a database when necessary?)
    }
}