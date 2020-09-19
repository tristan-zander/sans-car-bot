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
exports.MusicPlayer = void 0;
var Queue_1 = require("./Queue");
var MusicPlayer = /** @class */ (function () {
    function MusicPlayer(parent) {
        var _this = this;
        this.play = function (stream, vc) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, vc.join().then(function (conn) { return conn; })["catch"](function (err) {
                                // message.reply('There was an error connecting to the voice channel.');
                                console.log(err);
                                throw 'There was an error connecting to the voice channel.';
                            })];
                    case 1:
                        _a.connection = _b.sent();
                        this.dispatcher = this.connection.play(stream, { type: 'opus' });
                        this.dispatcher.on('start', function () {
                            console.log('The song is now playing!');
                            _this.isPlaying = true;
                        });
                        this.dispatcher.on('finish', function () {
                            // Clean up dispatcher and disconnect
                            _this.isPlaying = false;
                            _this.startTimeout();
                        });
                        // handle errors appropriately
                        this.dispatcher.on('error', function (err) {
                            console.error(err);
                            _this.destroy();
                        });
                        this.dispatcher.on('debug', console.debug);
                        this.dispatcher.on('warn', console.warn);
                        this.dispatcher.on('failed', function (err) {
                            console.log(err);
                            _this.leaveVoiceChannel().then(function () {
                                throw 'The music player has failed for some reason. Contact the developer if this continues to happen.';
                            });
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.stop = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.dispatcher) {
                    this.dispatcher.destroy();
                }
                // empty queue
                this.queue.empty();
                this.startTimeout();
                return [2 /*return*/];
            });
        }); };
        this.leaveVoiceChannel = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.dispatcher) {
                    this.dispatcher.destroy();
                }
                if (this.connection) {
                    this.connection.disconnect();
                }
                if (!this.connection) {
                    throw 'Sans is not in a voice channel';
                }
                this.destroy();
                return [2 /*return*/];
            });
        }); };
        this.destroy = function () {
            _this.isPlaying = false;
            if (_this.connection) {
                _this.connection.disconnect();
            }
            _this.parent.destroyChild(_this);
        };
        this.startTimeout = function () {
            setTimeout(function () {
                if (!_this.isPlaying) {
                    _this.destroy();
                }
            }, _this.timeoutTime);
        };
        this.queue = new Queue_1.Queue();
        this.isPlaying = false;
        this.parent = parent;
        this.timeoutTime = 10 * 60 * 1000;
    }
    return MusicPlayer;
}());
exports.MusicPlayer = MusicPlayer;
exports["default"] = MusicPlayer;
