/**
 * Represent the level selection screen of the game.
 *
 * @export
 * @class SelectScene
 * @extends {Phaser.Scene}
 */
export default class SelectScene extends Phaser.Scene {
  /**
   * Creates an instance of SelectScene.
   * @memberof SelectScene
   */
  constructor() {
    super('SelectScene');
  }

  /**
   * Creates the content of the SelectScene.
   *
   * @memberof SelectScene
   */
  create() {
    this.add.container(512, 270, [
      this.add.image(0, 0, 'game', 'widewindow'),
      this.add.text(0, -210, 'Select Level', {
        fontSize: '50px',
        fontFamily: 'font',
      }).setOrigin(0.5).setStroke('#911315', 6),
      this.add.container(0, 0),
      this.add.image(183, 235, 'game', 'next'),
      this.add.image(-183, 235, 'game', 'home').setInteractive().once(
          'pointerup', () => this.tweens.add({
            targets: this.children.list[0].list[4],
            scale: 0.8,
            ease: 'Quad',
            duration: 70,
            yoyo: true,
            onComplete: () => this.tweens.add({
              targets: this.children.list[0],
              scale: 0,
              ease: 'Quad',
              duration: 150,
              onComplete: () => {
                this.scene.stop();
                this.scene.run('HomeScene');
              },
            }),
          })),
    ]).scale = 0;
    for (let i = 0; i < 15; i += 1) {
      this.children.list[0].list[2].add(this.add.container(0, 0, [
        this.add.image(0, 0, 'game', 'button'),
        this.add.text(-4, -10, (i + 1), {
          fontSize: '80px',
          fontFamily: 'font',
        }).setOrigin(0.5).setStroke('#6dc300', 6),
      ]).setData('run', 'LevelScene').setData('level', i));
    }
    // eslint-disable-next-line new-cap
    Phaser.Actions.GridAlign(this.children.list[0].list[2].list, {
      width: 5,
      height: 3,
      cellWidth: 110,
      cellHeight: 100,
      x: -170,
      y: -30,
    });
    this.tweens.add({
      targets: this.children.list[0],
      scale: 1,
      ease: 'Bounce',
      duration: 300,
    });
  }
}
