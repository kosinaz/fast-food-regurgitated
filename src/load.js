var loadState = {

  preload: function () {

    /**
     * Load the sprites.
     */
    game.load.atlas('sprites', 'assets/sprites.png', 'data/sprites.json');

    /**
     * Load the music.
     */
    game.load.audio('title', 'assets/title.mp3');
    game.load.audio('level', 'assets/level.mp3');
  },

  create: function () {

    /**
     * Start the music.
     */
    game.titleMusic = game.add.audio('title', 0.3, true).play();

    /**
     * Start the game.
     */
    game.state.start('menu');

  }

};