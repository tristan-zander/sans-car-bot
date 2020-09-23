import dotenv from 'dotenv';
import * as fs from 'fs';
import { PlayManager } from './audio-processing/PlayManager.js';
import SansClient from './client.js';
dotenv.config();
const config = JSON.parse(fs.readFileSync('./config.json').toString());
const prefix = config.prefix;
const token = process.env.TOKEN;
const client = new SansClient(prefix, token);
await client.setStatus("undertale").catch(console.error);
await client.login().catch(console.error);
export const songManager = new PlayManager();
//# sourceMappingURL=server.js.map