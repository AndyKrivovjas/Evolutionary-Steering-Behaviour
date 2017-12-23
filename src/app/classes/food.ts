import { Particle } from "./particle";
import { Ellipse, CanvasDraw } from "../lib/canvas/draw";
import { Vector } from "../lib/math/vector";
import { M } from "../lib/math/m";

export class Food extends Particle {
    body: Ellipse;
    index: number;

    radius: number = 5;

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

        this.body.styles.fill = '#88d8b0';
    }

}