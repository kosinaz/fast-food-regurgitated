/**
 * Represent an interactive image that displays a short tween on pointer up,
 * then executes the specified callback function.
 *
 * @export
 * @class Button
 * @extends {Phaser.GameObjects.Container}
 */
export default class Button extends Phaser.GameObjects.Container {
  /**
   * Creates an instance of Button.
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} texture
   * @param {string} frame
   * @param {*} callback
   * @param {string} text
   * @param {boolean} deselected
   * @memberof Button
   */
  constructor(scene, x, y, texture, frame, callback, text, deselected) {
    super(scene, x, y, [
      scene.add.image(0, 0, texture, frame),
      scene.add.text(-4, -10, text, {
        fontSize: '80px',
        fontFamily: 'font',
      }),
    ]);
    scene.children.add(this);
    this.setSize(this.list[0].width, this.list[0].height);
    this.setInteractive();
    this.on('pointerup', () => scene.tweens.add({
      targets: this,
      scale: 0.8,
      ease: 'Quad',
      duration: 70,
      yoyo: true,
      onComplete: () => callback(this),
    }));
    this.list[1].setOrigin(0.5);
    this.list[1].setStroke('#6dc300', 6);
    this.text = text;
    if (deselected) {
      this.deselect();
    }
  }

  /**
   * Highlights the selected button.
   *
   * @memberof Button
   */
  select() {
    this.list[1].setStroke('#6dc300', 6);
    this.list[1].setColor('#ffffff');
  }

  /**
   * Turns off the highlight on the selected button.
   *
   * @memberof Button
   */
  deselect() {
    this.list[1].setStroke('#6dc300', 0);
    this.list[1].setColor('#6dc300');
  }

  /**
   * Locks the selected button.
   *
   * @memberof Button
   */
  lock() {
    this.list[0].disableInteractive();
    this.list[0].setFrame('locked');
    this.list[1].text = '';
  }
}
