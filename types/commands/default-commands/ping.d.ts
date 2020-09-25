import { Command, SansMessage } from '../command.js';
export declare class Ping implements Command {
    name: string;
    description: string;
    constructor();
    execute(message: SansMessage): void;
}
export default Ping;
