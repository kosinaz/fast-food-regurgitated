var playState = {

  create: function () {

    game.over = false;


    game.levelMusic.fadeTo(500, 0.3);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 1000;

    game.lips = game.add.sprite(980, 288, 'sprites');
    game.lips.animations.add('eat', [
      'lips1',
      'lips2',
      'lips3',
      'lips4',
      'lips3',
      'lips2',
      'lips1'
    ], 30, true);
    game.lips.animations.play('eat');

    game.foods = game.add.group();

    game.physics.enable(game.lips, Phaser.Physics.ARCADE);
    game.lips.body.collideWorldBounds = true;
    game.lips.body.immovable = true;
    game.lips.body.onWorldBounds = new Phaser.Signal();
    game.lips.body.onWorldBounds.add(function () {
      if (game.over) {
        return;
      }
      game.over = true;
      game.lips.animations.stop('eat');
      game.lips.loadTexture('sprites', 'lips4');
      game.levelMusic.fadeTo(500, 0.01);
      var restartButton = game.add.text(512, 288, 'Restart', game.style);
      restartButton.inputEnabled = true;
      restartButton.events.onInputUp.add(function () {
        game.state.restart();
      });
      game.add.audio('fail', 0.3).play();
    });

    game.time.events.loop(1000, function () {
      if (game.over) {
        return;
      }
      var food = game.foods.create(
        10, game.rnd.integerInRange(150, 426), 'sprites', 'burger'
      );
      game.physics.enable(food, Phaser.Physics.ARCADE);
      food.body.velocity.setTo(400 + game.rnd.integerInRange(0, 200), 0);
      food.body.allowGravity = false;
      food.body.immovable = true;
    });

    game.input.mouse.start();
    game.input.mouse.mouseUpCallback = function () {
      if (game.over || game.lips.y < 150) {
        return;
      }
      game.add.audio('boing' + game.rnd.integerInRange(1, 3), 0.3).play();
      game.lips.body.velocity.setTo(0, -400);
    }

  },

  update: function () {
    game.physics.arcade.collide(game.lips, game.foods, function (lips, food) {
      game.add.tween(food.scale).to({
        x: 0,
        y: 0
      }, 50, Phaser.Easing.Circular.In, true);
    });
  }

}