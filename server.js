const env = require('dotenv').config();
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
const ffmpeg = require("ffmpeg-static");

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
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

console.log("Finished processing commands.");

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

client
  .login(process.env.TOKEN)
  .then(() => console.log(`Successfully logged in as ${client.user.tag}.`))
  .catch(err => console.log(`Couldn't log in! ${err}`));
  // Set up a thing to retry logging in up to 5 times before waiting for 15mins to 1hr

client.on("message", async message => {
  if (message.content.startsWith(prefix)) {
    //console.log("command sent");
    // do something

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    //console.log({ args, command });

    if (!client.commands.has(command)) return message.reply(`'${command}' not found.`);

    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.log(error);
      message.reply("There was an error trying to execute this command.");
    }
  }

  // Content that will be sent if it is said anywhere in a message
  if (message.content.toLowerCase().includes("sans car")) {
    const sanscar = new Discord.MessageAttachment(
      "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsanscar.jpg?v=1584324797279"
    );

    message.channel.send(sanscar);
  }

  if (
    message.content.toLowerCase().includes("bring me the girl") ||
    message.content.toLowerCase().includes("kylo ren")
  ) {
    const bringMeTheGirl = new Discord.MessageAttachment(
      "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fbring%20me%20the%20girl.jpg?v=1584327058499"
    );

    message.channel.send(bringMeTheGirl);
  }
});
