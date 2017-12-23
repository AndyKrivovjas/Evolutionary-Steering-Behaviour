export class Vector {
    x: number;
    y: number;
    z: number;

    constructor(x: number | Vector | Array<number>, y?: number, z?: number) {
        this.set(x, y, z)
    }

    set(x: number|Vector|Array<number>, y?: number, z?: number): Vector {
        if (x instanceof Vector) {
            this.x = x.x || 0;
            this.y = x.y || 0;
            this.z = x.z || 0;
            return this;
        }
        if (x instanceof Array) {
            this.x = x[0] || 0;
            this.y = x[1] || 0;
            this.z = x[2] || 0;
            return this;
        }
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        return this;
    }

    copy(): Vector {
        return new Vector(this.x, this.y, this.z);
    }

    add(x: number | Vector | Array<number>, y?: number, z?: number): Vector {
        if (x instanceof Vector) {
            this.x += x.x || 0;
            this.y += x.y || 0;
            this.z += x.z || 0;
            return this;
        }
        if (x instanceof Array) {
            this.x += x[0] || 0;
            this.y += x[1] || 0;
            this.z += x[2] || 0;
            return this;
        }
        this.x += x || 0;
        this.y += y || 0;
        this.z += z || 0;
        return this;
    }

    subtract(x: number | Vector | Array<number>, y?: number, z?: number): Vector {
        if (x instanceof Vector) {
            this.x -= x.x || 0;
            this.y -= x.y || 0;
            this.z -= x.z || 0;
            return this;
        }
        if (x instanceof Array) {
            this.x -= x[0] || 0;
            this.y -= x[1] || 0;
            this.z -= x[2] || 0;
            return this;
        }
        this.x -= x || 0;
        this.y -= y || 0;
        this.z -= z || 0;
        return this;
    }

    multiply(n: number): Vector {
        this.x *= n;
        this.y *= n;
        this.z *= n;

        return this;
    }

    divide(n: number): Vector {
        this.x /= n;
        this.y /= n;
        this.z /= n;

        return this;
    }

    magnitude(): number {
        return Math.sqrt(this.magnitudeSq());
    }

    magnitudeSq(): number {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        return x * x + y * y + z * z;
    }

    dot(x: any, y?: number, z?: number): any {
        if (x instanceof Vector) {
            return this.dot(x.x, x.y, x.z);
        }
        return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
    }

    cross(v: Vector): Vector {
        var x = this.y * v.z - this.z * v.y;
        var y = this.z * v.x - this.x * v.z;
        var z = this.x * v.y - this.y * v.x;

        return new Vector(x, y, z);
    }

    dist(v: Vector): number {
        return v
            .copy()
            .subtract(this)
            .magnitude();
    }

    normalize(): Vector {
        return this.magnitude() === 0 ? this : this.divide(this.magnitude());
    }

    limit(max: number): Vector {
        var mSq = this.magnitudeSq();
        if (mSq > max * max) {
            this.divide(Math.sqrt(mSq)) //normalize it
                .multiply(max);
        }
        return this;
    }

    setMagnitude(n: number): Vector {
        return this.normalize().multiply(n);
    }

    heading(): number {
        return Math.atan2(this.y, this.x);
    }

    rotate(a: number): Vector {
        var newHeading = this.heading() + a;
        var mag = this.magnitude();
        this.x = Math.cos(newHeading) * mag;
        this.y = Math.sin(newHeading) * mag;

        return this;
    }

    angleBetween(v: Vector): number {
        var dotmagmag = this.dot(v) / (this.magnitude() * v.magnitude());
        // Mathematically speaking: the dotmagmag variable will be between -1 and 1
        // inclusive. Practically though it could be slightly outside this range due
        // to floating-point rounding issues. This can make Math.acos return NaN.
        //
        // Solution: we'll clamp the value to the -1,1 range
        var angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
        return angle;
    }

    lerp(x: any, y?: number, z?: number, amt?: number): Vector {
        if (x instanceof Vector) {
            return this.lerp(x.x, x.y, x.z, y);
        }
        this.x += (x - this.x) * amt || 0;
        this.y += (y - this.y) * amt || 0;
        this.z += (z - this.z) * amt || 0;
        return this;
    }

    toArray() {
        return [this.x || 0, this.y || 0, this.z || 0];
    }

    equals(x: any, y?: number, z?: number): boolean {
        var a, b, c;
        if (x instanceof Vector) {
            a = x.x || 0;
            b = x.y || 0;
            c = x.z || 0;
        } else if (x instanceof Array) {
            a = x[0] || 0;
            b = x[1] || 0;
            c = x[2] || 0;
        } else {
            a = x || 0;
            b = y || 0;
            c = z || 0;
        }
        return this.x === a && this.y === b && this.z === c;
    }

    static fromAngle(angle: number): Vector {
        return new Vector(Math.cos(angle), Math.sin(angle), 0);
    }

    static random2D(): Vector {
        var angle = Math.random() * 2 * Math.PI;
        
        return this.fromAngle(angle);
    }

    static random3D(): Vector {
        var angle, vz;

        angle = Math.random() * 2 * Math.PI;
        vz = Math.random() * 2 - 1;

        var vzBase = Math.sqrt(1 - vz * vz);
        var vx = vzBase * Math.cos(angle);
        var vy = vzBase * Math.sin(angle);

        return new Vector(vx, vy, vz);
    }
}