import * as Discord from 'discord.js'
import dotenv from 'dotenv'
import * as fs from 'fs'
import PlayManager from './audio-processing/PlayManager'
import {Command, SearchCommand} from './command'

// This might not even be necessary
dotenv.config();

const config = require('./config.json');
const prefix = config.prefix;
const token = process.env.TOKEN;

// Create Discord client
const client = new Discord.Client();
let commands: Discord.Collection<string, Command> = new Discord.Collection();

// Create map of commands from their folders
const commandFiles =
    fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
import(`./commands/${file}`).then(command => {
    commands.set(command.name, command);
    console.log(`Added command of name ${command.name}`);
  });
}

// Map of search commands
let searchCommands: Discord.Collection<string, SearchCommand> =
    new Discord.Collection();
const searchFiles =
    fs.readdirSync('./no-pref-commands').filter((file) => file.endsWith('.js'));

let searchIncludes = [];
for (const file of searchFiles) {
import(`./no-pref-commands/${file}`).then(command => {
    searchCommands.set(command.name, command);

    searchIncludes.push({includes : command.includes, command});

    console.log(`Added search command of name ${command.name}`);
  })
    .catch(err => {
        console.log(`Error setting command. Err: ${err}`)
    })
}

console.log("Finished processing commands.");

setStatus();
login();

// Sets the status of the bot in Discord
function setStatus() {
  client.once("ready", () => {
    console.log("Client is ready!");
    client.user.setPresence(
        {status : "online", activity : {name : 'undertale', type : "PLAYING"}});
  });
}

// Uses the .env token as a login for the discord bot
async function login() {
  await client.login(token)
      .then(() => console.log(`Successfully logged in as ${client.user.tag}.`))
      .catch(err => console.log(`Couldn't log in! ${err}`));
  // Set up a thing to retry logging in up to 5 times before waiting for
  // 15mins to 1hr
}

// Called whenever a message is sent
client.on("message", async message => {
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  // Searches through map of 'search commands' to see if someone said a funny
  // word
  function searchForCommand() {
    let didFind = false;

    searchIncludes.forEach(
        (search) => {search.includes.forEach((include) => {
          if (message.content.toLowerCase().includes(include)) {
            // Execute message
            search.command.execute(message, args);
            didFind = true;
          }
        })});

    return didFind;
  }

  // Async for taking out of a database in the future
  function getCommand(commandName: string) {
    const comm: Command = commands.get(commandName);

    return comm
  }

  /*
  async function getSearchCommand(command) {
    const file = await client.searchCommands.get(command);
    console.log(file);

    return file;
  } */

  // If it starts with a prefix
  if (message.content.toLowerCase().startsWith(prefix)) {
    // console.log("command sent");

    if (!commands.has(command)) {
      message.reply(`'${command}' not found.`);
      return;
    }

    try {
      getCommand(command).execute(message, args)
    } catch (error) {
      console.log(error);
      message.reply("There was an error trying to execute this command.");
    }
  } else {
    try {
      searchForCommand();
    } catch (err) {
      console.error(err);
    }
  }
});

// Called on websocket error
client.on('shardError', error => {
  console.error('A websocket connection encountered an error:', error);
});
