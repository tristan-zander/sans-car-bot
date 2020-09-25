import * as Discord from 'discord.js'
import * as fs from 'fs'

import {Command, SansMessage} from '../command.js'

export class Help implements Command {
  name = 'help';
  description = 'Shows a list of commands.';

  constructor() {}

  execute(message: SansMessage) {
    // args 0 is always the command name
    const commandFiles =
        fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
    const noPrefixCommandFiles = fs.readdirSync("./no-pref-commands")
                                     .filter(file => file.endsWith(".js"));

    // Prefix command formatting
    const prefFields =
        commandFiles
            .map(file => {
              const command = require(`../commands/${file}`);
              if (command.name === undefined ||
                  command.description === undefined)
                return {name : "", value : ""};
              if (command.hide === true) {
                return {name : "", value : ""};
              }
              return {
                name : command.name,
                value : "`" + command.description + "`"
              };
            })
            .filter(field => {
              if (field.name === "null" || field.value === "null") {
                return false;
              } else {
                return true;
              }
            });

    // No prefix command formatting
    const noPrefFields = noPrefixCommandFiles
                             .map(file => {
                               const command =
                                   require(`../no-pref-commands/${file}`);
                               if (command.name === undefined ||
                                   command.description === undefined)
                                 return {name : "", value : ""};
                               return {
                                 name : command.name,
                                 value : "`" + command.description + "`",
                               };
                             })
                             .filter(field => {
                               if (field.name === "" && field.value === "") {
                                 return false;
                               } else {
                                 return true;
                               }
                             });

    const fields = {prefFields, noPrefFields};

    // console.log({ fields, prefFields, noPrefFields });

    const reply =
        new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Commands List")
            .setURL("https://sanscar.net")
            .setAuthor(
                "Sans Bot",
                "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsans-car-square.jpg?v=1589380617092",
                "https://sanscar.net")
            //.setDescription(`Here's a list of all commands.`)
            .addFields(
                /*{ name: 'Regular field title', value: 'Some value here' },
                                { name: 'Inline field title', value: 'Some value
                   here', inline: true }, { name: 'Inline field title', value:
                   'Some value here', inline: true },*/
                {name : 'Prefix Commands', value : 'Use "**sans** *command*"'},
                // fields.prefFields
                {name : "\u200B", value : "\u200B"}, {
                  name : 'No Prefix Commands',
                  value :
                      'Called whenever the specified phrases are at any point in a message'
                } /* ,fields.noPrefFields */)
            //.addField('Inline field title', 'Some value here', true)
            .setTimestamp()
            .setFooter(
                "Sans car",
                "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsans-car-square.jpg?v=1589380617092");

    message.discord.channel.send(reply);
  }
}

export default Help;
