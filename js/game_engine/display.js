GameEngine.redraw = function(ev, player) {
    GameEngine.disp.drawMaze( getPlayerView( player ));
};
$('html').bind('GE.redraw', GameEngine.redraw);

GameEngine.Classes.Display = Class.create({

    inited: false,
    id: null,
    canvas: null,
    context: null,
    
    init: function( ) {
        this.inited = false;
        this.wall = new Image();
        this.wall.src = GameEngine.setup.basepath + '/images/wall.png';
    },
    
    initDisplay: function() {
        var options = $.extend({'canvas_id': 'GameEngine'}, GameEngine.config);
        this.id = options.canvas_id;
        this.canvas = $('canvas#' + this.id).get(0);
    	this.context = this.canvas.getContext('2d');
    	this.inited = true;
    	$('html').trigger('GE.initDisplay');
    },
    
    drawMaze: function( maze ) {
        if (this.inited == false) {
            this.initDisplay();
        }
        if (typeof(maze) == 'undefined') {
            maze = GameEngine.maze;
        }
        
        var celldim = new GameEngine.Classes.Dimension();
        celldim.set(
            this.canvas.width / maze.dimension.width, 
            this.canvas.height / maze.dimension.height
        );
        
        this.context.save();

    	this.context.fillStyle = '#FFF';
    	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        var self = this;
    	$(maze.data).each(function( id_row, row ) {
    	    $(row).each(function( id_col, cell) {
    	        if (!cell.getFeature()) {
                    if (cell.kind == GameEngine.CONST.CELL_WALL) {
                        self.drawImage( cell, celldim, self.wall);
                    }
    	        } else {
    	            GameEngine.getCellFeatureByName(cell.getFeature()).draw(cell, celldim);
    	        }
    	    });
    	});
    	
    	this.context.restore();
    },
    
    drawSquare: function( cell, celldim, color ) {
    	this.context.fillStyle = color;
    	this.context.fillRect(cell.x * celldim.width, cell.y * celldim.height, celldim.width, celldim.height);
	},
	
    drawImage: function( cell, celldim, img ) {
    	this.context.drawImage(img, cell.x * celldim.width, cell.y * celldim.height, celldim.width, celldim.height);
	}
	
});

GameEngine.disp = new GameEngine.Classes.Display();