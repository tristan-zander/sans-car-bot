import * as Discord from 'discord.js';
import * as path from 'path';
export class SansCar {
    constructor() {
        this.name = 'car';
        this.description = 'THE FUNNY THING LOLOL but only when you type it at the beginning of a sentence. (Daily count of sans car calls soon)';
        this.hide = true;
    }
    async execute(message) {
        const sanscar = new Discord.MessageAttachment(path.resolve("res/sans-car.jpg"));
        message.discord.channel.send(sanscar);
    }
}
export default SansCar;
//# sourceMappingURL=sans-car.js.map