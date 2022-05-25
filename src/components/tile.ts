import { Texture } from '@pixi/core';
import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import { default as data } from './../data';

export class Tile extends Container {
  public id: number;

  private border: Graphics;
  private sprite: Sprite;

  constructor(width: number, height: number) {
    super();

    // Add border (rect).
    this.border = new Graphics();
    this.border.lineStyle(2, 0xaa0000);
    this.border.beginFill(0xaa0000, 0.2);
    this.border.drawRect(0, 0, width, height);
    this.addChild(this.border);

    // Add sprite.
    this.sprite = new Sprite();
    this.sprite.scale.set(0.4, 0.4);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(width * 0.5, height * 0.5);
    this.addChild(this.sprite);
    this.swap();
  }

  public swap(): void {
    // get a random symbol id
    this.id = Math.floor(Math.random() * data.symbols.length);

    // verify if already have texture
    if (data.symbols[this.id].texture === null) {
      data.symbols[this.id].texture = Texture.from(
        data.symbols[this.id].filename,
      );
    }

    // set the data
    this.sprite.texture = data.symbols[this.id].texture;
  }
}
