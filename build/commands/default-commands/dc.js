import { SansDependencies as Deps } from '../command.js';
export class Disconnect {
    constructor(music) {
        this.name = 'dc';
        this.description = 'Disconnects the bot from the voice channel.';
        this.dependecies = [Deps.Music];
        this.music = music;
    }
    execute(message) {
    }
}
export default Disconnect;
//# sourceMappingURL=dc.js.map