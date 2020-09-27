import * as isURL from 'is-url';
import ytdl from 'ytdl-core-discord';
import { MusicPlayer } from './MusicPlayer.js';
export class PlayManager {
    constructor() {
        this.destroyChild = (child) => {
            if (!child) {
                throw 'No child given in PlayManager.destroyChild';
            }
            else {
                if (this.activeMusicPlayers[child.connection.channel.guild.id]) {
                    this.activeMusicPlayers.delete(child.connection.channel.guild.id);
                    console.log('Deleted music player in guild ' +
                        child.connection.channel.guild.id);
                }
                else {
                    console.log('Cannot find music player.');
                }
            }
        };
        this.play = async (message, args) => {
            if (this.activeMusicPlayers.get(message.guild.id)) {
            }
            if (message.member.voice.channel) {
                function getURL() {
                    if (!args[0]) {
                        message.reply('You must provide a url for sans to play anything.');
                        throw 'url not provided in play function';
                    }
                    for (const arg of args) {
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
                let manager = new MusicPlayer(this);
                this.activeMusicPlayers.set(message.guild.id, manager);
                manager.play(await getStream(), message.member.voice.channel)
                    .then(() => console.log('played audio'))
                    .catch(console.error);
            }
            else {
                message.reply('Please join a voice channel before playing audio.');
            }
        };
        this.stop = async (message, args) => {
            const player = this.activeMusicPlayers.get(message.guild.id);
            if (player) {
                player.stop();
            }
            else {
                message.reply(`Sans isn't playing anything.`);
                console.error('No player found to stop.');
            }
        };
        this.dc = async (guildId) => {
            const player = this.activeMusicPlayers.get(guildId);
            if (player) {
                player.leaveVoiceChannel();
            }
            else {
                console.error('No player found to disconnect.');
            }
        };
        this.pause = async (message, args) => {
        };
        this.queue = async (message, args) => {
        };
        this.activeMusicPlayers = new Map();
    }
}
export default MusicPlayer;
//# sourceMappingURL=PlayManager.js.map