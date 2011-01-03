GameEngine.availableFeatures = []

GameEngine.CONST.DISPATCH_EXACT = 'exact';
GameEngine.CONST.DISPATCH_PERCENT = 'percent';
GameEngine.CONST.DISPATCH_RANDOM = 'random';

/*--- CellFeature ---*/
GameEngine.Classes.CellFeature = Class.create({
   
   img: null,
   kind: null,
   name: null,
   processed_count: false,
   
   count: 0,
   dispatch_type: GameEngine.CONST.DISPATCH_EXACT,
   
   init: function() {
       if (this.name) {
           this.img = new Image();
           this.img.src = GameEngine.setup.basepath + '/images/'+this.name+'.png';
       }
   },
   
   getCount: function() {
       if (this.processed_count) return this.processed_count;
       
       var count = this.count;
       if (this.dispatch_type == GameEngine.CONST.DISPATCH_PERCENT) {
           count = Math.floor( GameEngine.maze.dimension.squareSize() * count / 100 );
       }
       if (this.dispatch_type == GameEngine.CONST.DISPATCH_RANDOM) {
           count = randint(count);
       }
       
       this.processed_count = count;
       
       return count;
   },
   
   draw: function( cell, celldim ) {
       GameEngine.disp.drawImage( cell, celldim, this.img ); 
   },
   
   hit: function( cell, direction ) {
       /* true = collision */
       return false;
   }

});


GameEngine.getCellFeatureByName = function( name ) {
    var feature = null;
    $(GameEngine.availableFeatures).each(function(i, f) {
        if (f.name == name) {
            feature = f;
            return;
        }
    });
    return feature;
};

GameEngine.conFeatures = function() {
    if ('features' in GameEngine.config) {
        $.each(GameEngine.config.features, function(name, options) {
            var feature = GameEngine.getCellFeatureByName(name);
            var override = $.extend({'count': feature.count, 'dispatch_type': feature.dispatch_type}, options);
            feature.count = override['count'];
            feature.dispatch_type = override['dispatch_type'];
        });
    }
};
