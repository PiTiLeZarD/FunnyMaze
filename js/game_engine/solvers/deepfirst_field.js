
GameEngine.Classes.DeepFirstSearchFieldSolver = Class.create(GameEngine.Classes.MazeSolver.prototype, {

    init: function() {
        this.sup('init');
    },

    solve: function( cell_from, cell_to ) {

        GameEngine.maze.unvisited();
        $(GameEngine.maze.data).each(function() {
            $(this).each(function() {
                if (this.hasFeature('exitpath')) this.removeFeature('exitpath');
                this.distance = 100000000;
            });
        });
        cell_from.distance = 0;
        
        
        this.setDistancesFrom( cell_from );
        
        var path = new Array();
        this.gatherPathFrom( cell_to, path );
        
        $(path).each(function() {
            if (!this.hasFeature('player') && !this.hasFeature('exit')) this.addFeature('exitpath');
        });
        
        $('html').trigger('GE.redraw', [ cell_from ]);
    },
    
    setDistancesFrom: function( cur_pos ) {
        /* in any case after this we went through this cell */
        cur_pos.visited = true;
        
        /* if we have no non-visited cell arround, considering we're not next to the exit what's the point of life ? */
        var available = GameEngine.maze.availableDirectionFrom(cur_pos, true);
        if (available.length == 0) return false;
        
        /* lets check if we have a shorter path now for all those surrounding cells */
        for (var i = 0; i < available.length; i++) {
            if (available[i].kind == 'field') {
                if (available[i].distance > cur_pos.distance + 1) {
                    available[i].distance = cur_pos.distance + 1;
                }
            }
        }
        
        /* visit all our neighbours */
        for (var i = 0; i < available.length; i++) {
            /* check it again in case a path went through this one */
            if (!available[i].visited && (available[i].kind == 'field')) {
                /* and start over again */
                this.setDistancesFrom( available[i] );
            }
        }
    },
    
    gatherPathFrom: function( cur_pos, path ) {
        /* ok so basically we want to go to cur_pos, so it's in the path */
        path.push(cur_pos);
        
        /* Dammit ... it's the start ! */
        if (cur_pos.distance == 0) return;
        
        /* now we search for the shortest way */
        var cell = new GameEngine.Classes.Cell();
        cell.distance = 100000000;
        
        var surrounding = GameEngine.maze.surroundingCells( cur_pos );
        
        $.each(surrounding, function() {
            if (this.kind == 'field') {
                if (this.distance < cell.distance) cell = this;
            }
        });
        
        /* apparently no connections */
        if (cell.distance == 10000000) return;
        
        this.gatherPathFrom( cell, path );
    }
    
});

/* new feature to indicate the path */
GameEngine.CONST.CELL_FEATURE_EXITPATH = 'exitpath';
GameEngine.Classes.CellFeatureExitPath = Class.create(GameEngine.Classes.CellFeature.prototype, {
    init: function() {
        this.name = GameEngine.CONST.CELL_FEATURE_EXITPATH;
        this.kind = GameEngine.CONST.CELL_FIELD;
        this.count = 0;
        
        this.sup('init');
    },
    
    hit: function( cell, direction ) {
        cell.removeFeature(this.name);
        return false;
    },
    
    draw: function( cell, celldim ) {
        GameEngine.disp.drawSquare( cell, celldim, '#F00' ); 
    }

});
GameEngine.availableFeatures.push(new GameEngine.Classes.CellFeatureExitPath());



GameEngine.mazeSolver = new GameEngine.Classes.DeepFirstSearchFieldSolver();

GameEngine.findExit = function() {
    var player = GameEngine.maze.getCellsByFeature('player')[0];
    var exit = GameEngine.maze.getCellsByFeature('exit')[0];
    
    return GameEngine.mazeSolver.solve( player , exit );
};