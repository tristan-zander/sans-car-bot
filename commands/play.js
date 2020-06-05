// const Discord = require('discord.js');
// const ytdl = require('ytdl-core-discord');
// const ytdl = require('ytdl-core');
// const isURL = require('is-url');
// const fs = require('fs');

module.exports = {
    name: 'play',
    description: 'Play media from YouTube or direct mp3 files',
    execute: async function (message, args) {
        require('./../server').songManager.play(message, args);
        //songManager.play(message, args);
    }
}