var loadState = {

    preload: function () {

        /**
         * Load the sprites.
         */
        game.load.atlas('sprites', 'assets/sprites.png', 'data/sprites.json');

        /**
         * Load the music.
         */
        game.load.audio('music', ['assets/music.ogg', 'assets/music.m4a']);
    },
    
    create: function () {

        /**
         * Start the music.
         */
        game.music = game.add.audio('music', 0.3, true).play();

        /**
         * Start the game.
         */
        game.state.start('menu');

    }

};