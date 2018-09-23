var playState = {

  create: function () {

    game.over = false;

    game.add.sprite(512, 64, 'sprites', 'top');
    game.add.sprite(512, 544, 'sprites', 'pavement');
    game.add.sprite(32, 32, 'sprites', 'burger on');
    game.add.sprite(32 + 128, 32, 'sprites', 'hotdog off');
    game.add.sprite(120, 80, 'sprites', 'bun off');
    game.add.sprite(72 + 128, 80, 'sprites', 'sausage off');
    game.add.sprite(32 + 128 * 2, 32, 'sprites', 'pizza off');
    game.add.sprite(32 + 128 * 2, 80, 'sprites', 'pizza slice off');
    game.add.sprite(32 + 128 * 3, 32, 'sprites', 'fries off');
    game.add.sprite(32 + 128 * 4, 32, 'sprites', 'cola on');
    game.add.sprite(32 + 128 * 5, 32, 'sprites', 'donut off');
    game.add.sprite(32 + 128 * 6, 32, 'sprites', 'ice cream cone off');
    game.add.sprite(32 + 128 * 7, 32, 'sprites', 'ice cream bar off');
    game.add.text(80, 32, '0 / 9', game.textStyle);
    game.add.text(80 + 128, 32, '0 / 0', game.textStyle);
    game.add.text(152, 80, '0', game.textStyle);
    game.add.text(136 + 96, 80, '0', game.textStyle);
    game.add.text(80 + 128 * 2, 32, '0 / 0', game.textStyle);
    game.add.text(64 + 128 * 2, 80, '0', game.textStyle);
    game.add.text(80 + 128 * 3, 32, '0 / 0', game.textStyle);
    game.add.text(80 + 128 * 4, 32, '0 / 9', game.textStyle);
    game.add.text(80 + 128 * 5, 32, '0 / 0', game.textStyle);
    game.add.text(80 + 128 * 6, 32, '0 / 0', game.textStyle);
    game.add.text(80 + 128 * 7, 32, '0 / 0', game.textStyle);
  


    game.levelMusic.fadeTo(500, 0.3);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 1000;

    game.lipsShadow = game.add.sprite(980, 544, 'sprites', 'lips4');
    game.lipsShadow.tint = 0x000000;

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
      restartButton.setShadow(2, 2, '#dfa8ba', 0);
      game.add.audio('fail', 0.3).play();
    });

    game.time.events.loop(1000, function () {
      if (game.over) {
        return;
      }
      var foodType = ['burger', 'hotdog', 'pizza1', 'fries', 'cola', 'donut',
        'ice cream cone', 'ice cream bar', 'purple pickle'][game.rnd.integerInRange(0, 8)];
      var food = game.foods.create(
        10, 
        game.rnd.integerInRange(196, 440), 
        'sprites', 
        foodType
      );
      game.physics.enable(food, Phaser.Physics.ARCADE);
      food.body.velocity.setTo(400 + game.rnd.integerInRange(0, 200), 0);
      food.body.allowGravity = false;
      food.body.immovable = true;
      food.shadow = food.addChild(game.make.sprite(0, 0, 'sprites', foodType));
      food.shadow.tint = 0x000000;
      food.shadow.alpha = 0.5 * food.y / 576;
      food.shadow.scale.x = 0.75 * food.y / 576;
      food.shadow.scale.y = 0.3 * food.y / 576;
      food.shadow.x = (576 - food.y) / 10;
      food.shadow.y = 544 - food.y;
      
    });

    game.input.mouse.start();
    game.input.mouse.mouseUpCallback = function () {
      if (game.over || game.lips.y < 244) {
        return;
      }
      game.add.audio('boing' + game.rnd.integerInRange(1, 3), 0.3).play();
      game.lips.body.velocity.setTo(0, -400);
    }

  },

  update: function () {
    game.physics.arcade.collide(game.lips, game.foods, function (lips, food) {
      food.destroy();
    });
    game.lipsShadow.alpha = 0.5 * game.lips.y / 576;
    game.lipsShadow.scale.x = 0.75 * game.lips.y / 576;
    game.lipsShadow.scale.y = 0.3 * game.lips.y / 576;
    game.lipsShadow.x = 980 + (576 - game.lips.y) / 10;
    game.lips.bringToTop();
  }

}