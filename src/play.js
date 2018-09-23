var playState = {

  create: function () {

    game.over = false;

    game.add.sprite(512, 64, 'sprites', 'top');
    game.add.sprite(512, 544, 'sprites', 'pavement');

    game.foodOrder = [];
    for (var i = 0; i < game.levels[game.level]['purple pickles']; i += 1) {
      game.foodOrder.push('purple pickle');
    }
    var totalCalorie = game.levels[game.level].calories;
    var calorie = 0;
    var total = {
      'burger': 0,
      'hotdog': 0,
      'pizza8': 0,
      'fries': 0,
      'cola': 0
    }
    while (calorie < totalCalorie) {
      var food =
        Phaser.ArrayUtils.getRandomItem(game.levels[game.level].alacarte);
      calorie += game.calories.alacarte[food];
      total[food] += 1;
      game.foodOrder.push(food);
    }
    Phaser.ArrayUtils.shuffle(game.foodOrder);

    game.eaten = {
      'burger': 0,
      'bun': 0,
      'sausage': 0,
      'pizza1': 0,
      'fries': 0,
      'cola': 0,
      'donut': 0,
      'ice cream cone': 0,
      'ice cream bar': 0
    };
    game.rewarded = {
      'donut': 0,
      'ice cream cone': 0,
      'ice cream bar': 0
    };
    game.foodList = [];

    game.crumbEmitter = game.add.emitter(0, 0, 100);
    game.crumbEmitter.makeParticles('sprites', 'crumbs');
    game.crumbEmitter.gravity = 1000;
    game.crumbEmitter.setScale(0.3, 0.3, 0.3, 0.3);
    game.crumbEmitter.setXSpeed(-100, -200);
    game.crumbEmitter.setYSpeed(-300, -400);
    game.add.sprite(32, 32, 'sprites',
      total['burger'] > 0 ? 'burger on' : 'burger off');
    game.add.sprite(32 + 128, 32, 'sprites',
      total['hotdog'] > 0 ? 'hotdog on' : 'hotdog off');
    game.add.sprite(120, 80, 'sprites',
      total['hotdog'] > 0 ? 'bun on' : 'bun off');
    game.add.sprite(72 + 128, 80, 'sprites',
      total['hotdog'] > 0 ? 'sausage on' : 'sausage off');
    game.add.sprite(32 + 128 * 2, 32, 'sprites',
      total['pizza8'] > 0 ? 'pizza on' : 'pizza off');
    game.add.sprite(32 + 128 * 2, 80, 'sprites',
      total['pizza8'] > 0 ? 'pizza slice on' : 'pizza slice off');
    game.add.sprite(32 + 128 * 3, 32, 'sprites',
      total['fries'] > 0 ? 'fries on' : 'fries off');
    game.add.sprite(32 + 128 * 4, 32, 'sprites',
      total['cola'] > 0 ? 'cola on' : 'cola off');
    game.add.sprite(32 + 128 * 5, 32, 'sprites',
      total['fries'] > 0 ? 'donut on' : 'donut off');
    game.add.sprite(32 + 128 * 6, 32, 'sprites',
      total['hotdog'] > 0 ? 'ice cream cone on' : 'ice cream cone off');
    game.add.sprite(32 + 128 * 7, 32, 'sprites',
      total['pizza8'] > 0 ? 'ice cream bar on' : 'ice cream bar off');

    game.counter = {};
    game.counter['burger'] = game.add.text(80, 32, '0 / ' + total['burger'], game.textStyle);
    game.counter['hotdog'] = game.add.text(80 + 128, 32,
      '0 / ' + total['hotdog'], game.textStyle);
    game.counter['bun'] = game.add.text(152, 80, '0', game.textStyle);
    game.counter['sausage'] = game.add.text(136 + 96, 80,
      '0', game.textStyle);
    game.counter['pizza8'] = game.add.text(80 + 128 * 2, 32,
      '0 / ' + total['pizza8'], game.textStyle);
    game.counter['pizza1'] = game.add.text(64 + 128 * 2, 80,
      '0', game.textStyle);
    game.counter['fries'] = game.add.text(80 + 128 * 3, 32,
      '0 / ' + total['fries'], game.textStyle);
    game.counter['cola'] = game.add.text(80 + 128 * 4, 32,
      '0 / ' + total['cola'], game.textStyle);
    game.counter['donut'] = game.add.text(64 + 128 * 5, 32,
      '0', game.textStyle);
    game.counter['ice cream cone'] = game.add.text(64 + 128 * 6,
      32, '0', game.textStyle);
    game.counter['ice cream bar'] = game.add.text(64 + 128 * 7, 32,
      '0', game.textStyle);

    game.timer = game.add.text(512, 88, '0:15', game.textStyle);
    game.timer.fontSize = 36;
    game.timerPulse = game.add.tween(game.timer).to({
      fontSize: 32
    }, 1000, "Cubic", true, 0, 15);
    game.timerLoop = game.time.events.repeat(1000, 16, function () {
      game.timer.text = '0:' + (game.timerLoop.repeatCount < 10 ? '0' : '') + game.timerLoop.repeatCount
    });
    game.time.events.add(16000, function () {
      game.level += 1;
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

    game.time.events.repeat(13000 / game.foodOrder.length,
      game.foodOrder.length,
      function () {
        if (game.over) {
          return;
        }
        var foodType = game.foodOrder.pop();
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
        if (foodType === 'hotdog') {
          game.time.events.add(500, function () {
            var sausage = game.foods.create(food.x, food.y, 'sprites', 'sausage');
            sausage.data = 'sausage';
            game.physics.enable(sausage, Phaser.Physics.ARCADE);
            sausage.body.velocity.setTo(700, 0);
            sausage.body.allowGravity = false;
            sausage.body.immovable = true;
            sausage.shadow = sausage.addChild(game.make.sprite(0, 0, 'sprites', 'sausage'));
            sausage.shadow.tint = 0x000000;
            sausage.shadow.alpha = 0.5 * sausage.y / 576;
            sausage.shadow.scale.x = 0.75 * sausage.y / 576;
            sausage.shadow.scale.y = 0.3 * sausage.y / 576;
            sausage.shadow.x = (576 - sausage.y) / 10;
            sausage.shadow.y = 544 - sausage.y;
            sausage.sendToBack();
            food.loadTexture('sprites', 'bun');
            food.data = 'bun';
          }, {
            food: food
          });
        }
        if (foodType === 'pizza8') {
          food.body.velocity.setTo(300, 0);
          var slicesLeft = 8;
          game.time.events.repeat(200, 7, function () {
            var slice = game.foods.create(food.x, food.y, 'sprites', 'pizza1');
            slice.data = 'pizza1';
            game.physics.enable(slice, Phaser.Physics.ARCADE);
            slice.body.velocity.setTo(700, game.rnd.between(-50, 50));
            slice.body.allowGravity = false;
            slice.body.immovable = true;
            slice.shadow = slice.addChild(game.make.sprite(0, 0, 'sprites', 'pizza1'));
            slice.shadow.tint = 0x000000;
            slice.shadow.alpha = 0.5 * slice.y / 576;
            slice.shadow.scale.x = 0.75 * slice.y / 576;
            slice.shadow.scale.y = 0.3 * slice.y / 576;
            slice.shadow.x = (576 - slice.y) / 10;
            slice.shadow.y = 544 - slice.y;
            slice.sendToBack();
            slicesLeft -= 1;
            food.loadTexture('sprites', 'pizza' + slicesLeft);
            if (slicesLeft === 1) {
              food.body.velocity.setTo(600, 0);
            }
            food.data = 'pizza1';
          }, {
            food: food,
            slicesLeft: slicesLeft
          });
        }
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
        game.foodList.push(food.data);
        if (food.data !== 'sausage' 
          && food.data !== 'bun' 
          && food.data !== 'pizza1') {
            game.counter[food.data].text = game.eaten[food.data] + '' +
              game.counter[food.data].text.substr(1);
        }
      }
      var rewardType = 'none';
      if (game.eaten['burger'] > game.rewarded['donut'] 
        && game.eaten['cola'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar']
        && game.eaten['fries'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar']) {
          game.rewarded['donut'] += 1;
          rewardType = 'donut';
      }
      if (game.eaten['sausage'] > game.rewarded['ice cream cone'] &&
        game.eaten['bun'] > game.rewarded['ice cream cone'] &&
        game.eaten['cola'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar'] &&
        game.eaten['fries'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar']) {
        game.rewarded['ice cream cone'] += 1;
        rewardType = 'ice cream cone';
      }
      if (Math.floor(game.eaten['pizza1'] / 8) > game.rewarded['ice cream bar']
       && game.eaten['cola'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar'] &&
        game.eaten['fries'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar']) {
        game.rewarded['ice cream bar'] += 1;
        rewardType = 'ice cream bar';
      }
      if (rewardType !== 'none') {
          var reward = game.foods.create(10, game.rnd.between(196, 440),
            'sprites', rewardType);
          reward.data = rewardType;
          game.physics.enable(reward, Phaser.Physics.ARCADE);
          reward.body.velocity.setTo(300, 0);
          reward.body.allowGravity = false;
          reward.body.immovable = true;
          reward.shadow = reward.addChild(game.make.sprite(0, 0, 'sprites', rewardType));
          reward.shadow.tint = 0x000000;
          reward.shadow.alpha = 0.5 * reward.y / 576;
          reward.shadow.scale.x = 0.75 * reward.y / 576;
          reward.shadow.scale.y = 0.3 * reward.y / 576;
          reward.shadow.x = (576 - reward.y) / 10;
          reward.shadow.y = 544 - reward.y;
      }
      game.counter['pizza8'].text = Math.floor(game.eaten['pizza1'] / 8) + '' + game.counter['pizza8'].text.substr(1);
      game.counter['pizza1'].text = (game.eaten['pizza1'] % 8);
      game.counter['hotdog'].text = Math.min(game.eaten['sausage'], game.eaten['bun']) + '' +
        game.counter['hotdog'].text.substr(1);
      game.counter['sausage'].text = (game.eaten['sausage'] - Math.min(game.eaten['sausage'], game.eaten['bun']));
      game.counter['bun'].text = (game.eaten['bun'] - Math.min(game.eaten['sausage'], game.eaten['bun']));
      game.crumbEmitter.x = lips.x;
      game.crumbEmitter.y = lips.y;
      game.crumbEmitter.start(true, 2000, null, 10);
      food.destroy();

    });
    game.lipsShadow.alpha = 0.5 * game.lips.y / 576;
    game.lipsShadow.scale.x = 0.75 * game.lips.y / 576;
    game.lipsShadow.scale.y = 0.3 * game.lips.y / 576;
    game.lipsShadow.x = 980 + (576 - game.lips.y) / 10;
    game.lips.bringToTop();
  }

}