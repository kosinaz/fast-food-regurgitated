import Button from './button.js';

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
    const levelBg = this.add.image(0, 0, 'game', 'levelwindow');
    const levelTitle =
      this.add.text(0, -210, 'Level ' + (this.data.get('selected') + 1), {
        fontSize: '50px',
        fontFamily: 'font',
      });
    levelTitle.setOrigin(0.5);
    levelTitle.setStroke('#911315', 6);
    const star1 = this.add.image(0, 0, 'game', 'star');
    const star2 = this.add.image(-102, 35, 'game', 'star');
    star2.setScale(0.75);
    const star3 = this.add.image(104, 35, 'game', 'star');
    star3.setScale(0.75);
    const stars = this.add.container(-8, -100, [star1, star2, star3]);
    const burgerImage = this.add.image(0, 0, 'game', 'burger');
    const burgerNumber = this.add.text(20, 10, 4, {
      fontSize: '40px',
      fontFamily: 'font',
    });
    burgerNumber.setOrigin(0.5);
    burgerNumber.setStroke('#efb469', 4);
    const burger = this.add.container(-8, 50, [burgerImage, burgerNumber]);
    const select = new Button(this, -102, 0, 'game', 'select');
    select.on('click', () => {
      this.scene.stop('LevelHintScene');
      this.cameras.main.fadeOut(300);
    });
    const next = new Button(this, 104, 0, 'game', 'next');
    next.on('click', () => {
      this.tweens.add({
        targets: levelStartWindow,
        y: -500,
        ease: 'Quad',
        duration: 600,
        onComplete: () => {
          this.scene.run('LevelHintScene');
          this.scene.stop('LevelStartScene');
        },
      });
    });
    const buttons = this.add.container(-8, 230, [select, next]);
    const levelContent = [levelBg, levelTitle, stars, burger, buttons];
    const levelStartWindow = this.add.container(512, 270, levelContent);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.stop('LevelStartScene');
      this.scene.stop('LevelHintScene');
      this.scene.stop('LevelEndScene');
      this.scene.stop('LevelScene');
      this.scene.start('SelectScene');
    });
  }
}
