import * as Discord from 'discord.js';
import { SansDependencies } from '../command.js';
export var CommandType;
(function (CommandType) {
    CommandType[CommandType["Standard"] = 0] = "Standard";
    CommandType[CommandType["NoPrefix"] = 1] = "NoPrefix";
})(CommandType || (CommandType = {}));
export class CommandDescription {
    constructor(name, desc, commType) {
        this.name = name;
        this.description = desc;
        this.commandType = commType;
    }
}
export class Help {
    constructor() {
        this.name = 'help';
        this.description = 'Shows a list of commands.';
        this.dependecies = [SansDependencies.CommandDescriptions];
    }
    addDeps(dep) {
        if (dep instanceof Map) {
            this.commandDescriptions = dep;
        }
        else {
            console.error(`${this.name} was given the wrong dependency.`);
        }
    }
    async execute(message) {
        if (!this.commandDescriptions) {
            throw `${this.name} was not given CommandDescriptions`;
        }
        let prefFields = new Array();
        let noPrefFields = new Array();
        this.commandDescriptions.forEach(desc => {
            if (desc.commandType === CommandType.Standard) {
                prefFields.push({ name: `\*${desc.name}\*`, value: `\`${desc.description}\`` });
            }
            else {
                noPrefFields.push({
                    name: `\*${desc.name}\*`,
                    value: `\`${desc.description}\``,
                    inline: true
                });
            }
        });
        const reply = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Commands List")
            .setURL("https://sanscar.net")
            .setAuthor("Sans Bot", "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsans-car-square.jpg?v=1589380617092", "https://sanscar.net")
            .setDescription(`Use \'*sans* **command**\' with any of the following.`);
        prefFields.forEach(field => { reply.addField(field.name, field.value); });
        reply.addField("\u200B", "\u200B")
            .addField('No Prefix Commands', 'Called whenever the specified phrases are at any point in a message');
        noPrefFields.forEach(field => { reply.addField(field.name, field.value, true); });
        reply.setTimestamp().setFooter("Sans car", "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsans-car-square.jpg?v=1589380617092");
        message.discord.channel.send(reply);
    }
}
export default Help;
//# sourceMappingURL=help.js.map