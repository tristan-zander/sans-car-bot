"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songManager = void 0;
const PlayManager_1 = require("./audio-processing/PlayManager");
require('dotenv').config();
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
const path = require('path');
const pfx = fs.readFileSync('keys/website.pfx');
const passphrase = process.env.PASSPHRASE;
const credentials = { pfx: pfx, passphrase: passphrase };
const HTTP_PORT = process.env.HTTP_PORT || process.env.FALLBACK_PORT;
const HTTPS_PORT = process.env.HTTPS_PORT || process.env.FALLBACK_PORT + 1;
app.use((req, res, next) => {
    if (req.secure) {
        next();
    }
    else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});
app.use('/api/ping/', require('./routes/api/ping'));
const BUILD_PATH = process.env.BUILD_PATH;
if (!BUILD_PATH)
    console.log("Error getting the build path.");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
http.createServer(app).listen(HTTP_PORT);
https.createServer(credentials, app).listen(HTTPS_PORT);
console.log(`Listening on http port ${HTTP_PORT}, and https port ${HTTPS_PORT}`);
app.use(express.static(BUILD_PATH));
app.get('/*', (req, res) => {
    res.sendFile(path.join(BUILD_PATH, "index.html"));
});
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
setStatus();
login();
exports.songManager = new PlayManager_1.PlayManager;
module.exports.songManager = exports.songManager;
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
        .login(token)
        .then(() => console.log(`Successfully logged in as ${client.user.tag}.`))
        .catch(err => console.log(`Couldn't log in! ${err}`));
}
client.on("message", async (message) => {
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    function searchForCommand() {
        let didFind = false;
        searchIncludes.forEach((search) => {
            search.includes.forEach((include) => {
                if (message.content.toLowerCase().includes(include)) {
                    search.command.execute(message, args);
                    didFind = true;
                }
            });
        });
        return didFind;
    }
    async function getCommand(commandName) {
        const promise = await client.commands.get(commandName);
        return promise;
    }
    if (message.content.toLowerCase().startsWith(prefix)) {
        if (!client.commands.has(command)) {
            message.reply(`'${command}' not found.`);
            return;
        }
        try {
            getCommand(command)
                .then((comm) => {
                comm.execute(message, args);
            });
        }
        catch (error) {
            console.log(error);
            message.reply("There was an error trying to execute this command.");
        }
    }
    else {
        try {
            searchForCommand();
        }
        catch (err) {
            console.error(err);
        }
    }
});
client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});
//# sourceMappingURL=server.js.map