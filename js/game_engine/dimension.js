
GameEngine.Classes.Dimension = Class.create({
    
    init: function( width, height ) {
        
        this.width = -1;
        this.height = -1;
        
        if ((typeof(width) != 'undefined') && (typeof(height) != 'undefined')) {
            this.width = width;
            this.height = height;
        }
        
        return this;
    },
    
    set: function(width, height) {
        this.width = width;
        this.height = height;
        
        return this;
    },
    
    squareSize: function() {
        return this.width * this.height;
    }
    
});
