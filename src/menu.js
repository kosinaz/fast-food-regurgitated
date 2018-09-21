var menuState = {

  create: function () {

    game.stage.backgroundColor = '#66b4e2';
    var title, subtitle;
    game.add.sprite(512, 160, 'sprites', 'title_off');
    title = game.add.sprite(512, 160, 'sprites', 'title');
    title.alpha = 0;
    game.add.tween(title).to({
      alpha: 1
    }, 500, Phaser.Easing.Bounce.Out, true, 500);
    subtitle = game.add.sprite(512, 288, 'sprites', 'subtitle');
    subtitle.scale = {
      x: 0,
      y: 0
    };
    game.add.tween(subtitle.scale).to({
      x: 1,
      y: 1
    }, 1000, Phaser.Easing.Bounce.Out, true, 1500);
    game.add.tween(subtitle).to({
      y: 388
    }, 1000, Phaser.Easing.Bounce.Out, true, 1500);

    /**
     * Set the Start New Game button
     */
    this.startNewGameButton = game.add.text(512, 488, 'Start New Game', game.style);
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