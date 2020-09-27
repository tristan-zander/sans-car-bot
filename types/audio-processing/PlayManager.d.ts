import * as Discord from 'discord.js';
import { MusicPlayer } from './MusicPlayer.js';
export declare class PlayManager {
    activeMusicPlayers: Map<string, MusicPlayer>;
    constructor();
    destroyChild: (child: any) => void;
    play: (message: Discord.Message, args: Array<string>) => Promise<void>;
    stop: (message: Discord.Message, args: Array<string>) => Promise<void>;
    dc: (guildId: string) => Promise<void>;
    pause: (message: Discord.Message, args: Array<string>) => Promise<void>;
    queue: (message: Discord.Message, args: Array<string>) => Promise<void>;
}
export default MusicPlayer;
