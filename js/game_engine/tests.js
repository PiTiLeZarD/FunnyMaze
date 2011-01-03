module("game_engine");

var BASE_PATH = 'js/game_engine/';

test("Game Setup - basis", function () {
    
    ok( QUnit.is( 'function', randint ), "We have a wonderfull function");
    ok( typeof(GameEngine) != "undefined", 'We should have a GameEngine at least so far' );
    ok( QUnit.is( 'object', GameEngine ), "It's an object for sure");
    
    ok( GameEngine.tests, 'Test mode');
    ok( QUnit.is( 'object', GameEngine.setup ), "We have an object for setup");
    ok( QUnit.is( 'array', GameEngine.setup.files ), "... and array of files");
    ok( QUnit.is( 'function', GameEngine.setup.loadNextFile ), "... A function to load all files");
    equals( 0, GameEngine.setup.fileiterator, "We didn't loaded any file cuz it's test");
    equals( BASE_PATH, GameEngine.setup.basepath, "Correct basepath");
    ok( !GameEngine.setup.finished, "not even started");
    ok( QUnit.is( 'function', GameEngine.ready ), "... A function 'à la' $(document).ready() but for the game");
    equals( 0, GameEngine.setup.readycallbacks.length, "No callbacks registered already");
    ok( QUnit.is( 'function', GameEngine.setup.finishedLoading ), "... A function to tell that the loading is finished");
    
});

test("Game Setup - finished loading and callbacks on ready", function () {
    
    GameEngine.setup.finishedLoading();
    ok( GameEngine.setup.finished, "Should be finished");
    
    GameEngine.setup.finished = false;
    var counter = 0;
    GameEngine.ready(function() { counter += 1; });
    equals( 1, GameEngine.setup.readycallbacks.length, "We registered our callback");
    GameEngine.setup.finishedLoading();
    ok( GameEngine.setup.finished, "Should be finished");
    equals( 1, counter, "Callback called");
    equals( 0, GameEngine.setup.readycallbacks.length, "Callback called so removed");
    
    GameEngine.ready(function() { counter += 1; });
    equals( 0, GameEngine.setup.readycallbacks.length, "Normally not registered cuz finished");
    equals( 2, counter, "Callback called");
    
});

test("Game Setup - loadOneFile and GameEngine", function () {
    
    asyncTest("Game Setup - loadOneFile and GameEngine (async)", function () {
        
        loadFiles(['game_engine.js'], function() {
            
            equals( 1, GameEngine.setup.fileiterator, 'Should load one file only');

            ok( QUnit.is( 'object', GameEngine.CONST ), ' a place to put constants');
            ok( QUnit.is( 'object', GameEngine.Classes ), ' a place to put classes'); 

            ok( QUnit.isClass( GameEngine.Classes.MazeGenerator ), "We have an abstract MazeGenerator");
            ok( QUnit.isClass( GameEngine.Classes.MazeSolver ), "We have an abstract MazeSolver");
            ok( QUnit.isInstance( GameEngine.mazeBuilder ), "Hmm this is an instance");
            ok( QUnit.isInstanceOf( GameEngine.mazeBuilder, GameEngine.Classes.MazeGenerator ), "... of this class it seems");
            ok( QUnit.isInstanceOf( GameEngine.mazeSolver, GameEngine.Classes.MazeSolver ), "And the same for the solver");
            
            ok( QUnit.is( 'function', GameEngine.oppositeDirection), "And one handy function to have an opposite direction");
            equal( 'up', GameEngine.oppositeDirection('down'), "Upsidedown");
            equal( 'down', GameEngine.oppositeDirection('up'), "Downsideup");
            equal( 'left', GameEngine.oppositeDirection('right'), "Leftsideright");
            equal( 'right', GameEngine.oppositeDirection('left'), "Rightsideleft");
            
            ok( QUnit.is( 'function', GameEngine.init), "A function that initialize the maze");
            console.log( 'TODO: test GameEngine.init');

            start();
            
        });
    
    });
    
});

