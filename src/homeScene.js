import Button from './button.js';

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
    const title = this.add.text(0, 0, 'Fast Food', {
      fontSize: '200px',
      fontFamily: 'font',
      color: '#b6e84b',
    });
    title.setOrigin(0.5);
    title.setStroke('#fff', 36);
    title.setShadow(4, 8, '#444', 2, true, true);
    const subtitle = this.add.text(0, 175, 'Regurgitated', {
      fontSize: '160px',
      fontFamily: 'font',
      color: '#7d4375',
    });
    subtitle.setOrigin(0.5);
    subtitle.setStroke('#fff', 25);
    subtitle.setShadow(3, 6, '#444', 2, true, true);
    const titles = this.add.container(512, 125, [title, subtitle]);
    const play = new Button(this, -250, 0, 'game', 'play');
    play.on('click', () =>
      this.scene.transition({
        target: 'SelectScene',
        duration: 200,
      }),
    );
    const score = new Button(this, -125, 0, 'game', 'score');
    score.on('click', () =>
      this.scene.transition({
        target: 'ScoreScene',
        duration: 200,
      }),
    );
    const trophy = new Button(this, 0, 0, 'game', 'trophy');
    trophy.on('click', () =>
      this.scene.transition({
        target: 'TrophyScene',
        duration: 200,
      }),
    );
    const info = new Button(this, 125, 0, 'game', 'info');
    info.on('click', () =>
      this.scene.transition({
        target: 'InfoScene',
        duration: 200,
      }),
    );
    const settings = new Button(this, 250, 0, 'game', 'settings');
    settings.on('click', () =>
      this.scene.transition({
        target: 'SettingsScene',
        duration: 200,
      }),
    );
    const buttons = [play, score, trophy, info, settings];
    const container = this.add.container(512, 485, buttons);
    this.events.on('transitionout', () => {
      this.tweens.add({
        targets: container,
        y: 625,
        ease: 'Quad',
        duration: 200,
      });
      this.tweens.add({
        targets: titles,
        scale: 0,
        ease: 'Quad',
        duration: 200,
      });
    });
    this.events.on('transitionstart', () => {
      this.tweens.add({
        targets: container,
        y: {
          from: 625,
          to: 485,
        },
        ease: 'Bounce',
        duration: 600,
      });
      this.tweens.add({
        targets: titles,
        scale: {
          from: 0,
          to: 1,
        },
        ease: 'Bounce',
        duration: 600,
      });
    });
  }
}
