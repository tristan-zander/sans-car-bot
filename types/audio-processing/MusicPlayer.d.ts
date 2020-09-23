import * as Discord from 'discord.js';
import { Queue } from './Queue.js';
export declare class MusicPlayer {
    parent: any;
    dispatcher: any;
    connection: any;
    channel: Discord.VoiceChannel;
    queue: Queue;
    isPlaying: boolean;
    timeoutTime: number;
    constructor(parent: any);
    play: (stream: any, vc: any) => Promise<void>;
    stop: () => Promise<void>;
    leaveVoiceChannel: () => Promise<void>;
    destroy: () => void;
    startTimeout: () => void;
}
export default MusicPlayer;
