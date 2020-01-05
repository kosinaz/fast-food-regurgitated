import LoadScene from './loadScene.js';
import HomeScene from './homeScene.js';
import SelectScene from './selectScene.js';
import LevelScene from './levelScene.js';
import LevelStartScene from './levelStartScene.js';
import LevelEndScene from './levelEndScene.js';
// import ScoreScene from './scoreScene.js';
// import CreditsScene from './creditsScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#4adbff',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 1800,
      },
    },
  },
  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    width: 1024,
    height: 576,
  },
  scene: [
    LoadScene,
    HomeScene,
    SelectScene,
    LevelScene,
    LevelStartScene,
    LevelEndScene,
    // ScoreScene,
    // CreditsScene,
  ],
});
