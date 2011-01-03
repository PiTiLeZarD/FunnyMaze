if (typeof(console) == 'undefined') {
    var console = {
        log: function(message, title) {
            alert(message);
        }
    };
}

/* put that in setup.js eventually */
var loadFiles = function( files, cb ) {
    GameEngine.setup.finished = false;
    GameEngine.setup.fileiterator = 0;
    GameEngine.setup.files = files;
    GameEngine.ready( cb );
    GameEngine.setup.loadNextFile();
};

$.extend(QUnit, {
    isClass: function( cls ) {
        if ( !cls ) return false;
        if ( !QUnit.is( 'function', cls ) ) return false;
        if ( !QUnit.is( 'array', cls.prototype.ns ) ) return false;
        if ( !QUnit.is( 'object', cls.prototype.supers ) ) return false;
        if ( !QUnit.is( 'function', cls.prototype.constructor ) ) return false;
        return true;
    },
    isInstance: function( obj ) {
        if ( !obj ) return false;
        if ( !QUnit.is( 'object', obj ) ) return false;
        if ( !QUnit.is( 'array', obj.ns ) ) return false;
        if ( !QUnit.is( 'object', obj.supers ) ) return false;
        if ( !QUnit.is( 'object', obj.__proto__ ) ) return false;
        return true;
    },
    isInstanceOf: function( obj, cls ) {
        if ( !QUnit.isClass( cls )) return false;
        if ( !QUnit.isInstance( obj )) return false;
        return QUnit.equiv( obj.__proto__, cls.prototype );
    }
});
