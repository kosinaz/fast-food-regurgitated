var playState = {

  create: function () {

    game.over = false;

    
    game.levelMusic.fadeTo(500, 0.3);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 1000;

    game.mouth = game.add.sprite(980, 288, 'sprites');
    game.mouth.animations.add('eat', [
      'mouth_lit_64_1',
      'mouth_lit_64_2',
      'mouth_lit_64_3',
      'mouth_lit_64_4',
      'mouth_lit_64_3',
      'mouth_lit_64_2',
      'mouth_lit_64_1'
    ], 30, true);
    game.mouth.animations.play('eat');

    game.foods = game.add.group();
    var food = game.foods.create(
      10, game.rnd.integerInRange(150, 426), 'sprites', 'spam_lit'
    );
    
    game.physics.enable([game.mouth, game.foods], Phaser.Physics.ARCADE);
    game.mouth.body.collideWorldBounds = true;
    game.mouth.body.immovable = true;
    game.mouth.body.onWorldBounds = new Phaser.Signal();
    game.mouth.body.onWorldBounds.add(function () {
      if (game.over) {
        return;
      }
      game.over = true;
      game.mouth.animations.stop('eat');
      game.mouth.loadTexture('sprites', 'mouth_lit_64_4');
      game.levelMusic.fadeTo(500, 0.01);
      var restartButton = game.add.text(512, 288, 'Restart', game.style);
      restartButton.inputEnabled = true;
      restartButton.events.onInputUp.add(function () {
        game.state.restart();
      });
      game.add.audio('fail', 0.3).play();
    });

    food.body.velocity.setTo(500, 0);
    food.body.allowGravity = false;
    food.body.immovable = true;
    
    game.input.mouse.start();
    game.input.mouse.mouseUpCallback = function () {
      if (game.over || game.mouth.y < 150) {
        return;
      }
      game.add.audio('boing' + game.rnd.integerInRange(1, 3), 0.3).play();
      game.mouth.body.velocity.setTo(0, -400);
    }

  },

  update: function () {
    game.physics.arcade.collide(game.mouth, game.foods, function (mouth, food) {
      game.add.tween(food.scale).to({
        x: 0,
        y: 0
      }, 100, Phaser.Easing.Circular.In, true);
    });
  }

}