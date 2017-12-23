/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(1);
var app = new app_1.App();
app.run();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vehicle_1 = __webpack_require__(2);
__webpack_require__(5);
var canvas_1 = __webpack_require__(6);
var App = (function () {
    function App(initCallback, renderCallback) {
        var _this = this;
        this.initCallback = initCallback;
        this.renderCallback = renderCallback;
        this.vehicles = [];
        this.render = function () {
            _this.meter.tickStart();
            _this.canvas.updateBackground();
            if (typeof _this.renderCallback == 'function') {
                _this.renderCallback(_this.canvas);
            }
            _this.vehicles.forEach(function (element) {
                element.update();
            });
            _this.canvas.renderAll();
            _this.meter.tick();
            requestAnimationFrame(_this.render);
        };
        this.meter = new FPSMeter();
    }
    App.prototype.init = function () {
        this.canvas = new canvas_1.Canvas('canvas', {
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.canvas.setBackground('#555');
        this.addVehicle();
        if (typeof this.initCallback == 'function') {
            this.initCallback(this.canvas);
        }
    };
    App.prototype.run = function () {
        this.init();
        this.render();
    };
    App.prototype.addVehicle = function () {
        var vehicle = new vehicle_1.Vehicle(this.canvas.draw);
        this.canvas.add(vehicle.body);
        this.vehicles.push(vehicle);
    };
    return App;
}());
exports.App = App;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var particle_1 = __webpack_require__(3);
var vector_1 = __webpack_require__(4);
var Vehicle = (function (_super) {
    __extends(Vehicle, _super);
    function Vehicle(draw) {
        var _this = _super.call(this) || this;
        _this.maxSpeed = 5;
        _this.maxForce = 0.1;
        _this.body = draw.ellipse(new vector_1.Vector(100, 100), 5);
        _this.velocity = new vector_1.Vector(0, 0);
        _this.acceleration = new vector_1.Vector(0, 0);
        _this.target = new vector_1.Vector(500, 500);
        return _this;
    }
    Vehicle.prototype.setTarget = function (target) {
        this.target = target;
    };
    Vehicle.prototype.update = function () {
        var stearingForce = this.seek(this.target);
        this.applyForce(stearingForce);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.body.position.add(this.velocity);
        this.acceleration.multiply(0);
    };
    Vehicle.prototype.applyForce = function (force) {
        this.acceleration.add(force);
    };
    Vehicle.prototype.seek = function (target) {
        var desired = target.copy().subtract(this.body.position);
        desired.setMagnitude(this.maxSpeed);
        var steer = desired.copy().subtract(this.velocity);
        steer.limit(this.maxForce);
        return steer;
    };
    return Vehicle;
}(particle_1.Particle));
exports.Vehicle = Vehicle;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Particle = (function () {
    function Particle() {
    }
    Particle.prototype.setParent = function (cnavas) {
        this.parent = cnavas;
    };
    return Particle;
}());
exports.Particle = Particle;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector = (function () {
    function Vector(x, y, z) {
        this.set(x, y, z);
    }
    Vector.prototype.set = function (x, y, z) {
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
    };
    Vector.prototype.copy = function () {
        return new Vector(this.x, this.y, this.z);
    };
    Vector.prototype.add = function (x, y, z) {
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
    };
    Vector.prototype.subtract = function (x, y, z) {
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
    };
    Vector.prototype.multiply = function (n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    };
    Vector.prototype.divide = function (n) {
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    };
    Vector.prototype.magnitude = function () {
        return Math.sqrt(this.magnitudeSq());
    };
    Vector.prototype.magnitudeSq = function () {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        return x * x + y * y + z * z;
    };
    Vector.prototype.dot = function (x, y, z) {
        if (x instanceof Vector) {
            return this.dot(x.x, x.y, x.z);
        }
        return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
    };
    Vector.prototype.cross = function (v) {
        var x = this.y * v.z - this.z * v.y;
        var y = this.z * v.x - this.x * v.z;
        var z = this.x * v.y - this.y * v.x;
        return new Vector(x, y, z);
    };
    Vector.prototype.dist = function (v) {
        return v
            .copy()
            .subtract(this)
            .magnitude();
    };
    Vector.prototype.normalize = function () {
        return this.magnitude() === 0 ? this : this.divide(this.magnitude());
    };
    Vector.prototype.limit = function (max) {
        var mSq = this.magnitudeSq();
        if (mSq > max * max) {
            this.divide(Math.sqrt(mSq))
                .multiply(max);
        }
        return this;
    };
    Vector.prototype.setMagnitude = function (n) {
        return this.normalize().multiply(n);
    };
    Vector.prototype.heading = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.rotate = function (a) {
        var newHeading = this.heading() + a;
        var mag = this.magnitude();
        this.x = Math.cos(newHeading) * mag;
        this.y = Math.sin(newHeading) * mag;
        return this;
    };
    Vector.prototype.angleBetween = function (v) {
        var dotmagmag = this.dot(v) / (this.magnitude() * v.magnitude());
        var angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
        return angle;
    };
    Vector.prototype.lerp = function (x, y, z, amt) {
        if (x instanceof Vector) {
            return this.lerp(x.x, x.y, x.z, y);
        }
        this.x += (x - this.x) * amt || 0;
        this.y += (y - this.y) * amt || 0;
        this.z += (z - this.z) * amt || 0;
        return this;
    };
    Vector.prototype.toArray = function () {
        return [this.x || 0, this.y || 0, this.z || 0];
    };
    Vector.prototype.equals = function (x, y, z) {
        var a, b, c;
        if (x instanceof Vector) {
            a = x.x || 0;
            b = x.y || 0;
            c = x.z || 0;
        }
        else if (x instanceof Array) {
            a = x[0] || 0;
            b = x[1] || 0;
            c = x[2] || 0;
        }
        else {
            a = x || 0;
            b = y || 0;
            c = z || 0;
        }
        return this.x === a && this.y === b && this.z === c;
    };
    Vector.prototype.fromAngle = function (angle) {
        return new Vector(Math.cos(angle), Math.sin(angle), 0);
    };
    Vector.prototype.random2D = function () {
        var angle = Math.random() * 2 * Math.PI;
        return this.fromAngle(angle);
    };
    Vector.prototype.random3D = function () {
        var angle, vz;
        angle = Math.random() * 2 * Math.PI;
        vz = Math.random() * 2 - 1;
        var vzBase = Math.sqrt(1 - vz * vz);
        var vx = vzBase * Math.cos(angle);
        var vy = vzBase * Math.sin(angle);
        return new Vector(vx, vy, vz);
    };
    return Vector;
}());
exports.Vector = Vector;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*!
 * FPSMeter 0.3.1 - 9th May 2013
 * https://github.com/Darsain/fpsmeter
 *
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 */
;(function (w, undefined) {
	'use strict';

	/**
	 * Create a new element.
	 *
	 * @param  {String} name Element type name.
	 *
	 * @return {Element}
	 */
	function newEl(name) {
		return document.createElement(name);
	}

	/**
	 * Apply theme CSS properties to element.
	 *
	 * @param  {Element} element DOM element.
	 * @param  {Object}  theme   Theme object.
	 *
	 * @return {Element}
	 */
	function applyTheme(element, theme) {
		for (var name in theme) {
			try {
				element.style[name] = theme[name];
			} catch (e) {}
		}
		return element;
	}

	/**
	 * Return type of the value.
	 *
	 * @param  {Mixed} value
	 *
	 * @return {String}
	 */
	function type(value) {
		if (value == null) {
			return String(value);
		}

		if (typeof value === 'object' || typeof value === 'function') {
			return Object.prototype.toString.call(value).match(/\s([a-z]+)/i)[1].toLowerCase() || 'object';
		}

		return typeof value;
	}

	/**
	 * Check whether the value is in an array.
	 *
	 * @param  {Mixed} value
	 * @param  {Array} array
	 *
	 * @return {Integer} Array index or -1 when not found.
	 */
	function inArray(value, array) {
		if (type(array) !== 'array') {
			return -1;
		}
		if (array.indexOf) {
			return array.indexOf(value);
		}
		for (var i = 0, l = array.length; i < l; i++) {
			if (array[i] === value) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * Poor man's deep object extend.
	 *
	 * Example:
	 *   extend({}, defaults, options);
	 *
	 * @return {Void}
	 */
	function extend() {
		var args = arguments;
		for (var key in args[1]) {
			if (args[1].hasOwnProperty(key)) {
				switch (type(args[1][key])) {
					case 'object':
						args[0][key] = extend({}, args[0][key], args[1][key]);
						break;

					case 'array':
						args[0][key] = args[1][key].slice(0);
						break;

					default:
						args[0][key] = args[1][key];
				}
			}
		}
		return args.length > 2 ?
			extend.apply(null, [args[0]].concat(Array.prototype.slice.call(args, 2))) :
			args[0];
	}

	/**
	 * Convert HSL color to HEX string.
	 *
	 * @param  {Array} hsl Array with [hue, saturation, lightness].
	 *
	 * @return {Array} Array with [red, green, blue].
	 */
	function hslToHex(h, s, l) {
		var r, g, b;
		var v, min, sv, sextant, fract, vsf;

		if (l <= 0.5) {
			v = l * (1 + s);
		} else {
			v = l + s - l * s;
		}

		if (v === 0) {
			return '#000';
		} else {
			min = 2 * l - v;
			sv = (v - min) / v;
			h = 6 * h;
			sextant = Math.floor(h);
			fract = h - sextant;
			vsf = v * sv * fract;
			if (sextant === 0 || sextant === 6) {
				r = v;
				g = min + vsf;
				b = min;
			} else if (sextant === 1) {
				r = v - vsf;
				g = v;
				b = min;
			} else if (sextant === 2) {
				r = min;
				g = v;
				b = min + vsf;
			} else if (sextant === 3) {
				r = min;
				g = v - vsf;
				b = v;
			} else if (sextant === 4) {
				r = min + vsf;
				g = min;
				b = v;
			} else {
				r = v;
				g = min;
				b = v - vsf;
			}
			return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
	}

	/**
	 * Helper function for hslToHex.
	 */
	function componentToHex(c) {
		c = Math.round(c * 255).toString(16);
		return c.length === 1 ? '0' + c : c;
	}

	/**
	 * Manage element event listeners.
	 *
	 * @param  {Node}     element
	 * @param  {Event}    eventName
	 * @param  {Function} handler
	 * @param  {Bool}     remove
	 *
	 * @return {Void}
	 */
	function listener(element, eventName, handler, remove) {
		if (element.addEventListener) {
			element[remove ? 'removeEventListener' : 'addEventListener'](eventName, handler, false);
		} else if (element.attachEvent) {
			element[remove ? 'detachEvent' : 'attachEvent']('on' + eventName, handler);
		}
	}

	// Preferred timing funtion
	var getTime;
	(function () {
		var perf = w.performance;
		if (perf && (perf.now || perf.webkitNow)) {
			var perfNow = perf.now ? 'now' : 'webkitNow';
			getTime = perf[perfNow].bind(perf);
		} else {
			getTime = function () {
				return +new Date();
			};
		}
	}());

	// Local WindowAnimationTiming interface polyfill
	var cAF = w.cancelAnimationFrame || w.cancelRequestAnimationFrame;
	var rAF = w.requestAnimationFrame;
	(function () {
		var vendors = ['moz', 'webkit', 'o'];
		var lastTime = 0;

		// For a more accurate WindowAnimationTiming interface implementation, ditch the native
		// requestAnimationFrame when cancelAnimationFrame is not present (older versions of Firefox)
		for (var i = 0, l = vendors.length; i < l && !cAF; ++i) {
			cAF = w[vendors[i]+'CancelAnimationFrame'] || w[vendors[i]+'CancelRequestAnimationFrame'];
			rAF = cAF && w[vendors[i]+'RequestAnimationFrame'];
		}

		if (!cAF) {
			rAF = function (callback) {
				var currTime = getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				lastTime = currTime + timeToCall;
				return w.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
			};

			cAF = function (id) {
				clearTimeout(id);
			};
		}
	}());

	// Property name for assigning element text content
	var textProp = type(document.createElement('div').textContent) === 'string' ? 'textContent' : 'innerText';

	/**
	 * FPSMeter class.
	 *
	 * @param {Element} anchor  Element to append the meter to. Default is document.body.
	 * @param {Object}  options Object with options.
	 */
	function FPSMeter(anchor, options) {
		// Optional arguments
		if (type(anchor) === 'object' && anchor.nodeType === undefined) {
			options = anchor;
			anchor = document.body;
		}
		if (!anchor) {
			anchor = document.body;
		}

		// Private properties
		var self = this;
		var o = extend({}, FPSMeter.defaults, options || {});

		var el = {};
		var cols = [];
		var theme, heatmaps;
		var heatDepth = 100;
		var heating = [];

		var thisFrameTime = 0;
		var frameTime = o.threshold;
		var frameStart = 0;
		var lastLoop = getTime() - frameTime;
		var time;

		var fpsHistory = [];
		var durationHistory = [];

		var frameID, renderID;
		var showFps = o.show === 'fps';
		var graphHeight, count, i, j;

		// Exposed properties
		self.options = o;
		self.fps = 0;
		self.duration = 0;
		self.isPaused = 0;

		/**
		 * Tick start for measuring the actual rendering duration.
		 *
		 * @return {Void}
		 */
		self.tickStart = function () {
			frameStart = getTime();
		};

		/**
		 * FPS tick.
		 *
		 * @return {Void}
		 */
		self.tick = function () {
			time = getTime();
			thisFrameTime = time - lastLoop;
			frameTime += (thisFrameTime - frameTime) / o.smoothing;
			self.fps = 1000 / frameTime;
			self.duration = frameStart < lastLoop ? frameTime : time - frameStart;
			lastLoop = time;
		};

		/**
		 * Pause display rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.pause = function () {
			if (frameID) {
				self.isPaused = 1;
				clearTimeout(frameID);
				cAF(frameID);
				cAF(renderID);
				frameID = renderID = 0;
			}
			return self;
		};

		/**
		 * Resume display rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.resume = function () {
			if (!frameID) {
				self.isPaused = 0;
				requestRender();
			}
			return self;
		};

		/**
		 * Update options.
		 *
		 * @param {String} name  Option name.
		 * @param {Mixed}  value New value.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.set = function (name, value) {
			o[name] = value;
			showFps = o.show === 'fps';

			// Rebuild or reposition elements when specific option has been updated
			if (inArray(name, rebuilders) !== -1) {
				createMeter();
			}
			if (inArray(name, repositioners) !== -1) {
				positionMeter();
			}
			return self;
		};

		/**
		 * Change meter into rendering duration mode.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.showDuration = function () {
			self.set('show', 'ms');
			return self;
		};

		/**
		 * Change meter into FPS mode.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.showFps = function () {
			self.set('show', 'fps');
			return self;
		};

		/**
		 * Toggles between show: 'fps' and show: 'duration'.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.toggle = function () {
			self.set('show', showFps ? 'ms' : 'fps');
			return self;
		};

		/**
		 * Hide the FPSMeter. Also pauses the rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.hide = function () {
			self.pause();
			el.container.style.display = 'none';
			return self;
		};

		/**
		 * Show the FPSMeter. Also resumes the rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.show = function () {
			self.resume();
			el.container.style.display = 'block';
			return self;
		};

		/**
		 * Check the current FPS and save it in history.
		 *
		 * @return {Void}
		 */
		function historyTick() {
			for (i = o.history; i--;) {
				fpsHistory[i] = i === 0 ? self.fps : fpsHistory[i-1];
				durationHistory[i] = i === 0 ? self.duration : durationHistory[i-1];
			}
		}

		/**
		 * Returns heat hex color based on values passed.
		 *
		 * @param  {Integer} heatmap
		 * @param  {Integer} value
		 * @param  {Integer} min
		 * @param  {Integer} max
		 *
		 * @return {Integer}
		 */
		function getHeat(heatmap, value, min, max) {
			return heatmaps[0|heatmap][Math.round(Math.min((value - min) / (max - min) * heatDepth, heatDepth))];
		}

		/**
		 * Update counter number and legend.
		 *
		 * @return {Void}
		 */
		function updateCounter() {
			// Update legend only when changed
			if (el.legend.fps !== showFps) {
				el.legend.fps = showFps;
				el.legend[textProp] = showFps ? 'FPS' : 'ms';
			}
			// Update counter with a nicely formated & readable number
			count = showFps ? self.fps : self.duration;
			el.count[textProp] = count > 999 ? '999+' : count.toFixed(count > 99 ? 0 : o.decimals);
		}

		/**
		 * Render current FPS state.
		 *
		 * @return {Void}
		 */
		function render() {
			time = getTime();
			// If renderer stopped reporting, do a simulated drop to 0 fps
			if (lastLoop < time - o.threshold) {
				self.fps -= self.fps / Math.max(1, o.smoothing * 60 / o.interval);
				self.duration = 1000 / self.fps;
			}

			historyTick();
			updateCounter();

			// Apply heat to elements
			if (o.heat) {
				if (heating.length) {
					for (i = heating.length; i--;) {
						heating[i].el.style[theme[heating[i].name].heatOn] = showFps ?
							getHeat(theme[heating[i].name].heatmap, self.fps, 0, o.maxFps) :
							getHeat(theme[heating[i].name].heatmap, self.duration, o.threshold, 0);
					}
				}

				if (el.graph && theme.column.heatOn) {
					for (i = cols.length; i--;) {
						cols[i].style[theme.column.heatOn] = showFps ?
							getHeat(theme.column.heatmap, fpsHistory[i], 0, o.maxFps) :
							getHeat(theme.column.heatmap, durationHistory[i], o.threshold, 0);
					}
				}
			}

			// Update graph columns height
			if (el.graph) {
				for (j = 0; j < o.history; j++) {
					cols[j].style.height = (showFps ?
						(fpsHistory[j] ? Math.round(graphHeight / o.maxFps * Math.min(fpsHistory[j], o.maxFps)) : 0) :
						(durationHistory[j] ? Math.round(graphHeight / o.threshold * Math.min(durationHistory[j], o.threshold)) : 0)
					) + 'px';
				}
			}
		}

		/**
		 * Request rendering loop.
		 *
		 * @return {Int} Animation frame index.
		 */
		function requestRender() {
			if (o.interval < 20) {
				frameID = rAF(requestRender);
				render();
			} else {
				frameID = setTimeout(requestRender, o.interval);
				renderID = rAF(render);
			}
		}

		/**
		 * Meter events handler.
		 *
		 * @return {Void}
		 */
		function eventHandler(event) {
			event = event || window.event;
			if (event.preventDefault) {
				event.preventDefault();
				event.stopPropagation();
			} else {
				event.returnValue = false;
				event.cancelBubble = true;
			}
			self.toggle();
		}

		/**
		 * Destroys the current FPSMeter instance.
		 *
		 * @return {Void}
		 */
		self.destroy = function () {
			// Stop rendering
			self.pause();
			// Remove elements
			removeMeter();
			// Stop listening
			self.tick = self.tickStart = function () {};
		};

		/**
		 * Remove meter element.
		 *
		 * @return {Void}
		 */
		function removeMeter() {
			// Unbind listeners
			if (o.toggleOn) {
				listener(el.container, o.toggleOn, eventHandler, 1);
			}
			// Detach element
			anchor.removeChild(el.container);
		}

		/**
		 * Sets the theme, and generates heatmaps when needed.
		 */
		function setTheme() {
			theme = FPSMeter.theme[o.theme];

			// Generate heatmaps
			heatmaps = theme.compiledHeatmaps || [];
			if (!heatmaps.length && theme.heatmaps.length) {
				for (j = 0; j < theme.heatmaps.length; j++) {
					heatmaps[j] = [];
					for (i = 0; i <= heatDepth; i++) {
						heatmaps[j][i] = hslToHex(0.33 / heatDepth * i, theme.heatmaps[j].saturation, theme.heatmaps[j].lightness);
					}
				}
				theme.compiledHeatmaps = heatmaps;
			}
		}

		/**
		 * Creates and attaches the meter element.
		 *
		 * @return {Void}
		 */
		function createMeter() {
			// Remove old meter if present
			if (el.container) {
				removeMeter();
			}

			// Set theme
			setTheme();

			// Create elements
			el.container = applyTheme(newEl('div'), theme.container);
			el.count = el.container.appendChild(applyTheme(newEl('div'), theme.count));
			el.legend = el.container.appendChild(applyTheme(newEl('div'), theme.legend));
			el.graph = o.graph ? el.container.appendChild(applyTheme(newEl('div'), theme.graph)) : 0;

			// Add elements to heating array
			heating.length = 0;
			for (var key in el) {
				if (el[key] && theme[key].heatOn) {
					heating.push({
						name: key,
						el: el[key]
					});
				}
			}

			// Graph
			cols.length = 0;
			if (el.graph) {
				// Create graph
				el.graph.style.width = (o.history * theme.column.width + (o.history - 1) * theme.column.spacing) + 'px';

				// Add columns
				for (i = 0; i < o.history; i++) {
					cols[i] = el.graph.appendChild(applyTheme(newEl('div'), theme.column));
					cols[i].style.position = 'absolute';
					cols[i].style.bottom = 0;
					cols[i].style.right = (i * theme.column.width + i * theme.column.spacing) + 'px';
					cols[i].style.width = theme.column.width + 'px';
					cols[i].style.height = '0px';
				}
			}

			// Set the initial state
			positionMeter();
			updateCounter();

			// Append container to anchor
			anchor.appendChild(el.container);

			// Retrieve graph height after it was appended to DOM
			if (el.graph) {
				graphHeight = el.graph.clientHeight;
			}

			// Add event listeners
			if (o.toggleOn) {
				if (o.toggleOn === 'click') {
					el.container.style.cursor = 'pointer';
				}
				listener(el.container, o.toggleOn, eventHandler);
			}
		}

		/**
		 * Positions the meter based on options.
		 *
		 * @return {Void}
		 */
		function positionMeter() {
			applyTheme(el.container, o);
		}

		/**
		 * Construct.
		 */
		(function () {
			// Create meter element
			createMeter();
			// Start rendering
			requestRender();
		}());
	}

	// Expose the extend function
	FPSMeter.extend = extend;

	// Expose the FPSMeter class
	window.FPSMeter = FPSMeter;

	// Default options
	FPSMeter.defaults = {
		interval:  100,     // Update interval in milliseconds.
		smoothing: 10,      // Spike smoothing strength. 1 means no smoothing.
		show:      'fps',   // Whether to show 'fps', or 'ms' = frame duration in milliseconds.
		toggleOn:  'click', // Toggle between show 'fps' and 'ms' on this event.
		decimals:  1,       // Number of decimals in FPS number. 1 = 59.9, 2 = 59.94, ...
		maxFps:    60,      // Max expected FPS value.
		threshold: 100,     // Minimal tick reporting interval in milliseconds.

		// Meter position
		position: 'absolute', // Meter position.
		zIndex:   10,         // Meter Z index.
		left:     '5px',      // Meter left offset.
		top:      '5px',      // Meter top offset.
		right:    'auto',     // Meter right offset.
		bottom:   'auto',     // Meter bottom offset.
		margin:   '0 0 0 0',  // Meter margin. Helps with centering the counter when left: 50%;

		// Theme
		theme: 'dark', // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
		heat:  0,      // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.

		// Graph
		graph:   0, // Whether to show history graph.
		history: 20 // How many history states to show in a graph.
	};

	// Option names that trigger FPSMeter rebuild or reposition when modified
	var rebuilders = [
		'toggleOn',
		'theme',
		'heat',
		'graph',
		'history'
	];
	var repositioners = [
		'position',
		'zIndex',
		'left',
		'top',
		'right',
		'bottom',
		'margin'
	];
}(window));
;(function (w, FPSMeter, undefined) {
	'use strict';

	// Themes object
	FPSMeter.theme = {};

	// Base theme with layout, no colors
	var base = FPSMeter.theme.base = {
		heatmaps: [],
		container: {
			// Settings
			heatOn: null,
			heatmap: null,

			// Styles
			padding: '5px',
			minWidth: '95px',
			height: '30px',
			lineHeight: '30px',
			textAlign: 'right',
			textShadow: 'none'
		},
		count: {
			// Settings
			heatOn: null,
			heatmap: null,

			// Styles
			position: 'absolute',
			top: 0,
			right: 0,
			padding: '5px 10px',
			height: '30px',
			fontSize: '24px',
			fontFamily: 'Consolas, Andale Mono, monospace',
			zIndex: 2
		},
		legend: {
			// Settings
			heatOn: null,
			heatmap: null,

			// Styles
			position: 'absolute',
			top: 0,
			left: 0,
			padding: '5px 10px',
			height: '30px',
			fontSize: '12px',
			lineHeight: '32px',
			fontFamily: 'sans-serif',
			textAlign: 'left',
			zIndex: 2
		},
		graph: {
			// Settings
			heatOn: null,
			heatmap: null,

			// Styles
			position: 'relative',
			boxSizing: 'padding-box',
			MozBoxSizing: 'padding-box',
			height: '100%',
			zIndex: 1
		},
		column: {
			// Settings
			width: 4,
			spacing: 1,
			heatOn: null,
			heatmap: null
		}
	};

	// Dark theme
	FPSMeter.theme.dark = FPSMeter.extend({}, base, {
		heatmaps: [{
			saturation: 0.8,
			lightness: 0.8
		}],
		container: {
			background: '#222',
			color: '#fff',
			border: '1px solid #1a1a1a',
			textShadow: '1px 1px 0 #222'
		},
		count: {
			heatOn: 'color'
		},
		column: {
			background: '#3f3f3f'
		}
	});

	// Light theme
	FPSMeter.theme.light = FPSMeter.extend({}, base, {
		heatmaps: [{
			saturation: 0.5,
			lightness: 0.5
		}],
		container: {
			color: '#666',
			background: '#fff',
			textShadow: '1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)',
			boxShadow: '0 0 0 1px rgba(0,0,0,.1)'
		},
		count: {
			heatOn: 'color'
		},
		column: {
			background: '#eaeaea'
		}
	});

	// Colorful theme
	FPSMeter.theme.colorful = FPSMeter.extend({}, base, {
		heatmaps: [{
			saturation: 0.5,
			lightness: 0.6
		}],
		container: {
			heatOn: 'backgroundColor',
			background: '#888',
			color: '#fff',
			textShadow: '1px 1px 0 rgba(0,0,0,.2)',
			boxShadow: '0 0 0 1px rgba(0,0,0,.1)'
		},
		column: {
			background: '#777',
			backgroundColor: 'rgba(0,0,0,.2)'
		}
	});

	// Transparent theme
	FPSMeter.theme.transparent = FPSMeter.extend({}, base, {
		heatmaps: [{
			saturation: 0.8,
			lightness: 0.5
		}],
		container: {
			padding: 0,
			color: '#fff',
			textShadow: '1px 1px 0 rgba(0,0,0,.5)'
		},
		count: {
			padding: '0 5px',
			height: '40px',
			lineHeight: '40px'
		},
		legend: {
			padding: '0 5px',
			height: '40px',
			lineHeight: '42px'
		},
		graph: {
			height: '40px'
		},
		column: {
			width: 5,
			background: '#999',
			heatOn: 'backgroundColor',
			opacity: 0.5
		}
	});
}(window, FPSMeter));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var draw_1 = __webpack_require__(7);
var Canvas = (function () {
    function Canvas(id, options) {
        this.id = id;
        this.options = options;
        this.background = '#fff';
        this.objects = [];
        this.body = document.createElement('canvas');
        this.body.id = id;
        this.body.width = this.options.width;
        this.body.height = this.options.height;
        document.body.appendChild(this.body);
        this.context = this.body.getContext('2d');
        this.draw = new draw_1.CanvasDraw(this);
    }
    Canvas.prototype.add = function (obj) {
        this.objects.push(obj);
    };
    Canvas.prototype.setBackground = function (color) {
        this.background = color;
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.body.width, this.body.height);
    };
    Canvas.prototype.updateBackground = function () {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.body.width, this.body.height);
    };
    Canvas.prototype.renderAll = function () {
        this.objects.forEach(function (obj) {
            obj.render();
        });
    };
    return Canvas;
}());
exports.Canvas = Canvas;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PRIMITIVES;
(function (PRIMITIVES) {
    PRIMITIVES["POINT"] = "POINT";
    PRIMITIVES["ELLIPSE"] = "ELLIPSE";
    PRIMITIVES["RECTANGLE"] = "RECTANGLE";
    PRIMITIVES["TRIANGLE"] = "TRIANGLE";
    PRIMITIVES["POLYGON"] = "POLYGON";
})(PRIMITIVES = exports.PRIMITIVES || (exports.PRIMITIVES = {}));
var BaseObject = (function () {
    function BaseObject(d, t, p) {
        this.drawContext = d;
        this.ctx = d.parent.context;
        this.type = t;
        this.position = p;
    }
    BaseObject.prototype.start = function () {
        this.ctx.save();
        this.ctx.beginPath();
    };
    BaseObject.prototype.applyStyles = function () {
        this.ctx.fillStyle = this.drawContext.styles.fill;
        this.ctx.strokeStyle = this.drawContext.styles.strokeColor;
        this.ctx.lineWidth = this.drawContext.styles.strokeWidth;
        this.ctx.fill();
        this.ctx.stroke();
    };
    BaseObject.prototype.end = function () {
        this.applyStyles();
        this.ctx.closePath();
        this.ctx.restore();
    };
    BaseObject.prototype.render = function () {
    };
    return BaseObject;
}());
exports.BaseObject = BaseObject;
var Ellipse = (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(d, position, rx, ry) {
        var _this = _super.call(this, d, PRIMITIVES.ELLIPSE, position) || this;
        _this.rx = rx;
        _this.ry = ry;
        return _this;
    }
    Ellipse.prototype.render = function () {
        this.start();
        this.ctx.ellipse(this.position.x, this.position.y, this.rx, this.ry, 0, 0, 2 * Math.PI);
        this.end();
    };
    return Ellipse;
}(BaseObject));
exports.Ellipse = Ellipse;
var DISPLAY_MODE;
(function (DISPLAY_MODE) {
    DISPLAY_MODE["CENTER"] = "CENTER";
    DISPLAY_MODE["CORNER"] = "CORNER";
})(DISPLAY_MODE = exports.DISPLAY_MODE || (exports.DISPLAY_MODE = {}));
var CanvasDraw = (function () {
    function CanvasDraw(c) {
        this.DISPLAY_MODE = DISPLAY_MODE.CENTER;
        this.parent = c;
        this.styles = {
            strokeColor: '#ffffff',
            strokeWidth: 1,
            fill: '#ffffff'
        };
    }
    CanvasDraw.prototype.setStroke = function () {
    };
    CanvasDraw.prototype.setFill = function () {
    };
    CanvasDraw.prototype.ellipse = function (position, rx, ry) {
        ry = ry || rx;
        return new Ellipse(this, position, rx, ry);
    };
    return CanvasDraw;
}());
exports.CanvasDraw = CanvasDraw;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDFkYTRhN2Q0M2JjMzA5MjY5ZDIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY2xhc3Nlcy92ZWhpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY2xhc3Nlcy9wYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2xpYi9tYXRoL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZnBzbWV0ZXIvZGlzdC9mcHNtZXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2xpYi9jYW52YXMvY2FudmFzLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvbGliL2NhbnZhcy9kcmF3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxtQ0FBZ0M7QUFHaEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztBQUNwQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7QUNIVix1Q0FBNEM7QUFDNUMsdUJBQWtCO0FBQ2xCLHNDQUE2QztBQUU3QztJQUtJLGFBQW9CLFlBQXVC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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsa0NBQWtDOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxJQUFJO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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eEYsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLENBZjRCLFVBQVUsR0FldEM7QUFmWSwwQkFBTztBQWlCcEIsSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3BCLGlDQUFpQjtJQUNqQixpQ0FBaUI7QUFDckIsQ0FBQyxFQUhXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBR3ZCO0FBRUQ7SUFVSSxvQkFBWSxDQUFTO1FBRnJCLGlCQUFZLEdBQWlCLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFHN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFdBQVcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxFQUFFLFNBQVM7U0FDbEI7SUFDTCxDQUFDO0lBRUQsOEJBQVMsR0FBVDtJQUVBLENBQUM7SUFFRCw0QkFBTyxHQUFQO0lBRUEsQ0FBQztJQUVELDRCQUFPLEdBQVAsVUFBUSxRQUFnQixFQUFFLEVBQVUsRUFBRSxFQUFXO1FBQzdDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2QsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTCxpQkFBQztBQUFELENBQUM7QUFoQ1ksZ0NBQVUiLCJmaWxlIjoiLi9kaXN0L2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQxZGE0YTdkNDNiYzMwOTI2OWQyIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9hcHAvYXBwJztcbmltcG9ydCB7IFZlaGljbGUgfSBmcm9tICcuL2FwcC9jbGFzc2VzL3ZlaGljbGUnO1xuXG52YXIgYXBwID0gbmV3IEFwcCgpO1xuYXBwLnJ1bigpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiLCJcbmltcG9ydCB7IFZlaGljbGUgfSBmcm9tICcuL2NsYXNzZXMvdmVoaWNsZSc7XG5pbXBvcnQgJ2Zwc21ldGVyJztcbmltcG9ydCB7IENhbnZhcyB9IGZyb20gJy4vbGliL2NhbnZhcy9jYW52YXMnO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgICBtZXRlcjogRlBTTWV0ZXI7XG4gICAgY2FudmFzOiBDYW52YXM7XG4gICAgdmVoaWNsZXM6IFZlaGljbGVbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbml0Q2FsbGJhY2s/OiBGdW5jdGlvbiwgcHJpdmF0ZSByZW5kZXJDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubWV0ZXIgPSBuZXcgRlBTTWV0ZXIoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IG5ldyBDYW52YXMoJ2NhbnZhcycsIHtcbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNhbnZhcy5zZXRCYWNrZ3JvdW5kKCcjNTU1Jyk7XG5cbiAgICAgICAgdGhpcy5hZGRWZWhpY2xlKCk7XG5cbiAgICAgICAgaWYodHlwZW9mIHRoaXMuaW5pdENhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdENhbGxiYWNrKHRoaXMuY2FudmFzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5tZXRlci50aWNrU3RhcnQoKTtcblxuICAgICAgICB0aGlzLmNhbnZhcy51cGRhdGVCYWNrZ3JvdW5kKCk7XG5cbiAgICAgICAgaWYodHlwZW9mIHRoaXMucmVuZGVyQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJDYWxsYmFjayh0aGlzLmNhbnZhcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZlaGljbGVzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnVwZGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcblxuICAgICAgICB0aGlzLm1ldGVyLnRpY2soKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyKTtcbiAgICB9XG5cbiAgICBydW4oKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1Db21wb25lbnRzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIGFkZFZlaGljbGUoKSB7XG4gICAgICAgIHZhciB2ZWhpY2xlID0gbmV3IFZlaGljbGUoXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5kcmF3XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkKHZlaGljbGUuYm9keSk7XG4gICAgICAgIHRoaXMudmVoaWNsZXMucHVzaCh2ZWhpY2xlKTtcbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2FwcC50cyIsImltcG9ydCB7IFBhcnRpY2xlIH0gZnJvbSBcIi4vcGFydGljbGVcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9saWIvbWF0aC92ZWN0b3JcIjtcbmltcG9ydCB7IEJhc2VPYmplY3QsIENhbnZhc0RyYXcgfSBmcm9tIFwiLi4vbGliL2NhbnZhcy9kcmF3XCI7XG5cbmV4cG9ydCBjbGFzcyBWZWhpY2xlIGV4dGVuZHMgUGFydGljbGUge1xuICAgIHRhcmdldDogVmVjdG9yO1xuICAgIHZlbG9jaXR5OiBWZWN0b3I7XG4gICAgYWNjZWxlcmF0aW9uOiBWZWN0b3I7XG4gICAgbWF4U3BlZWQ6IG51bWJlciA9IDU7XG4gICAgbWF4Rm9yY2U6IG51bWJlciA9IDAuMTtcblxuICAgIGNvbnN0cnVjdG9yKGRyYXc6IENhbnZhc0RyYXcpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmJvZHkgPSBkcmF3LmVsbGlwc2UoXG4gICAgICAgICAgICBuZXcgVmVjdG9yKDEwMCwgMTAwKSxcbiAgICAgICAgICAgIDVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gbmV3IFZlY3RvcigwLCAwKTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBuZXcgVmVjdG9yKDUwMCwgNTAwKTtcbiAgICB9XG5cbiAgICBzZXRUYXJnZXQodGFyZ2V0OiBWZWN0b3IpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBsZXQgc3RlYXJpbmdGb3JjZSA9IHRoaXMuc2Vlayh0aGlzLnRhcmdldCk7XG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZShzdGVhcmluZ0ZvcmNlKTtcblxuICAgICAgICAvLyBVcGRhdGUgdmVsb2NpdHlcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5hZGQodGhpcy5hY2NlbGVyYXRpb24pO1xuICAgICAgICAvLyBMaW1pdCBzcGVlZFxuICAgICAgICB0aGlzLnZlbG9jaXR5LmxpbWl0KHRoaXMubWF4U3BlZWQpO1xuICAgICAgICB0aGlzLmJvZHkucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkpO1xuICAgICAgICAvLyBSZXNldCBhY2NlbGVyYXRpb24gdG8gMCBlYWNoIGN5Y2xlXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uLm11bHRpcGx5KDApO1xuXG4gICAgICAgIC8vIHZhciB0aGV0YSA9IHRoaXMuY2FsY1ZlY3RvckhlYWRpbmcodGhpcy52ZWxvY2l0eSkgKyA0NTtcbiAgICAgICAgLy8gdGhpcy5ib2R5LmFuZ2xlID0gdGhldGE7XG5cbiAgICAgICAgLy8gU2xvd2x5IGRpZSB1bmxlc3MgeW91IGVhdFxuICAgICAgICAvLyB0aGlzLmhlYWx0aCAtPSAwLjAwMjtcblxuICAgIH1cblxuICAgIGFwcGx5Rm9yY2UoZm9yY2U6IFZlY3Rvcikge1xuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbi5hZGQoZm9yY2UpO1xuICAgIH1cblxuICAgIHNlZWsodGFyZ2V0OiBWZWN0b3IpIHtcblxuICAgICAgICB2YXIgZGVzaXJlZCA9IHRhcmdldC5jb3B5KCkuc3VidHJhY3QodGhpcy5ib2R5LnBvc2l0aW9uKTsgLy8gQSB2ZWN0b3IgcG9pbnRpbmcgZnJvbSB0aGUgbG9jYXRpb24gdG8gdGhlIHRhcmdldFxuXG4gICAgICAgIGRlc2lyZWQuc2V0TWFnbml0dWRlKHRoaXMubWF4U3BlZWQpO1xuXG4gICAgICAgIC8vIFN0ZWVyaW5nID0gRGVzaXJlZCBtaW51cyB2ZWxvY2l0eVxuICAgICAgICB2YXIgc3RlZXIgPSBkZXNpcmVkLmNvcHkoKS5zdWJ0cmFjdCh0aGlzLnZlbG9jaXR5KTtcblxuICAgICAgICAvLyBOb3QgbGltaXRpbmcgaGVyZVxuICAgICAgICBzdGVlci5saW1pdCh0aGlzLm1heEZvcmNlKTtcblxuICAgICAgICByZXR1cm4gc3RlZXI7XG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jbGFzc2VzL3ZlaGljbGUudHMiLCJpbXBvcnQgeyBCYXNlT2JqZWN0IH0gZnJvbSBcIi4uL2xpYi9jYW52YXMvZHJhd1wiO1xuaW1wb3J0IHsgQ2FudmFzIH0gZnJvbSBcIi4uL2xpYi9jYW52YXMvY2FudmFzXCI7XG5cblxuZXhwb3J0IGNsYXNzIFBhcnRpY2xlIHtcbiAgICBib2R5OiBCYXNlT2JqZWN0O1xuICAgIHBhcmVudDogQ2FudmFzO1xuXG4gICAgc2V0UGFyZW50KGNuYXZhczogQ2FudmFzKSB7XG4gICAgICAgIHRoaXMucGFyZW50ID0gY25hdmFzO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NsYXNzZXMvcGFydGljbGUudHMiLCJleHBvcnQgY2xhc3MgVmVjdG9yIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHo6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciB8IFZlY3RvciB8IEFycmF5PG51bWJlcj4sIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXQoeCwgeSwgeilcbiAgICB9XG5cbiAgICBzZXQoeDogbnVtYmVyfFZlY3RvcnxBcnJheTxudW1iZXI+LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueCB8fCAwO1xuICAgICAgICAgICAgdGhpcy55ID0geC55IHx8IDA7XG4gICAgICAgICAgICB0aGlzLnogPSB4LnogfHwgMDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHhbMF0gfHwgMDtcbiAgICAgICAgICAgIHRoaXMueSA9IHhbMV0gfHwgMDtcbiAgICAgICAgICAgIHRoaXMueiA9IHhbMl0gfHwgMDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgdGhpcy55ID0geSB8fCAwO1xuICAgICAgICB0aGlzLnogPSB6IHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvcHkoKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnksIHRoaXMueik7XG4gICAgfVxuXG4gICAgYWRkKHg6IG51bWJlciB8IFZlY3RvciB8IEFycmF5PG51bWJlcj4sIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIFZlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy54ICs9IHgueCB8fCAwO1xuICAgICAgICAgICAgdGhpcy55ICs9IHgueSB8fCAwO1xuICAgICAgICAgICAgdGhpcy56ICs9IHgueiB8fCAwO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdGhpcy54ICs9IHhbMF0gfHwgMDtcbiAgICAgICAgICAgIHRoaXMueSArPSB4WzFdIHx8IDA7XG4gICAgICAgICAgICB0aGlzLnogKz0geFsyXSB8fCAwO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54ICs9IHggfHwgMDtcbiAgICAgICAgdGhpcy55ICs9IHkgfHwgMDtcbiAgICAgICAgdGhpcy56ICs9IHogfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3VidHJhY3QoeDogbnVtYmVyIHwgVmVjdG9yIHwgQXJyYXk8bnVtYmVyPiwgeT86IG51bWJlciwgej86IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgVmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnggLT0geC54IHx8IDA7XG4gICAgICAgICAgICB0aGlzLnkgLT0geC55IHx8IDA7XG4gICAgICAgICAgICB0aGlzLnogLT0geC56IHx8IDA7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLnggLT0geFswXSB8fCAwO1xuICAgICAgICAgICAgdGhpcy55IC09IHhbMV0gfHwgMDtcbiAgICAgICAgICAgIHRoaXMueiAtPSB4WzJdIHx8IDA7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnggLT0geCB8fCAwO1xuICAgICAgICB0aGlzLnkgLT0geSB8fCAwO1xuICAgICAgICB0aGlzLnogLT0geiB8fCAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtdWx0aXBseShuOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICB0aGlzLnggKj0gbjtcbiAgICAgICAgdGhpcy55ICo9IG47XG4gICAgICAgIHRoaXMueiAqPSBuO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRpdmlkZShuOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICB0aGlzLnggLz0gbjtcbiAgICAgICAgdGhpcy55IC89IG47XG4gICAgICAgIHRoaXMueiAvPSBuO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG1hZ25pdHVkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubWFnbml0dWRlU3EoKSk7XG4gICAgfVxuXG4gICAgbWFnbml0dWRlU3EoKTogbnVtYmVyIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLng7XG4gICAgICAgIHZhciB5ID0gdGhpcy55O1xuICAgICAgICB2YXIgeiA9IHRoaXMuejtcbiAgICAgICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbiAgICB9XG5cbiAgICBkb3QoeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKTogYW55IHtcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvdCh4LngsIHgueSwgeC56KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy54ICogKHggfHwgMCkgKyB0aGlzLnkgKiAoeSB8fCAwKSArIHRoaXMueiAqICh6IHx8IDApO1xuICAgIH1cblxuICAgIGNyb3NzKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHZhciB4ID0gdGhpcy55ICogdi56IC0gdGhpcy56ICogdi55O1xuICAgICAgICB2YXIgeSA9IHRoaXMueiAqIHYueCAtIHRoaXMueCAqIHYuejtcbiAgICAgICAgdmFyIHogPSB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2Lng7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoeCwgeSwgeik7XG4gICAgfVxuXG4gICAgZGlzdCh2OiBWZWN0b3IpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdlxuICAgICAgICAgICAgLmNvcHkoKVxuICAgICAgICAgICAgLnN1YnRyYWN0KHRoaXMpXG4gICAgICAgICAgICAubWFnbml0dWRlKCk7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKCk6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hZ25pdHVkZSgpID09PSAwID8gdGhpcyA6IHRoaXMuZGl2aWRlKHRoaXMubWFnbml0dWRlKCkpO1xuICAgIH1cblxuICAgIGxpbWl0KG1heDogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgdmFyIG1TcSA9IHRoaXMubWFnbml0dWRlU3EoKTtcbiAgICAgICAgaWYgKG1TcSA+IG1heCAqIG1heCkge1xuICAgICAgICAgICAgdGhpcy5kaXZpZGUoTWF0aC5zcXJ0KG1TcSkpIC8vbm9ybWFsaXplIGl0XG4gICAgICAgICAgICAgICAgLm11bHRpcGx5KG1heCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0TWFnbml0dWRlKG46IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpLm11bHRpcGx5KG4pO1xuICAgIH1cblxuICAgIGhlYWRpbmcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgIH1cblxuICAgIHJvdGF0ZShhOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICB2YXIgbmV3SGVhZGluZyA9IHRoaXMuaGVhZGluZygpICsgYTtcbiAgICAgICAgdmFyIG1hZyA9IHRoaXMubWFnbml0dWRlKCk7XG4gICAgICAgIHRoaXMueCA9IE1hdGguY29zKG5ld0hlYWRpbmcpICogbWFnO1xuICAgICAgICB0aGlzLnkgPSBNYXRoLnNpbihuZXdIZWFkaW5nKSAqIG1hZztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhbmdsZUJldHdlZW4odjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICAgICAgdmFyIGRvdG1hZ21hZyA9IHRoaXMuZG90KHYpIC8gKHRoaXMubWFnbml0dWRlKCkgKiB2Lm1hZ25pdHVkZSgpKTtcbiAgICAgICAgLy8gTWF0aGVtYXRpY2FsbHkgc3BlYWtpbmc6IHRoZSBkb3RtYWdtYWcgdmFyaWFibGUgd2lsbCBiZSBiZXR3ZWVuIC0xIGFuZCAxXG4gICAgICAgIC8vIGluY2x1c2l2ZS4gUHJhY3RpY2FsbHkgdGhvdWdoIGl0IGNvdWxkIGJlIHNsaWdodGx5IG91dHNpZGUgdGhpcyByYW5nZSBkdWVcbiAgICAgICAgLy8gdG8gZmxvYXRpbmctcG9pbnQgcm91bmRpbmcgaXNzdWVzLiBUaGlzIGNhbiBtYWtlIE1hdGguYWNvcyByZXR1cm4gTmFOLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTb2x1dGlvbjogd2UnbGwgY2xhbXAgdGhlIHZhbHVlIHRvIHRoZSAtMSwxIHJhbmdlXG4gICAgICAgIHZhciBhbmdsZSA9IE1hdGguYWNvcyhNYXRoLm1pbigxLCBNYXRoLm1heCgtMSwgZG90bWFnbWFnKSkpO1xuICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgfVxuXG4gICAgbGVycCh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIGFtdD86IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgVmVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZXJwKHgueCwgeC55LCB4LnosIHkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueCArPSAoeCAtIHRoaXMueCkgKiBhbXQgfHwgMDtcbiAgICAgICAgdGhpcy55ICs9ICh5IC0gdGhpcy55KSAqIGFtdCB8fCAwO1xuICAgICAgICB0aGlzLnogKz0gKHogLSB0aGlzLnopICogYW10IHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy54IHx8IDAsIHRoaXMueSB8fCAwLCB0aGlzLnogfHwgMF07XG4gICAgfVxuXG4gICAgZXF1YWxzKHg6IGFueSwgeT86IG51bWJlciwgej86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICB2YXIgYSwgYiwgYztcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgICAgICAgIGEgPSB4LnggfHwgMDtcbiAgICAgICAgICAgIGIgPSB4LnkgfHwgMDtcbiAgICAgICAgICAgIGMgPSB4LnogfHwgMDtcbiAgICAgICAgfSBlbHNlIGlmICh4IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGEgPSB4WzBdIHx8IDA7XG4gICAgICAgICAgICBiID0geFsxXSB8fCAwO1xuICAgICAgICAgICAgYyA9IHhbMl0gfHwgMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGEgPSB4IHx8IDA7XG4gICAgICAgICAgICBiID0geSB8fCAwO1xuICAgICAgICAgICAgYyA9IHogfHwgMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy54ID09PSBhICYmIHRoaXMueSA9PT0gYiAmJiB0aGlzLnogPT09IGM7XG4gICAgfVxuXG4gICAgZnJvbUFuZ2xlKGFuZ2xlOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSwgMCk7XG4gICAgfVxuXG4gICAgcmFuZG9tMkQoKTogVmVjdG9yIHtcbiAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbUFuZ2xlKGFuZ2xlKTtcbiAgICB9XG5cbiAgICByYW5kb20zRCgpOiBWZWN0b3Ige1xuICAgICAgICB2YXIgYW5nbGUsIHZ6O1xuXG4gICAgICAgIGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJO1xuICAgICAgICB2eiA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcblxuICAgICAgICB2YXIgdnpCYXNlID0gTWF0aC5zcXJ0KDEgLSB2eiAqIHZ6KTtcbiAgICAgICAgdmFyIHZ4ID0gdnpCYXNlICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICB2YXIgdnkgPSB2ekJhc2UgKiBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodngsIHZ5LCB2eik7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvbGliL21hdGgvdmVjdG9yLnRzIiwiLyohXG4gKiBGUFNNZXRlciAwLjMuMSAtIDl0aCBNYXkgMjAxM1xuICogaHR0cHM6Ly9naXRodWIuY29tL0RhcnNhaW4vZnBzbWV0ZXJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cbjsoZnVuY3Rpb24gKHcsIHVuZGVmaW5lZCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgRWxlbWVudCB0eXBlIG5hbWUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9XG5cdCAqL1xuXHRmdW5jdGlvbiBuZXdFbChuYW1lKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdGhlbWUgQ1NTIHByb3BlcnRpZXMgdG8gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBET00gZWxlbWVudC5cblx0ICogQHBhcmFtICB7T2JqZWN0fSAgdGhlbWUgICBUaGVtZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9XG5cdCAqL1xuXHRmdW5jdGlvbiBhcHBseVRoZW1lKGVsZW1lbnQsIHRoZW1lKSB7XG5cdFx0Zm9yICh2YXIgbmFtZSBpbiB0aGVtZSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZWxlbWVudC5zdHlsZVtuYW1lXSA9IHRoZW1lW25hbWVdO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHR5cGUgb2YgdGhlIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtNaXhlZH0gdmFsdWVcblx0ICpcblx0ICogQHJldHVybiB7U3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gdHlwZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gU3RyaW5nKHZhbHVlKTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLm1hdGNoKC9cXHMoW2Etel0rKS9pKVsxXS50b0xvd2VyQ2FzZSgpIHx8ICdvYmplY3QnO1xuXHRcdH1cblxuXHRcdHJldHVybiB0eXBlb2YgdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciB0aGUgdmFsdWUgaXMgaW4gYW4gYXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSAge01peGVkfSB2YWx1ZVxuXHQgKiBAcGFyYW0gIHtBcnJheX0gYXJyYXlcblx0ICpcblx0ICogQHJldHVybiB7SW50ZWdlcn0gQXJyYXkgaW5kZXggb3IgLTEgd2hlbiBub3QgZm91bmQuXG5cdCAqL1xuXHRmdW5jdGlvbiBpbkFycmF5KHZhbHVlLCBhcnJheSkge1xuXHRcdGlmICh0eXBlKGFycmF5KSAhPT0gJ2FycmF5Jykge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0XHRpZiAoYXJyYXkuaW5kZXhPZikge1xuXHRcdFx0cmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpO1xuXHRcdH1cblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IGFycmF5Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0aWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBvb3IgbWFuJ3MgZGVlcCBvYmplY3QgZXh0ZW5kLlxuXHQgKlxuXHQgKiBFeGFtcGxlOlxuXHQgKiAgIGV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXHQgKlxuXHQgKiBAcmV0dXJuIHtWb2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHRcdHZhciBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGZvciAodmFyIGtleSBpbiBhcmdzWzFdKSB7XG5cdFx0XHRpZiAoYXJnc1sxXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdHN3aXRjaCAodHlwZShhcmdzWzFdW2tleV0pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGV4dGVuZCh7fSwgYXJnc1swXVtrZXldLCBhcmdzWzFdW2tleV0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdhcnJheSc6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBhcmdzWzFdW2tleV0uc2xpY2UoMCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBhcmdzWzFdW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFyZ3MubGVuZ3RoID4gMiA/XG5cdFx0XHRleHRlbmQuYXBwbHkobnVsbCwgW2FyZ3NbMF1dLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAyKSkpIDpcblx0XHRcdGFyZ3NbMF07XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBIU0wgY29sb3IgdG8gSEVYIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtICB7QXJyYXl9IGhzbCBBcnJheSB3aXRoIFtodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzc10uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0FycmF5fSBBcnJheSB3aXRoIFtyZWQsIGdyZWVuLCBibHVlXS5cblx0ICovXG5cdGZ1bmN0aW9uIGhzbFRvSGV4KGgsIHMsIGwpIHtcblx0XHR2YXIgciwgZywgYjtcblx0XHR2YXIgdiwgbWluLCBzdiwgc2V4dGFudCwgZnJhY3QsIHZzZjtcblxuXHRcdGlmIChsIDw9IDAuNSkge1xuXHRcdFx0diA9IGwgKiAoMSArIHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2ID0gbCArIHMgLSBsICogcztcblx0XHR9XG5cblx0XHRpZiAodiA9PT0gMCkge1xuXHRcdFx0cmV0dXJuICcjMDAwJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWluID0gMiAqIGwgLSB2O1xuXHRcdFx0c3YgPSAodiAtIG1pbikgLyB2O1xuXHRcdFx0aCA9IDYgKiBoO1xuXHRcdFx0c2V4dGFudCA9IE1hdGguZmxvb3IoaCk7XG5cdFx0XHRmcmFjdCA9IGggLSBzZXh0YW50O1xuXHRcdFx0dnNmID0gdiAqIHN2ICogZnJhY3Q7XG5cdFx0XHRpZiAoc2V4dGFudCA9PT0gMCB8fCBzZXh0YW50ID09PSA2KSB7XG5cdFx0XHRcdHIgPSB2O1xuXHRcdFx0XHRnID0gbWluICsgdnNmO1xuXHRcdFx0XHRiID0gbWluO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAxKSB7XG5cdFx0XHRcdHIgPSB2IC0gdnNmO1xuXHRcdFx0XHRnID0gdjtcblx0XHRcdFx0YiA9IG1pbjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMikge1xuXHRcdFx0XHRyID0gbWluO1xuXHRcdFx0XHRnID0gdjtcblx0XHRcdFx0YiA9IG1pbiArIHZzZjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMykge1xuXHRcdFx0XHRyID0gbWluO1xuXHRcdFx0XHRnID0gdiAtIHZzZjtcblx0XHRcdFx0YiA9IHY7XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDQpIHtcblx0XHRcdFx0ciA9IG1pbiArIHZzZjtcblx0XHRcdFx0ZyA9IG1pbjtcblx0XHRcdFx0YiA9IHY7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyID0gdjtcblx0XHRcdFx0ZyA9IG1pbjtcblx0XHRcdFx0YiA9IHYgLSB2c2Y7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJyMnICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGhzbFRvSGV4LlxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xuXHRcdGMgPSBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KTtcblx0XHRyZXR1cm4gYy5sZW5ndGggPT09IDEgPyAnMCcgKyBjIDogYztcblx0fVxuXG5cdC8qKlxuXHQgKiBNYW5hZ2UgZWxlbWVudCBldmVudCBsaXN0ZW5lcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSAge05vZGV9ICAgICBlbGVtZW50XG5cdCAqIEBwYXJhbSAge0V2ZW50fSAgICBldmVudE5hbWVcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcblx0ICogQHBhcmFtICB7Qm9vbH0gICAgIHJlbW92ZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtWb2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyLCByZW1vdmUpIHtcblx0XHRpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0XHRlbGVtZW50W3JlbW92ZSA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdhZGRFdmVudExpc3RlbmVyJ10oZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0fSBlbHNlIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG5cdFx0XHRlbGVtZW50W3JlbW92ZSA/ICdkZXRhY2hFdmVudCcgOiAnYXR0YWNoRXZlbnQnXSgnb24nICsgZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0XHR9XG5cdH1cblxuXHQvLyBQcmVmZXJyZWQgdGltaW5nIGZ1bnRpb25cblx0dmFyIGdldFRpbWU7XG5cdChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHBlcmYgPSB3LnBlcmZvcm1hbmNlO1xuXHRcdGlmIChwZXJmICYmIChwZXJmLm5vdyB8fCBwZXJmLndlYmtpdE5vdykpIHtcblx0XHRcdHZhciBwZXJmTm93ID0gcGVyZi5ub3cgPyAnbm93JyA6ICd3ZWJraXROb3cnO1xuXHRcdFx0Z2V0VGltZSA9IHBlcmZbcGVyZk5vd10uYmluZChwZXJmKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Z2V0VGltZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuICtuZXcgRGF0ZSgpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0oKSk7XG5cblx0Ly8gTG9jYWwgV2luZG93QW5pbWF0aW9uVGltaW5nIGludGVyZmFjZSBwb2x5ZmlsbFxuXHR2YXIgY0FGID0gdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3LmNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0dmFyIHJBRiA9IHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHQoZnVuY3Rpb24gKCkge1xuXHRcdHZhciB2ZW5kb3JzID0gWydtb3onLCAnd2Via2l0JywgJ28nXTtcblx0XHR2YXIgbGFzdFRpbWUgPSAwO1xuXG5cdFx0Ly8gRm9yIGEgbW9yZSBhY2N1cmF0ZSBXaW5kb3dBbmltYXRpb25UaW1pbmcgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uLCBkaXRjaCB0aGUgbmF0aXZlXG5cdFx0Ly8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoZW4gY2FuY2VsQW5pbWF0aW9uRnJhbWUgaXMgbm90IHByZXNlbnQgKG9sZGVyIHZlcnNpb25zIG9mIEZpcmVmb3gpXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSB2ZW5kb3JzLmxlbmd0aDsgaSA8IGwgJiYgIWNBRjsgKytpKSB7XG5cdFx0XHRjQUYgPSB3W3ZlbmRvcnNbaV0rJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd1t2ZW5kb3JzW2ldKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcblx0XHRcdHJBRiA9IGNBRiAmJiB3W3ZlbmRvcnNbaV0rJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuXHRcdH1cblxuXHRcdGlmICghY0FGKSB7XG5cdFx0XHRyQUYgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdFx0dmFyIGN1cnJUaW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0XHR2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcblx0XHRcdFx0bGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG5cdFx0XHRcdHJldHVybiB3LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LCB0aW1lVG9DYWxsKTtcblx0XHRcdH07XG5cblx0XHRcdGNBRiA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoaWQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0oKSk7XG5cblx0Ly8gUHJvcGVydHkgbmFtZSBmb3IgYXNzaWduaW5nIGVsZW1lbnQgdGV4dCBjb250ZW50XG5cdHZhciB0ZXh0UHJvcCA9IHR5cGUoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykudGV4dENvbnRlbnQpID09PSAnc3RyaW5nJyA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JztcblxuXHQvKipcblx0ICogRlBTTWV0ZXIgY2xhc3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gYW5jaG9yICBFbGVtZW50IHRvIGFwcGVuZCB0aGUgbWV0ZXIgdG8uIERlZmF1bHQgaXMgZG9jdW1lbnQuYm9keS5cblx0ICogQHBhcmFtIHtPYmplY3R9ICBvcHRpb25zIE9iamVjdCB3aXRoIG9wdGlvbnMuXG5cdCAqL1xuXHRmdW5jdGlvbiBGUFNNZXRlcihhbmNob3IsIG9wdGlvbnMpIHtcblx0XHQvLyBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRpZiAodHlwZShhbmNob3IpID09PSAnb2JqZWN0JyAmJiBhbmNob3Iubm9kZVR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0b3B0aW9ucyA9IGFuY2hvcjtcblx0XHRcdGFuY2hvciA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghYW5jaG9yKSB7XG5cdFx0XHRhbmNob3IgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblxuXHRcdC8vIFByaXZhdGUgcHJvcGVydGllc1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR2YXIgbyA9IGV4dGVuZCh7fSwgRlBTTWV0ZXIuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG5cdFx0dmFyIGVsID0ge307XG5cdFx0dmFyIGNvbHMgPSBbXTtcblx0XHR2YXIgdGhlbWUsIGhlYXRtYXBzO1xuXHRcdHZhciBoZWF0RGVwdGggPSAxMDA7XG5cdFx0dmFyIGhlYXRpbmcgPSBbXTtcblxuXHRcdHZhciB0aGlzRnJhbWVUaW1lID0gMDtcblx0XHR2YXIgZnJhbWVUaW1lID0gby50aHJlc2hvbGQ7XG5cdFx0dmFyIGZyYW1lU3RhcnQgPSAwO1xuXHRcdHZhciBsYXN0TG9vcCA9IGdldFRpbWUoKSAtIGZyYW1lVGltZTtcblx0XHR2YXIgdGltZTtcblxuXHRcdHZhciBmcHNIaXN0b3J5ID0gW107XG5cdFx0dmFyIGR1cmF0aW9uSGlzdG9yeSA9IFtdO1xuXG5cdFx0dmFyIGZyYW1lSUQsIHJlbmRlcklEO1xuXHRcdHZhciBzaG93RnBzID0gby5zaG93ID09PSAnZnBzJztcblx0XHR2YXIgZ3JhcGhIZWlnaHQsIGNvdW50LCBpLCBqO1xuXG5cdFx0Ly8gRXhwb3NlZCBwcm9wZXJ0aWVzXG5cdFx0c2VsZi5vcHRpb25zID0gbztcblx0XHRzZWxmLmZwcyA9IDA7XG5cdFx0c2VsZi5kdXJhdGlvbiA9IDA7XG5cdFx0c2VsZi5pc1BhdXNlZCA9IDA7XG5cblx0XHQvKipcblx0XHQgKiBUaWNrIHN0YXJ0IGZvciBtZWFzdXJpbmcgdGhlIGFjdHVhbCByZW5kZXJpbmcgZHVyYXRpb24uXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYudGlja1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZnJhbWVTdGFydCA9IGdldFRpbWUoKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRlBTIHRpY2suXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYudGljayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHR0aGlzRnJhbWVUaW1lID0gdGltZSAtIGxhc3RMb29wO1xuXHRcdFx0ZnJhbWVUaW1lICs9ICh0aGlzRnJhbWVUaW1lIC0gZnJhbWVUaW1lKSAvIG8uc21vb3RoaW5nO1xuXHRcdFx0c2VsZi5mcHMgPSAxMDAwIC8gZnJhbWVUaW1lO1xuXHRcdFx0c2VsZi5kdXJhdGlvbiA9IGZyYW1lU3RhcnQgPCBsYXN0TG9vcCA/IGZyYW1lVGltZSA6IHRpbWUgLSBmcmFtZVN0YXJ0O1xuXHRcdFx0bGFzdExvb3AgPSB0aW1lO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBQYXVzZSBkaXNwbGF5IHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChmcmFtZUlEKSB7XG5cdFx0XHRcdHNlbGYuaXNQYXVzZWQgPSAxO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoZnJhbWVJRCk7XG5cdFx0XHRcdGNBRihmcmFtZUlEKTtcblx0XHRcdFx0Y0FGKHJlbmRlcklEKTtcblx0XHRcdFx0ZnJhbWVJRCA9IHJlbmRlcklEID0gMDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZXN1bWUgZGlzcGxheSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCFmcmFtZUlEKSB7XG5cdFx0XHRcdHNlbGYuaXNQYXVzZWQgPSAwO1xuXHRcdFx0XHRyZXF1ZXN0UmVuZGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlIG9wdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgT3B0aW9uIG5hbWUuXG5cdFx0ICogQHBhcmFtIHtNaXhlZH0gIHZhbHVlIE5ldyB2YWx1ZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zZXQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdG9bbmFtZV0gPSB2YWx1ZTtcblx0XHRcdHNob3dGcHMgPSBvLnNob3cgPT09ICdmcHMnO1xuXG5cdFx0XHQvLyBSZWJ1aWxkIG9yIHJlcG9zaXRpb24gZWxlbWVudHMgd2hlbiBzcGVjaWZpYyBvcHRpb24gaGFzIGJlZW4gdXBkYXRlZFxuXHRcdFx0aWYgKGluQXJyYXkobmFtZSwgcmVidWlsZGVycykgIT09IC0xKSB7XG5cdFx0XHRcdGNyZWF0ZU1ldGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5BcnJheShuYW1lLCByZXBvc2l0aW9uZXJzKSAhPT0gLTEpIHtcblx0XHRcdFx0cG9zaXRpb25NZXRlcigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoYW5nZSBtZXRlciBpbnRvIHJlbmRlcmluZyBkdXJhdGlvbiBtb2RlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNob3dEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93JywgJ21zJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlIG1ldGVyIGludG8gRlBTIG1vZGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvd0ZwcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93JywgJ2ZwcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFRvZ2dsZXMgYmV0d2VlbiBzaG93OiAnZnBzJyBhbmQgc2hvdzogJ2R1cmF0aW9uJy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnNldCgnc2hvdycsIHNob3dGcHMgPyAnbXMnIDogJ2ZwcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhpZGUgdGhlIEZQU01ldGVyLiBBbHNvIHBhdXNlcyB0aGUgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnBhdXNlKCk7XG5cdFx0XHRlbC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTaG93IHRoZSBGUFNNZXRlci4gQWxzbyByZXN1bWVzIHRoZSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYucmVzdW1lKCk7XG5cdFx0XHRlbC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2sgdGhlIGN1cnJlbnQgRlBTIGFuZCBzYXZlIGl0IGluIGhpc3RvcnkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGhpc3RvcnlUaWNrKCkge1xuXHRcdFx0Zm9yIChpID0gby5oaXN0b3J5OyBpLS07KSB7XG5cdFx0XHRcdGZwc0hpc3RvcnlbaV0gPSBpID09PSAwID8gc2VsZi5mcHMgOiBmcHNIaXN0b3J5W2ktMV07XG5cdFx0XHRcdGR1cmF0aW9uSGlzdG9yeVtpXSA9IGkgPT09IDAgPyBzZWxmLmR1cmF0aW9uIDogZHVyYXRpb25IaXN0b3J5W2ktMV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBoZWF0IGhleCBjb2xvciBiYXNlZCBvbiB2YWx1ZXMgcGFzc2VkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gaGVhdG1hcFxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbHVlXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gbWluXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gbWF4XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGdldEhlYXQoaGVhdG1hcCwgdmFsdWUsIG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gaGVhdG1hcHNbMHxoZWF0bWFwXVtNYXRoLnJvdW5kKE1hdGgubWluKCh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSAqIGhlYXREZXB0aCwgaGVhdERlcHRoKSldO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSBjb3VudGVyIG51bWJlciBhbmQgbGVnZW5kLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiB1cGRhdGVDb3VudGVyKCkge1xuXHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZCBvbmx5IHdoZW4gY2hhbmdlZFxuXHRcdFx0aWYgKGVsLmxlZ2VuZC5mcHMgIT09IHNob3dGcHMpIHtcblx0XHRcdFx0ZWwubGVnZW5kLmZwcyA9IHNob3dGcHM7XG5cdFx0XHRcdGVsLmxlZ2VuZFt0ZXh0UHJvcF0gPSBzaG93RnBzID8gJ0ZQUycgOiAnbXMnO1xuXHRcdFx0fVxuXHRcdFx0Ly8gVXBkYXRlIGNvdW50ZXIgd2l0aCBhIG5pY2VseSBmb3JtYXRlZCAmIHJlYWRhYmxlIG51bWJlclxuXHRcdFx0Y291bnQgPSBzaG93RnBzID8gc2VsZi5mcHMgOiBzZWxmLmR1cmF0aW9uO1xuXHRcdFx0ZWwuY291bnRbdGV4dFByb3BdID0gY291bnQgPiA5OTkgPyAnOTk5KycgOiBjb3VudC50b0ZpeGVkKGNvdW50ID4gOTkgPyAwIDogby5kZWNpbWFscyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmVuZGVyIGN1cnJlbnQgRlBTIHN0YXRlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR0aW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0Ly8gSWYgcmVuZGVyZXIgc3RvcHBlZCByZXBvcnRpbmcsIGRvIGEgc2ltdWxhdGVkIGRyb3AgdG8gMCBmcHNcblx0XHRcdGlmIChsYXN0TG9vcCA8IHRpbWUgLSBvLnRocmVzaG9sZCkge1xuXHRcdFx0XHRzZWxmLmZwcyAtPSBzZWxmLmZwcyAvIE1hdGgubWF4KDEsIG8uc21vb3RoaW5nICogNjAgLyBvLmludGVydmFsKTtcblx0XHRcdFx0c2VsZi5kdXJhdGlvbiA9IDEwMDAgLyBzZWxmLmZwcztcblx0XHRcdH1cblxuXHRcdFx0aGlzdG9yeVRpY2soKTtcblx0XHRcdHVwZGF0ZUNvdW50ZXIoKTtcblxuXHRcdFx0Ly8gQXBwbHkgaGVhdCB0byBlbGVtZW50c1xuXHRcdFx0aWYgKG8uaGVhdCkge1xuXHRcdFx0XHRpZiAoaGVhdGluZy5sZW5ndGgpIHtcblx0XHRcdFx0XHRmb3IgKGkgPSBoZWF0aW5nLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0XHRcdFx0aGVhdGluZ1tpXS5lbC5zdHlsZVt0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRPbl0gPSBzaG93RnBzID9cblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRtYXAsIHNlbGYuZnBzLCAwLCBvLm1heEZwcykgOlxuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdG1hcCwgc2VsZi5kdXJhdGlvbiwgby50aHJlc2hvbGQsIDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChlbC5ncmFwaCAmJiB0aGVtZS5jb2x1bW4uaGVhdE9uKSB7XG5cdFx0XHRcdFx0Zm9yIChpID0gY29scy5sZW5ndGg7IGktLTspIHtcblx0XHRcdFx0XHRcdGNvbHNbaV0uc3R5bGVbdGhlbWUuY29sdW1uLmhlYXRPbl0gPSBzaG93RnBzID9cblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZS5jb2x1bW4uaGVhdG1hcCwgZnBzSGlzdG9yeVtpXSwgMCwgby5tYXhGcHMpIDpcblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZS5jb2x1bW4uaGVhdG1hcCwgZHVyYXRpb25IaXN0b3J5W2ldLCBvLnRocmVzaG9sZCwgMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVwZGF0ZSBncmFwaCBjb2x1bW5zIGhlaWdodFxuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvLmhpc3Rvcnk7IGorKykge1xuXHRcdFx0XHRcdGNvbHNbal0uc3R5bGUuaGVpZ2h0ID0gKHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0KGZwc0hpc3Rvcnlbal0gPyBNYXRoLnJvdW5kKGdyYXBoSGVpZ2h0IC8gby5tYXhGcHMgKiBNYXRoLm1pbihmcHNIaXN0b3J5W2pdLCBvLm1heEZwcykpIDogMCkgOlxuXHRcdFx0XHRcdFx0KGR1cmF0aW9uSGlzdG9yeVtqXSA/IE1hdGgucm91bmQoZ3JhcGhIZWlnaHQgLyBvLnRocmVzaG9sZCAqIE1hdGgubWluKGR1cmF0aW9uSGlzdG9yeVtqXSwgby50aHJlc2hvbGQpKSA6IDApXG5cdFx0XHRcdFx0KSArICdweCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZXF1ZXN0IHJlbmRlcmluZyBsb29wLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7SW50fSBBbmltYXRpb24gZnJhbWUgaW5kZXguXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVxdWVzdFJlbmRlcigpIHtcblx0XHRcdGlmIChvLmludGVydmFsIDwgMjApIHtcblx0XHRcdFx0ZnJhbWVJRCA9IHJBRihyZXF1ZXN0UmVuZGVyKTtcblx0XHRcdFx0cmVuZGVyKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmcmFtZUlEID0gc2V0VGltZW91dChyZXF1ZXN0UmVuZGVyLCBvLmludGVydmFsKTtcblx0XHRcdFx0cmVuZGVySUQgPSByQUYocmVuZGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBNZXRlciBldmVudHMgaGFuZGxlci5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZXZlbnRIYW5kbGVyKGV2ZW50KSB7XG5cdFx0XHRldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblx0XHRcdGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG5cdFx0XHRcdGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRzZWxmLnRvZ2dsZSgpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIERlc3Ryb3lzIHRoZSBjdXJyZW50IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRzZWxmLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBTdG9wIHJlbmRlcmluZ1xuXHRcdFx0c2VsZi5wYXVzZSgpO1xuXHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnRzXG5cdFx0XHRyZW1vdmVNZXRlcigpO1xuXHRcdFx0Ly8gU3RvcCBsaXN0ZW5pbmdcblx0XHRcdHNlbGYudGljayA9IHNlbGYudGlja1N0YXJ0ID0gZnVuY3Rpb24gKCkge307XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZSBtZXRlciBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZW1vdmVNZXRlcigpIHtcblx0XHRcdC8vIFVuYmluZCBsaXN0ZW5lcnNcblx0XHRcdGlmIChvLnRvZ2dsZU9uKSB7XG5cdFx0XHRcdGxpc3RlbmVyKGVsLmNvbnRhaW5lciwgby50b2dnbGVPbiwgZXZlbnRIYW5kbGVyLCAxKTtcblx0XHRcdH1cblx0XHRcdC8vIERldGFjaCBlbGVtZW50XG5cdFx0XHRhbmNob3IucmVtb3ZlQ2hpbGQoZWwuY29udGFpbmVyKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBTZXRzIHRoZSB0aGVtZSwgYW5kIGdlbmVyYXRlcyBoZWF0bWFwcyB3aGVuIG5lZWRlZC5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBzZXRUaGVtZSgpIHtcblx0XHRcdHRoZW1lID0gRlBTTWV0ZXIudGhlbWVbby50aGVtZV07XG5cblx0XHRcdC8vIEdlbmVyYXRlIGhlYXRtYXBzXG5cdFx0XHRoZWF0bWFwcyA9IHRoZW1lLmNvbXBpbGVkSGVhdG1hcHMgfHwgW107XG5cdFx0XHRpZiAoIWhlYXRtYXBzLmxlbmd0aCAmJiB0aGVtZS5oZWF0bWFwcy5sZW5ndGgpIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IHRoZW1lLmhlYXRtYXBzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0aGVhdG1hcHNbal0gPSBbXTtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IGhlYXREZXB0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRoZWF0bWFwc1tqXVtpXSA9IGhzbFRvSGV4KDAuMzMgLyBoZWF0RGVwdGggKiBpLCB0aGVtZS5oZWF0bWFwc1tqXS5zYXR1cmF0aW9uLCB0aGVtZS5oZWF0bWFwc1tqXS5saWdodG5lc3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGVtZS5jb21waWxlZEhlYXRtYXBzID0gaGVhdG1hcHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhbmQgYXR0YWNoZXMgdGhlIG1ldGVyIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGNyZWF0ZU1ldGVyKCkge1xuXHRcdFx0Ly8gUmVtb3ZlIG9sZCBtZXRlciBpZiBwcmVzZW50XG5cdFx0XHRpZiAoZWwuY29udGFpbmVyKSB7XG5cdFx0XHRcdHJlbW92ZU1ldGVyKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGVtZVxuXHRcdFx0c2V0VGhlbWUoKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGVsZW1lbnRzXG5cdFx0XHRlbC5jb250YWluZXIgPSBhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY29udGFpbmVyKTtcblx0XHRcdGVsLmNvdW50ID0gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb3VudCkpO1xuXHRcdFx0ZWwubGVnZW5kID0gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5sZWdlbmQpKTtcblx0XHRcdGVsLmdyYXBoID0gby5ncmFwaCA/IGVsLmNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuZ3JhcGgpKSA6IDA7XG5cblx0XHRcdC8vIEFkZCBlbGVtZW50cyB0byBoZWF0aW5nIGFycmF5XG5cdFx0XHRoZWF0aW5nLmxlbmd0aCA9IDA7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gZWwpIHtcblx0XHRcdFx0aWYgKGVsW2tleV0gJiYgdGhlbWVba2V5XS5oZWF0T24pIHtcblx0XHRcdFx0XHRoZWF0aW5nLnB1c2goe1xuXHRcdFx0XHRcdFx0bmFtZToga2V5LFxuXHRcdFx0XHRcdFx0ZWw6IGVsW2tleV1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHcmFwaFxuXHRcdFx0Y29scy5sZW5ndGggPSAwO1xuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdC8vIENyZWF0ZSBncmFwaFxuXHRcdFx0XHRlbC5ncmFwaC5zdHlsZS53aWR0aCA9IChvLmhpc3RvcnkgKiB0aGVtZS5jb2x1bW4ud2lkdGggKyAoby5oaXN0b3J5IC0gMSkgKiB0aGVtZS5jb2x1bW4uc3BhY2luZykgKyAncHgnO1xuXG5cdFx0XHRcdC8vIEFkZCBjb2x1bW5zXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBvLmhpc3Rvcnk7IGkrKykge1xuXHRcdFx0XHRcdGNvbHNbaV0gPSBlbC5ncmFwaC5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY29sdW1uKSk7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5ib3R0b20gPSAwO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUucmlnaHQgPSAoaSAqIHRoZW1lLmNvbHVtbi53aWR0aCArIGkgKiB0aGVtZS5jb2x1bW4uc3BhY2luZykgKyAncHgnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUud2lkdGggPSB0aGVtZS5jb2x1bW4ud2lkdGggKyAncHgnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBpbml0aWFsIHN0YXRlXG5cdFx0XHRwb3NpdGlvbk1ldGVyKCk7XG5cdFx0XHR1cGRhdGVDb3VudGVyKCk7XG5cblx0XHRcdC8vIEFwcGVuZCBjb250YWluZXIgdG8gYW5jaG9yXG5cdFx0XHRhbmNob3IuYXBwZW5kQ2hpbGQoZWwuY29udGFpbmVyKTtcblxuXHRcdFx0Ly8gUmV0cmlldmUgZ3JhcGggaGVpZ2h0IGFmdGVyIGl0IHdhcyBhcHBlbmRlZCB0byBET01cblx0XHRcdGlmIChlbC5ncmFwaCkge1xuXHRcdFx0XHRncmFwaEhlaWdodCA9IGVsLmdyYXBoLmNsaWVudEhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdFx0aWYgKG8udG9nZ2xlT24pIHtcblx0XHRcdFx0aWYgKG8udG9nZ2xlT24gPT09ICdjbGljaycpIHtcblx0XHRcdFx0XHRlbC5jb250YWluZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3RlbmVyKGVsLmNvbnRhaW5lciwgby50b2dnbGVPbiwgZXZlbnRIYW5kbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBQb3NpdGlvbnMgdGhlIG1ldGVyIGJhc2VkIG9uIG9wdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHBvc2l0aW9uTWV0ZXIoKSB7XG5cdFx0XHRhcHBseVRoZW1lKGVsLmNvbnRhaW5lciwgbyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ29uc3RydWN0LlxuXHRcdCAqL1xuXHRcdChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBDcmVhdGUgbWV0ZXIgZWxlbWVudFxuXHRcdFx0Y3JlYXRlTWV0ZXIoKTtcblx0XHRcdC8vIFN0YXJ0IHJlbmRlcmluZ1xuXHRcdFx0cmVxdWVzdFJlbmRlcigpO1xuXHRcdH0oKSk7XG5cdH1cblxuXHQvLyBFeHBvc2UgdGhlIGV4dGVuZCBmdW5jdGlvblxuXHRGUFNNZXRlci5leHRlbmQgPSBleHRlbmQ7XG5cblx0Ly8gRXhwb3NlIHRoZSBGUFNNZXRlciBjbGFzc1xuXHR3aW5kb3cuRlBTTWV0ZXIgPSBGUFNNZXRlcjtcblxuXHQvLyBEZWZhdWx0IG9wdGlvbnNcblx0RlBTTWV0ZXIuZGVmYXVsdHMgPSB7XG5cdFx0aW50ZXJ2YWw6ICAxMDAsICAgICAvLyBVcGRhdGUgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLlxuXHRcdHNtb290aGluZzogMTAsICAgICAgLy8gU3Bpa2Ugc21vb3RoaW5nIHN0cmVuZ3RoLiAxIG1lYW5zIG5vIHNtb290aGluZy5cblx0XHRzaG93OiAgICAgICdmcHMnLCAgIC8vIFdoZXRoZXIgdG8gc2hvdyAnZnBzJywgb3IgJ21zJyA9IGZyYW1lIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcy5cblx0XHR0b2dnbGVPbjogICdjbGljaycsIC8vIFRvZ2dsZSBiZXR3ZWVuIHNob3cgJ2ZwcycgYW5kICdtcycgb24gdGhpcyBldmVudC5cblx0XHRkZWNpbWFsczogIDEsICAgICAgIC8vIE51bWJlciBvZiBkZWNpbWFscyBpbiBGUFMgbnVtYmVyLiAxID0gNTkuOSwgMiA9IDU5Ljk0LCAuLi5cblx0XHRtYXhGcHM6ICAgIDYwLCAgICAgIC8vIE1heCBleHBlY3RlZCBGUFMgdmFsdWUuXG5cdFx0dGhyZXNob2xkOiAxMDAsICAgICAvLyBNaW5pbWFsIHRpY2sgcmVwb3J0aW5nIGludGVydmFsIGluIG1pbGxpc2Vjb25kcy5cblxuXHRcdC8vIE1ldGVyIHBvc2l0aW9uXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsIC8vIE1ldGVyIHBvc2l0aW9uLlxuXHRcdHpJbmRleDogICAxMCwgICAgICAgICAvLyBNZXRlciBaIGluZGV4LlxuXHRcdGxlZnQ6ICAgICAnNXB4JywgICAgICAvLyBNZXRlciBsZWZ0IG9mZnNldC5cblx0XHR0b3A6ICAgICAgJzVweCcsICAgICAgLy8gTWV0ZXIgdG9wIG9mZnNldC5cblx0XHRyaWdodDogICAgJ2F1dG8nLCAgICAgLy8gTWV0ZXIgcmlnaHQgb2Zmc2V0LlxuXHRcdGJvdHRvbTogICAnYXV0bycsICAgICAvLyBNZXRlciBib3R0b20gb2Zmc2V0LlxuXHRcdG1hcmdpbjogICAnMCAwIDAgMCcsICAvLyBNZXRlciBtYXJnaW4uIEhlbHBzIHdpdGggY2VudGVyaW5nIHRoZSBjb3VudGVyIHdoZW4gbGVmdDogNTAlO1xuXG5cdFx0Ly8gVGhlbWVcblx0XHR0aGVtZTogJ2RhcmsnLCAvLyBNZXRlciB0aGVtZS4gQnVpbGQgaW46ICdkYXJrJywgJ2xpZ2h0JywgJ3RyYW5zcGFyZW50JywgJ2NvbG9yZnVsJy5cblx0XHRoZWF0OiAgMCwgICAgICAvLyBBbGxvdyB0aGVtZXMgdG8gdXNlIGNvbG9yaW5nIGJ5IEZQUyBoZWF0LiAwIEZQUyA9IHJlZCwgbWF4RnBzID0gZ3JlZW4uXG5cblx0XHQvLyBHcmFwaFxuXHRcdGdyYXBoOiAgIDAsIC8vIFdoZXRoZXIgdG8gc2hvdyBoaXN0b3J5IGdyYXBoLlxuXHRcdGhpc3Rvcnk6IDIwIC8vIEhvdyBtYW55IGhpc3Rvcnkgc3RhdGVzIHRvIHNob3cgaW4gYSBncmFwaC5cblx0fTtcblxuXHQvLyBPcHRpb24gbmFtZXMgdGhhdCB0cmlnZ2VyIEZQU01ldGVyIHJlYnVpbGQgb3IgcmVwb3NpdGlvbiB3aGVuIG1vZGlmaWVkXG5cdHZhciByZWJ1aWxkZXJzID0gW1xuXHRcdCd0b2dnbGVPbicsXG5cdFx0J3RoZW1lJyxcblx0XHQnaGVhdCcsXG5cdFx0J2dyYXBoJyxcblx0XHQnaGlzdG9yeSdcblx0XTtcblx0dmFyIHJlcG9zaXRpb25lcnMgPSBbXG5cdFx0J3Bvc2l0aW9uJyxcblx0XHQnekluZGV4Jyxcblx0XHQnbGVmdCcsXG5cdFx0J3RvcCcsXG5cdFx0J3JpZ2h0Jyxcblx0XHQnYm90dG9tJyxcblx0XHQnbWFyZ2luJ1xuXHRdO1xufSh3aW5kb3cpKTtcbjsoZnVuY3Rpb24gKHcsIEZQU01ldGVyLCB1bmRlZmluZWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vIFRoZW1lcyBvYmplY3Rcblx0RlBTTWV0ZXIudGhlbWUgPSB7fTtcblxuXHQvLyBCYXNlIHRoZW1lIHdpdGggbGF5b3V0LCBubyBjb2xvcnNcblx0dmFyIGJhc2UgPSBGUFNNZXRlci50aGVtZS5iYXNlID0ge1xuXHRcdGhlYXRtYXBzOiBbXSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBhZGRpbmc6ICc1cHgnLFxuXHRcdFx0bWluV2lkdGg6ICc5NXB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzMwcHgnLFxuXHRcdFx0dGV4dEFsaWduOiAncmlnaHQnLFxuXHRcdFx0dGV4dFNoYWRvdzogJ25vbmUnXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHR0b3A6IDAsXG5cdFx0XHRyaWdodDogMCxcblx0XHRcdHBhZGRpbmc6ICc1cHggMTBweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGZvbnRTaXplOiAnMjRweCcsXG5cdFx0XHRmb250RmFtaWx5OiAnQ29uc29sYXMsIEFuZGFsZSBNb25vLCBtb25vc3BhY2UnLFxuXHRcdFx0ekluZGV4OiAyXG5cdFx0fSxcblx0XHRsZWdlbmQ6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0dG9wOiAwLFxuXHRcdFx0bGVmdDogMCxcblx0XHRcdHBhZGRpbmc6ICc1cHggMTBweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGZvbnRTaXplOiAnMTJweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMzJweCcsXG5cdFx0XHRmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0Jyxcblx0XHRcdHpJbmRleDogMlxuXHRcdH0sXG5cdFx0Z3JhcGg6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0Ym94U2l6aW5nOiAncGFkZGluZy1ib3gnLFxuXHRcdFx0TW96Qm94U2l6aW5nOiAncGFkZGluZy1ib3gnLFxuXHRcdFx0aGVpZ2h0OiAnMTAwJScsXG5cdFx0XHR6SW5kZXg6IDFcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdHdpZHRoOiA0LFxuXHRcdFx0c3BhY2luZzogMSxcblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGxcblx0XHR9XG5cdH07XG5cblx0Ly8gRGFyayB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5kYXJrID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjgsXG5cdFx0XHRsaWdodG5lc3M6IDAuOFxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyMyMjInLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdGJvcmRlcjogJzFweCBzb2xpZCAjMWExYTFhJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgIzIyMidcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHRoZWF0T246ICdjb2xvcidcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyMzZjNmM2YnXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBMaWdodCB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5saWdodCA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC41LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjVcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdGNvbG9yOiAnIzY2NicsXG5cdFx0XHRiYWNrZ3JvdW5kOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjUpLCAtMXB4IC0xcHggMCByZ2JhKDI1NSwyNTUsMjU1LC41KScsXG5cdFx0XHRib3hTaGFkb3c6ICcwIDAgMCAxcHggcmdiYSgwLDAsMCwuMSknXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0aGVhdE9uOiAnY29sb3InXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjZWFlYWVhJ1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gQ29sb3JmdWwgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUuY29sb3JmdWwgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuNSxcblx0XHRcdGxpZ2h0bmVzczogMC42XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRoZWF0T246ICdiYWNrZ3JvdW5kQ29sb3InLFxuXHRcdFx0YmFja2dyb3VuZDogJyM4ODgnLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgwLDAsMCwuMiknLFxuXHRcdFx0Ym94U2hhZG93OiAnMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjEpJ1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzc3NycsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4yKSdcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFRyYW5zcGFyZW50IHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLnRyYW5zcGFyZW50ID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjgsXG5cdFx0XHRsaWdodG5lc3M6IDAuNVxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0cGFkZGluZzogMCxcblx0XHRcdGNvbG9yOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMCwwLDAsLjUpJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdHBhZGRpbmc6ICcwIDVweCcsXG5cdFx0XHRoZWlnaHQ6ICc0MHB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICc0MHB4J1xuXHRcdH0sXG5cdFx0bGVnZW5kOiB7XG5cdFx0XHRwYWRkaW5nOiAnMCA1cHgnLFxuXHRcdFx0aGVpZ2h0OiAnNDBweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnNDJweCdcblx0XHR9LFxuXHRcdGdyYXBoOiB7XG5cdFx0XHRoZWlnaHQ6ICc0MHB4J1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHR3aWR0aDogNSxcblx0XHRcdGJhY2tncm91bmQ6ICcjOTk5Jyxcblx0XHRcdGhlYXRPbjogJ2JhY2tncm91bmRDb2xvcicsXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHR9XG5cdH0pO1xufSh3aW5kb3csIEZQU01ldGVyKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZnBzbWV0ZXIvZGlzdC9mcHNtZXRlci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBDYW52YXNEcmF3LCBCYXNlT2JqZWN0IH0gZnJvbSBcIi4vZHJhd1wiO1xuXG5pbnRlcmZhY2UgSUNhbnZhc09wdGlvbnMge1xuICAgIGhlaWdodD86IG51bWJlcixcbiAgICB3aWR0aD86IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgQ2FudmFzIHtcbiAgICBwcml2YXRlIGJvZHk6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgYmFja2dyb3VuZDogc3RyaW5nID0gJyNmZmYnO1xuICAgIHByaXZhdGUgb2JqZWN0czogQmFzZU9iamVjdFtdID0gW107XG4gICAgXG4gICAgZHJhdzogQ2FudmFzRHJhdztcbiAgICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlkOiBzdHJpbmcsIHByaXZhdGUgb3B0aW9uczogSUNhbnZhc09wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5ib2R5LmlkID0gaWQ7XG4gICAgICAgIHRoaXMuYm9keS53aWR0aCA9IHRoaXMub3B0aW9ucy53aWR0aDtcbiAgICAgICAgdGhpcy5ib2R5LmhlaWdodCA9IHRoaXMub3B0aW9ucy5oZWlnaHQ7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJvZHkpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuYm9keS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLmRyYXcgPSBuZXcgQ2FudmFzRHJhdyh0aGlzKTtcbiAgICB9XG5cbiAgICBhZGQob2JqOiBCYXNlT2JqZWN0KSB7XG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iaik7XG4gICAgfVxuXG4gICAgc2V0QmFja2dyb3VuZChjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmJvZHkud2lkdGgsIHRoaXMuYm9keS5oZWlnaHQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJhY2tncm91bmQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmQ7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmJvZHkud2lkdGgsIHRoaXMuYm9keS5oZWlnaHQpO1xuICAgIH1cblxuICAgIHJlbmRlckFsbCgpIHtcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIG9iai5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvbGliL2NhbnZhcy9jYW52YXMudHMiLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vbWF0aC92ZWN0b3JcIjtcbmltcG9ydCB7IENhbnZhcyB9IGZyb20gXCIuL2NhbnZhc1wiO1xuXG5leHBvcnQgZW51bSBQUklNSVRJVkVTIHtcbiAgICBQT0lOVCA9ICdQT0lOVCcsXG4gICAgRUxMSVBTRSA9ICdFTExJUFNFJyxcbiAgICBSRUNUQU5HTEUgPSAnUkVDVEFOR0xFJyxcbiAgICBUUklBTkdMRSA9ICdUUklBTkdMRScsXG4gICAgUE9MWUdPTiA9ICdQT0xZR09OJ1xufVxuXG5leHBvcnQgY2xhc3MgQmFzZU9iamVjdCB7XG4gICAgZHJhd0NvbnRleHQ6IENhbnZhc0RyYXc7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcG9zaXRpb246IFZlY3RvcjtcbiAgICB0eXBlOiBQUklNSVRJVkVTO1xuXG4gICAgY29uc3RydWN0b3IoZDogQ2FudmFzRHJhdywgdDogUFJJTUlUSVZFUywgcDogVmVjdG9yKSB7XG4gICAgICAgIHRoaXMuZHJhd0NvbnRleHQgPSBkO1xuICAgICAgICB0aGlzLmN0eCA9IGQucGFyZW50LmNvbnRleHQ7XG4gICAgICAgIHRoaXMudHlwZSA9IHQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIH1cblxuICAgIGFwcGx5U3R5bGVzKCkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmRyYXdDb250ZXh0LnN0eWxlcy5maWxsO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuZHJhd0NvbnRleHQuc3R5bGVzLnN0cm9rZUNvbG9yO1xuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLmRyYXdDb250ZXh0LnN0eWxlcy5zdHJva2VXaWR0aDtcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBlbmQoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbGxpcHNlIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gICAgcng6IG51bWJlcjtcbiAgICByeTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoZDogQ2FudmFzRHJhdywgcG9zaXRpb246IFZlY3Rvciwgcng6IG51bWJlciwgcnk6IG51bWJlcikge1xuICAgICAgICBzdXBlcihkLCBQUklNSVRJVkVTLkVMTElQU0UsIHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5yeCA9IHJ4O1xuICAgICAgICB0aGlzLnJ5ID0gcnk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuY3R4LmVsbGlwc2UodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMucngsIHRoaXMucnksIDAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgdGhpcy5lbmQoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIERJU1BMQVlfTU9ERSB7XG4gICAgQ0VOVEVSID0gJ0NFTlRFUicsXG4gICAgQ09STkVSID0gJ0NPUk5FUidcbn1cblxuZXhwb3J0IGNsYXNzIENhbnZhc0RyYXcge1xuICAgIHBhcmVudDogQ2FudmFzO1xuICAgIHN0eWxlczoge1xuICAgICAgICBzdHJva2VDb2xvcj86IHN0cmluZyxcbiAgICAgICAgc3Ryb2tlV2lkdGg/OiBudW1iZXIsXG4gICAgICAgIGZpbGw/OiBzdHJpbmdcbiAgICB9XG5cbiAgICBESVNQTEFZX01PREU6IERJU1BMQVlfTU9ERSA9IERJU1BMQVlfTU9ERS5DRU5URVI7XG5cbiAgICBjb25zdHJ1Y3RvcihjOiBDYW52YXMpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBjO1xuICAgICAgICB0aGlzLnN0eWxlcyA9IHtcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgICAgIGZpbGw6ICcjZmZmZmZmJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0U3Ryb2tlKCkge1xuXG4gICAgfVxuXG4gICAgc2V0RmlsbCgpIHtcblxuICAgIH1cblxuICAgIGVsbGlwc2UocG9zaXRpb246IFZlY3Rvciwgcng6IG51bWJlciwgcnk/OiBudW1iZXIpOiBCYXNlT2JqZWN0IHtcbiAgICAgICAgcnkgPSByeSB8fCByeDtcbiAgICAgICAgcmV0dXJuIG5ldyBFbGxpcHNlKHRoaXMsIHBvc2l0aW9uLCByeCwgcnkpO1xuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvbGliL2NhbnZhcy9kcmF3LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==