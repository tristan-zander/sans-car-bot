"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Discord = require("discord.js");
var dotenv = require("dotenv");
var fs = require("fs");
// This might not even be necessary
dotenv.config();
var config = await Promise.resolve().then(function () { return require('./config.json'); });
var prefix = config.prefix;
var token = process.env.TOKEN;
// Create Discord client
var client = new Discord.Client();
var commands = new Discord.Collection();
// Create map of commands from their folders
var commandFiles = fs.readdirSync("./commands").filter(function (file) { return file.endsWith(".js"); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    Promise.resolve().then(function () { return require("./commands/" + file); }).then(function (command) {
        commands.set(command.name, command);
        console.log("Added command of name " + command.name);
    });
}
// Map of search commands
var searchCommands = new Discord.Collection();
var searchFiles = fs.readdirSync('./no-pref-commands').filter(function (file) { return file.endsWith('.js'); });
var searchIncludes = [];
for (var _a = 0, searchFiles_1 = searchFiles; _a < searchFiles_1.length; _a++) {
    var file = searchFiles_1[_a];
    Promise.resolve().then(function () { return require("./no-pref-commands/" + file); }).then(function (command) {
        searchCommands.set(command.name, command);
        searchIncludes.push({ includes: command.includes, command: command });
        console.log("Added search command of name " + command.name);
    })["catch"](function (err) {
        console.log("Error setting command. Err: " + err);
    });
}
console.log("Finished processing commands.");
setStatus();
login();
// Sets the status of the bot in Discord
function setStatus() {
    client.once("ready", function () {
        console.log("Client is ready!");
        client.user.setPresence({ status: "online", activity: { name: 'undertale', type: "PLAYING" } });
    });
}
// Uses the .env token as a login for the discord bot
function login() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.login(token)
                        .then(function () { return console.log("Successfully logged in as " + client.user.tag + "."); })["catch"](function (err) { return console.log("Couldn't log in! " + err); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Called whenever a message is sent
client.on("message", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    // Searches through map of 'search commands' to see if someone said a funny
    // word
    function searchForCommand() {
        var didFind = false;
        searchIncludes.forEach(function (search) {
            search.includes.forEach(function (include) {
                if (message.content.toLowerCase().includes(include)) {
                    // Execute message
                    search.command.execute(message, args);
                    didFind = true;
                }
            });
        });
        return didFind;
    }
    // Async for taking out of a database in the future
    function getCommand(commandName) {
        var comm = commands.get(commandName);
        return comm;
    }
    var args, command;
    return __generator(this, function (_a) {
        args = message.content.slice(prefix.length).split(" ");
        command = args.shift().toLowerCase();
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
                message.reply("'" + command + "' not found.");
                return [2 /*return*/];
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
        return [2 /*return*/];
    });
}); });
// Called on websocket error
client.on('shardError', function (error) {
    console.error('A websocket connection encountered an error:', error);
});
