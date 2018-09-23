/**
 * Create the game with a 1024*576 screen size.
 */ 
var game = new Phaser.Game(1024, 576, Phaser.AUTO, '');

/**
 * Create the game states.
 */ 
game.state.add('load', loadState, true);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('credits', creditsState);

PIXI.Sprite.defaultAnchor = {
  x: 0.5,
  y: 0.5
}

game.style = {
  alig: 'center',
  fill: '#fbf5f7',
  font: 'bold 24pt Arial'
};

game.offStyle = {
  alig: 'center',
  fill: '#666666',
  font: 'bold 24pt Arial'
};

game.textStyle = {
  fill: '#ff0',
  font: 'bold 16pt Arial'
};