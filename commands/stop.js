
module.exports = {
    name: 'stop',
    description: 'Stops audio',
    execute(message, args) {
        const dispatcher = require('./play').dispatcher;

        if (dispatcher) {
            dispatcher.destroy();
        }
    }
}
