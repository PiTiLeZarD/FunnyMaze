GameEngine.CONST.CELL_FEATURE_STAR = 'star';

GameEngine.Classes.CellFeatureStar = Class.create(GameEngine.Classes.CellFeature.prototype, {
    init: function() {
        this.name = GameEngine.CONST.CELL_FEATURE_STAR;
        this.kind = GameEngine.CONST.CELL_FIELD;
        
        this.count = 15;
        this.dispatch_type = GameEngine.CONST.DISPATCH_RANDOM;
        this.gathered = 0;
        
        this.sup('init');
    },

    hit: function( cell, direction ) {
        while (cell.hasFeature(this.name)) {
            this.gathered += 1;
            cell.removeFeature( this.name );
        }
        console.log( this.gathered + ' gathered out of ' + this.getCount() );
        if (this.gathered == this.getCount()) {
            alert('Win By Star');
        }
        return false;
    }

});

GameEngine.availableFeatures.push(new GameEngine.Classes.CellFeatureStar());
