const Discord = require('discord.js');

module.exports = {
    name: 'kylo ren',
    description: 'bring me the girl',
    includes: ['bring me the girl', 'kylo ren'],
    execute: (message, args) => {
        const bringMeTheGirl = new Discord.MessageAttachment(
            "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fbring%20me%20the%20girl.jpg?v=1584327058499"
        );

        message.channel.send(bringMeTheGirl);
    }
}