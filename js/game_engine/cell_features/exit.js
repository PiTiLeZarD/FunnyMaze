GameEngine.CONST.CELL_FEATURE_EXIT = 'exit';

GameEngine.Classes.CellFeatureExit = Class.create(GameEngine.Classes.CellFeature.prototype, {
    init: function() {
        this.name = GameEngine.CONST.CELL_FEATURE_EXIT;
        this.kind = GameEngine.CONST.CELL_WALL;
        this.count = 1;

        this.sup('init');
    },

    hit: function( cell, direction ) {
        if (cell.hasFeature( this.name )) {
            alert('WIN');
        }
        return false;
    }

});

GameEngine.availableFeatures.push(new GameEngine.Classes.CellFeatureExit());
