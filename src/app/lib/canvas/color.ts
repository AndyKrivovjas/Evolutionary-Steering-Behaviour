export enum COLOR_MODE {
    RGBA = 'RGBA',
    HEX = 'HEX',
    HSB = 'HSB'
}

class BaseColor {
    value: string;
    valuesArray: any[];
    mode: COLOR_MODE;

    constructor(mode: COLOR_MODE) {
        this.value = '';
        this.mode = mode;
    }
}

class RGBA extends BaseColor {
    red: number;
    green: number;
    blue: number;
    alfa: number;

    constructor(r: number, g: number, b: number, a: number = 1) {
        super(COLOR_MODE.RGBA);

        this.red = r;
        this.green = g;
        this.blue = b;
        this.alfa = a;

        this.value = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alfa + ')';
        this.valuesArray = [ this.red, this.green, this.blue, this.alfa ];
    }
}

class HEX extends BaseColor {
    red: number;
    green: number;
    blue: number;

    constructor(r: number, g: number, b: number) {
        super(COLOR_MODE.HEX);

        this.red = r;
        this.green = g;
        this.blue = b;

        // this.value = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alfa + ')';
        this.valuesArray = [this.red, this.green, this.blue];
    }
}

class HSB extends BaseColor {
    hue: number; // 0..360
    saturation: number; // 0..100
    brightness: number; // 0..100

    constructor(h: number, s: number, b: number) {
        super(COLOR_MODE.HSB);

        this.hue = h;
        this.saturation = s;
        this.brightness = b;

        // this.value = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alfa + ')';
        this.valuesArray = [this.hue, this.saturation, this.brightness];
    }
}

export class Color {
    current: BaseColor;

    rgba: RGBA;
    hex: HEX;
    hsb: HSB;

    constructor(colorString: string) {
        if (/^((?:rgb)a?)\s*\(([^\)]*)\)/.test(colorString)) {
            let parts = /\((.*)\)/.exec(colorString)[1].replace(' ', '').split(',');
            this.rgba = RGBA.apply(this, parts);
        } else if(/^((?:hsb))\s*\(([^\)]*)\)/.test(colorString)) {

        } else if(/^#[A-Fa-f0-9]+$/.test(colorString)) {

        }
    }

    static lerp(a, b, amount) {

        var ah = parseInt(a.replace(/#/g, ''), 16),
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            bh = parseInt(b.replace(/#/g, ''), 16),
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + amount * (br - ar),
            rg = ag + amount * (bg - ag),
            rb = ab + amount * (bb - ab);

        return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
    }
}