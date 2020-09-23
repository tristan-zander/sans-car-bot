import * as Discord from 'discord.js'
import dotenv from 'dotenv'
import * as fs from 'fs'

import {PlayManager} from './audio-processing/PlayManager.js'
import SansClient from './client.js'
// import {Command, SearchCommand} from './commands/command.js'

// TODO This might not even be necessary
dotenv.config();

// TODO straight up import the JSON file to save cpu
const config = JSON.parse(fs.readFileSync('./config.json').toString())
const prefix = config.prefix;
const token = process.env.TOKEN;

// Create Discord client
const client = new SansClient(prefix, token);
await client.setStatus("undertale").catch(console.error);
await client.login().catch(console.error)

export const songManager = new PlayManager();
