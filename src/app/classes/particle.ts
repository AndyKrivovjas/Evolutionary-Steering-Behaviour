import { BaseObject } from "../lib/canvas/draw";
import { Canvas } from "../lib/canvas/canvas";


export class Particle {
    id: any;
    body: BaseObject;
    parent: Canvas;
    elements: BaseObject[] = [];

    setParent(cnavas: Canvas) {
        this.parent = cnavas;
    }

    setId(id: any) {
        this.id = id;
    }

    updateElements() {
        this.elements.forEach(e => {
            e.position = this.body.position.copy();
        });
    }
}