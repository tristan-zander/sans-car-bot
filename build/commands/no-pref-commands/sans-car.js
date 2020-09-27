import * as Discord from 'discord.js';
export class SansCarNoPrefix {
    constructor() {
        this.name = 'sans car';
        this.description = 'does the funny thing!';
        this.includes = ['sans car'];
    }
    async execute(message) {
        const sanscar = new Discord.MessageAttachment("https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsanscar.jpg?v=1584324797279");
        message.discord.channel.send(sanscar);
    }
}
export default SansCarNoPrefix;
//# sourceMappingURL=sans-car.js.map