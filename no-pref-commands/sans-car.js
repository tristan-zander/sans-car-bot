const Discord = require('discord.js');

module.exports = {
  name: 'sans car',
  description: 'does the funny thing!',
  includes: ['sans car'],
  execute(message, args) {
    // Reply to message with sans car
    const sanscar = new Discord.MessageAttachment(
      "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsanscar.jpg?v=1584324797279"
    );

    message.channel.send(sanscar);
  }
}