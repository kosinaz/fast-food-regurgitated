var playState = {

  create: function () {

    game.over = false;

    game.add.sprite(512, 64, 'sprites', 'top');
    game.add.sprite(512, 544, 'sprites', 'pavement');

    game.eaten = {
      'burger': 0,
      'hotdog': 0,
      'bun': 0,
      'sausage': 0,
      'pizza8': 0,
      'pizza1': 0,
      'fries': 0,
      'cola': 0,
      'donut': 0,
      'ice cream cone': 0,
      'ice cream bar': 0
    };
    game.foodList = [];

    game.crumbEmitter = game.add.emitter(0, 0, 100);
    game.crumbEmitter.makeParticles('sprites', 'crumbs');
    game.crumbEmitter.gravity = 1000;
    game.crumbEmitter.setScale(0.5, 0.5, 0.5, 0.5);
    game.crumbEmitter.setXSpeed(-100, -200);
    game.crumbEmitter.setYSpeed(-300, -400);

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

    game.counter = {};
    game.counter['burger'] = game.add.text(80, 32, '0 / 9', game.textStyle);
    game.counter['hotdog'] = game.add.text(80 + 128, 32, 
      '0 / 0', game.textStyle);
    game.counter['bun'] = game.add.text(152, 80, '0', game.textStyle);
    game.counter['sausage'] = game.add.text(136 + 96, 80, 
      '0', game.textStyle);
    game.counter['pizza8'] = game.add.text(80 + 128 * 2, 32, 
      '0 / 0', game.textStyle);
    game.counter['pizza1'] = game.add.text(64 + 128 * 2, 80, 
      '0', game.textStyle);
    game.counter['fries'] = game.add.text(80 + 128 * 3, 32, 
      '0 / 0', game.textStyle);
    game.counter['cola'] = game.add.text(80 + 128 * 4, 32, 
      '0 / 9', game.textStyle);
    game.counter['donut'] = game.add.text(80 + 128 * 5, 32, 
      '0 / 0', game.textStyle);
    game.counter['ice cream cone'] = game.add.text(80 + 128 * 6,
      32, '0 / 0', game.textStyle);
    game.counter['ice cream bar'] = game.add.text(80 + 128 * 7, 32,
      '0 / 0', game.textStyle);
  
    game.timer = game.add.text(512, 88, '0:15', game.textStyle);
    game.timer.fontSize = 36;
    game.timerPulse = game.add.tween(game.timer).to({
      fontSize: 32
    }, 1000, "Cubic", true, 0, 15);
    game.timerLoop = game.time.events.repeat(1000, 16, function () {
      game.timer.text = '0:' + (game.timerLoop.repeatCount < 10 ? '0' : '') + game.timerLoop.repeatCount
    });
    game.time.events.add(16000, function () {
      game.state.restart();
    });

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
      game.time.events.removeAll();
      game.timerPulse.stop();
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
      var foodType = ['burger', 'bun', 'sausage', 'pizza1', 'fries', 'cola', 'donut',
        'ice cream cone', 'ice cream bar', 'purple pickle'][game.rnd.integerInRange(0, 9)];
      var food = game.foods.create(
        10, 
        game.rnd.integerInRange(196, 440), 
        'sprites', 
        foodType
      );
      food.data = foodType;
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
      if (game.over || game.lips.y < 212) {
        return;
      }
      game.add.audio('boing' + game.rnd.integerInRange(1, 3), 0.3).play();
      game.lips.body.velocity.setTo(0, -400);
    }

  },

  update: function () {
    game.physics.arcade.collide(game.lips, game.foods, function (lips, food) { 
      if (food.data === 'purple pickle') {
        for (var i = 0; i < 3; i += 1) {
          if (game.foodList.length > 0) {
            var burped = game.foodList.pop();
            game.eaten[burped] -= 1;
            game.counter[burped].text = game.eaten[burped] + '' +
              game.counter[burped].text.substr(1);  
            var leftOver = game.add.sprite(lips.x, lips.y, 'sprites', burped + ' left-over');
            game.physics.enable(leftOver);
            leftOver.body.velocity.x = -250 + ((i + 1) % 2) * 50;
            leftOver.body.velocity.y = -50 * i - 300;

          }        
        }        
      } else {
        game.eaten[food.data] += 1;
        game.counter[food.data].text = game.eaten[food.data] + '' + 
          game.counter[food.data].text.substr(1);
        game.foodList.push(food.data);
      }
      game.crumbEmitter.x = lips.x;
      game.crumbEmitter.y = lips.y;
      game.crumbEmitter.start(true, 2000, null, 3);
      food.destroy();

    });
    game.lipsShadow.alpha = 0.5 * game.lips.y / 576;
    game.lipsShadow.scale.x = 0.75 * game.lips.y / 576;
    game.lipsShadow.scale.y = 0.3 * game.lips.y / 576;
    game.lipsShadow.x = 980 + (576 - game.lips.y) / 10;
    game.lips.bringToTop();
  }

}