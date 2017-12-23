import { CanvasDraw, BaseObject } from "./draw";

interface ICanvasOptions {
    height?: number,
    width?: number
}

export class Canvas {
    body: HTMLCanvasElement;
    private background: string = '#fff';
    private objects: BaseObject[] = [];
    
    draw: CanvasDraw;
    context: CanvasRenderingContext2D;

    constructor(private id: string, private options: ICanvasOptions) {

        this.body = document.createElement('canvas');
        this.body.id = id;
        this.body.width = this.options.width;
        this.body.height = this.options.height;

        document.body.appendChild(this.body);

        this.context = this.body.getContext('2d');
        this.draw = new CanvasDraw(this);
    }

    add(obj: BaseObject) {
        this.objects.push(obj);
    }

    setBackground(color: string) {
        this.background = color;
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.body.width, this.body.height);
    }

    updateBackground() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.body.width, this.body.height);
    }

    renderAll() {
        this.objects.forEach(obj => {
            obj.render();
        });
    }
}