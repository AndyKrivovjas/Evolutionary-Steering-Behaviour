
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

    maxPopulation: number = 10;

    vehicles: Vehicle[] = [];
    vehicleHashTable = {};
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

        this.createVehicle();

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

        let rate = 1 / (this.food.length * 0.01);
        if(rate > 1) rate = 1;
        M.fireAtRate(rate, () => this.createFood());

        this.food.forEach(f => {
            f.followers = [];
        });

        this.vehicles.forEach(vehicle => {
            vehicle.boundaries(this.canvas.body.width, this.canvas.body.height);
            vehicle.update();
            M.fireAtRate(0.001, () => {
                if (this.vehicles.length < this.maxPopulation) {
                    let child = vehicle.clone();
                    this.addVehicle(child);
                }
            });

            if(vehicle.health == 0) {
                this.removeVehicle(vehicle);
            }
            let closest = vehicle.findClosestFood(this.food);
            if(closest) {
                if(vehicle.eat(closest)) {
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
        if(this.vehicles.length == this.maxPopulation) {
            let index = M.randomInt(this.vehicles.length);
            this.removeVehicle(this.vehicles[index]);
        }

        this.createVehicle(
            new Vector(event.x, event.y)
        );
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

    createVehicle(position?: Vector) {
        if (this.vehicles.length < this.maxPopulation) {
            let v = new Vehicle(
                this.canvas.draw,
                position
            );

            this.addVehicle(v);
        }
    }

    addVehicle(vehicle?: Vehicle) {
        this.canvas.add(vehicle.body, 10);
        this.vehicles.push(vehicle);

        vehicle.setId(Math.random().toString(36).substring(7) + '_' + +new Date());
        vehicle.setApplication(this);
        
        this.reindexVehicle();
    }

    removeVehicle(vehicle: Vehicle) {
        vehicle.elements.forEach(e => {
            this.canvas.remove(e);
        });
        this.canvas.remove(vehicle.body, 10);
        this.vehicles.splice(this.vehicleHashTable[vehicle.id], 1);

        this.reindexVehicle();
    }

    reindexVehicle() {
        for (let i = 0; i < this.vehicles.length; i++) {
            this.vehicleHashTable[this.vehicles[i].id] = i;
        }
    }

    createFood(position?: Vector) {
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