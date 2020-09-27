import dotenv from 'dotenv';
import * as fs from 'fs';
import SansClient from './client.js';
dotenv.config();
const config = JSON.parse(fs.readFileSync('./config.json').toString());
const prefix = config.prefix || "sans ";
const token = process.env.TOKEN;
const client = new SansClient(prefix, token);
//# sourceMappingURL=server.js.map