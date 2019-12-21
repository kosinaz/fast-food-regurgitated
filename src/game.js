import LoadScene from './loadScene.js';
// import TitleScene from './titleScene.js';
// import MenuScene from './menuScene.js';
// import LevelScene from './levelScene.js';
// import EndScene from './endScene.js';
// import ScoreScene from './scoreScene.js';
// import CreditsScene from './creditsScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    width: 1024,
    height: 576,
  },
  scene: [
    LoadScene,
    // TitleScene,
    // MenuScene,
    // LevelScene,
    // EndScene,
    // ScoreScene,
    // CreditsScene,
  ],
});
