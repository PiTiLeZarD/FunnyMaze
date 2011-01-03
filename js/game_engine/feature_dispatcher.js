
GameEngine.Classes.FeatureDispatcher = Class.create({
    
    init: function() {
        
    },
    
    dispatch: function() {
        var toDispatch = {};
        
        $.each(GameEngine.availableFeatures, function(i, feature) {
            toDispatch[feature.name] = feature.getCount();
        });
        
        while (this.getCount(toDispatch) > 0) {
            var keys = this.getKeys(toDispatch);
            var name = keys[randint(keys.length)];
            
            var cell = GameEngine.maze.randomCellByKind( GameEngine.getCellFeatureByName(name).kind );
            if ( !cell.getFeature() ) {
                cell.addFeature( name );
                toDispatch[name] -= 1;
            }
        }
    },
    
    getCount: function( features ) {
        var count = 0;
        $.each( features, function(name, c) {
            count += c;
        });
        return count;
    },
    
    getKeys: function( h ) {
        var kz = new Array();
        $.each(h, function(k, v) { if (v > 0) kz.push(k); });
        return kz;
    }

});

GameEngine.dispatcher = new GameEngine.Classes.FeatureDispatcher();