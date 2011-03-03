
if (typeof(randint) == 'undefined') {
    var randint = function( max ) {
        return Math.floor(Math.random() * max);
    };
}

GameEngine.setup = {
    fileiterator: 0,
    basepath: '',

    loadNextFile: function() {
        $.getScript(GameEngine.setup.basepath + GameEngine.files[GameEngine.setup.fileiterator] + '?r=' + randint(10000000000), function() {
            GameEngine.setup.fileiterator += 1;
            if (GameEngine.setup.fileiterator < GameEngine.files.length) {
                GameEngine.setup.loadNextFile();
            } else {
                GameEngine.setup.finishedLoading();
            }
        });
    },

    finishedLoading: function() {
        GameEngine.loaded = true;
        $(GameEngine.readycallbacks).each(function(i, cb) {
            cb();
        });
        GameEngine.readycallbacks = [];
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

