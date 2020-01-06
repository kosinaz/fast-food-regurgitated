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
    const selectBg = this.add.image(0, 0, 'game', 'widewindow');
    const selectTitle = this.add.text(0, -210, 'Select Level', {
      fontSize: '50px',
      fontFamily: 'font',
    });
    selectTitle.setOrigin(0.5);
    selectTitle.setStroke('#911315', 6);
    const levels = this.add.container(0, 0);
    const home = new Button(this, -115, 235, 'game', 'home', () =>
      this.scene.transition({
        target: 'HomeScene',
        duration: 300,
      }),
    );
    const next = new Button(this, 106, 235, 'game', 'next', () =>
      this.cameras.main.fadeOut(300),
    );
    this.events.on('transitionout', () => {
      this.tweens.add({
        targets: selectModal,
        x: -305,
        ease: 'Quad',
        duration: 300,
      });
      this.tweens.add({
        targets: levelModal,
        x: 1220,
        ease: 'Quad',
        duration: 300,
      });
    });
    const selectContent = [selectBg, selectTitle, levels, home, next];
    const selectModal = this.add.container(-305, 270, selectContent);
    for (let i = 0; i < 15; i += 1) {
      const button = new Button(this, 0, 0, 'game', 'button', (selected) => {
        levels.each((button) => {
          button.deselect();
        });
        selected.select();
      }, i + 1, i);
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
      x: -170,
      y: -30,
    });
    this.tweens.add({
      targets: selectModal,
      x: 320,
      ease: 'Bounce',
      duration: 600,
    });
    const levelBg = this.add.image(0, 0, 'game', 'levelwindow');
    const levelTitle = this.add.text(0, -210, 'Level 1', {
      fontSize: '50px',
      fontFamily: 'font',
    });
    levelTitle.setOrigin(0.5);
    levelTitle.setStroke('#911315', 6);
    const star1 = this.add.image(-8, -100, 'game', 'star');
    const star2 = this.add.image(-110, -65, 'game', 'star');
    star2.setScale(0.75);
    const star3 = this.add.image(96, -65, 'game', 'star');
    star3.setScale(0.75);
    const burgerImage = this.add.image(0, 0, 'game', 'burger');
    const burgerNumber = this.add.text(20, 10, 4, {
      fontSize: '40px',
      fontFamily: 'font',
    });
    burgerNumber.setOrigin(0.5);
    burgerNumber.setStroke('#efb469', 4);
    const burger = this.add.container(-8, 50, [burgerImage, burgerNumber]);
    const levelContent = [levelBg, levelTitle, star1, star2, star3, burger];
    const levelModal = this.add.container(1220, 270, levelContent);
    this.tweens.add({
      targets: levelModal,
      x: 825,
      ease: 'Bounce',
      duration: 600,
    });
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.stop('HomeScene');
      this.scene.start('LevelScene', {
        level: 1,
      });
    });
  }
}
