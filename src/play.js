var playState = {

  create: function () {
    game.stage.backgroundColor = '#66b4e2';
    var mouth = game.add.sprite(980, 288, 'sprites');
    mouth.animations.add('eat', [
      'mouth_lit_64_1',
      'mouth_lit_64_2',
      'mouth_lit_64_3',
      'mouth_lit_64_4',
      'mouth_lit_64_3',
      'mouth_lit_64_2',
      'mouth_lit_64_1'
    ], 30, true);
    mouth.animations.play('eat');
  },

  update: function () {

  }

}