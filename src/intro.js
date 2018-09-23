var introState = {

  create: function () {

    var news = game.add.sprite(512, 288, 'sprites', '1 grand opening');
    game.add.tween(news).from({
      width: 0,
      height: 0,
      angle: -540
    }, 1000, 'Cubic', true);

    game.add.audio('news', 0.1).play();

    game.time.events.add(1000, function() {
      game.add.audio('news hit', 0.5).play();
    });

    /**
     * Set the Start Game button
     */
    var startButton = game.add.text(512, 510, 'Start', game.style);
    startButton.inputEnabled = true;
    startButton.events.onInputUp.add(function () {
      game.state.start('menu');
    }, this);
    startButton.setShadow(2, 2, '#dfa8ba', 0);

  },


  update: function () {

  }

};