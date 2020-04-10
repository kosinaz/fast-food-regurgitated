/**
 * Represent the hints of the level scene.
 *
 * @export
 * @class LevelHintScene
 * @extends {Phaser.Scene}
 */
export default class LevelHintScene extends Phaser.Scene {
  /**
   * Creates an instance of LevelHintScene.
   * @memberof LevelHintScene
   */
  constructor() {
    super('LevelHintScene');
  }

  /**
   * Creates the content of the LevelHintScene.
   *
   * @memberof LevelHintScene
   */
  create() {
    const up = this.add.image(0, -70, 'game', 'up');
    const tap =
      this.add.text(0, 0, 'Tap on the screen\nor press any key\nrepeatedly', {
        fontSize: '30px',
        fontFamily: 'font',
        align: 'center',
      });
    tap.setOrigin(0.5);
    tap.setStroke('#00b0dc', 4);
    const taptip = this.add.container(200, 325, [up, tap]);
    const left = this.add.image(-35, 15, 'game', 'left');
    const eat = this.add.text(0, 0, 'Eat these', {
      fontSize: '30px',
      fontFamily: 'font',
      align: 'center',
    });
    eat.setStroke('#00b0dc', 4);
    const eattip = this.add.container(160, 20, [left, eat]);
    const down = this.add.image(0, 50, 'game', 'down');
    const avoid = this.add.text(0, 0, 'Avoid this', {
      fontSize: '30px',
      fontFamily: 'font',
      align: 'center',
    });
    avoid.setOrigin(0.5);
    avoid.setStroke('#00b0dc', 4);
    const avoidtip = this.add.container(850, 470, [down, avoid]);
    this.input.on('pointerup', () => {
      this.scene.resume('LevelScene');
      this.tweens.add({
        targets: [taptip, eattip, avoidtip],
        alpha: 0,
        duration: 100,
        onComplete: () => this.scene.pause(),
      });
    });
    this.input.keyboard.on('keyup', () => {
      this.scene.resume('LevelScene');
      this.tweens.add({
        targets: [taptip, eattip, avoidtip],
        alpha: 0,
        duration: 100,
        onComplete: () => this.scene.pause(),
      });
    });
    this.scene.pause();
  }
}
