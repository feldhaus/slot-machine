import * as PIXI from "pixi.js";
import { Machine } from "../components/machine";
import { Scene } from "../engine/scene";

export class GameScene extends Scene {

    private readonly TEXT_STYLE: PIXI.TextStyle = new PIXI.TextStyle({
        fontSize: 36,
        fill: 0xffffff,
        stroke: 0x000000,
        strokeThickness: 5,
        align: "center",
    });

    private readonly NUMBER_FORMAT: Intl.NumberFormat = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });

    private machine: Machine;
    private btnSpin: PIXI.Graphics;

    private balanceText: PIXI.Text;
    private balanceValue: number;
    private winText: PIXI.Text;
    private winValue: number;
    private betText: PIXI.Text;
    private betValue: number;

    constructor(renderer: PIXI.SystemRenderer) {
        super(renderer);

        // adds machine
        this.machine = new Machine(1340, 880, 5);
        this.machine.position.set(350, 420);
        this.addChild(this.machine);

        // adds button spin
        this.btnSpin = new PIXI.Graphics();
        this.btnSpin.beginFill(0xaa0f0a, 0.5);
        this.btnSpin.drawCircle(0, 0, 120);
        this.btnSpin.position.set(1880, 1140);
        this.btnSpin.interactive = true;
        this.btnSpin.buttonMode = true;
        this.btnSpin.on("pointerdown", this.spin.bind(this));
        this.addChild(this.btnSpin);

        // adds balance value text
        this.balanceText = new PIXI.Text("", this.TEXT_STYLE);
        this.balanceText.anchor.set(0.5, 0.5);
        this.balanceText.position.set(450, 1435);
        this.addChild(this.balanceText);
        this.balance = 9000;

        // adds win value text
        this.winText = new PIXI.Text("", this.TEXT_STYLE);
        this.winText.anchor.set(0.5, 0.5);
        this.winText.position.set(704, 1435);
        this.addChild(this.winText);
        this.win = 0;

        // adds bet value text
        this.betText = new PIXI.Text("", this.TEXT_STYLE);
        this.betText.anchor.set(0.5, 0.5);
        this.betText.position.set(958, 1435);
        this.addChild(this.betText);
        this.bet = 0.1;
    }

    public update(delta: number): void {
        if (this.machine) {
            this.machine.update(delta);
        }
    }

    protected preload(): void {
        // PIXI.loader.add("assets/images/icon_1.png");
        // PIXI.loader.add("assets/images/icon_2.png");
        // PIXI.loader.add("assets/images/icon_3.png");
        // PIXI.loader.add("assets/images/icon_4.png");
        // PIXI.loader.add("assets/images/icon_5.png");
        // PIXI.loader.add("assets/images/icon_6.png");
        // PIXI.loader.add("assets/images/icon_7.png");
        // PIXI.loader.add("assets/images/icon_8.png");
        // PIXI.loader.add("assets/template.png");
    }

    protected create(): void {
        const template: PIXI.Sprite = PIXI.Sprite.fromImage("assets/template.png");
        template.width = Scene.width;
        template.height = Scene.height;
        template.alpha = 0.2;
        this.addChildAt(template, 0);
    }

    private spin(): void {
        this.machine.spinReels();
        this.balance -= this.bet;
    }

    private get balance(): number {
        return this.balanceValue;
    }

    private set balance(value: number) {
        this.balanceValue = value;
        this.balanceText.text = this.NUMBER_FORMAT.format(this.balanceValue);
    }

    private get win(): number {
        return this.winValue;
    }

    private set win(value: number) {
        this.winValue = value;
        this.winText.text = this.NUMBER_FORMAT.format(this.winValue);
    }

    private get bet(): number {
        return this.betValue;
    }

    private set bet(value: number) {
        this.betValue = value;
        this.betText.text = this.NUMBER_FORMAT.format(this.betValue);
    }
}
