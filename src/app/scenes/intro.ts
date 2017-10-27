import * as PIXI from "pixi.js";
import { Scene } from "../engine/scene";

export class IntroScene extends Scene {

    constructor(renderer: PIXI.SystemRenderer) {
        super(renderer);
    }

    public update(delta: number): void {
        // nothing
    }

    protected preload(): void {
        PIXI.loader.add("assets/navy_pattern.png");
    }

    protected create(): void {
        const bg: PIXI.extras.TilingSprite = new PIXI.extras.TilingSprite(
            PIXI.Texture.fromImage("assets/navy_pattern.png"),
            800,
            600,
        );
        bg.tileScale.set(0.2, 0.2);
        this.addChild(bg);
    }
}
