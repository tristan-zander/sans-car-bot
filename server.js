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
    client.user.setPresence({
        status: "online",
        game: {
            name: 'Use "sans help" for help',
            trype: 'PLAYING'
        }
    });
});

client.login(token);

client.on('message', message => {
    
    if (message.content.startsWith(prefix)) {
        console.log('command sent');
        // do something
    }

    if (message.content.toLowerCase().includes('sans car')) {
        const sanscar = new Discord.MessageAttachment('https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsanscar.jpg?v=1584324797279');

        message.channel.send(sanscar);
    }
  
  if (message.content.toLowerCase().includes('bring me the girl') || message.content.toLowerCase().includes('kylo ren')) {
        const bringMeTheGirl = new Discord.MessageAttachment('https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fbring%20me%20the%20girl.jpg?v=1584327058499');

        message.channel.send(bringMeTheGirl);
    }
    
});