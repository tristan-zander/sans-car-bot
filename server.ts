import { PlayManager } from "./audio-processing/PlayManager";

const env = require('dotenv').config();
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
const path = require('path');


/*

BEGIN EXPRESS ROUTING
Split this into a different program

*/

// Get SSL cert credentials 
const pfx = fs.readFileSync('keys/website.pfx');
const passphrase = process.env.PASSPHRASE;

const credentials = { pfx: pfx, passphrase: passphrase }

// Get ports
const HTTP_PORT = process.env.HTTP_PORT || process.env.FALLBACK_PORT;
const HTTPS_PORT = process.env.HTTPS_PORT || process.env.FALLBACK_PORT + 1;

// Make sure connection is https
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});

// Enable Ping api
app.use('/api/ping/', require('./routes/api/ping'));

// Set static website path
const BUILD_PATH = process.env.BUILD_PATH;
if (!BUILD_PATH) console.log("Error getting the build path.");

// ???
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Create HTTP/HTTPS servers and pass them as express middleware
http.createServer(app).listen(HTTP_PORT);
https.createServer(credentials, app).listen(HTTPS_PORT);

console.log(`Listening on http port ${HTTP_PORT}, and https port ${HTTPS_PORT}`);

// Serve static path (might want to remove this and render html pages)
app.use(express.static(BUILD_PATH));

app.get('/*', (req, res) => {
  // Redirect to https://
  res.sendFile(path.join(BUILD_PATH, "index.html"));
});


/* 

BEGIN DISCORD BOT

*/
const Discord = require("discord.js");
const ffmpeg = require("ffmpeg-static");
const { prefix } = require("./config.json");
const token = process.env.TOKEN;

// Create Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Create map of commands from their folders
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);

  console.log(`Added command of name ${command.name}`);
}

client.searchCommands = new Discord.Collection();
const searchCommands = fs
  .readdirSync('./no-pref-commands')
  .filter((file) => file.endsWith('.js'));

let searchIncludes = [];

for (const file of searchCommands) {
  const sCommand = require(`./no-pref-commands/${file}`);
  client.searchCommands.set(sCommand.name, sCommand);

  searchIncludes.push({ includes: sCommand.includes, command: sCommand });

  console.log(`Added search command of name ${sCommand.name}`);
}

console.log("Finished processing commands.");
// console.log(client.searchCommands, client.commands, searchIncludes);

setStatus();
login();

const songManager = new PlayManager();
module.exports.songManager = songManager;

// Sets the status of the bot in Discord
function setStatus() {
  client.once("ready", () => {
    console.log("Client is ready!");
    client.user.setPresence({
      status: "online",
      activity: {
        name: 'use "sans help" for help',
        type: "PLAYING"
      }
    });
  });
}

// Uses the .env token as a login for the discord bot
async function login() {
  await client
    .login(token)
    .then(() => console.log(`Successfully logged in as ${client.user.tag}.`))
    .catch(err => console.log(`Couldn't log in! ${err}`));
  // Set up a thing to retry logging in up to 5 times before waiting for 15mins to 1hr
}

// Called whenever a message is sent
client.on("message", async message => {

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  // Searches through map of 'search commands' to see if someone said a funny word
  function searchForCommand() {
    let didFind = false;

    searchIncludes.forEach((search) => {
      search.includes.forEach((include) => {
        if (message.content.toLowerCase().includes(include)) {
          // Execute message
          search.command.execute(message, args);
          didFind = true;
        }
      })
    });

    return didFind;
  }

  // Async for taking out of a database in the future
  async function getCommand(commandName: string) {
    const promise = await client.commands.get(commandName);
    // console.log(promise);

    return promise;
  }

  /*
  async function getSearchCommand(command) {
    const file = await client.searchCommands.get(command);
    console.log(file);

    return file;
  } */

  // If it starts with a prefix
  if (message.content.toLowerCase().startsWith(prefix)) {
    //console.log("command sent");

    if (!client.commands.has(command)) {
      message.reply(`'${command}' not found.`);
      return;
    }

    try {
      getCommand(command)
        .then((comm) => {
          comm.execute(message, args);
        });
    } catch (error) {
      console.log(error);
      message.reply("There was an error trying to execute this command.");
    }
  } else {
    searchForCommand();
  }

});

// Called on websocket error
client.on('shardError', error => {
  console.error('A websocket connection encountered an error:', error);
});