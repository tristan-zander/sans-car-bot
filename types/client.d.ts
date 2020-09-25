export declare class SansClient {
    private _client;
    private _prefix;
    private _loginToken;
    private _commands;
    private _searchCommands;
    private _musicManager;
    constructor(prefix: string, token: string);
    setStatus(name: string): void;
    login(): void;
    private generateCommands;
    private handleReady;
    private handleMessage;
    private handleShardError;
}
export default SansClient;
