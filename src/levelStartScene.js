/**
 * Represent the level introduction modal of the level scene.
 *
 * @export
 * @class LevelStartScene
 * @extends {Phaser.Scene}
 */
export default class LevelStartScene extends Phaser.Scene {
  /**
   * Creates an instance of LevelStartScene.
   * @memberof LevelStartScene
   */
  constructor() {
    super('LevelStartScene');
  }

  /**
   * Creates the content of the LevelStartScene.
   *
   * @memberof LevelStartScene
   */
  create() {
    this.cameras.main.fadeIn(100);
    const up = this.add.image(0, -90, 'game', 'up');
    const tap =
      this.add.text(0, 0, 'Tap on the screen\nor press any key\nrepeatedly', {
        fontSize: '40px',
        fontFamily: 'font',
        align: 'center',
      });
    tap.setOrigin(0.5);
    tap.setStroke('#00b0dc', 4);
    const taptip = this.add.container(200, 350, [up, tap]);
    const left = this.add.image(-35, 20, 'game', 'left');
    const eat =
      this.add.text(0, 0, 'Eat these', {
        fontSize: '40px',
        fontFamily: 'font',
        align: 'center',
      });
    eat.setStroke('#00b0dc', 4);
    const eattip = this.add.container(160, 20, [left, eat]);
    const down = this.add.image(0, 50, 'game', 'down');
    const avoid =
      this.add.text(0, 0, 'Avoid this', {
        fontSize: '40px',
        fontFamily: 'font',
        align: 'center',
      });
    avoid.setOrigin(0.5);
    avoid.setStroke('#00b0dc', 4);
    const avoidtip = this.add.container(700, 470, [down, avoid]);
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
  }
}
