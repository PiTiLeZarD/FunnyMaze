
GameEngine.CONST = {};
GameEngine.Classes = {};

/* default maze behaviours */

/*--- Maze Builder Abstract ---*/
GameEngine.Classes.MazeGenerator = Class.create({
    init: function() {},
    build: function() {}
});
GameEngine.mazeBuilder = new GameEngine.Classes.MazeGenerator();

GameEngine.Classes.MazeSolver = Class.create({
    init: function() {},
    solve: function( cell_from, cell_to ) {}
});
GameEngine.mazeSolver = new GameEngine.Classes.MazeSolver();





var getPlayerView = function( player ) {
    var subdim = new GameEngine.Classes.Dimension(5, 5);
    var start = { 'x': player.x - (subdim.width - 1) / 2, 'y': player.y - (subdim.height - 1) / 2};

    if (start.x < 0) start.x = 0;
    if (start.y < 0) start.y = 0;
    if (start.x + subdim.width > GameEngine.maze.dimension.width) start.x = GameEngine.maze.dimension.width - subdim.width; 
    if (start.y + subdim.height > GameEngine.maze.dimension.height) start.y = GameEngine.maze.dimension.height - subdim.height; 

    var submaze = new GameEngine.Classes.Maze( subdim );
    for (var y = 0; y < subdim.height; y++) {
        for (var x = 0; x < subdim.width; x++) {
            var cell = submaze.getCellAt(x, y);
            var ocell = GameEngine.maze.getCellAt(x + start.x, y + start.y);
            cell.kind = ocell.kind;
            $(ocell.features).each( function(i, feature) {
                cell.addFeature( feature );
            });
        }
    }
    return submaze;
};

GameEngine.init = function( config ) {
    GameEngine.config = $.extend({
        width:20, height:20
    }, config);
    
    GameEngine.ready(function() {
        GameEngine.conFeatures();
        
        GameEngine.maze = new GameEngine.Classes.Maze();
        GameEngine.mazeBuilder.build();
        GameEngine.dispatcher.dispatch();
        
        var players = GameEngine.maze.getCellsByFeature( GameEngine.CONST.CELL_FEATURE_PLAYER );
        GameEngine.disp.drawMaze( getPlayerView( players[0] ));
    });
    
};




GameEngine.oppositeDirection = function( direction ) {
    if (direction == 'up') return 'down';
    if (direction == 'left') return 'right';
    if (direction == 'right') return 'left';
    if (direction == 'down') return 'up';
    return null;
};
