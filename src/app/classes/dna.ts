import { Vehicle } from "./vehicle";
import { M } from "../lib/math/m";

export class DNA {
    mutationRate = 1;

    maxSpeed: number = 0;
    maxForce: number = 0;

    foodSeekRadius: number = 0;
    poisonSeekRadius: number = 0;

    constructor(v: Vehicle) {
        this.maxSpeed = Number(v.maxSpeed);
        this.maxForce = Number(v.maxForce);
        this.foodSeekRadius = Number(v.foodSeekRadius);
        this.poisonSeekRadius = Number(v.poisonSeekRadius);
    }

    mutate() {
        M.fireAtRate(this.mutationRate, () => {
            M.fireAtRate(0.5, () => {
                this.maxSpeed += M.randomInt(-1, 1);
            });

            M.fireAtRate(0.5, () => {
                this.maxForce += M.randomFloat(-0.1, 0.1);
            });

            M.fireAtRate(0.5, () => {
                this.foodSeekRadius += M.randomInt(-15, 15);
                if(this.foodSeekRadius < 10) {
                    this.foodSeekRadius = 10;
                }
            });

            M.fireAtRate(0.5, () => {
                this.poisonSeekRadius += M.randomInt(-15, 15);
                if(this.poisonSeekRadius < 10) {
                    this.poisonSeekRadius = 10;
                }
            });
        });
    }

}