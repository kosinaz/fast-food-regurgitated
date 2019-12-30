/**
 * Represent the home screen of the game.
 *
 * @export
 * @class HomeScene
 * @extends {Phaser.Scene}
 */
export default class HomeScene extends Phaser.Scene {
  /**
   * Creates an instance of HomeScene.
   * @memberof HomeScene
   */
  constructor() {
    super('HomeScene');
  }

  /**
   * Creates the content of the HomeScene.
   *
   * @memberof HomeScene
   */
  create() {
    this.cameras.main.fadeIn(100);
    this.add.text(512, 125, 'Fast Food', {
      fontSize: '200px',
      fontFamily: 'font',
      color: '#b6e84b',
    })
        .setOrigin(0.5)
        .setStroke('#fff', 36)
        .setShadow(4, 8, '#444', 2, true, true);
    this.add.text(512, 300, 'Regurgitated', {
      fontSize: '160px',
      fontFamily: 'font',
      color: '#7d4375',
    })
        .setOrigin(0.5)
        .setStroke('#fff', 25)
        .setShadow(3, 6, '#444', 2, true, true);
    this.add.container(512, 485, [
      this.add.image(-250, 0, 'game', 'next').setData('run', 'SelectScene'),
      this.add.image(-125, 0, 'game', 'score').setData('run', 'ScoreScene'),
      this.add.image(0, 0, 'game', 'trophy').setData('run', 'TrophyScene'),
      this.add.image(125, 0, 'game', 'info').setData('run', 'InfoScene'),
      this.add.image(250, 0, 'game', 'settings')
          .setData('run', 'SettingsScene'),
    ]).each((image) => {
      image.setInteractive();
      image.on('pointerup', () => this.tweens.add({
        targets: image,
        scale: 0.8,
        ease: 'Quad',
        duration: 70,
        yoyo: true,
        onComplete: () => {
          this.scene.pause();
          this.scene.run(image.getData('run'));
        },
      }));
    });
  }
}
