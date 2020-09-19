import * as Discord from 'discord.js';
import dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();
const config = require('./config.json');
const prefix = config.prefix;
const token = process.env.TOKEN;
const client = new Discord.Client();
let commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    import(`./commands/${file}`).then(command => {
        commands.set(command.name, command);
        console.log(`Added command of name ${command.name}`);
    });
}
let searchCommands = new Discord.Collection();
const searchFiles = fs.readdirSync('./no-pref-commands').filter((file) => file.endsWith('.js'));
let searchIncludes = [];
for (const file of searchFiles) {
    import(`./no-pref-commands/${file}`).then(command => {
        searchCommands.set(command.name, command);
        searchIncludes.push({ includes: command.includes, command });
        console.log(`Added search command of name ${command.name}`);
    })
        .catch(err => {
        console.log(`Error setting command. Err: ${err}`);
    });
}
console.log("Finished processing commands.");
setStatus();
login();
function setStatus() {
    client.once("ready", () => {
        console.log("Client is ready!");
        client.user.setPresence({ status: "online", activity: { name: 'undertale', type: "PLAYING" } });
    });
}
async function login() {
    await client.login(token)
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
    function getCommand(commandName) {
        const comm = commands.get(commandName);
        return comm;
    }
    if (message.content.toLowerCase().startsWith(prefix)) {
        if (!commands.has(command)) {
            message.reply(`'${command}' not found.`);
            return;
        }
        try {
            getCommand(command).execute(message, args);
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