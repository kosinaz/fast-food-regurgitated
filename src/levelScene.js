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
    this.anims.create({
      key: 'lips',
      frames: this.anims.generateFrameNames('game', {
        prefix: 'lips',
        end: 5,
      }),
      yoyo: true,
      repeat: -1,
    });
    const lips = this.physics.add.sprite(150, 250, 'game');
    lips.play('lips');
    lips.setSize(40, 60);
    lips.setCollideWorldBounds(true);
    lips.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 25, 300, 525));
    const food = this.physics.add.group({
      key: 'game',
      frame: 'burger',
      repeat: 5,
      setXY: {
        x: 1200,
        y: 250,
        stepX: 400,
      },
      allowGravity: false,
      velocityX: -400,
    });
    let y = 0;
    food.getChildren().forEach((food) => {
      // eslint-disable-next-line new-cap
      y = Phaser.Math.Clamp(y + Phaser.Math.Between(-1, 1), -1, 1);
      food.y += y * 100;
    });
    this.physics.add.overlap(lips, food, (lips, food) => {
      food.disableBody(true, true);
    });
    this.input.on('pointerup', () => {
      lips.setVelocityY(-600);
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
