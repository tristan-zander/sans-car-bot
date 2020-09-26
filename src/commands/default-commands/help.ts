import * as Discord from 'discord.js'
import * as fs from 'fs'
import * as path from 'path'

import {
  Command,
  SansDependencies,
  SansDependencyReference,
  SansMessage,
  SearchCommand
} from '../command.js'

export enum CommandType {
  Standard = 0,
  NoPrefix = 1
}

export class CommandDescription {
  name: string;
  description: string;
  commandType: CommandType;

  constructor(name: string, desc: string, commType: CommandType) {
    this.name = name;
    this.description = desc;
    this.commandType = commType;
  }
}

export class Help implements Command {
  name = 'help';
  description = 'Shows a list of commands.';
  dependecies = [ SansDependencies.CommandDescriptions ];
  private commandDescriptions: Map<string, CommandDescription>;
  addDeps(dep: SansDependencyReference): void {
    if (dep instanceof Map) {
      this.commandDescriptions = dep;
    } else {
      console.error(`${this.name} was given the wrong dependency.`);
    }
  }

  constructor() {}

  // TODO change this to be dependency injected with a list of command names so
  // we only have to instantiate classes once
  async execute(message: SansMessage): Promise<void> {
    if (!this.commandDescriptions) {
      throw `${this.name} was not given CommandDescriptions`;
    }

    let prefFields: {name: string, value: string}[] = new Array();
    let noPrefFields: {name: string, value: string, inline: boolean}[] =
        new Array();

    this.commandDescriptions.forEach(desc => {
      if (desc.commandType === CommandType.Standard) {
        prefFields.push(
            {name : `\`${desc.name}\``, value : `\`${desc.description}\``});
      } else {
        noPrefFields.push({
          name : `\`${desc.name}\``,
          value : `\`${desc.description}\``,
          inline : true
        });
      }
    });

    /*
  const commandDir = path.resolve("build/commands/");

  const commandFiles =
      fs.readdirSync(path.join(commandDir, 'default-commands/'))
          .filter(file => file.endsWith(".js"));
  const noPrefixCommandFiles =
      fs.readdirSync(path.join(commandDir, 'no-pref-commands/'))
          .filter(file => file.endsWith(".js"));

  // Prefix command formatting
  const prefFields = commandFiles.map(async file => {
    const filePath = path.join(commandDir, 'default-commands/', file);
    const {default : CommandClass}: {default: any|Command} =
        await import(filePath).catch(err => {throw err});
    if (CommandClass.name && CommandClass.description) {
      return {
        name: `\`${CommandClass.name}\``,
            value: `\`${CommandClass.description}\``
      }
    } else {
      console.error(
          `Help.js; ${file} does not have fields for Help command.\nName: ${
              CommandClass.name}, Description: ${CommandClass.description}`);
      return {name : '', value : ''};
    }
  });

  // No prefix command formatting
  const noPrefFields = noPrefixCommandFiles.map(async file => {
    const filePath = path.join(commandDir, 'no-pref-commands/', file);
    const {default : CommandClass}: {default: any|SearchCommand} =
        await import(filePath).catch(err => {throw err});
    if (CommandClass.name && CommandClass.description) {
      return {
        name: `\`${CommandClass.name}\``,
            value: `\`${CommandClass.description}\``
      }
    } else {
      console.error(
          `Help.js; ${file} does not have fields for Help command.\nName: ${
              CommandClass.name}, Description ${CommandClass.description}`);
      return {name : '', value : ''};
    }
  });

  const fields = {
    prefFields : await Promise.all(prefFields).catch(err => {throw err}),
    noPrefFields : await Promise.all(noPrefFields).catch(err => {throw err})
  }

  */

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
            .setDescription(`Here's a list of available commands.`)
            .addField('Prefix Commands', 'Use "**sans** *command*"')
            .addField("\u200B", "\u200B");
    prefFields.forEach(field => {reply.addField(field.name, field.value)});
    reply.addField("\u200B", "\u200B")
        .addField(
            'No Prefix Commands',
            'Called whenever the specified phrases are at any point in a message');
    noPrefFields.forEach(
        field => { reply.addField(field.name, field.value, true); });
    reply.setTimestamp().setFooter(
        "Sans car",
        "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsans-car-square.jpg?v=1589380617092");

    message.discord.channel.send(reply);
  }
}

export default Help;
