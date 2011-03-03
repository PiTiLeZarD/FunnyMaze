
GameEngine.files = [
    'game_engine.js',
    'cell.js',
    'cell_feature.js',
    'cell_features/player.js',
    'cell_features/exit.js',
    'feature_dispatcher.js',
    'dimension.js',
    'maze.js',
    'events.js',
    'display.js',

    'solvers/deepfirst_field.js',
    'mazebuilders/recursive_backtracker.js'
];

GameEngine.ready( function() {
    GameEngine.init({
        'canvas_id': 'map',
        'width': 25,
        'height': 25,
        'features': {
            'player': {
                'count': 1
            }
        }
    });
});
