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
    }, 500, Phaser.Easing.Cubic.In, true, 1500);
    var splat1 = game.add.tween(subtitle).to({
      y: 388
    }, 500, Phaser.Easing.Cubic.In, true, 1500);
    var splat2 = game.add.tween(subtitle).to({
      y: 398
    }, 2500, Phaser.Easing.Cubic.InOut);
    splat1.chain(splat2);

    game.add.audio('neon', 0.05, true).play();
    game.time.events.add(2000, function () {
      game.add.audio('splat', 0.5).play();
      game.dropEmitter.start(true, 2000, null, 30);
    });

    game.dropEmitter = game.add.emitter(512, 388, 100);
    game.dropEmitter.makeParticles('sprites', 'drop');
    game.dropEmitter.gravity = 1000;
    game.dropEmitter.setScale(0.5, 1, 0.5, 1);
    game.dropEmitter.setXSpeed(-400, 400);
    game.dropEmitter.setYSpeed(-400, 400);    

    /**
     * Set the Start Game button
     */
    var startGameButton = game.add.text(512, 470, 'Start Game', game.style);
    startGameButton.inputEnabled = true;
    startGameButton.events.onInputUp.add(function () {
      game.titleMusic.pause();
      game.levelMusic = game.add.audio('level', 0.3, true).play();
      game.state.start('play');
    });
    startGameButton.setShadow(2, 2, '#dfa8ba', 0);
    
    /**
     * Set the Credits button
     */
    var creditsButton = game.add.text(512, 520, 'Credits', game.style);
    creditsButton.inputEnabled = true;
    creditsButton.events.onInputUp.add(function () {
      game.state.start('credits');
    });
    creditsButton.setShadow(2, 2, '#dfa8ba', 0);
  },


  update: function () {

  }

};