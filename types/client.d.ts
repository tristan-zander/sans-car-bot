export declare class SansClient {
    private _client;
    private _prefix;
    private _loginToken;
    private _commands;
    private _searchCommands;
    private _musicManager;
    constructor(prefix: string, token: string);
    setStatus(name: string): Promise<void>;
    login(): Promise<void>;
    private generateCommands;
    private handleMessage;
    private handleShardError;
}
export default SansClient;
