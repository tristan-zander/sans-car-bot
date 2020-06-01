const Discord = require('discord.js');
const yas = require('youtube-audio-server');
const isUrl = require('is-url');
const fs = require('fs');

module.exports = {
    name: 'play',
    description: 'Play media from YouTube and Soundcloud',
    execute: async function (message, args) {
        if (message.member.voice.channel) {

            // Check the args and check whether it is from youtube, soundcloud, or is a direct soundfile link
            let urls = [];

            for (const arg in args) {
                if (isUrl(arg)) {
                    urls.push(arg);
                }
            }


            // If you need to get a stream from youtube...
            const YAS_PORT = process.env.YAS_PORT;
            yas.setKey(process.env.YT_KEY);
            yas.listen(YAS_PORT, console.log(`listening on port ${YAS_PORT}`));
            // TODO make this its own separate server

            const connection = await message.member.voice.channel.join()
                //.then(message.reply('Now playing: '))
                .catch(err => {
                    message.reply('There was an error connecting to the voice channel.');
                    console.log(err);
                });

            const dispatcher = connection.play(urls.length === 1 ? urls[0] : 'audio.mp3');

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