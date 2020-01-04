/**
 * Represent an interactive image that displays a short tween on pointer up,
 * then executes the specified callback function.
 *
 * @export
 * @class Button
 * @extends {Phaser.GameObjects.Image}
 */
export default class Button extends Phaser.GameObjects.Image {
  /**
   * Creates an instance of Button.
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} texture
   * @param {string} frame
   * @param {*} callback
   * @memberof Button
   */
  constructor(scene, x, y, texture, frame, callback) {
    super(scene, x, y, texture, frame);
    scene.children.add(this);
    this.setInteractive();
    this.on('pointerup', () => scene.tweens.add({
      targets: this,
      scale: 0.8,
      ease: 'Quad',
      duration: 70,
      yoyo: true,
      onComplete: callback,
    }));
  }
}
