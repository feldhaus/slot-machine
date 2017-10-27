import * as PIXI from "pixi.js";
// http://ezelia.com/2013/pixi-tutorial

export abstract class Scene extends PIXI.Container {

    public static readonly width: number = 1024;
    public static readonly height: number = 768;

    private renderer: PIXI.SystemRenderer;

    constructor(renderer: PIXI.SystemRenderer) {
        super();

        this.renderer = renderer;
        this.resize();

        this.preload();

        PIXI.loader.onComplete.add(() => this.create());
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
