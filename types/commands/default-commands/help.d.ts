import { Command, SansDependencies, SansDependencyReference, SansMessage } from '../command.js';
export declare enum CommandType {
    Standard = 0,
    NoPrefix = 1
}
export declare class CommandDescription {
    name: string;
    description: string;
    commandType: CommandType;
    constructor(name: string, desc: string, commType: CommandType);
}
export declare class Help implements Command {
    name: string;
    description: string;
    dependecies: SansDependencies[];
    private commandDescriptions;
    addDeps(dep: SansDependencyReference): void;
    constructor();
    execute(message: SansMessage): Promise<void>;
}
export default Help;