test("Game Cell", function () {
    
    asyncTest("Game Cell (async)", function () {
        
        loadFiles(['cell.js'], function() {

            ok( 'CELL_WALL' in GameEngine.CONST, 'wall constant' );
            equals( 'wall', GameEngine.CONST.CELL_WALL, 'wall constant' );
            ok( 'CELL_FIELD' in GameEngine.CONST, 'field constant' );
            equals( 'field', GameEngine.CONST.CELL_FIELD, 'field constant' );
            
            ok( QUnit.isClass(GameEngine.Classes.Cell), "We have our class");
            
            var cell = new GameEngine.Classes.Cell();
            ok( QUnit.isInstanceOf( cell, GameEngine.Classes.Cell ), "Regular check");
            
            equals( -1, cell.x );
            equals( -1, cell.y );
            equals( false, cell.visited );
            equals( 'wall', cell.kind );
            
            cell.setPosition( 12, 15 );
            equals( 12, cell.x );
            equals( 15, cell.y );
            
            cell = new GameEngine.Classes.Cell( 14, 18 );
            equals( 14, cell.x );
            equals( 18, cell.y );
            
            ok( QUnit.is('function', cell.addFeature) );
            ok( QUnit.is('function', cell.removeFeature) );
            ok( QUnit.is('function', cell.hasFeature) );
            ok( QUnit.is('function', cell.getFeature) );
            equals( null, cell.getFeature(), 'no features' );
            ok( !cell.hasFeature(), 'no features' );
            ok( cell.hasFeature( null ), 'no features' );
            ok( !cell.hasFeature('test'), 'no features' );
            ok( !cell.hasFeature('test2'), 'no features' );
            cell.addFeature('test');
            ok( cell.hasFeature(), 'one feature' );
            ok( !cell.hasFeature( null ), 'one feature' );
            ok( cell.hasFeature('test'), 'one feature' );
            ok( !cell.hasFeature('test2'), 'one feature' );
            equals( 'test', cell.getFeature(), 'one feature' );
            cell.addFeature('test2');
            ok( cell.hasFeature('test'), 'two feature' );
            ok( cell.hasFeature('test2'), 'two feature' );
            equals( 'test2', cell.getFeature(), 'two feature' );
            cell.addFeature('background', true);
            ok( cell.hasFeature('test'), 'background feature' );
            ok( cell.hasFeature('background'), 'background feature' );
            ok( cell.hasFeature('test2'), 'background feature' );
            equals( 'test2', cell.getFeature(), 'background feature' );

            cell.removeFeature('background');
            ok( !cell.hasFeature('background'), 'remove feature' );
            ok( cell.hasFeature('test2'), 'remove feature' );
            equals( 2, cell.features.length, 'remove feature' )
            equals( 'test2', cell.getFeature(), 'remove feature' );
            cell.removeFeature('test');
            cell.removeFeature('test2');
            equals( null, cell.getFeature(), 'remove all features' );
            equals( 0, cell.features.length, 'remove feature' )
            
            start();
            
        });
    
    });
    
});

