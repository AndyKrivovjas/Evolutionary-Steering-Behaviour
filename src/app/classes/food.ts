import { Particle } from "./particle";
import { Ellipse, CanvasDraw } from "../lib/canvas/draw";
import { Vector } from "../lib/math/vector";
import { M } from "../lib/math/m";

export class Food extends Particle {
    body: Ellipse;
    index: number;

    radius: number = 5;
    value: number = 0;

    constructor(draw: CanvasDraw, position?: Vector) {
        super();

        position = position || new Vector(
            M.randomInt(draw.parent.body.width),
            M.randomInt(draw.parent.body.height)
        );

        this.body = draw.ellipse(
            position,
            this.radius
        );

        this.body.setParent(this);

        this.value = M.randomInt(-10, 10);

        if(this.value > 0) {
            this.body.styles.fill = '#88d8b0';
        } else {
            this.body.styles.fill = '#F15456';
        }
    }

}