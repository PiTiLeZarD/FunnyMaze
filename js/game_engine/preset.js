

var GameEngine = {};

GameEngine.loaded = false;
GameEngine.readycallbacks = [];
GameEngine.files = [];

GameEngine.ready = function(cb) {
    if (!GameEngine.loaded) {
        GameEngine.readycallbacks.push(cb);
    } else {
        cb();
    }
};
