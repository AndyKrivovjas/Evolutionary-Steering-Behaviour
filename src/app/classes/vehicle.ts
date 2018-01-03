import { Particle } from "./particle";
import { Vector } from "../lib/math/vector";
import { CanvasDraw, Triangle } from "../lib/canvas/draw";
import { M } from "../lib/math/m";
import { Food } from "./food";
import { Color } from "../lib/canvas/color";
import { App } from "../app";
import { DNA } from "./dna";

export class Vehicle extends Particle {
    app: App;
    body: Triangle;
    index: number;

    draw: CanvasDraw;

    target: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxSpeed: number = 4;
    maxForce: number = 0.2;

    width: number = 15;
    height: number = 25;
    health: number = 100;

    targetDistance: number = 0;

    foodSeekRadius: number = M.randomInt(0, 100);
    poisonSeekRadius: number = M.randomInt(0, 100);

    constructor(draw: CanvasDraw, position?: Vector, dna?: DNA) {
        super();

        this.draw = draw;

        position = position || new Vector(
            M.randomInt(draw.parent.body.width), 
            M.randomInt(draw.parent.body.height)
        );

        this.body = draw.triangle(
            position,
            this.width,
            this.height
        );

        if (dna) {
            this.maxSpeed = dna.maxSpeed;
            this.maxForce = dna.maxForce;
            this.foodSeekRadius = dna.foodSeekRadius;
            this.poisonSeekRadius = dna.poisonSeekRadius;
        }

        let fCircle = draw.ellipse(position, this.foodSeekRadius);
        fCircle.styles.fill = "rgba(136, 216, 176, 0.2)";

        let pCircle = draw.ellipse(position, this.poisonSeekRadius);
        pCircle.styles.fill = "rgba(241, 84, 86, 0.2)";

        this.elements = [fCircle, pCircle];
        draw.parent.add(fCircle);
        draw.parent.add(pCircle);

        this.velocity = Vector.random2D().multiply(5);
        this.acceleration = new Vector(0, 0);
        this.target = null; 
    }

    setApplication(app: App) {
        this.app = app;
    }

    setTarget(target: Vector) {
        this.target = target;
    }

    update() {
        if(this.target) {
            let stearingForce = this.seek(this.target);
            this.applyForce(stearingForce);
        }

        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxSpeed);
        this.body.position.add(this.velocity);
        // Reset acceleration to 0 each cycle
        this.acceleration.multiply(0);

        var theta = this.velocity.heading() + Math.PI / 2;
        this.body.angle = theta;

        // Slowly die unless you eat
        this.health -= 0.09;

        if (this.health > 100) {
            this.health = 100;
        }

        if (this.health < 0) {
            this.health = 0;
        }

        // let color = Color.lerp('#000000', '#ffffff', this.health / 100);
        let color = Color.lerp('#F15456', '#88d8b0', this.health / 100);

        this.body.styles.strokeColor = '#fff';
        this.body.styles.fill = color;

        this.updateElements();
    }

    applyForce(force: Vector) {
        this.acceleration.add(force);
    }

    seek(target: Vector) {

        var desired = target.copy().subtract(this.body.position); // A vector pointing from the location to the target
        desired.setMagnitude(this.maxSpeed);

        // Steering = Desired minus velocity
        var steer = desired.copy().subtract(this.velocity);

        // Not limiting here
        steer.limit(this.maxForce);

        return steer;
    }

    findClosestFood(list: Food[]): Food {
        let food: Food = null;
        let fisrtItem = list.slice().shift();

        if(fisrtItem) {
            let minDist = this.body.position.dist(fisrtItem.body.position);
    
            list.forEach(item => {
                if (item.followers.length >= 1) {
                    return;
                }

                let d = this.body.position.dist(item.body.position);

                if(d < 5) {
                    if(this.eat(item)) {
                        this.app.removeFood(item);
                    }
                }

                if(d <= minDist
                && d < ((item.value > 0) ? this.foodSeekRadius : this.poisonSeekRadius)) {
                    food = item;
                    minDist = d;
                    this.targetDistance = minDist;
                }
            });
        }

        return food;
    }

    eat(food: Food):boolean {
        food.addFollewer(this);
        this.setTarget(food.body.position);

        if(this.targetDistance < 5) {
            this.health += food.value;
            this.setTarget(null);
            this.targetDistance = 0;

            return true;
        } else {
            return false;
        }
    }

    boundaries(width, height) {
        var d = 10;
        var desired = null;
        if (this.body.position.x < d) {
            desired = new Vector(this.maxSpeed, this.velocity.y);
        } else if (this.body.position.x > width - d) {
            desired = new Vector(-this.maxSpeed, this.velocity.y);
        }

        if (this.body.position.y < d) {
            desired = new Vector(this.velocity.x, this.maxSpeed);
        } else if (this.body.position.y > height - d) {
            desired = new Vector(this.velocity.x, -this.maxSpeed);
        }

        if (desired !== null) {
            desired.setMagnitude(this.maxSpeed);
            var steer = desired.subtract(this.velocity);
            steer.limit(this.maxForce);
            this.applyForce(steer);
        }
    }

    clone(): Vehicle {
        let dna = new DNA(this);
        dna.mutate();

        return new Vehicle(this.draw, this.body.position.copy(), dna);
    }

}