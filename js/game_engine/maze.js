
GameEngine.Classes.Maze = Class.create({
    
    init: function( dimension ) {
        this.dimension = dimension;
        if (typeof(this.dimension) == 'undefined') {
            this.dimension = new GameEngine.Classes.Dimension(GameEngine.config.width, GameEngine.config.height);
        }
        this.players = null;
        
        this.data = new Array();
        for (var y = 0; y < this.dimension.height; y++) {
            var row = new Array();
            for (var x = 0; x < this.dimension.width; x++) {
                
                var cell = new GameEngine.Classes.Cell();
                cell.setPosition(x, y);
                
                /* visit all corners */
                if ((y == 0) || (x == 0) || (y == this.dimension.height - 1) || (x == this.dimension.width - 1)) {
                    cell.visited = true;
                }
                
                row.push(cell);
            }
            this.data.push(row);
        }
    },
    
    randomCell: function(  ) {
        var y = randint(this.dimension.width);
        var x = randint(this.dimension.height);
        return this.data[y][x];
    },
    randomCellByFeature: function( feature ) {
        var cells = this.getCellsByFeature(feature);
        return cells[randint(cells.length)];
    },
    randomCellByKind: function( kind ) {
        var cells = this.getCellsByKind(kind);
        return cells[randint(cells.length)];
    },
    
    getCellAt: function( x, y ) {
        return this.data[y][x];
    },
    
    unvisited: function() {
        $(this.data).each(function() {
            $(this).each(function() {
                this.visited = false;
            });
        });
    },
    
    availableDirectionFrom: function( cell, visited ) {
        var available = new Array();

        if (visited) {
            if ((cell.y > 1)                            && !this.getCellAt(cell.x, cell.y - 1).visited) available.push( this.getCellAt(cell.x, cell.y - 1) );
            if ((cell.x < this.dimension.width - 2)     && !this.getCellAt(cell.x + 1, cell.y).visited) available.push( this.getCellAt(cell.x + 1, cell.y) );
            if ((cell.y < this.dimension.height - 2)    && !this.getCellAt(cell.x, cell.y + 1).visited) available.push( this.getCellAt(cell.x, cell.y + 1) );
            if ((cell.x > 1)                            && !this.getCellAt(cell.x - 1, cell.y).visited) available.push( this.getCellAt(cell.x - 1, cell.y) );
        } else {
            throw('TODO: availableDirectionFrom for walls detection');
        }
        
        return available;
    },
    
    surroundingCells: function( cell ) {
        var cells = {'up': null, 'down': null, 'left': null, 'right': null};
        if (cell.y > 1) cells['up'] = this.getCellAt(cell.x, cell.y - 1);
        if (cell.x < this.dimension.width - 1) cells['right'] = this.getCellAt(cell.x + 1, cell.y);
        if (cell.y < this.dimension.width - 1) cells['down'] = this.getCellAt(cell.x, cell.y + 1);
        if (cell.x > 1) cells['left'] = this.getCellAt(cell.x - 1, cell.y);
        return cells;
    },
    
    
    getCellsByFeature: function( feature ) {
        var cells = new Array();

        for (var y = 0; y < this.dimension.height; y++) {
            for (var x = 0; x < this.dimension.width; x++) {
                if (this.getCellAt(x, y).hasFeature( feature )) {
                    cells.push(this.getCellAt(x, y));
                }
            }
        }

        return cells;
    },

    getCellsByKind: function( kind ) {
        var cells = new Array();

        for (var y = 0; y < this.dimension.height; y++) {
            for (var x = 0; x < this.dimension.width; x++) {
                if (this.getCellAt(x, y).kind == kind) {
                    cells.push(this.getCellAt(x, y));
                }
            }
        }

        return cells;
    }
    
    
});