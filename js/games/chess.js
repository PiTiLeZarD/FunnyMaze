
GameEngine.files = [
    'game_engine.js',
    'cell.js',
    'cell_feature.js',
    'cell_features/darken.js',
    'feature_dispatcher.js',
    'dimension.js',
    'maze.js',
    'events.js',
    'display.js',

    'mazebuilders/board.js'
];

GameEngine.ready( function() {
    GameEngine.init({
        'canvas_id': 'map',
        'width': 8,
        'height': 8,
        'features': {
            'player': {
                'count': 0
            }
        }
    });
});
