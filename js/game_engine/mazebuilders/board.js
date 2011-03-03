

GameEngine.Classes.Board = Class.create(GameEngine.Classes.MazeGenerator.prototype, {

    init: function() {
        this.sup('init');
    },

    build: function() {
        /* Try to build something */
    }
    
});

GameEngine.mazeBuilder = new GameEngine.Classes.Board();
