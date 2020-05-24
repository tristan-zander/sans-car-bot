const env = require('dotenv').config();
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();


/*

BEGIN EXPRESS ROUTING

*/

// Enable Ping api
app.use('/api/ping/', require('./routes/api/ping'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Started listening on port ${PORT}`) );

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/api/ping`);
}, 280000);





/* 

BEGIN DISCORD BOT

*/
const Discord = require("discord.js");
const ffmpeg = require("ffmpeg-static");
const { prefix } = require("./config.json");
const token = process.env.TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();

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
console.log(client.searchCommands, client.commands, searchIncludes);

setStatus();
login();

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

async function login() {
  await client
    .login(process.env.TOKEN)
    .then(() => console.log(`Successfully logged in as ${client.user.tag}.`))
    .catch(err => console.log(`Couldn't log in! ${err}`));
  // Set up a thing to retry logging in up to 5 times before waiting for 15mins to 1hr
}

client.on("message", async message => {

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  function searchForCommand() {
    let didFind = false;

    searchIncludes.forEach((search) => {
      search.includes.forEach((include) => {
        if (message.content.includes(include)) {
          // Execute message
          search.command.execute(message, args);
          didFind = true;
        }
      })
    });

    return didFind;
  }

  // Async for taking out of a database in the future
  async function getCommand(commandName) {
    const promise = await client.commands.get(commandName);
    console.log(promise);

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