import * as Discord from 'discord.js';
import { Queue } from './Queue.js';
export declare class MusicPlayer {
    dispatcher: Discord.StreamDispatcher;
    connection: Discord.VoiceConnection;
    channel: Discord.VoiceChannel;
    queue: Queue;
    isPlaying: boolean;
    timeoutTime: number;
    constructor();
    play: (stream: string | any, vc: Discord.VoiceChannel) => Promise<void>;
    stop: () => Promise<void>;
    leaveVoiceChannel: () => Promise<void>;
    destroy: () => void;
    startTimeout: () => void;
}
export default MusicPlayer;
