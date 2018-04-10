import * as PIXI from "pixi.js";
import { Tile } from "./tile";

export class Reel extends PIXI.Container {

    private static readonly reelMaxSpeed: number = 50;
    private static readonly inTime: number = 30;
    private static readonly outTime: number = 30;
    private static readonly visibleTiles: number = 3;
    private static readonly totalTiles: number = 5;

    public id: number;
    public tiles: Tile[];

    private realWidth: number;
    private realHeight: number;
    private tileHeight: number;
    private container: PIXI.Container;
    private time: number;
    private timeStop: number;
    private spinning: boolean = false;
    private stopping: boolean = false;
    private blurFilter: PIXI.filters.BlurYFilter;

    private finalOffset: number;
    private finalPosition: number;

    constructor(width: number, height: number, id: number) {
        super();

        this.realWidth = width;
        this.realHeight = height;
        this.tileHeight = height / Reel.visibleTiles; // 3 visible tiles
        this.id = id;

        // mask
        const rectMask: PIXI.Graphics = new PIXI.Graphics();
        rectMask.beginFill(0);
        rectMask.drawRect(0, 0, width, height);
        rectMask.endFill();
        this.addChild(rectMask);

        this.container = new PIXI.Container();
        this.container.mask = rectMask;
        this.addChild(this.container);
        this.tiles = [];
        for (let i: number = 0; i < Reel.totalTiles; i++) {
            const tile: Tile = new Tile(width, this.tileHeight);
            tile.position.set(0, this.tileHeight * i - this.tileHeight);
            this.container.addChild(tile);
            this.tiles.push(tile);
        }

        // instantiates blur filter
        this.blurFilter = new PIXI.filters.BlurYFilter();
    }

    public spin(): void {
        this.time = 0;
        this.spinning = true;

        // applies blur filter
        this.blurFilter.strength = 0;
        this.filters = [this.blurFilter];
    }

    public stop(): void {
        this.finalOffset = 1;
        this.finalPosition = this.realHeight - this.tileHeight - this.container.children[0].y;
        this.stopping = true;
        this.timeStop = this.time;
    }

    public update(delta: number): void {
        if (!this.spinning) { return; }

        // update elapse time
        this.time += delta;

        // update tiles Y position
        const speed: number = this.getSpeed(delta);
        for (const tile of this.tiles) {
            tile.y += speed;
        }

        this.blurFilter.strength = speed * 0.3;

        const limitY: number = this.realHeight + this.tileHeight;
        for (let i: number = this.tiles.length - 1; i >= 0; i--) {
            if (this.container.y + this.tiles[i].y > limitY) {
                this.tiles[i].y = this.container.children[0].y - this.tileHeight;
                this.container.addChildAt(this.tiles[i], 0);
                this.tiles[i].swap();
            }
        }
    }

    private getSpeed(delta: number): number {
        let speed: number = delta * Reel.reelMaxSpeed;

        if (this.stopping) {
            const n: number = 1 - (this.time - this.timeStop) / Reel.outTime;
            const r: number = this.easeInBack(n);
            speed = (this.finalOffset - r) * this.finalPosition;
            this.finalOffset = r;
            if (n <= 0) { this.onComplete(); }
        } else if (this.time < Reel.inTime) {
            const n: number = this.time / Reel.inTime;
            speed *= this.easeInBack(n);
        }

        return speed;
    }

    private onComplete(): void {
        this.stopping = false;
        this.spinning = false;
        this.reorderTiles();
        this.emit("spincomplete", {target: this, id: this.id});

        // removes blur filter
        this.filters = null;
    }

    private reorderTiles(): void {
        this.tiles.sort(this.compareTiles.bind(this));
    }

    private compareTiles(a: Tile, b: Tile): boolean {
        return this.container.getChildIndex(a) > this.container.getChildIndex(b);
    }

    private easeInBack(n: number): number {
        const s: number = 1.70158;
        return n * n * (( s + 1 ) * n - s);
    }
}
