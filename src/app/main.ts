import * as PIXI from "pixi.js";
import { Scene } from "./engine/scene";
import { GameScene } from "./scenes/game";
import { IntroScene } from "./scenes/intro";

export class Main extends PIXI.Application {

    public view: HTMLCanvasElement;
    public stage: PIXI.Container;
    private scenes: Scene[];

    constructor() {
        super(GameScene.width, GameScene.height, {backgroundColor: 0x3aaaa3, legacy: true});
        document.body.appendChild(this.view);

        this.scenes = [];

        // const intro: IntroScene = new IntroScene(this.renderer);
        // this.addScene(intro);

        const game: GameScene = new GameScene(this.renderer);
        this.ticker.add(game.update.bind(game));
        this.addScene(game);

        PIXI.loader.load();
    }

    public addScene(scene: Scene): void {
        this.scenes.push(scene);
        this.stage.addChild(scene);
    }
}

window.onload = () => {
    const main: Main = new Main();
};
