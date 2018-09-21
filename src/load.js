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
    game.load.audio('boing1', 'assets/boing1.mp3');
    game.load.audio('boing2', 'assets/boing2.mp3');
    game.load.audio('boing3', 'assets/boing3.mp3');
    game.load.audio('fail', 'assets/fail.mp3');
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