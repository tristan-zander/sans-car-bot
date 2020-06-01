module.exports = {
    name: 'dc',
    description: 'Disconnects bot from voice channel.',
    execute(message, args) {
        const connection = require('./play').connection;
        
        if (connection) {
            connection.disconnect();
        }
    }
}
