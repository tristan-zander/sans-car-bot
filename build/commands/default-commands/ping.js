export class Ping {
    constructor() {
        this.name = 'ping';
        this.description = 'Responds with pong.';
    }
    async execute(message) { message.discord.channel.send('Pong'); }
}
export default Ping;
//# sourceMappingURL=ping.js.map