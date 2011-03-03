GameEngine.CONST.CELL_FEATURE_DARKEN = 'darken';

GameEngine.Classes.CellFeatureDarken = Class.create(GameEngine.Classes.CellFeature.prototype, {
   init: function() {
       this.name = GameEngine.CONST.CELL_FEATURE_DARKEN;
       this.kind = GameEngine.CONST.CELL_FIELD;
       this.count = 50;
       this.dispatch_type = GameEngine.CONST.DISPATCH_PERCENT;
       
       this.sup('init');
   },
   
   move: function(ev, direction) {
   }
   
});

GameEngine.availableFeatures.push(new GameEngine.Classes.CellFeatureDarken());
