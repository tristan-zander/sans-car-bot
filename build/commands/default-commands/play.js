module.exports = {
    name: 'play',
    description: 'Play media from YouTube or direct mp3 files',
    execute: async function (message, args) {
        require('./../server').PlayManager.play(message, args);
    }
};
//# sourceMappingURL=play.js.map