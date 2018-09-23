var loadState = {

  preload: function () {

    game.add.text(576, 288, 'Loading... Please wait.', game.textStyle);

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
    game.load.audio('win', 'assets/win.mp3'); 
    game.load.audio('hit1', 'assets/hit1.mp3');
    game.load.audio('hit2', 'assets/hit2.mp3');
    game.load.audio('hit3', 'assets/hit3.mp3');
    game.load.audio('burp', 'assets/burp.mp3');
    game.load.audio('eat', 'assets/eat.mp3');
    game.load.audio('drink', 'assets/drink.mp3');
    game.load.audio('sausage', 'assets/sausage.mp3');
    game.load.audio('pizza1', 'assets/pizza1.mp3');
    game.load.audio('pizza2', 'assets/pizza2.mp3');

    game.load.json('calories', 'data/calories.json');
    game.load.json('levels', 'data/levels.json');
  },

  create: function () {

    /**
     * Start the music.
     */
    game.titleMusic = game.add.audio('title', 0.3, true).play();

    game.calories = game.cache.getJSON('calories');
    game.levels = game.cache.getJSON('levels');

    game.level = 0;

    /**
     * Start the game.
     */
    game.state.start('menu');

  }

};