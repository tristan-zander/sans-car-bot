
export const ping = {
  name: 'ping',
  description: 'Responds with pong.',
  execute(message, args) {
    message.channel.send('Pong');
  }
}