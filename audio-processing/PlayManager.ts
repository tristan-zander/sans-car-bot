// Manages all functions related to playing audio through vcs in a guild
// Put a single instance of this as an export in server.js
// Call this class and then send a message after the promise is resolved 

const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');
const isURL = require('is-url');
const fs = require('fs');

export class PlayManager {

    activeGuilds: string[]; // guild IDs
    activeMusicPlayers: MusicPlayer[];

    constructor() {
        this.activeGuilds = [];
        this.activeGuilds = [];
    }

    play = async (message, args) => {
        // Start playing song
        // Call queue if there is already a song being played

        if (message.member.voice.channel) {
            // TODO set constants for info and the thumbnail for sending info back to the user
            // TODO make a file that serves as a single instance that manages the guild's audio controls (queue and controls)

            // Check the args and check whether it is from youtube, soundcloud, or is a direct soundfile link
            let getURL = () => {
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

            const connection = await message.member.voice.channel.join()
                .then(conn => module.exports.connection = conn)
                .catch(err => {
                    message.reply('There was an error connecting to the voice channel.');
                    console.log(err);
                });

            // YTDL stream needs to get destroyed before leaving
            const dispatcher = await getStream()
                .then((stream) => {
                    return connection.play(stream, { type: 'opus' })
                })
                .catch(err => console.log(err))



            if (dispatcher)
                module.exports.dispatcher = dispatcher;

            dispatcher.on('start', () => {
                console.log('The song is now playing!');
            });

            dispatcher.on('finish', () => {
                // Clean up dispatcher and disconnect
            });

            // Always remember to handle errors appropriately!
            dispatcher.on('error', console.error);

            dispatcher.on('debug', console.debug);

            dispatcher.on('warn', console.warn);

            dispatcher.on('failed', err => { console.log(err); dispatcher.destroy(); });


        } else {
            message.reply('Please join a voice channel before playing audio.');
        }
    }

    stop = async (message, args) => {
        // Destroy dispatch and Player
    }

    dc = async (message, args) => {
        // Leave voice channel and destroy Player instance
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
}