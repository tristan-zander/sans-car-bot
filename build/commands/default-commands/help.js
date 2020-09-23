import * as Discord from 'discord.js';
import * as fs from 'fs';
export class Help {
    constructor() {
        this.name = 'help';
        this.description = 'Shows a list of commands.';
    }
    execute(message) {
        const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
        const noPrefixCommandFiles = fs.readdirSync("./no-pref-commands")
            .filter(file => file.endsWith(".js"));
        const prefFields = commandFiles
            .map(file => {
            const command = require(`../commands/${file}`);
            if (command.name === undefined ||
                command.description === undefined)
                return { name: "", value: "" };
            if (command.hide === true) {
                return { name: "", value: "" };
            }
            return {
                name: command.name,
                value: "`" + command.description + "`"
            };
        })
            .filter(field => {
            if (field.name === "null" || field.value === "null") {
                return false;
            }
            else {
                return true;
            }
        });
        const noPrefFields = noPrefixCommandFiles
            .map(file => {
            const command = require(`../no-pref-commands/${file}`);
            if (command.name === undefined ||
                command.description === undefined)
                return { name: "", value: "" };
            return {
                name: command.name,
                value: "`" + command.description + "`",
            };
        })
            .filter(field => {
            if (field.name === "" && field.value === "") {
                return false;
            }
            else {
                return true;
            }
        });
        const fields = { prefFields, noPrefFields };
        const reply = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Commands List")
            .setURL("https://sanscar.net")
            .setAuthor("Sans Bot", "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsans-car-square.jpg?v=1589380617092", "https://sanscar.net")
            .addFields({ name: 'Prefix Commands', value: 'Use "**sans** *command*"' }, { name: "\u200B", value: "\u200B" }, {
            name: 'No Prefix Commands',
            value: 'Called whenever the specified phrases are at any point in a message'
        })
            .setTimestamp()
            .setFooter("Sans car", "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsans-car-square.jpg?v=1589380617092");
        message.discord.channel.send(reply);
    }
}
export default Help;
//# sourceMappingURL=help.js.map