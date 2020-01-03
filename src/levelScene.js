/**
 * Represent the home screen of the game.
 *
 * @export
 * @class LevelScene
 * @extends {Phaser.Scene}
 */
export default class LevelScene extends Phaser.Scene {
  /**
   * Creates an instance of LevelScene.
   * @memberof LevelScene
   */
  constructor() {
    super('LevelScene');
  }

  /**
   * Creates the content of the LevelScene.
   *
   * @param {*} data
   * @memberof LevelScene
   */
  create(data) {
    this.cameras.main.fadeIn(100);
    console.log(data);
    this.anims.create({
      key: 'lips',
      frames: this.anims.generateFrameNames('game', {
        prefix: 'lips',
        end: 5,
      }),
      yoyo: true,
      repeat: -1,
    });
    this.add.sprite(100, 300, 'game').play('lips');
    this.add.sprite(600, 300, 'game', 'burger');
  }
}
