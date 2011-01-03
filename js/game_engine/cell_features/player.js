GameEngine.CONST.CELL_FEATURE_PLAYER = 'player';

GameEngine.Classes.CellFeaturePlayer = Class.create(GameEngine.Classes.CellFeature.prototype, {
   init: function() {
       this.name = GameEngine.CONST.CELL_FEATURE_PLAYER;
       this.kind = GameEngine.CONST.CELL_FIELD;
       this.count = 1;
       
       $('html').bind('GE.move', {'self': this}, this.move);
       
       this.sup();
   },
   
   move: function(ev, direction) {
       var player = GameEngine.maze.getCellsByFeature( GameEngine.CONST.CELL_FEATURE_PLAYER )[0];
       var nextCell = GameEngine.maze.surroundingCells( player )[ direction ];
       
       if (nextCell != null) {
           if (!nextCell.hit( direction )) {
               nextCell.addFeature( GameEngine.CONST.CELL_FEATURE_PLAYER );
               player.removeFeature( GameEngine.CONST.CELL_FEATURE_PLAYER );
               $('html').trigger('GE.redraw', [ nextCell ]);
           } 
       }
   }
   
});

GameEngine.availableFeatures.push(new GameEngine.Classes.CellFeaturePlayer());
