import { SansDependencies as Deps } from '../command.js';
export class Disconnect {
    constructor() {
        this.name = 'dc';
        this.description = 'Disconnects the bot from the voice channel.';
        this.dependecies = [Deps.Music];
    }
    addDeps(dependecy) { this.music = dependecy; }
    execute(message) {
    }
}
export default Disconnect;
//# sourceMappingURL=dc.js.map