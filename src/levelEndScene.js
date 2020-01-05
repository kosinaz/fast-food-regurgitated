import Button from './button.js';

/**
 * Represent the level complete modal of the level scene.
 *
 * @export
 * @class LevelEndScene
 * @extends {Phaser.Scene}
 */
export default class LevelEndScene extends Phaser.Scene {
  /**
   * Creates an instance of LevelEndScene.
   * @memberof LevelEndScene
   */
  constructor() {
    super('LevelEndScene');
  }

  /**
   * Creates the content of the LevelEndScene.
   *
   * @param {*} data
   * @memberof LevelEndScene
   */
  create(data) {
    const levelBg = this.add.image(0, 0, 'game', 'levelwindow');
    const title = data.n > 3 ? 'Level complete' : 'Level failed';
    const levelTitle = this.add.text(0, -210, title, {
      fontSize: '50px',
      fontFamily: 'font',
    });
    levelTitle.setOrigin(0.5);
    levelTitle.setStroke('#911315', 6);
    const star1 = this.add.image(0, 0, 'game', 'star');
    star1.setScale(0);
    const star2 = this.add.image(-102, 35, 'game', 'star');
    star2.setScale(0);
    const star3 = this.add.image(104, 35, 'game', 'star');
    star3.setScale(0);
    const stars = this.add.container(-8, -100, [star1, star2, star3]);
    const burgerImage = this.add.image(0, 0, 'game', 'burger');
    const burgerNumber = this.add.text(20, 10, 4, {
      fontSize: '40px',
      fontFamily: 'font',
    });
    burgerNumber.setOrigin(0.5);
    burgerNumber.setStroke('#efb469', 4);
    const burgerMax = this.add.text(0, -25, data.n + '/7', {
      fontSize: '40px',
      fontFamily: 'font',
    });
    burgerMax.setOrigin(0.5);
    burgerMax.setStroke('#efb469', 4);
    const burgerContent = [burgerImage, burgerNumber, burgerMax];
    const burger = this.add.container(-8, 50, burgerContent);
    let to = 'LevelScene';
    const back = new Button(this, -102, 0, 'game', 'back', () =>
      this.cameras.main.fadeOut(300),
    );
    back.disableInteractive();
    const select = new Button(this, 0, 0, 'game', 'select', () => {
      this.cameras.main.fadeOut(300);
      to = 'SelectScene';
    });
    select.disableInteractive();
    let next;
    if (data.n > 3) {
      next = new Button(this, 104, 0, 'game', 'next', () =>
        this.cameras.main.fadeOut(300),
      );
      next.disableInteractive();
    } else {
      next = this.add.image(104, 0, 'game', 'stop');
    }
    const buttons = this.add.container(-8, 230, [back, select, next]);
    const levelContent = [levelBg, levelTitle, stars, burger, buttons];
    const levelModal = this.add.container(512, -500, levelContent);
    this.tweens.timeline({
      onComplete: () => {
        back.setInteractive();
        select.setInteractive();
        next.setInteractive();
      },
      tweens: [{
        targets: levelModal,
        y: 270,
        ease: 'Bounce',
        duration: 600,
      },
      {
        targets: star2,
        scale: data.n > 3 ? 0.75 : 0,
        ease: 'Quad',
        duration: 70,
      },
      {
        targets: star3,
        scale: data.n > 5 ? 0.75 : 0,
        ease: 'Quad',
        duration: 70,
      },
      {
        targets: star1,
        scale: data.n === 7 ? 1 : 0,
        ease: 'Quad',
        duration: 70,
      }],
    });
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.stop('LevelStartScene');
      this.scene.stop('LevelEndScene');
      this.scene.stop('LevelScene');
      this.scene.start(to, {
        level: 1,
      });
    });
  }
}