test("Game Feature - Abstract", function () {
    
    asyncTest("Game Feature - Abstract (async)", function () {
        
        loadFiles(['cell_feature.js'], function() {
            
            ok( 'DISPATCH_EXACT' in GameEngine.CONST, 'exact dispatch constant' );
            equals( 'exact', GameEngine.CONST.DISPATCH_EXACT, 'exact dispatch constant' );
            ok( 'DISPATCH_PERCENT' in GameEngine.CONST, 'percent dispatch constant' );
            equals( 'percent', GameEngine.CONST.DISPATCH_PERCENT, 'percent dispatch constant' );
            ok( 'DISPATCH_RANDOM' in GameEngine.CONST, 'random dispatch constant' );
            equals( 'random', GameEngine.CONST.DISPATCH_RANDOM, 'random dispatch constant' );
            
            ok( QUnit.is( 'array', GameEngine.availableFeatures ), 'Features sandbox');
            ok( QUnit.isClass(GameEngine.Classes.CellFeature), "Our class");
            ok( QUnit.is('function', GameEngine.getCellFeatureByName), "Function to gather features by their names");
            ok( QUnit.is('function', GameEngine.conFeatures), "Configure features");
            
            equals( 0, GameEngine.availableFeatures.length, "empty box normally");

            var cellf = new GameEngine.Classes.CellFeature();
            equals( null, cellf.img, 'image is null');
            equals( null, cellf.kind, 'kind is null');
            equals( null, cellf.name, 'name is null');
            equals( false, cellf.processed_count, 'process_count is false');
            equals( 0, cellf.count, 'count is 0');
            equals( 'exact', cellf.dispatch_type, 'exact dispatch type');
            ok( QUnit.is('function', cellf.hit), "hit function");
            ok( QUnit.is('function', cellf.draw), "draw function");
            ok( QUnit.is('function', cellf.getCount), "getCount function");
            equals( false, cellf.hit( 'whocares' ), "Normally doesn't hit");
            
            cellf.count = 12;
            equals( 12, cellf.getCount(), "getCount exact");
            equals( 12, cellf.processed_count, 'getCount updates processed_count');
            
            cellf.count = 100;
            cellf.processed_count = false;
            cellf.dispatch_type = 'random';
            var count = cellf.getCount();
            equals( count, cellf.getCount(), 'random return only once a random int');
            equals( count, cellf.processed_count, "kill the magic, it's stored there but chhhhht don't tell anyone");
            ok( count > 0 );
            ok( count < 100 );
            
            console.log('TODO: test percent');
            console.log('TODO: test draw');
            
            var HIT_RETURN = true;
            var HIT_DIRECTION = null;
            var HIT_CELL = null;
            var FeatureNameTestClass = Class.create(GameEngine.Classes.CellFeature.prototype, {
                init: function() {
                    this.name = 'test';
                    this.kind = GameEngine.CONST.CELL_WALL;
                    this.count = 2;

                    this.sup('init');
                },
                hit: function( cell, direction ) {
                    HIT_CELL = cell;
                    HIT_DIRECTION = direction;
                    return HIT_RETURN;
                }
            });
            
            equals( null, GameEngine.getCellFeatureByName('test'), 'No test feature for the moment');
            GameEngine.availableFeatures.push(new FeatureNameTestClass());
            equals( 1, GameEngine.availableFeatures.length );
            var feature = GameEngine.getCellFeatureByName('test');
            ok( feature != null , 'now we have one');
            equals( 'test', feature.name );
            ok( feature.img != null );
            ok( QUnit.is( 'object', feature.img));
            ok( BASE_PATH + '/images/player.png', $(feature.img).attr('src') );
            
            console.log('TODO: test conFeature');

            /* collision detection and feature actions on collision */
            var cell = new GameEngine.Classes.Cell(10,5);
            ok( feature.hit( cell, 'up'), "hitting on feature" );
            HIT_RETURN = false;
            equals( 'up', HIT_DIRECTION, "hitting on feature" );
            ok( !feature.hit( cell, 'down'), "hitting on feature" );
            equals( 'down', HIT_DIRECTION, "hitting on feature" );
            
            ok( cell.hit('left'), "General wall hit" );
            equals( 'down', HIT_DIRECTION, "Cell Hit params (no features so no direction changements)");
            equals( cell.x, HIT_CELL.x, "Cell Hit params");
            equals( cell.y, HIT_CELL.y, "Cell Hit params");
            
            HIT_RETURN = false;
            cell.addFeature('test');
            ok( cell.hit('right'), "Feature wall still hit even if it doesn't want to" );
            cell.kind = 'field';
            ok( !cell.hit('top'), "Now it's a field so up to the feature to determine" );
            HIT_RETURN = true;
            ok( cell.hit('top'), "Now it's a field so up to the feature to determine" );
            
            var HIT_RETURN2 = true;
            var HIT_DIRECTION2 = null;
            var FeatureNameTest2Class = Class.create(GameEngine.Classes.CellFeature.prototype, {
                init: function() {
                    this.name = 'test2';
                    this.sup('init');
                },
                hit: function( cell, direction ) {
                    HIT_DIRECTION2 = direction;
                    return HIT_RETURN2;
                }
            });
            GameEngine.availableFeatures.push(new FeatureNameTest2Class());
            cell.addFeature('test2');
            
            cell.kind = 'field';
            HIT_RETURN = false;
            HIT_RETURN2 = false;
            ok( !cell.hit('hole'), "field with two non blocking features" );
            equals( 'hole', HIT_DIRECTION, "Check that all features are called" );
            equals( 'hole', HIT_DIRECTION2, "Check that all features are called" );
            
            HIT_RETURN = true;
            ok( cell.hit('up'), "One feature blocks" );
            HIT_RETURN = false;
            HIT_RETURN2 = true;
            ok( cell.hit('up'), "One the other" );
            
            GameEngine.availableFeatures = new Array();
            
            start();
            
        });
    
    });
    
});

