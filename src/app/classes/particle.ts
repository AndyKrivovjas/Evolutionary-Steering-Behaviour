import { BaseObject } from "../lib/canvas/draw";
import { Canvas } from "../lib/canvas/canvas";


export class Particle {
    body: BaseObject;
    parent: Canvas;

    setParent(cnavas: Canvas) {
        this.parent = cnavas;
    }
}