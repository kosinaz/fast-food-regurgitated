var playState = {

  create: function () {
    
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
    game.titleMusic.pause();
    game.levelMusic = game.add.audio('level', 0.3, true).play();
  },

  update: function () {

  }

}