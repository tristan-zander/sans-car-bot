const Discord = require('discord.js');
const ytSearch = require('youtube-search');
const fs = require('fs');

module.exports = {
    name: 'play',
    description: 'Play media from YouTube and Soundcloud',
    execute: async function (message, args) {

        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join()
                .then(message.reply('Now playing: '))
                .catch(err => {
                    message.reply('There was an error playing your link.');
                    console.log(err);
                });

            const dispatcher = connection.play(args[0]);

            if (dispatcher)
                module.exports.dispatcher = dispatcher;

            dispatcher.on('start', () => {
                console.log('audio.mp3 is now playing!');
            });

            dispatcher.on('finish', () => {
                // Clean up dispatcher and disconnect
            });

            // Always remember to handle errors appropriately!
            dispatcher.on('error', console.error);

            dispatcher.on('debug', console.debug);

            dispatcher.on('warn', console.warn);

            dispatcher.on('failed', err => console.log(err));


        } else {
            message.reply('Please join a voice channel before playing audio.');
        }
    }
}