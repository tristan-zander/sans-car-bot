module.exports = {
    name: 'dc',
    description: 'Disconnects bot from voice channel.',
    execute(message, args) {
        require('./../server').songManager.dc(message, args);
    }
}
