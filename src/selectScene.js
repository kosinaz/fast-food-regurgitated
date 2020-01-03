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
    this.add.container(-305, 270, [
      this.add.image(0, 0, 'game', 'widewindow'),
      this.add.text(0, -210, 'Select Level', {
        fontSize: '50px',
        fontFamily: 'font',
      }).setOrigin(0.5).setStroke('#911315', 6),
      this.add.container(0, 0),
      this.add.image(-5, 235, 'game', 'home').setInteractive().once(
          'pointerup', () => this.tweens.add({
            targets: this.children.list[0].list[3],
            scale: 0.8,
            ease: 'Quad',
            duration: 70,
            yoyo: true,
            onComplete: () => {
              this.tweens.add({
                targets: this.children.list[0],
                x: -305,
                ease: 'Quad',
                duration: 150,
                onComplete: () => {
                  this.scene.stop();
                  this.scene.run('HomeScene');
                },
              });
              this.tweens.add({
                targets: this.children.list[1],
                x: 1220,
                ease: 'Quad',
                duration: 150,
              });
            },
          })),
    ]);
    for (let i = 0; i < 3; i += 1) {
      this.children.list[0].list[2].add(this.add.container(0, 0, [
        this.add.image(0, 0, 'game', i ? 'button' : 'buttonon'),
        this.add.text(-4, -10, (i + 1), {
          fontSize: '80px',
          fontFamily: 'font',
        }).setOrigin(0.5).setStroke(i ? '#6dc300' : '#cc191c', 6),
      ]).setData('run', 'LevelScene').setData('level', i));
    }
    for (let i = 3; i < 15; i += 1) {
      this.children.list[0].list[2].add(this.add.container(0, 0, [
        this.add.image(0, 0, 'game', 'locked'),
      ]));
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
      x: 320,
      ease: 'Bounce',
      duration: 600,
    });
    this.add.container(1220, 270, [
      this.add.image(0, 0, 'game', 'levelwindow'),
      this.add.image(-8, 235, 'game', 'next').setInteractive().once(
          'pointerup', () => this.tweens.add({
            targets: this.children.list[1].list[1],
            scale: 0.8,
            ease: 'Quad',
            duration: 70,
            yoyo: true,
            onComplete: () => this.cameras.main.fadeOut(300),
          })),
      this.add.text(0, -210, 'Level 1', {
        fontSize: '50px',
        fontFamily: 'font',
      }).setOrigin(0.5).setStroke('#911315', 6),
      this.add.sprite(-8, -100, 'game', 'star'),
      this.add.sprite(-110, -65, 'game', 'star').setScale(0.75),
      this.add.sprite(96, -65, 'game', 'star').setScale(0.75),
      this.add.sprite(-8, 50, 'game', 'burger').setScale(0.5),
      this.add.text(12, 60, 3, {
        fontSize: '40px',
        fontFamily: 'font',
      }).setOrigin(0.5).setStroke('#efb469', 4),
    ]).setData('level', 0);
    this.tweens.add({
      targets: this.children.list[1],
      x: 825,
      ease: 'Bounce',
      duration: 600,
    });
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.stop('HomeScene');
      this.scene.start('LevelScene', {
        level: this.children.list[1].getData('level'),
      });
    });
  }
}
