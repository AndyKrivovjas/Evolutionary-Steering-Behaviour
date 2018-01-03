export class M {

    static randomInt(min: number, max?: number): number {
        if(!max) {
            max = min;
            min = 0;
        }

        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    static randomFloat(min: number, max?: number): number {
        if (!max) {
            max = min;
            min = 0;
        }

        var rand = min + Math.random() * (max + 1 - min);
        return rand;
    }

    static fireAtRate(percent: number, callback: Function) {
        if (Math.random() < percent) {
            callback();
        }
    }

}