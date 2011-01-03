

GameEngine.Classes.RecursiveBacktracker = Class.create(GameEngine.Classes.MazeGenerator.prototype, {

    init: function() {
        this.sup();
    },

    build: function() {
        this.browse( GameEngine.maze.randomCellByFeature( null ), new Array() );
    },
    
    browse: function( cur_pos, stack ) {

        cur_pos.visited = true;
        cur_pos.kind = GameEngine.CONST.CELL_FIELD;
        
        var available = GameEngine.maze.availableDirectionFrom( cur_pos, true );

        if (available.length > 0) {
            var next_id = randint(available.length);
            var next = available[next_id];
            $(available).each(function(id, av) {
                if ((id != next_id) && (randint(2) == 0)) {
                    av.visited = true;
                }
            });
            stack.push(cur_pos);
            this.browse(next, stack);
        } else {
            if (stack.length == 0) {
                return;
            }
            this.browse(stack.pop(), stack);
        }
    }
    
    
});

GameEngine.mazeBuilder = new GameEngine.Classes.RecursiveBacktracker();
