import { Command, SansMessage } from "../command.js";
export declare class SansCar implements Command {
    name: string;
    description: string;
    hide: boolean;
    constructor();
    execute(message: SansMessage): void;
}
export default SansCar;
