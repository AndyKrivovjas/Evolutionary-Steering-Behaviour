import { BaseObject } from "../lib/canvas/draw";
import { Canvas } from "../lib/canvas/canvas";


export class Particle {
    body: BaseObject;
    parent: Canvas;
    id: any;

    setParent(cnavas: Canvas) {
        this.parent = cnavas;
    }

    setId(id: any) {
        this.id = id;
    }
}