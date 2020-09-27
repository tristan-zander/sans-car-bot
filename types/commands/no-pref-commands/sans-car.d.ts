import { SansMessage, SearchCommand } from "../command.js";
export declare class SansCarNoPrefix implements SearchCommand {
    name: string;
    description: string;
    includes: string[];
    execute(message: SansMessage): Promise<void>;
}
export default SansCarNoPrefix;
