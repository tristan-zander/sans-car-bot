module.exports = {
    name: 'car',
    description: 'THE FUNNY THING LOLOL but only when you type it at the beginning of a sentence. (Daily )',
    execute(message, args) {
        const sanscar = new Discord.MessageAttachment(
            "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsanscar.jpg?v=1584324797279"
        );

        message.channel.send(sanscar);
    }
}