if (typeof(randint) == 'undefined') {
    var randint = function( max ) {
        return Math.floor(Math.random() * max);
    };
}

var GameEngine = {};

GameEngine.setup = {
    files: [
        'game_engine.js',
        'cell.js',
        'cell_feature.js',
        'cell_features/player.js',
        'cell_features/exit.js',
        'cell_features/box.js',
        'cell_features/star.js',
        'feature_dispatcher.js',
        'dimension.js',
        'maze.js',
        'events.js',
        'display.js',

        'solvers/deepfirst_field.js',
        'mazebuilders/recursive_backtracker.js'
    ],
    fileiterator: 0,
    basepath: '',
    
    finished: false,
    readycallbacks: [],
    
    loadNextFile: function() {
        $.getScript(GameEngine.setup.basepath + GameEngine.setup.files[GameEngine.setup.fileiterator] + '?r=' + randint(10000000000), function() {
            GameEngine.setup.fileiterator += 1;
            if (GameEngine.setup.fileiterator < GameEngine.setup.files.length) {
                GameEngine.setup.loadNextFile();
            } else {
                GameEngine.setup.finishedLoading();
            }
        });
    },
    
    finishedLoading: function() {
        GameEngine.setup.finished = true;
        $(GameEngine.setup.readycallbacks).each(function(i, cb) {
            cb();
        });
        GameEngine.setup.readycallbacks = [];
    }
    
};

GameEngine.ready = function(cb) {
    if (!GameEngine.setup.finished) {
        GameEngine.setup.readycallbacks.push(cb);
    } else {
        cb();
    }
};


/* determine basepath and launch load sequence */
GameEngine.tests = false;
$('head script').each(function(id, script) {
    var src = $(script).attr('src');
    if (/qunit.js$/.test(src)) {
        GameEngine.tests = true;
    }
    if (/setup.js$/.test(src)) {
        GameEngine.setup.basepath = src.replace('setup.js', '');
    }
});

if (!GameEngine.tests) GameEngine.setup.loadNextFile();
