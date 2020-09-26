import isURL from 'is-url';
import ytdl from 'ytdl-core-discord';
import { MusicPlayer as SansMusic } from "../../audio-processing/MusicPlayer.js";
import { SansDependencies } from "../command.js";
export class Play {
    constructor() {
        this.name = 'play';
        this.description = 'Play media from YouTube or direct mp3 files';
        this.dependecies = [SansDependencies.Music];
    }
    async execute(message) {
        if (!this.musicPlayer) {
            throw `Music Player has not been instantiated in command ${this.name}`;
        }
        else {
            if (this.musicPlayer.get(message.discord.guild.id)) {
            }
            if (message.discord.member.voice.channel) {
                function getURL() {
                    if (!message.args[0]) {
                        message.discord.reply('You must provide a url for sans to play anything.');
                        throw `url not provided in ${this.name} command.`;
                    }
                    for (const arg of message.args) {
                        if (isURL(arg)) {
                            return arg.trim();
                        }
                    }
                }
                async function getStream() {
                    const url = getURL();
                    if (url.includes('youtu')) {
                        const str = await ytdl(url);
                        return str;
                    }
                    else {
                        return url;
                    }
                }
                let manager = new SansMusic();
                this.musicPlayer.set(message.discord.guild.id, manager);
                manager.play(await getStream(), message.discord.member.voice.channel)
                    .then(() => console.log('played audio'))
                    .catch(err => {
                    console.error(err);
                    manager.destroy();
                    message.discord.reply("The bot encountered an error when trying to play the media. Contact the developer if this happens consistently.");
                });
            }
            else {
                message.discord.reply('Please join a voice channel before playing audio.');
            }
        }
    }
    addDeps(dep) {
        if (dep instanceof Map) {
            this.musicPlayer = dep;
        }
        else {
            throw `${this.name} was given the wrong dependecy.`;
        }
    }
}
export default Play;
//# sourceMappingURL=play.js.map