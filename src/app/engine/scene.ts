import * as PIXI from "pixi.js";
// http://ezelia.com/2013/pixi-tutorial

export abstract class Scene extends PIXI.Container {

    public static readonly width: number = 2048;
    public static readonly height: number = 1536;

    private renderer: PIXI.SystemRenderer;

    constructor(renderer: PIXI.SystemRenderer) {
        super();

        // set renderer
        this.renderer = renderer;

        // call resize
        this.resize();

        // call preload
        this.preload();

        // add on loader complete listener
        PIXI.loader.onComplete.add(() => this.create());

        // add resize listener
        window.addEventListener("resize", this.resize.bind(this));
    }

    public resize(): void {
        const ratio: number = Math.min(window.innerWidth / Scene.width, window.innerHeight / Scene.height);
        this.scale.set(ratio, ratio);
        this.renderer.resize(Scene.width * ratio, Scene.height * ratio);
    }

    public abstract update(delta: number): void;
    protected abstract preload(): void;
    protected abstract create(): void;
}
