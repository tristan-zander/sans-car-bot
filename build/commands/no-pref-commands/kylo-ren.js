import * as Discord from 'discord.js';
import * as path from 'path';
export class KyloRen {
    constructor() {
        this.name = 'kylo ren';
        this.description = 'bring me the girl';
        this.includes = ['bring me the girl', 'kylo ren'];
    }
    async execute(message) {
        const bringMeTheGirl = new Discord.MessageAttachment(path.resolve('res/bring-me-the-girl.png'));
        message.discord.channel.send(bringMeTheGirl);
    }
}
export default KyloRen;
//# sourceMappingURL=kylo-ren.js.map