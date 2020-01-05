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
    const lips = this.physics.add.sprite(300, 250, 'game');
    lips.play('lips');
    lips.setSize(40, 60);
    lips.setCollideWorldBounds(true);
    lips.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 25, 300, 525));
    const foods = this.physics.add.group({
      key: 'game',
      frame: 'burger',
      collideWorldBounds: true,
      customBoundsRectangle: new Phaser.Geom.Rectangle(0, 0, 10000, 576),
      repeat: 6,
      setXY: {
        x: 1200,
        y: 250,
        stepX: 400,
      },
      allowGravity: false,
      velocityX: -400,
    });
    let y = 0;
    foods.getChildren().forEach((food) => {
      food.body.onWorldBounds = true;
      // eslint-disable-next-line new-cap
      y = Phaser.Math.Clamp(y + Phaser.Math.Between(-2, 2), -2, 2);
      food.y += y * 50;
    });
    let burgerNumber = 4;
    this.physics.add.overlap(lips, foods, (lips, food) => {
      food.disableBody(true, true);
      foods.killAndHide(food);
      console.log(foods.countActive());
      burgerNumber -= 1;
      const miniburger = this.add.image(food.x, food.y, 'game', 'burger');
      this.tweens.timeline({
        tweens: [{
          targets: miniburger,
          scale: {
            value: 0.75,
            duration: 600,
            ease: 'Quad',
          },
          x: {
            value: burger.x,
            duration: 600,
            ease: 'Quad',
          },
          y: {
            value: burger.y,
            duration: 600,
            ease: 'Back.easeIn',
          },
          onComplete: () => {
            miniburger.destroy();
            burgerText.text = burgerNumber > 0 ? burgerNumber : '_';
          },
        },
        {
          targets: burger,
          scale: 1.3,
          ease: 'Quad',
          duration: 70,
          yoyo: true,
        }],
      });
    });
    this.input.on('pointerup', () => {
      lips.setVelocityY(-600);
    });
    const bg = this.add.image(0, 0, 'game', 'goalpanel').setOrigin(0);
    const burgerImage = this.add.image(0, 0, 'game', 'burger');
    burgerImage.setScale(0.75);
    const burgerText = this.add.text(15, 7, burgerNumber, {
      fontSize: '30px',
      fontFamily: 'font',
    });
    burgerText.setOrigin(0.5);
    burgerText.setStroke('#efb469', 3);
    const burger = this.add.container(55, 70, [burgerImage, burgerText]);
    const goalpanel = this.add.container(0, 0, [bg, burger]);
    this.physics.world.on('worldbounds', (food) => {
      food.gameObject.disableBody(true, true);
      foods.killAndHide(food.gameObject);
      console.log(foods.countActive());
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
