import Button from './button.js';

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
    this.data.set('selected', 2);
    const selectBg = this.add.image(0, 0, 'game', 'widewindow');
    const selectTitle = this.add.text(0, -210, 'Select Level', {
      fontSize: '50px',
      fontFamily: 'font',
    });
    selectTitle.setOrigin(0.5);
    selectTitle.setStroke('#911315', 6);
    const levels = this.add.container(0, 0);
    const home = new Button(this, -9, 235, 'game', 'home');
    home.on('click', () => {
      this.scene.transition({
        target: 'HomeScene',
        duration: 300,
      });
      this.data.events.off('changedata-selected');
    });
    this.events.on('transitionout', () => {
      this.tweens.add({
        targets: selectWindow,
        x: -305,
        ease: 'Quad',
        duration: 300,
      });
    });
    const selectContent = [selectBg, selectTitle, levels, home];
    const selectWindow = this.add.container(-305, 270, selectContent);
    for (let i = 0; i < 15; i += 1) {
      const button = new Button(this, 0, 0, 'game', 'button', i + 1);
      button.on('click', () => {
        this.cameras.main.fadeOut(300);
      });
      levels.add(button);
    }
    for (let i = 3; i < 15; i += 1) {
      levels.list[i].lock();
    }
    // eslint-disable-next-line new-cap
    Phaser.Actions.GridAlign(levels.list, {
      width: 5,
      height: 3,
      cellWidth: 110,
      cellHeight: 100,
      x: -222,
      y: -78,
    });
    this.tweens.add({
      targets: selectWindow,
      x: 320,
      ease: 'Bounce',
      duration: 600,
    });
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.stop('HomeScene');
      this.data.events.off('changedata-selected');
      this.scene.start('LevelScene', {
        level: 1,
      });
    });
  }
}
