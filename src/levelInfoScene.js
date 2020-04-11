import Button from './button.js';

/**
 * Represent the level complete modal of the level scene.
 *
 * @export
 * @class LevelInfoScene
 * @extends {Phaser.Scene}
 */
export default class LevelInfoScene extends Phaser.Scene {
  /**
   * Creates an instance of LevelInfoScene.
   * @memberof LevelInfoScene
   */
  constructor() {
    super('LevelInfoScene');
  }

  /**
   * Creates the content of the LevelInfoScene.
   *
   * @param {*} data
   * @memberof LevelInfoScene
   */
  create(data) {
    const levelBg = this.add.image(0, 0, 'game', 'levelwindow');
    const title = data.n > 3 ? 'Level complete' : 'Level failed';
    const levelTitle = this.add.text(0, -210, title, {
      fontSize: '40px',
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
    const select = new Button(this, -102, 0, 'game', 'select');
    select.on('click', () => {
      this.cameras.main.fadeOut(300);
      to = 'SelectScene';
    });
    select.disableInteractive();
    const play = new Button(this, 0, 0, 'game', 'play');
    play.on('click', () =>
      this.cameras.main.fadeOut(300),
    );
    play.disableInteractive();
    const next = new Button(this, 104, 0, 'game', 'next');
    next.on('click', () =>
      this.cameras.main.fadeOut(300),
    );
    if (data.n < 4) {
      next.lock();
    }
    const buttons = this.add.container(-8, 230, [select, play, next]);
    const levelContent = [levelBg, levelTitle, stars, burger, buttons];
    const levelEndWindow = this.add.container(512, -500, levelContent);
    this.tweens.timeline({
      onComplete: () => {
        back.setInteractive();
        select.setInteractive();
        next.setInteractive();
      },
      tweens: [{
        targets: levelEndWindow,
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
      this.scene.stop('LevelInfoScene');
      this.scene.stop('LevelScene');
      this.scene.start(to, {
        level: 1,
      });
    });
  }
}
