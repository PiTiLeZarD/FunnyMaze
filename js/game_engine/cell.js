
GameEngine.CONST.CELL_WALL = 'wall';
GameEngine.CONST.CELL_FIELD = 'field';


GameEngine.Classes.Cell = Class.create({
    
    init: function( x, y ) {
        
        this.x = -1;
        this.y = -1;
        this.visited = false;
        this.kind = GameEngine.CONST.CELL_WALL;
        this.features = new Array();
        
        if ((typeof(x) != 'undifined') && (typeof(y) != 'undefined')) {
            this.setPosition(x, y);
        }
    },
    
    setPosition: function( x, y ) {
        this.x = x;
        this.y = y;
        
        return this;
    },
    
    hit: function( direction ) {
        var features_hit = false;

        var self = this;
        $(this.features).each(function(i, feature) {
            var feature = GameEngine.getCellFeatureByName( feature );
            var feature_hit = feature.hit( self, direction );
            if (!features_hit) features_hit = feature_hit;
        });
        
        if (this.kind == GameEngine.CONST.CELL_WALL) return true;
        
        return features_hit;
    },
    
    getFeature: function() {
        if (this.features.length == 0) return null;
        return this.features[this.features.length - 1];
    },
    
    hasFeature: function( feature ) {
        if (typeof(feature) == 'undefined') return this.features.length > 0;
        if (feature == null) return this.features.length == 0;
        return $.inArray( feature, this.features ) != -1;
    },
    
    addFeature: function( feature, background ) {
        if (!!background == true) this.features.unshift(feature);
        else this.features.push( feature );
    },
    
    removeFeature: function( feature ) {
        var pos = $.inArray( feature, this.features );
        this.features.splice(pos, 1);
    }
    
});