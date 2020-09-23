export function setStatus(client) {
    client.once("ready", () => {
        console.log("Client is ready!");
        client.user.setPresence({ status: "online", activity: { name: 'undertale', type: "PLAYING" } });
    });
}
export async function login(client, token) {
    await client.login(token)
        .then(() => console.log(`Successfully logged in as ${client.user.tag}.`))
        .catch(err => console.log(`Couldn't log in! ${err}`));
}
//# sourceMappingURL=helper-funcs.js.map