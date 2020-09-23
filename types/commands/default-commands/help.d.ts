import { Command, SansMessage } from '../command.js';
export declare class Help implements Command {
    name: string;
    description: string;
    execute(message: SansMessage): void;
}
export default Help;
