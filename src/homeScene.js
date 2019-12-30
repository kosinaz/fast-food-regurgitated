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
   * @memberof LoadScene
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
    this.add.image(262, 485, 'game', 'next');
    this.add.image(387, 485, 'game', 'score');
    this.add.image(512, 485, 'game', 'trophy');
    this.add.image(637, 485, 'game', 'info');
    this.add.image(762, 485, 'game', 'settings');
  }
}
