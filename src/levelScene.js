/**
 * Represent the home screen of the game.
 *
 * @export
 * @class LevelScene
 * @extends {Phaser.Scene}
 */
export default class LevelScene extends Phaser.Scene {
  /**
   * Creates an instance of LevelScene.
   * @memberof LevelScene
   */
  constructor() {
    super('LevelScene');
  }

  /**
   * Creates the content of the LevelScene.
   *
   * @param {*} data
   * @memberof LevelScene
   */
  create(data) {
    this.cameras.main.fadeIn(100);
    this.add.tileSprite(1024, 200, 2048, 400, 'bg', 'layer7');
    this.add.tileSprite(512, 475, 1024, 150, 'bg', 'layer6');
    this.add.tileSprite(512, 475, 1024, 150, 'bg', 'layer5');
    this.add.tileSprite(512, 475, 1024, 150, 'bg', 'layer4');
    this.add.tileSprite(512, 450, 2048, 200, 'bg', 'layer3');
    this.add.tileSprite(512, 475, 2048, 150, 'bg', 'layer2');
    this.add.tileSprite(512, 565, 2048, 30, 'bg', 'layer1');
    console.log(data);
    this.anims.create({
      key: 'lips',
      frames: this.anims.generateFrameNames('game', {
        prefix: 'lips',
        end: 5,
      }),
      yoyo: true,
      repeat: -1,
    });
    this.physics.add.sprite(100, 250, 'game')
        .play('lips')
        .setCircle(25)
        .setCollideWorldBounds(true)
        .body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 25, 300, 525));
    this.physics.add.sprite(1200, 250, 'game', 'burger')
        .setCircle(10)
        .setVelocityX(-200)
        .body.allowGravity = false;
    this.physics.add.overlap(
        this.children.list[8],
        this.children.list[7],
        (food) => {
          food.disableBody(true, true);
        },
    );
    this.input.on('pointerup', () => {
      this.children.list[7].setVelocityY(-600);
    });
  }

  /**
   * Scrolls the parallax background.
   *
   * @memberof LevelScene
   */
  update() {
    this.children.list[0].tilePositionX += 0.06;
    this.children.list[1].tilePositionX += 0.12;
    this.children.list[2].tilePositionX += 0.25;
    this.children.list[3].tilePositionX += 0.5;
    this.children.list[4].tilePositionX += 1;
    this.children.list[5].tilePositionX += 2;
    this.children.list[6].tilePositionX += 4;
  }
}
