// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const {prefix} = require('./config.json');
const token = process.env.TOKEN;

const client = new Discord.Client();


client.once('ready', () => {
    console.log('Ready!');
});

client.login(token);

client.on('message', message => {
    
    if (message.content.startsWith(prefix)) {
        console.log('command sent');
        // do something
    }

    if (message.content.includes('sans car')) {
        const sanscar = new Discord.MessageAttachment('./Media/sanscar.jpg');

        message.channel.send(sanscar);
    }
});