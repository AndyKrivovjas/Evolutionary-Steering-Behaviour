import { Vector } from "../math/vector";
import { Canvas } from "./canvas";

export enum PRIMITIVES {
    POINT = 'POINT',
    ELLIPSE = 'ELLIPSE',
    RECTANGLE = 'RECTANGLE',
    TRIANGLE = 'TRIANGLE',
    POLYGON = 'POLYGON'
}

export class BaseObject {
    draw: CanvasDraw;
    ctx: CanvasRenderingContext2D;
    position: Vector;
    type: PRIMITIVES;

    styles: {
        strokeColor?: string,
        strokeWidth?: number,
        fill?: string
    }

    constructor(d: CanvasDraw, t: PRIMITIVES, p: Vector) {
        this.draw = d;
        this.ctx = d.parent.context;
        this.type = t;
        this.position = p;

        this.styles = {
            strokeColor: '#ffffff',
            strokeWidth: 1,
            fill: '#ffffff'
        }
    }

    start() {
        this.ctx.save();
        this.ctx.beginPath();
    }

    applyStyles() {
        this.ctx.fillStyle = this.styles.fill;
        this.ctx.strokeStyle = this.styles.strokeColor;
        this.ctx.lineWidth = this.styles.strokeWidth;
        this.ctx.fill();
        this.ctx.stroke();
    }

    end() {
        this.applyStyles();
        this.ctx.closePath();
        this.ctx.restore();
    }

    render() {

    }
}

export class Ellipse extends BaseObject {
    rx: number;
    ry: number;

    constructor(d: CanvasDraw, position: Vector, rx: number, ry: number) {
        super(d, PRIMITIVES.ELLIPSE, position);
        this.rx = rx;
        this.ry = ry;
    }

    render() {
        this.start();
        this.ctx.ellipse(this.position.x, this.position.y, this.rx, this.ry, 0, 0, 2 * Math.PI);
        this.end();
    }
}

export class Triangle extends BaseObject {
    width: number;
    height: number;
    angle: number;

    constructor(d: CanvasDraw, position: Vector, width: number, height: number, angle: number) {
        super(d, PRIMITIVES.TRIANGLE, position);
        this.width = width;
        this.height = height;
        this.angle = angle;
    }

    render() {
        this.start();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.angle);
        this.ctx.moveTo(0, -this.height / 2);
        this.ctx.lineTo(this.width / 2, this.height / 2);
        this.ctx.lineTo(-this.width / 2, this.height / 2);
        this.ctx.lineTo(0, -this.height / 2);
        this.end();
    }
}

export enum DISPLAY_MODE {
    CENTER = 'CENTER',
    CORNER = 'CORNER'
}

export class CanvasDraw {
    parent: Canvas;

    DISPLAY_MODE: DISPLAY_MODE = DISPLAY_MODE.CENTER;

    constructor(c: Canvas) {
        this.parent = c;
    }

    ellipse(position: Vector, rx: number, ry?: number): Ellipse {
        ry = ry || rx;
        return new Ellipse(this, position, rx, ry);
    }

    triangle(position: Vector, width: number, height: number, angle?: number): Triangle {
        angle = angle || 0;
        return new Triangle(this, position, width, height, angle);
    }

}