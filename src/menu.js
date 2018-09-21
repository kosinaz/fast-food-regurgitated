var menuState = {

  create: function () {

    game.add.sprite(512, 288, 'sprites', 'title');
    var subtitle = game.add.sprite(512, 288, 'sprites', 'regurgitated_lit');
    subtitle.scale = {
      x: 0,
      y: 0
    };
    game.add.tween(subtitle.scale).to({
      x: 1,
      y: 1
    }, 1000, Phaser.Easing.Bounce.Out, true, 500);
    game.add.tween(subtitle).to({
      y: 438
    }, 1000, Phaser.Easing.Bounce.Out, true, 500);

    /**
     * Set the Start New Game button
     */
    this.startNewGameButton = game.add.text(512, 528, 'Start New Game', game.style);
    this.startNewGameButton.inputEnabled = true;
    this.startNewGameButton.events.onInputUp.add(this.start, this);
    this.startNewGameButton.anchor.set(0.5, 0.5);
  },

  start: function () {

    /**
     * Start the level.
     */
    game.state.start('play');
  },

  update: function () {

  }

};