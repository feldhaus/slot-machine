import { Application } from '@pixi/app';
import { ConstructorOfScene, Scene } from './scene';

// TODO: Make it dynamic.
const WIDTH = 2048;
const HEIGHT = 1343;

type GameConfig = {
  width?: number;
  height?: number;
  color?: number;
  resolution?: number;
};

export class Game<
  T extends { [key: string]: ConstructorOfScene },
  K extends keyof T,
> {
  private app: Application;
  private scenes: T;
  private currentScene: Scene;

  constructor(config: GameConfig & { scenes: T }) {
    this.app = new Application({
      width: config.width || 800,
      height: config.height || 600,
      backgroundColor: config.color || 0x000000,
      resolution: config.resolution || 1,
      autoDensity: true,
      antialias: true,
    });
    document.body.appendChild(this.app.view);

    this.scenes = config.scenes;

    this.app.ticker.add(this.update, this);
  }

  public load(key: K): void {
    // Game.scenes.startScene(key);
    this.currentScene = new this.scenes[key]();
    this.app.stage.addChild(this.currentScene);
    this.currentScene.preload();

    // Called once per loaded/errored file.
    this.currentScene.loader.onProgress.add(() => {
      console.log('progress', this.currentScene.loader.progress);
    });

    // Called once per errored file
    this.currentScene.loader.onError.add(() => {});

    // Called once per loaded file.
    this.currentScene.loader.onLoad.add(() => {});

    // Called once when the queued resources all load.
    this.currentScene.loader.onComplete.once(() => {
      this.currentScene.create();
    });

    this.currentScene.loader.load();
  }

  public update(deltaTime: number): void {
    if (this.currentScene?.parent === undefined) return;
    this.currentScene.update(deltaTime, this.app.ticker.elapsedMS);
  }

  public resize(width: number, height: number): void {
    this.app.renderer.resize(width, height);

    if (this.currentScene?.parent === undefined) return;
    const ratio = Math.min(width / WIDTH, height / HEIGHT);
    this.currentScene.scale.set(ratio);
    this.currentScene.position.set(
      (width - WIDTH * ratio) * 0.5,
      (height - HEIGHT * ratio) * 0.5,
    );
  }
}
