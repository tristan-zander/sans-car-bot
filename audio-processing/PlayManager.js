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
exports.PlayManager = void 0;
var MusicPlayer_1 = require("./MusicPlayer");
// Manages all functions related to playing audio through vcs in a guild
// Put a single instance of this as an export in server.js
// Call this class and then send a message after the promise is resolved
var Discord = require('discord.js');
var ytdl = require('ytdl-core-discord');
var isURL = require('is-url');
var fs = require('fs');
var PlayManager = /** @class */ (function () {
    function PlayManager() {
        var _this = this;
        this.destroyChild = function (child) {
            // Destroy an instance of a music player and remove it from
            // this.activeMusicPlayers
            if (!child) {
                throw 'No child given in PlayManager.destroyChild';
            }
            else {
                if (_this.activeMusicPlayers[child.connection.channel.guild.id]) {
                    delete _this.activeMusicPlayers[child.connection.channel.guild.id];
                    console.log('Deleted music player in guild ' +
                        child.connection.channel.guild.id);
                }
                else {
                    console.log('Cannot find music player.');
                }
            }
        };
        this.play = function (message, args) { return __awaiter(_this, void 0, void 0, function () {
            // TODO set constants for info and the thumbnail for sending info back to
            // the user
            // TODO make a file that serves as a single instance that manages the
            // guild's audio controls (queue and controls)
            // Check the args and check whether it is from youtube, soundcloud, or is
            // a direct soundfile link
            function getURL() {
                // const httpRemover = /(^http:\/\/|^https:\/\/)w{1,3}./g;
                if (!args[0]) {
                    message.reply('You must provide a url for sans to play anything.');
                    throw 'url not provided in play function';
                }
                for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                    var arg = args_1[_i];
                    if (isURL(arg)) {
                        // The argument is a url
                        return arg.trim();
                    }
                }
                // TODO Search for the relavent video on youtube
            }
            function getStream() {
                return __awaiter(this, void 0, void 0, function () {
                    var url, str;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                url = getURL();
                                if (!url.includes('youtu')) return [3 /*break*/, 2];
                                return [4 /*yield*/, ytdl(url).then(function (stream) { return stream; })];
                            case 1:
                                str = _a.sent();
                                return [2 /*return*/, str];
                            case 2: return [2 /*return*/, url];
                        }
                    });
                });
            }
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // Start playing song
                        // Call queue if there is already a song being played
                        if (this.activeMusicPlayers[message.guild.id]) {
                            // message.reply('Sans is already playing music in your server.');
                        }
                        if (!message.member.voice.channel) return [3 /*break*/, 2];
                        // YTDL stream needs to get destroyed before leaving
                        // if (dispatcher)
                        // module.exports.dispatcher = dispatcher;
                        this.activeMusicPlayers[message.guild.id] = new MusicPlayer_1.MusicPlayer(this);
                        _b = (_a = this.activeMusicPlayers[message.guild.id])
                            .play;
                        return [4 /*yield*/, getStream()];
                    case 1:
                        _b.apply(_a, [_c.sent(), message.member.voice.channel])
                            .then(function () { return console.log('played audio'); })["catch"](function (err) { return console.error(err); });
                        return [3 /*break*/, 3];
                    case 2:
                        message.reply('Please join a voice channel before playing audio.');
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.stop = function (message, args) { return __awaiter(_this, void 0, void 0, function () {
            var player;
            return __generator(this, function (_a) {
                player = this.activeMusicPlayers[message.guild.id];
                if (player) {
                    player.stop();
                }
                else {
                    message.reply("Sans isn't playing anything.");
                    console.error('No player found to stop.');
                }
                return [2 /*return*/];
            });
        }); };
        this.dc = function (message, args) { return __awaiter(_this, void 0, void 0, function () {
            var player;
            return __generator(this, function (_a) {
                player = this.activeMusicPlayers[message.guild.id];
                if (player) {
                    player.leaveVoiceChannel();
                }
                else {
                    console.error('No player found to disconnect.');
                }
                return [2 /*return*/];
            });
        }); };
        this.pause = function (message, args) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        this.queue = function (message, args) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        this.activeMusicPlayers = {};
    }
    return PlayManager;
}());
exports.PlayManager = PlayManager;
exports["default"] = MusicPlayer_1.MusicPlayer;
