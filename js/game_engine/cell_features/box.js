GameEngine.CONST.CELL_FEATURE_BOX = 'box';

GameEngine.Classes.CellFeatureBox = Class.create(GameEngine.Classes.CellFeature.prototype, {
    init: function() {
        this.name = GameEngine.CONST.CELL_FEATURE_BOX;
        this.kind = GameEngine.CONST.CELL_FIELD;
        
        this.count = 8;
        this.dispatch_type = GameEngine.CONST.DISPATCH_PERCENT;
        
        this.sup('init');
    },

    hit: function( cell, direction ) {
        var surrounding = GameEngine.maze.surroundingCells( cell );
        
        var nextCell = surrounding[ direction ];
        var prevCell = surrounding[ GameEngine.oppositeDirection(direction) ];

        /* check that we have a next cell that has no feature and that doesn't hit, and that in the previous cell we have the player */
        if ((nextCell != null) && !nextCell.getFeature() && prevCell.hasFeature( GameEngine.CONST.CELL_FEATURE_PLAYER ) && !nextCell.hit( direction )) {
            nextCell.addFeature( GameEngine.CONST.CELL_FEATURE_BOX );
            cell.removeFeature( GameEngine.CONST.CELL_FEATURE_BOX );
            return false;
        }
        return true;
    }

});

/*GameEngine.availableFeatures.push(new GameEngine.Classes.CellFeatureBox());*/
