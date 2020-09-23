module.exports = {
    name: 'stop',
    description: 'Stops audio',
    execute(message, args) {
        require('./../server').songManager.stop(message, args);
    }
};
//# sourceMappingURL=stop.js.map