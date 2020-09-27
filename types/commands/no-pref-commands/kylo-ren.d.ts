import { SansMessage, SearchCommand } from '../command.js';
export declare class KyloRen implements SearchCommand {
    name: string;
    description: string;
    includes: string[];
    execute(message: SansMessage): Promise<void>;
}
export default KyloRen;
