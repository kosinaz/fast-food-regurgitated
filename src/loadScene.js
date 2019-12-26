/**
 * Represent the load screen of the game.
 *
 * @export
 * @class LoadScene
 * @extends {Phaser.Scene}
 */
export default class LoadScene extends Phaser.Scene {
  /**
   * Creates an instance of LoadScene.
   * @memberof LoadScene
   */
  constructor() {
    /* Create the LoadScene with a pre-preloaded package of the progress bar
    parts, to display it while all the other assets are loading. */
    super({
      key: 'LoadScene',
      pack: {
        files: [
          {
            type: 'image',
            key: 'bar',
            url: 'image/load/bar.png',
          },
          {
            type: 'image',
            key: 'barborder',
            url: 'image/load/barborder.png',
          },
        ],
      },
    });
  }

  /**
   * Loads all the assets while the pre-preloaded progress bar shows the
   * progress of the loading.
   *
   * @memberof LoadScene
   */
  preload() {
    this.add.container(512, 288, [
      this.add.image(0, 0, 'barborder'),
      this.add.image(10, -4, 'bar'),
      this.add.text(-95, -55, 'Loading...', {
        fontSize: '36px',
        fontFamily: 'font',
      }),
    ]).list[1].frame.cutWidth = 0;
    this.load.on('progress', (value) => {
      this.tweens.add({
        targets: this.children.list[0].list[1].frame,
        cutWidth: this.children.list[0].list[1].width * value,
        ease: 'Quad',
        duration: 300,
      });
    });
    this.load.atlas('game', 'image/game.png', 'image/game.json');
    this.load.audio('title', 'audio/title.mp3');
    this.load.audio('level', 'audio/level.mp3');
    this.load.audio('boing1', 'audio/boing1.mp3');
    this.load.audio('boing2', 'audio/boing2.mp3');
    this.load.audio('boing3', 'audio/boing3.mp3');
    this.load.audio('fail', 'audio/fail.mp3');
    this.load.audio('win', 'audio/win.mp3');
    this.load.audio('hit1', 'audio/hit1.mp3');
    this.load.audio('hit2', 'audio/hit2.mp3');
    this.load.audio('hit3', 'audio/hit3.mp3');
    this.load.audio('burp', 'audio/burp.mp3');
    this.load.audio('eat', 'audio/eat.mp3');
    this.load.audio('drink', 'audio/drink.mp3');
    this.load.audio('sausage', 'audio/sausage.mp3');
    this.load.audio('pizza1', 'audio/pizza1.mp3');
    this.load.audio('pizza2', 'audio/pizza2.mp3');
    this.load.audio('news', 'audio/news.mp3');
    this.load.audio('news hit', 'audio/news hit.mp3');
    this.load.audio('neon', 'audio/neon.mp3');
    this.load.audio('splat', 'audio/splat.mp3');
    this.load.json('calories', 'data/calories.json');
    this.load.json('levels', 'data/levels.json');
  }

  /**
   * Creates the start button.
   *
   * @memberof LoadScene
   */
  create() {
    this.tweens.add({
      targets: this.children.list[0],
      scale: 0,
      ease: 'Quint.easeIn',
      duration: 300,
      onComplete: () => {
        this.children.list[0].destroy();
        this.add.container(512, 288, [
          this.add.image(0, 0, 'game', 'button'),
          this.add.text(0, -6, 'Start', {
            fontSize: '42px',
            fontFamily: 'font',
          }),
        ]).scale = 0;
        this.children.list[0].list[1].setOrigin(0.5);
        this.tweens.add({
          targets: this.children.list[0],
          scale: 1,
          ease: 'Bounce',
          duration: 300,
        });
      },
    });
  }
}
