import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import { default as data } from './../data';
import { Paylines } from './paylines';
import { Reel } from './reel';

export class Machine extends Container {
  private reels: Reel[];
  private currentReel: number;

  constructor(width: number, height: number, numberOfReels: number = 5) {
    super();

    this.reels = [];

    // draws a border
    const border = new Graphics();
    border.lineStyle(10, 0xffffff, 1);

    // adds reels
    const slicedWidth = width / numberOfReels;
    for (let i = 0; i < numberOfReels; i++) {
      const reel = new Reel(slicedWidth, height, i);
      reel.position.set(slicedWidth * i, 0);
      this.addChild(reel);
      this.reels.push(reel);
      border.drawRect(slicedWidth * i, 0, slicedWidth, height);
      // @ts-ignore
      reel.on('spincomplete', this.onReelSpinComplete.bind(this));
    }
    this.addChild(border);

    // const paylines = new Paylines();
    // paylines.y = 26;
    // this.addChild(paylines);
  }

  public spinReels(): void {
    this.currentReel = 0;
    let timeout = 0;
    for (const reel of this.reels) {
      setTimeout(reel.spin.bind(reel), timeout);
      timeout += 300;
    }
    setTimeout(this.stopReels.bind(this), 1500);
  }

  public stopReels(): void {
    this.reels[0].stop();
  }

  public update(delta: number): void {
    for (const reel of this.reels) {
      reel.update(delta);
    }
  }

  private onReelSpinComplete(): void {
    this.currentReel++;
    if (this.currentReel < this.reels.length) {
      // stop the next
      this.reels[this.currentReel].stop();
    } else {
      // all reels are stopped
      this.analyseResult();
    }
  }

  private analyseResult(): void {
    for (const line of Paylines.lines) {
      let sum = 0;
      for (let i = 0; i < line.length - 1; i++) {
        const a = this.reels[i].tiles[line[i]].id;
        const b = this.reels[i + 1].tiles[line[i + 1]].id;
        if (a === b) {
          sum++;
        } else {
          break;
        }
      }
      const first = this.reels[0].tiles[line[0]].id;
      const value = data.symbols[first].paytable[sum];
      if (value > 0) {
        // TODO: player won something
      }
    }
  }
}
