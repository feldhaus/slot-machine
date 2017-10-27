export class Paylines extends PIXI.Container {

    public static readonly lines: number[][] = [
        [1, 1, 1, 1, 1], [1, 1, 2, 3, 3], [1, 2, 3, 2, 1], [1, 2, 1, 2, 1],
        [2, 2, 2, 2, 2], [2, 1, 1, 1, 2], [2, 3, 3, 3, 2], [2, 3, 2, 3, 2],
        [3, 3, 3, 3, 3], [3, 3, 2, 1, 1], [3, 2, 1, 2, 3], [3, 2, 3, 2, 3],
    ];

    constructor() {
        super();

        /*
        const line: PIXI.Graphics = new PIXI.Graphics();

        let posY: number = 0;

        for (let i: number = 0; i < Paylines.lines.length; i++) {
            line.lineStyle(8, 0xff0000);
            line.moveTo(-67, posY);
            line.lineTo(790, posY);
            posY += i % 2 === 0 ? 45 : 33;
        }
        this.addChild(line);
        */
    }
}
