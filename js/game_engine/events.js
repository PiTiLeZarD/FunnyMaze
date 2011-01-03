GameEngine.Classes.EventsDispatcher = Class.create({

    init: function( ) {
        $('html').bind('GE.initDisplay', this.registerEvents);
    },
    
    registerEvents: function(ev) {
        $('html').keyup(GameEngine.events.keyup);
        ev.stopPropagation();
    },
    
    keyup: function(ev) {
        if ((ev.keyCode >= 37) && (ev.keyCode <= 40)) {
            var keymap = {37: 'left',38: 'up',39: 'right',40: 'down'}
            $('html').trigger('GE.move', [keymap[ev.keyCode]]);
            ev.stopPropagation();
        }
    }
    
});

GameEngine.events = new GameEngine.Classes.EventsDispatcher();