import * as PIXI from "pixi.js";
import { Machine } from "../components/machine";
import { Scene } from "../engine/scene";

export class GameScene extends Scene {

    private machine: Machine;

    constructor(renderer: PIXI.SystemRenderer) {
        super(renderer);
    }

    public update(delta: number): void {
        if (this.machine) {
            this.machine.update(delta);
        }
    }

    protected preload(): void {
        PIXI.loader.add("assets/images/icon_1.png");
        PIXI.loader.add("assets/images/icon_2.png");
        PIXI.loader.add("assets/images/icon_3.png");
        PIXI.loader.add("assets/images/icon_4.png");
        PIXI.loader.add("assets/images/icon_5.png");
        PIXI.loader.add("assets/images/icon_6.png");
        PIXI.loader.add("assets/images/icon_7.png");
        PIXI.loader.add("assets/images/icon_8.png");

        PIXI.loader.add("assets/template.png");
    }

    protected create(): void {
        const template: PIXI.Sprite = PIXI.Sprite.fromImage("assets/template.png");
        template.width = 1024;
        template.height = 768;
        template.alpha = 0.2;
        this.addChild(template);

        this.machine = new Machine();
        this.machine.position.set(118, 150);
        this.addChild(this.machine);
        // this.machine.spinReels();

        const btnSpin: PIXI.Graphics = new PIXI.Graphics();
        btnSpin.beginFill(0xaa0f0a, 0.5);
        btnSpin.drawCircle(0, 0, 56);
        btnSpin.position.set(960, 707);
        btnSpin.interactive = true;
        btnSpin.buttonMode = true;
        this.addChild(btnSpin);
        btnSpin.on("pointerdown", this.machine.spinReels.bind(this.machine));
    }
}
