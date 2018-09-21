var menuState = {

  create: function () {

    game.stage.backgroundColor = '#66b4e2';
    var title, subtitle, startGameButton, creditsButton;
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
     * Set the Start Game button
     */
    var startGameButton = game.add.text(512, 470, 'Start Game', game.style);
    startGameButton.inputEnabled = true;
    startGameButton.events.onInputUp.add(function () {
      game.state.start('play');
    }, this);

    /**
     * Set the Credits button
     */
    var creditsButton = game.add.text(512, 520, 'Credits', game.style);
    creditsButton.inputEnabled = true;
    creditsButton.events.onInputUp.add(function () {
      game.state.start('credits');
    }, this);
  },


  update: function () {

  }

};