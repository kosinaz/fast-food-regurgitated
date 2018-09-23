var playState = {

  create: function () {

    game.over = false;
    game.hitTheGround = false;

    game.add.sprite(512, 64, 'sprites', 'top');
    game.add.sprite(512, 544, 'sprites', 'pavement');

    game.foodOrder = [];
    for (var i = 0; i < game.levels[game.level]['purple pickles']; i += 1) {
      game.foodOrder.push('purple pickle');
    }
    var totalCalorie = game.levels[game.level].calories;
    var calorie = 0;
    game.total = {
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
      game.total[food] += 1;
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
      game.total['burger'] > 0 ? 'burger on' : 'burger off');
    game.add.sprite(32 + 128, 32, 'sprites',
      game.total['hotdog'] > 0 ? 'hotdog on' : 'hotdog off');
    game.add.sprite(120, 80, 'sprites',
      game.total['hotdog'] > 0 ? 'bun on' : 'bun off');
    game.add.sprite(72 + 128, 80, 'sprites',
      game.total['hotdog'] > 0 ? 'sausage on' : 'sausage off');
    game.add.sprite(32 + 128 * 2, 32, 'sprites',
      game.total['pizza8'] > 0 ? 'pizza on' : 'pizza off');
    game.add.sprite(32 + 128 * 2, 80, 'sprites',
      game.total['pizza8'] > 0 ? 'pizza slice on' : 'pizza slice off');
    game.add.sprite(32 + 128 * 3, 32, 'sprites',
      game.total['fries'] > 0 ? 'fries on' : 'fries off');
    game.add.sprite(32 + 128 * 4, 32, 'sprites',
      game.total['cola'] > 0 ? 'cola on' : 'cola off');
    game.add.sprite(32 + 128 * 5, 32, 'sprites',
      game.total['fries'] > 0 ? 'donut on' : 'donut off');
    game.add.sprite(32 + 128 * 6, 32, 'sprites',
      game.total['hotdog'] > 0 ? 'ice cream cone on' : 'ice cream cone off');
    game.add.sprite(32 + 128 * 7, 32, 'sprites',
      game.total['pizza8'] > 0 ? 'ice cream bar on' : 'ice cream bar off');

    game.counter = {};
    game.counter['burger'] = game.add.text(80, 32, '0 / ' + game.total['burger'], game.textStyle);
    game.counter['hotdog'] = game.add.text(80 + 128, 32,
      '0 / ' + game.total['hotdog'], game.textStyle);
    game.counter['bun'] = game.add.text(152, 80, '0', game.textStyle);
    game.counter['sausage'] = game.add.text(136 + 96, 80,
      '0', game.textStyle);
    game.counter['pizza8'] = game.add.text(80 + 128 * 2, 32,
      '0 / ' + game.total['pizza8'], game.textStyle);
    game.counter['pizza1'] = game.add.text(64 + 128 * 2, 80,
      '0', game.textStyle);
    game.counter['fries'] = game.add.text(80 + 128 * 3, 32,
      '0 / ' + game.total['fries'], game.textStyle);
    game.counter['cola'] = game.add.text(80 + 128 * 4, 32,
      '0 / ' + game.total['cola'], game.textStyle);
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
      playState.createSummaryScreen();
    });

    game.levelMusic.fadeTo(500, 0.3);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 1000;

    game.lipsShadow = game.add.sprite(980, 544, 'sprites', 'lips4');
    game.lipsShadow.tint = 0x000000;

    game.lips = game.add.sprite(980, 224, 'sprites');
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
      game.hitTheGround = true;
      playState.createSummaryScreen();
    });
    game.lips.body.velocity.setTo(0, -400);

    game.time.events.repeat(10000 / game.foodOrder.length,
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

    game.jump = function () {
      if (game.over || game.lips.y < 212) {
        return;
      }
      game.add.audio('boing' + game.rnd.integerInRange(1, 3), 0.3).play();
      game.lips.body.velocity.setTo(0, -400);
    }

    game.input.mouse.start();
    game.input.mouse.mouseUpCallback = function () {
      game.jump();
    }

    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(game.jump);   

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
      if (Math.floor(game.eaten['pizza1'] / 8) > game.rewarded['ice cream bar']
       && game.eaten['cola'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar'] &&
        game.eaten['fries'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar']) {
        game.rewarded['ice cream bar'] += 1;
        rewardType = 'ice cream bar';
      }
      if (game.eaten['sausage'] > game.rewarded['ice cream cone'] &&
        game.eaten['bun'] > game.rewarded['ice cream cone'] &&
        game.eaten['cola'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar'] &&
        game.eaten['fries'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar']) {
        game.rewarded['ice cream cone'] += 1;
        rewardType = 'ice cream cone';
      }
      if (game.eaten['burger'] > game.rewarded['donut'] 
        && game.eaten['cola'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar']
        && game.eaten['fries'] > game.rewarded['donut'] + game.rewarded['ice cream cone'] + game.rewarded['ice cream bar']) {
          game.rewarded['donut'] += 1;
          rewardType = 'donut';
      }
      if (rewardType !== 'none') {
          var reward = game.foods.create(10, game.rnd.between(196, 440),
            'sprites', rewardType);
          reward.data = rewardType;
          game.physics.enable(reward, Phaser.Physics.ARCADE);
          reward.body.velocity.setTo(600, 0);
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
  },

  createSummaryScreen: function () {
    if (game.over) {
      return;
    }
    game.time.events.removeAll();
    game.timerPulse.stop();
    game.over = true;
    game.levelMusic.fadeTo(500, 0.01);
    game.lips.body.velocity.setTo(0, 0);
    game.lips.body.allowGravity = false;

    var alacarte = game.eaten['burger'] * game.calories.alacarte['burger'] +
      game.eaten['sausage'] * game.calories.component['sausage'] +
      game.eaten['bun'] * game.calories.component['bun'] +
      game.eaten['pizza1'] * game.calories.component['pizza1'] +
      game.eaten['fries'] * game.calories.alacarte['fries'] +
      game.eaten['cola'] * game.calories.alacarte['cola'];
    var reward = game.eaten['donut'] * game.calories.reward['donut'] +
      game.eaten['ice cream cone'] * game.calories.reward['ice cream cone'] +
      game.eaten['ice cream bar'] * game.calories.reward['ice cream bar'];
    var total = game.total['burger'] * game.calories.alacarte['burger'] +
      game.total['hotdog'] * game.calories.alacarte['hotdog'] +
      game.total['pizza8'] * game.calories.alacarte['pizza8'] +
      game.total['fries'] * game.calories.alacarte['fries'] +
      game.total['cola'] * game.calories.alacarte['cola'];

    game.add.text(512, 150, 'Ala Carte Calories: ' + alacarte, game.textStyle);
    game.add.text(512, 190, 'Reward Calories: ' + reward, game.textStyle);
    game.add.text(512, 230, 'Total Calories:', game.textStyle);
    var percent = Math.floor((alacarte + reward) / total * 100);
    game.add.text(512, 280, alacarte + reward + ' / ' + total + ' (' 
      + percent + '%)', game.textStyle).fontSize = 40;
    game.add.text(512, 330, 'Calories needed for the next level: 50%',
      game.textStyle);

    var restartButton = game.add.text(412, 488, 'Retry', game.style);
    restartButton.inputEnabled = true;
    restartButton.events.onInputUp.add(function () {
      game.state.restart();
    });
    restartButton.setShadow(2, 2, '#dfa8ba', 0);
    var continueButton = game.add.text(612, 488, 'Continue', game.offStyle);
    continueButton.setShadow(2, 2, '#000', 0);
    if (game.hitTheGround || percent < 50) {
      game.lips.animations.stop('eat');
      game.lips.loadTexture('sprites', 'lips4');
      game.add.audio('fail', 0.2).play();
      if (game.hitTheGround) {
        game.add.text(512, 380, 'Oh, no! You hit the ground!', game.textStyle).fontSize = 40;
        game.add.text(512, 420, 'Click on the Retry button and stay in the air by hitting the spacebar or the left mouse button!', game.textStyle);
      } else {
        game.add.text(512, 380, 'Oh, no! You failed to eat enough food!', game.textStyle).fontSize = 40;
        game.add.text(512, 420, 'Click on the Retry button and try to eat more this time!', game.textStyle);
      }
    } else {   
      game.add.audio('win', 0.2).play();
      continueButton.inputEnabled = true;
      continueButton.setStyle(game.style);
      continueButton.setShadow(2, 2, '#dfa8ba', 0);
      game.add.text(512, 380, 'Congratulations!', game.textStyle).fontSize = 40;
      if (game.level < 6) {
        game.add.text(512, 420, 'You have finished the level! Click on the Continue button to start the next level!', game.textStyle);
      } else {
        game.add.text(512, 420, 'You have finished the game! Click on the Continue button to return to the menu!', game.textStyle);
      }
      continueButton.events.onInputUp.add(function () {
        if (game.level < 6) {
          game.level += 1;
          game.state.restart();
        } else {
          game.level = 0;
          game.state.start('credits');
        }
      });
    }
  }
}