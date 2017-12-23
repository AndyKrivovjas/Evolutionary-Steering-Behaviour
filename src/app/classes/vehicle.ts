import { Particle } from "./particle";
import { Vector } from "../lib/math/vector";
import { CanvasDraw, Triangle } from "../lib/canvas/draw";
import { M } from "../lib/math/m";

export class Vehicle extends Particle {
    body: Triangle;
    index: number;

    target: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxSpeed: number = 4;
    maxForce: number = 0.1;

    width: number = 15;
    height: number = 25;

    constructor(draw: CanvasDraw, position?: Vector) {
        super();

        position = position || new Vector(
            M.randomInt(draw.parent.body.width), 
            M.randomInt(draw.parent.body.height)
        );

        this.body = draw.triangle(
            position,
            this.width,
            this.height
        );
        this.body.styles.strokeColor = '#000';

        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.target = new Vector(500, 500);
    }

    setTarget(target: Vector) {
        this.target = target;
    }

    update() {
        let stearingForce = this.seek(this.target);
        this.applyForce(stearingForce);

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
        // this.health -= 0.002;

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

}