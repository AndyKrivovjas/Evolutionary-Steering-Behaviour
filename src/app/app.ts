
import 'fpsmeter';
import { Vehicle } from './classes/vehicle';
import { Canvas } from './lib/canvas/canvas';
import { Vector } from './lib/math/vector';
import { Food } from './classes/food';
import { M } from './lib/math/m';

export class App {
    meter: FPSMeter;
    frame: number = 0;
    canvas: Canvas;

    vehicles: Vehicle[] = [];
    food: Food[] = [];
    foodHashTable = {};

    constructor(private initCallback?: Function, private renderCallback?: Function) {
        this.meter = new FPSMeter();
    }

    init() {
        this.canvas = new Canvas('canvas', {
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.canvas.setBackground('#555');

        this.addVehicle(new Vector(100, 100));

        this.setCanvasEvents();

        if(typeof this.initCallback == 'function') {
            this.initCallback(this.canvas);
        }
    }

    setCanvasEvents() {
        this.canvas.body.addEventListener('click', this.mouseClicked);
        // this.canvas.body.addEventListener('mousemove', this.mouseMove);
    }

    render = () => {
        this.meter.tickStart();

        this.canvas.updateBackground();

        if(typeof this.renderCallback == 'function') {
            this.renderCallback(this.canvas);
        }

        M.fireAtRate(0.1, () => this.addFood());

        this.vehicles.forEach(vehicle => {
            vehicle.update();
            let closest = vehicle.findClosestFood(this.food);
            if(closest) {
                if(vehicle.eat(closest)) {
                    // console.log(closest, this);
                    this.removeFood(closest);
                }
            }
        });

        this.canvas.renderAll();

        this.frame++;
        this.meter.tick();
        requestAnimationFrame(this.render);
    }

    mouseClicked = (event: MouseEvent) => {
        this.addVehicle(
            new Vector(event.x, event.y)
        );
        // this.addFood(
        //     new Vector(event.x, event.y)
        // );
    }

    mouseMove = (event: MouseEvent) => {
        this.vehicles.forEach(element => {
            element.setTarget(
                new Vector(event.x, event.y)
            );
        });
    }

    run() {
        this.init();
        this.render();
    }

    /* ----------------------------------Components----------------------------------- */

    addVehicle(position?: Vector) {
        var vehicle = new Vehicle(
            this.canvas.draw,
            position
        );

        this.canvas.add(vehicle.body, 10);
        this.vehicles.push(vehicle);
    }

    addFood(position?: Vector) {
        var food = new Food(
            this.canvas.draw,
            position
        );

        this.canvas.add(food.body, 1);
        this.food.push(food);
        food.setId(this.food.length - 1 + '_' + +new Date());

        this.reindexFood();
    }

    removeFood(food: Food) {
        this.canvas.remove(food.body, 1);
        this.food.splice(this.foodHashTable[food.id], 1);

        this.reindexFood();
    }

    reindexFood() {
        for(let i = 0; i < this.food.length; i ++) {
            this.foodHashTable[this.food[i].id] = i;
        }
    }

}