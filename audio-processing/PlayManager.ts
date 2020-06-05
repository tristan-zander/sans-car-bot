// Manages all functions related to playing audio through vcs in a guild
// Put a single instance of this as an export in server.js
// Call this class and then send a message after the promise is resolved 

const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');
const isURL = require('is-url');
const fs = require('fs');

export class PlayManager {

    activeMusicPlayers = {};

    constructor() {
        this.activeMusicPlayers = {};
    }

    destroyChild = (child) => {
        // Destroy an instance of a music player and remove it from this.activeMusicPlayers
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

                for (const arg of args) {
                    if (isURL(arg)) { // The argument is a url
                        //const newArg = arg.replace(httpRemover, '');
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

export class MusicPlayer {
    // One given to every guild to manage audio
    // Stores queue, song, dispatcher, connection, and information on who played the song

    parent

    dispatcher;
    connection;

    channel; // typeof VoiceChannel

    queue: Queue;

    isPlaying: boolean;

    constructor(parent) {
        this.queue = new Queue();

        this.isPlaying = false;

        this.parent = parent;
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
            this.isPlaying = false;
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

    }


    dc = async () => {
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
        this.parent.destroyChild();
    }
}

export class Queue {
    // Is the queue. String of URLs with functions to add and remove, as well as to display what is in the queue
}