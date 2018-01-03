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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var M = (function () {
    function M() {
    }
    M.randomInt = function (min, max) {
        if (!max) {
            max = min;
            min = 0;
        }
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    };
    M.randomFloat = function (min, max) {
        if (!max) {
            max = min;
            min = 0;
        }
        var rand = min + Math.random() * (max + 1 - min);
        return rand;
    };
    M.fireAtRate = function (percent, callback) {
        if (Math.random() < percent) {
            callback();
        }
    };
    return M;
}());
exports.M = M;


/***/ }),
/* 1 */
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
    Vector.fromAngle = function (angle) {
        return new Vector(Math.cos(angle), Math.sin(angle), 0);
    };
    Vector.random2D = function () {
        var angle = Math.random() * 2 * Math.PI;
        return this.fromAngle(angle);
    };
    Vector.random3D = function () {
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Particle = (function () {
    function Particle() {
        this.elements = [];
    }
    Particle.prototype.setParent = function (cnavas) {
        this.parent = cnavas;
    };
    Particle.prototype.setId = function (id) {
        this.id = id;
    };
    Particle.prototype.updateElements = function () {
        var _this = this;
        this.elements.forEach(function (e) {
            e.position = _this.body.position.copy();
        });
    };
    return Particle;
}());
exports.Particle = Particle;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(4);
var app = new app_1.App();
app.run();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(5);
var vehicle_1 = __webpack_require__(6);
var canvas_1 = __webpack_require__(9);
var vector_1 = __webpack_require__(1);
var food_1 = __webpack_require__(11);
var m_1 = __webpack_require__(0);
var App = (function () {
    function App(initCallback, renderCallback) {
        var _this = this;
        this.initCallback = initCallback;
        this.renderCallback = renderCallback;
        this.frame = 0;
        this.maxPopulation = 10;
        this.vehicles = [];
        this.vehicleHashTable = {};
        this.food = [];
        this.foodHashTable = {};
        this.render = function () {
            _this.meter.tickStart();
            _this.canvas.updateBackground();
            if (typeof _this.renderCallback == 'function') {
                _this.renderCallback(_this.canvas);
            }
            var rate = 1 / (_this.food.length * 0.01);
            if (rate > 1)
                rate = 1;
            m_1.M.fireAtRate(rate, function () { return _this.createFood(); });
            _this.food.forEach(function (f) {
                f.followers = [];
            });
            _this.vehicles.forEach(function (vehicle) {
                vehicle.boundaries(_this.canvas.body.width, _this.canvas.body.height);
                vehicle.update();
                m_1.M.fireAtRate(0.001, function () {
                    if (_this.vehicles.length < _this.maxPopulation) {
                        var child = vehicle.clone();
                        _this.addVehicle(child);
                    }
                });
                if (vehicle.health == 0) {
                    _this.removeVehicle(vehicle);
                }
                var closest = vehicle.findClosestFood(_this.food);
                if (closest) {
                    if (vehicle.eat(closest)) {
                        _this.removeFood(closest);
                    }
                }
            });
            _this.canvas.renderAll();
            _this.frame++;
            _this.meter.tick();
            requestAnimationFrame(_this.render);
        };
        this.mouseClicked = function (event) {
            if (_this.vehicles.length == _this.maxPopulation) {
                var index = m_1.M.randomInt(_this.vehicles.length);
                _this.removeVehicle(_this.vehicles[index]);
            }
            _this.createVehicle(new vector_1.Vector(event.x, event.y));
        };
        this.mouseMove = function (event) {
            _this.vehicles.forEach(function (element) {
                element.setTarget(new vector_1.Vector(event.x, event.y));
            });
        };
        this.meter = new FPSMeter();
    }
    App.prototype.init = function () {
        this.canvas = new canvas_1.Canvas('canvas', {
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.canvas.setBackground('#555');
        this.createVehicle();
        this.setCanvasEvents();
        if (typeof this.initCallback == 'function') {
            this.initCallback(this.canvas);
        }
    };
    App.prototype.setCanvasEvents = function () {
        this.canvas.body.addEventListener('click', this.mouseClicked);
    };
    App.prototype.run = function () {
        this.init();
        this.render();
    };
    App.prototype.createVehicle = function (position) {
        if (this.vehicles.length < this.maxPopulation) {
            var v = new vehicle_1.Vehicle(this.canvas.draw, position);
            this.addVehicle(v);
        }
    };
    App.prototype.addVehicle = function (vehicle) {
        this.canvas.add(vehicle.body, 10);
        this.vehicles.push(vehicle);
        vehicle.setId(Math.random().toString(36).substring(7) + '_' + +new Date());
        vehicle.setApplication(this);
        this.reindexVehicle();
    };
    App.prototype.removeVehicle = function (vehicle) {
        var _this = this;
        vehicle.elements.forEach(function (e) {
            _this.canvas.remove(e);
        });
        this.canvas.remove(vehicle.body, 10);
        this.vehicles.splice(this.vehicleHashTable[vehicle.id], 1);
        this.reindexVehicle();
    };
    App.prototype.reindexVehicle = function () {
        for (var i = 0; i < this.vehicles.length; i++) {
            this.vehicleHashTable[this.vehicles[i].id] = i;
        }
    };
    App.prototype.createFood = function (position) {
        var food = new food_1.Food(this.canvas.draw, position);
        this.canvas.add(food.body, 1);
        this.food.push(food);
        food.setId(this.food.length - 1 + '_' + +new Date());
        this.reindexFood();
    };
    App.prototype.removeFood = function (food) {
        this.canvas.remove(food.body, 1);
        this.food.splice(this.foodHashTable[food.id], 1);
        this.reindexFood();
    };
    App.prototype.reindexFood = function () {
        for (var i = 0; i < this.food.length; i++) {
            this.foodHashTable[this.food[i].id] = i;
        }
    };
    return App;
}());
exports.App = App;


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
var particle_1 = __webpack_require__(2);
var vector_1 = __webpack_require__(1);
var m_1 = __webpack_require__(0);
var color_1 = __webpack_require__(7);
var dna_1 = __webpack_require__(8);
var Vehicle = (function (_super) {
    __extends(Vehicle, _super);
    function Vehicle(draw, position, dna) {
        var _this = _super.call(this) || this;
        _this.maxSpeed = 4;
        _this.maxForce = 0.2;
        _this.width = 15;
        _this.height = 25;
        _this.health = 100;
        _this.targetDistance = 0;
        _this.foodSeekRadius = m_1.M.randomInt(0, 100);
        _this.poisonSeekRadius = m_1.M.randomInt(0, 100);
        _this.draw = draw;
        position = position || new vector_1.Vector(m_1.M.randomInt(draw.parent.body.width), m_1.M.randomInt(draw.parent.body.height));
        _this.body = draw.triangle(position, _this.width, _this.height);
        if (dna) {
            _this.maxSpeed = dna.maxSpeed;
            _this.maxForce = dna.maxForce;
            _this.foodSeekRadius = dna.foodSeekRadius;
            _this.poisonSeekRadius = dna.poisonSeekRadius;
        }
        var fCircle = draw.ellipse(position, _this.foodSeekRadius);
        fCircle.styles.fill = "rgba(136, 216, 176, 0.2)";
        var pCircle = draw.ellipse(position, _this.poisonSeekRadius);
        pCircle.styles.fill = "rgba(241, 84, 86, 0.2)";
        _this.elements = [fCircle, pCircle];
        draw.parent.add(fCircle);
        draw.parent.add(pCircle);
        _this.velocity = vector_1.Vector.random2D().multiply(5);
        _this.acceleration = new vector_1.Vector(0, 0);
        _this.target = null;
        return _this;
    }
    Vehicle.prototype.setApplication = function (app) {
        this.app = app;
    };
    Vehicle.prototype.setTarget = function (target) {
        this.target = target;
    };
    Vehicle.prototype.update = function () {
        if (this.target) {
            var stearingForce = this.seek(this.target);
            this.applyForce(stearingForce);
        }
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.body.position.add(this.velocity);
        this.acceleration.multiply(0);
        var theta = this.velocity.heading() + Math.PI / 2;
        this.body.angle = theta;
        this.health -= 0.09;
        if (this.health > 100) {
            this.health = 100;
        }
        if (this.health < 0) {
            this.health = 0;
        }
        var color = color_1.Color.lerp('#F15456', '#88d8b0', this.health / 100);
        this.body.styles.strokeColor = '#fff';
        this.body.styles.fill = color;
        this.updateElements();
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
    Vehicle.prototype.findClosestFood = function (list) {
        var _this = this;
        var food = null;
        var fisrtItem = list.slice().shift();
        if (fisrtItem) {
            var minDist_1 = this.body.position.dist(fisrtItem.body.position);
            list.forEach(function (item) {
                if (item.followers.length >= 1) {
                    return;
                }
                var d = _this.body.position.dist(item.body.position);
                if (d < 5) {
                    if (_this.eat(item)) {
                        _this.app.removeFood(item);
                    }
                }
                if (d <= minDist_1
                    && d < ((item.value > 0) ? _this.foodSeekRadius : _this.poisonSeekRadius)) {
                    food = item;
                    minDist_1 = d;
                    _this.targetDistance = minDist_1;
                }
            });
        }
        return food;
    };
    Vehicle.prototype.eat = function (food) {
        food.addFollewer(this);
        this.setTarget(food.body.position);
        if (this.targetDistance < 5) {
            this.health += food.value;
            this.setTarget(null);
            this.targetDistance = 0;
            return true;
        }
        else {
            return false;
        }
    };
    Vehicle.prototype.boundaries = function (width, height) {
        var d = 10;
        var desired = null;
        if (this.body.position.x < d) {
            desired = new vector_1.Vector(this.maxSpeed, this.velocity.y);
        }
        else if (this.body.position.x > width - d) {
            desired = new vector_1.Vector(-this.maxSpeed, this.velocity.y);
        }
        if (this.body.position.y < d) {
            desired = new vector_1.Vector(this.velocity.x, this.maxSpeed);
        }
        else if (this.body.position.y > height - d) {
            desired = new vector_1.Vector(this.velocity.x, -this.maxSpeed);
        }
        if (desired !== null) {
            desired.setMagnitude(this.maxSpeed);
            var steer = desired.subtract(this.velocity);
            steer.limit(this.maxForce);
            this.applyForce(steer);
        }
    };
    Vehicle.prototype.clone = function () {
        var dna = new dna_1.DNA(this);
        dna.mutate();
        return new Vehicle(this.draw, this.body.position.copy(), dna);
    };
    return Vehicle;
}(particle_1.Particle));
exports.Vehicle = Vehicle;


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
var COLOR_MODE;
(function (COLOR_MODE) {
    COLOR_MODE["RGBA"] = "RGBA";
    COLOR_MODE["HEX"] = "HEX";
    COLOR_MODE["HSB"] = "HSB";
})(COLOR_MODE = exports.COLOR_MODE || (exports.COLOR_MODE = {}));
var BaseColor = (function () {
    function BaseColor(mode) {
        this.value = '';
        this.mode = mode;
    }
    return BaseColor;
}());
var RGBA = (function (_super) {
    __extends(RGBA, _super);
    function RGBA(r, g, b, a) {
        if (a === void 0) { a = 1; }
        var _this = _super.call(this, COLOR_MODE.RGBA) || this;
        _this.red = r;
        _this.green = g;
        _this.blue = b;
        _this.alfa = a;
        _this.value = 'rgba(' + _this.red + ',' + _this.green + ',' + _this.blue + ',' + _this.alfa + ')';
        _this.valuesArray = [_this.red, _this.green, _this.blue, _this.alfa];
        return _this;
    }
    return RGBA;
}(BaseColor));
var HEX = (function (_super) {
    __extends(HEX, _super);
    function HEX(r, g, b) {
        var _this = _super.call(this, COLOR_MODE.HEX) || this;
        _this.red = r;
        _this.green = g;
        _this.blue = b;
        _this.valuesArray = [_this.red, _this.green, _this.blue];
        return _this;
    }
    return HEX;
}(BaseColor));
var HSB = (function (_super) {
    __extends(HSB, _super);
    function HSB(h, s, b) {
        var _this = _super.call(this, COLOR_MODE.HSB) || this;
        _this.hue = h;
        _this.saturation = s;
        _this.brightness = b;
        _this.valuesArray = [_this.hue, _this.saturation, _this.brightness];
        return _this;
    }
    return HSB;
}(BaseColor));
var Color = (function () {
    function Color(colorString) {
        if (/^((?:rgb)a?)\s*\(([^\)]*)\)/.test(colorString)) {
            var parts = /\((.*)\)/.exec(colorString)[1].replace(' ', '').split(',');
            this.rgba = RGBA.apply(this, parts);
        }
        else if (/^((?:hsb))\s*\(([^\)]*)\)/.test(colorString)) {
        }
        else if (/^#[A-Fa-f0-9]+$/.test(colorString)) {
        }
    }
    Color.lerp = function (a, b, amount) {
        var ah = parseInt(a.replace(/#/g, ''), 16), ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff, bh = parseInt(b.replace(/#/g, ''), 16), br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff, rr = ar + amount * (br - ar), rg = ag + amount * (bg - ag), rb = ab + amount * (bb - ab);
        return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
    };
    return Color;
}());
exports.Color = Color;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var m_1 = __webpack_require__(0);
var DNA = (function () {
    function DNA(v) {
        this.mutationRate = 1;
        this.maxSpeed = 0;
        this.maxForce = 0;
        this.foodSeekRadius = 0;
        this.poisonSeekRadius = 0;
        this.maxSpeed = Number(v.maxSpeed);
        this.maxForce = Number(v.maxForce);
        this.foodSeekRadius = Number(v.foodSeekRadius);
        this.poisonSeekRadius = Number(v.poisonSeekRadius);
    }
    DNA.prototype.mutate = function () {
        var _this = this;
        m_1.M.fireAtRate(this.mutationRate, function () {
            m_1.M.fireAtRate(0.5, function () {
                _this.maxSpeed += m_1.M.randomInt(-1, 1);
            });
            m_1.M.fireAtRate(0.5, function () {
                _this.maxForce += m_1.M.randomFloat(-0.1, 0.1);
            });
            m_1.M.fireAtRate(0.5, function () {
                _this.foodSeekRadius += m_1.M.randomInt(-15, 15);
                if (_this.foodSeekRadius < 10) {
                    _this.foodSeekRadius = 10;
                }
            });
            m_1.M.fireAtRate(0.5, function () {
                _this.poisonSeekRadius += m_1.M.randomInt(-15, 15);
                if (_this.poisonSeekRadius < 10) {
                    _this.poisonSeekRadius = 10;
                }
            });
        });
    };
    return DNA;
}());
exports.DNA = DNA;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var draw_1 = __webpack_require__(10);
var Canvas = (function () {
    function Canvas(id, options) {
        this.id = id;
        this.options = options;
        this.background = '#fff';
        this.objects = [];
        this.layers = {};
        this.body = document.createElement('canvas');
        this.body.id = id;
        this.body.width = this.options.width;
        this.body.height = this.options.height;
        document.body.appendChild(this.body);
        this.context = this.body.getContext('2d');
        this.draw = new draw_1.CanvasDraw(this);
    }
    Canvas.prototype.add = function (obj, layer) {
        if (layer === void 0) { layer = 0; }
        this.layers[layer] = this.layers[layer] || [];
        this.layers[layer].push(obj);
    };
    Canvas.prototype.remove = function (obj, layer) {
        if (layer === void 0) { layer = 0; }
        this.layers[layer] = this.layers[layer] || [];
        var i = this.layers[layer].indexOf(obj);
        if (i !== -1) {
            this.layers[layer].splice(i, 1);
        }
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
    Canvas.prototype.render = function (layer) {
        if (layer === void 0) { layer = 0; }
        this.layers[layer].forEach(function (obj) {
            obj.render();
        });
    };
    Canvas.prototype.renderAll = function () {
        for (var layer in this.layers) {
            this.render(parseInt(layer));
        }
    };
    return Canvas;
}());
exports.Canvas = Canvas;


/***/ }),
/* 10 */
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
        this.draw = d;
        this.ctx = d.parent.context;
        this.type = t;
        this.position = p;
        this.styles = {
            strokeColor: '#ffffff',
            strokeWidth: 1,
            fill: '#ffffff'
        };
    }
    BaseObject.prototype.start = function () {
        this.ctx.save();
        this.ctx.beginPath();
    };
    BaseObject.prototype.applyStyles = function () {
        this.ctx.fillStyle = this.styles.fill;
        this.ctx.strokeStyle = this.styles.strokeColor;
        this.ctx.lineWidth = this.styles.strokeWidth;
        this.ctx.fill();
        this.ctx.stroke();
    };
    BaseObject.prototype.end = function () {
        this.applyStyles();
        this.ctx.closePath();
        this.ctx.restore();
    };
    BaseObject.prototype.setParent = function (p) {
        this.parent = p;
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
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(d, position, width, height, angle) {
        var _this = _super.call(this, d, PRIMITIVES.TRIANGLE, position) || this;
        _this.width = width;
        _this.height = height;
        _this.angle = angle;
        return _this;
    }
    Triangle.prototype.render = function () {
        this.start();
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.angle);
        this.ctx.moveTo(0, -this.height / 2);
        this.ctx.lineTo(this.width / 2, this.height / 2);
        this.ctx.lineTo(-this.width / 2, this.height / 2);
        this.ctx.lineTo(0, -this.height / 2);
        this.end();
    };
    return Triangle;
}(BaseObject));
exports.Triangle = Triangle;
var DISPLAY_MODE;
(function (DISPLAY_MODE) {
    DISPLAY_MODE["CENTER"] = "CENTER";
    DISPLAY_MODE["CORNER"] = "CORNER";
})(DISPLAY_MODE = exports.DISPLAY_MODE || (exports.DISPLAY_MODE = {}));
var CanvasDraw = (function () {
    function CanvasDraw(c) {
        this.DISPLAY_MODE = DISPLAY_MODE.CENTER;
        this.parent = c;
    }
    CanvasDraw.prototype.ellipse = function (position, rx, ry) {
        ry = ry || rx;
        return new Ellipse(this, position, rx, ry);
    };
    CanvasDraw.prototype.triangle = function (position, width, height, angle) {
        angle = angle || 0;
        return new Triangle(this, position, width, height, angle);
    };
    return CanvasDraw;
}());
exports.CanvasDraw = CanvasDraw;


/***/ }),
/* 11 */
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
var particle_1 = __webpack_require__(2);
var vector_1 = __webpack_require__(1);
var m_1 = __webpack_require__(0);
var Food = (function (_super) {
    __extends(Food, _super);
    function Food(draw, position) {
        var _this = _super.call(this) || this;
        _this.radius = 5;
        _this.value = 0;
        _this.followers = [];
        position = position || new vector_1.Vector(m_1.M.randomInt(draw.parent.body.width), m_1.M.randomInt(draw.parent.body.height));
        _this.body = draw.ellipse(position, _this.radius);
        _this.body.setParent(_this);
        if (m_1.M.randomInt(0, 10) > 8) {
            _this.value = m_1.M.randomInt(-10, -1);
        }
        else {
            _this.value = m_1.M.randomInt(1, 10);
        }
        if (_this.value > 0) {
            _this.body.styles.fill = '#88d8b0';
        }
        else {
            _this.body.styles.fill = '#F15456';
        }
        return _this;
    }
    Food.prototype.addFollewer = function (v) {
        if (this.followers.indexOf(v) == -1) {
            this.followers.push(v);
        }
    };
    return Food;
}(particle_1.Particle));
exports.Food = Food;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTVmMTVmM2I4YWYzODRjMzBiZWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9saWIvbWF0aC9tLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvbGliL21hdGgvdmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY2xhc3Nlcy9wYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zwc21ldGVyL2Rpc3QvZnBzbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jbGFzc2VzL3ZlaGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9saWIvY2FudmFzL2NvbG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY2xhc3Nlcy9kbmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9saWIvY2FudmFzL2NhbnZhcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2xpYi9jYW52YXMvZHJhdy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NsYXNzZXMvZm9vZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7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QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsa0NBQWtDOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxJQUFJO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFH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Q0FBQyxDQUFDO1lBQ2hCLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QyxDQUFDOztJQUNMLENBQUM7SUFFRCwwQkFBVyxHQUFYLFVBQVksQ0FBVTtRQUNsQixFQUFFLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7SUFDTCxDQUFDO0lBRUwsV0FBQztBQUFELENBQUMsQ0EzQ3lCLG1CQUFRLEdBMkNqQztBQTNDWSxvQkFBSSIsImZpbGUiOiIuL2Rpc3QvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTVmMTVmM2I4YWYzODRjMzBiZWYiLCJleHBvcnQgY2xhc3MgTSB7XG5cbiAgICBzdGF0aWMgcmFuZG9tSW50KG1pbjogbnVtYmVyLCBtYXg/OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZighbWF4KSB7XG4gICAgICAgICAgICBtYXggPSBtaW47XG4gICAgICAgICAgICBtaW4gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJhbmQgPSBtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCArIDEgLSBtaW4pO1xuICAgICAgICByYW5kID0gTWF0aC5mbG9vcihyYW5kKTtcbiAgICAgICAgcmV0dXJuIHJhbmQ7XG4gICAgfVxuXG4gICAgc3RhdGljIHJhbmRvbUZsb2F0KG1pbjogbnVtYmVyLCBtYXg/OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAoIW1heCkge1xuICAgICAgICAgICAgbWF4ID0gbWluO1xuICAgICAgICAgICAgbWluID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByYW5kID0gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggKyAxIC0gbWluKTtcbiAgICAgICAgcmV0dXJuIHJhbmQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpcmVBdFJhdGUocGVyY2VudDogbnVtYmVyLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCBwZXJjZW50KSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9saWIvbWF0aC9tLnRzIiwiZXhwb3J0IGNsYXNzIFZlY3RvciB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICB6OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgfCBWZWN0b3IgfCBBcnJheTxudW1iZXI+LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0KHgsIHksIHopXG4gICAgfVxuXG4gICAgc2V0KHg6IG51bWJlcnxWZWN0b3J8QXJyYXk8bnVtYmVyPiwgeT86IG51bWJlciwgej86IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgVmVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4LnggfHwgMDtcbiAgICAgICAgICAgIHRoaXMueSA9IHgueSB8fCAwO1xuICAgICAgICAgICAgdGhpcy56ID0geC56IHx8IDA7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4WzBdIHx8IDA7XG4gICAgICAgICAgICB0aGlzLnkgPSB4WzFdIHx8IDA7XG4gICAgICAgICAgICB0aGlzLnogPSB4WzJdIHx8IDA7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMueSA9IHkgfHwgMDtcbiAgICAgICAgdGhpcy56ID0geiB8fCAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb3B5KCk6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xuICAgIH1cblxuICAgIGFkZCh4OiBudW1iZXIgfCBWZWN0b3IgfCBBcnJheTxudW1iZXI+LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBWZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMueCArPSB4LnggfHwgMDtcbiAgICAgICAgICAgIHRoaXMueSArPSB4LnkgfHwgMDtcbiAgICAgICAgICAgIHRoaXMueiArPSB4LnogfHwgMDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMueCArPSB4WzBdIHx8IDA7XG4gICAgICAgICAgICB0aGlzLnkgKz0geFsxXSB8fCAwO1xuICAgICAgICAgICAgdGhpcy56ICs9IHhbMl0gfHwgMDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueCArPSB4IHx8IDA7XG4gICAgICAgIHRoaXMueSArPSB5IHx8IDA7XG4gICAgICAgIHRoaXMueiArPSB6IHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN1YnRyYWN0KHg6IG51bWJlciB8IFZlY3RvciB8IEFycmF5PG51bWJlcj4sIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIFZlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy54IC09IHgueCB8fCAwO1xuICAgICAgICAgICAgdGhpcy55IC09IHgueSB8fCAwO1xuICAgICAgICAgICAgdGhpcy56IC09IHgueiB8fCAwO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdGhpcy54IC09IHhbMF0gfHwgMDtcbiAgICAgICAgICAgIHRoaXMueSAtPSB4WzFdIHx8IDA7XG4gICAgICAgICAgICB0aGlzLnogLT0geFsyXSB8fCAwO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54IC09IHggfHwgMDtcbiAgICAgICAgdGhpcy55IC09IHkgfHwgMDtcbiAgICAgICAgdGhpcy56IC09IHogfHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbXVsdGlwbHkobjogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgdGhpcy54ICo9IG47XG4gICAgICAgIHRoaXMueSAqPSBuO1xuICAgICAgICB0aGlzLnogKj0gbjtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkaXZpZGUobjogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgdGhpcy54IC89IG47XG4gICAgICAgIHRoaXMueSAvPSBuO1xuICAgICAgICB0aGlzLnogLz0gbjtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtYWduaXR1ZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLm1hZ25pdHVkZVNxKCkpO1xuICAgIH1cblxuICAgIG1hZ25pdHVkZVNxKCk6IG51bWJlciB7XG4gICAgICAgIHZhciB4ID0gdGhpcy54O1xuICAgICAgICB2YXIgeSA9IHRoaXMueTtcbiAgICAgICAgdmFyIHogPSB0aGlzLno7XG4gICAgICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG4gICAgfVxuXG4gICAgZG90KHg6IGFueSwgeT86IG51bWJlciwgej86IG51bWJlcik6IGFueSB7XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgVmVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb3QoeC54LCB4LnksIHgueik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMueCAqICh4IHx8IDApICsgdGhpcy55ICogKHkgfHwgMCkgKyB0aGlzLnogKiAoeiB8fCAwKTtcbiAgICB9XG5cbiAgICBjcm9zcyh2OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICB2YXIgeCA9IHRoaXMueSAqIHYueiAtIHRoaXMueiAqIHYueTtcbiAgICAgICAgdmFyIHkgPSB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2Lno7XG4gICAgICAgIHZhciB6ID0gdGhpcy54ICogdi55IC0gdGhpcy55ICogdi54O1xuXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHgsIHksIHopO1xuICAgIH1cblxuICAgIGRpc3QodjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHZcbiAgICAgICAgICAgIC5jb3B5KClcbiAgICAgICAgICAgIC5zdWJ0cmFjdCh0aGlzKVxuICAgICAgICAgICAgLm1hZ25pdHVkZSgpO1xuICAgIH1cblxuICAgIG5vcm1hbGl6ZSgpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5tYWduaXR1ZGUoKSA9PT0gMCA/IHRoaXMgOiB0aGlzLmRpdmlkZSh0aGlzLm1hZ25pdHVkZSgpKTtcbiAgICB9XG5cbiAgICBsaW1pdChtYXg6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIHZhciBtU3EgPSB0aGlzLm1hZ25pdHVkZVNxKCk7XG4gICAgICAgIGlmIChtU3EgPiBtYXggKiBtYXgpIHtcbiAgICAgICAgICAgIHRoaXMuZGl2aWRlKE1hdGguc3FydChtU3EpKSAvL25vcm1hbGl6ZSBpdFxuICAgICAgICAgICAgICAgIC5tdWx0aXBseShtYXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldE1hZ25pdHVkZShuOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemUoKS5tdWx0aXBseShuKTtcbiAgICB9XG5cbiAgICBoZWFkaW5nKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgICB9XG5cbiAgICByb3RhdGUoYTogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgdmFyIG5ld0hlYWRpbmcgPSB0aGlzLmhlYWRpbmcoKSArIGE7XG4gICAgICAgIHZhciBtYWcgPSB0aGlzLm1hZ25pdHVkZSgpO1xuICAgICAgICB0aGlzLnggPSBNYXRoLmNvcyhuZXdIZWFkaW5nKSAqIG1hZztcbiAgICAgICAgdGhpcy55ID0gTWF0aC5zaW4obmV3SGVhZGluZykgKiBtYWc7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYW5nbGVCZXR3ZWVuKHY6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgICAgIHZhciBkb3RtYWdtYWcgPSB0aGlzLmRvdCh2KSAvICh0aGlzLm1hZ25pdHVkZSgpICogdi5tYWduaXR1ZGUoKSk7XG4gICAgICAgIC8vIE1hdGhlbWF0aWNhbGx5IHNwZWFraW5nOiB0aGUgZG90bWFnbWFnIHZhcmlhYmxlIHdpbGwgYmUgYmV0d2VlbiAtMSBhbmQgMVxuICAgICAgICAvLyBpbmNsdXNpdmUuIFByYWN0aWNhbGx5IHRob3VnaCBpdCBjb3VsZCBiZSBzbGlnaHRseSBvdXRzaWRlIHRoaXMgcmFuZ2UgZHVlXG4gICAgICAgIC8vIHRvIGZsb2F0aW5nLXBvaW50IHJvdW5kaW5nIGlzc3Vlcy4gVGhpcyBjYW4gbWFrZSBNYXRoLmFjb3MgcmV0dXJuIE5hTi5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU29sdXRpb246IHdlJ2xsIGNsYW1wIHRoZSB2YWx1ZSB0byB0aGUgLTEsMSByYW5nZVxuICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLmFjb3MoTWF0aC5taW4oMSwgTWF0aC5tYXgoLTEsIGRvdG1hZ21hZykpKTtcbiAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgIH1cblxuICAgIGxlcnAoeDogYW55LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyLCBhbXQ/OiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIFZlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVycCh4LngsIHgueSwgeC56LCB5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnggKz0gKHggLSB0aGlzLngpICogYW10IHx8IDA7XG4gICAgICAgIHRoaXMueSArPSAoeSAtIHRoaXMueSkgKiBhbXQgfHwgMDtcbiAgICAgICAgdGhpcy56ICs9ICh6IC0gdGhpcy56KSAqIGFtdCB8fCAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b0FycmF5KCkge1xuICAgICAgICByZXR1cm4gW3RoaXMueCB8fCAwLCB0aGlzLnkgfHwgMCwgdGhpcy56IHx8IDBdO1xuICAgIH1cblxuICAgIGVxdWFscyh4OiBhbnksIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgdmFyIGEsIGIsIGM7XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgVmVjdG9yKSB7XG4gICAgICAgICAgICBhID0geC54IHx8IDA7XG4gICAgICAgICAgICBiID0geC55IHx8IDA7XG4gICAgICAgICAgICBjID0geC56IHx8IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoeCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBhID0geFswXSB8fCAwO1xuICAgICAgICAgICAgYiA9IHhbMV0gfHwgMDtcbiAgICAgICAgICAgIGMgPSB4WzJdIHx8IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhID0geCB8fCAwO1xuICAgICAgICAgICAgYiA9IHkgfHwgMDtcbiAgICAgICAgICAgIGMgPSB6IHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0gYSAmJiB0aGlzLnkgPT09IGIgJiYgdGhpcy56ID09PSBjO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tQW5nbGUoYW5nbGU6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpLCAwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmFuZG9tMkQoKTogVmVjdG9yIHtcbiAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIDIgKiBNYXRoLlBJO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbUFuZ2xlKGFuZ2xlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmFuZG9tM0QoKTogVmVjdG9yIHtcbiAgICAgICAgdmFyIGFuZ2xlLCB2ejtcblxuICAgICAgICBhbmdsZSA9IE1hdGgucmFuZG9tKCkgKiAyICogTWF0aC5QSTtcbiAgICAgICAgdnogPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG5cbiAgICAgICAgdmFyIHZ6QmFzZSA9IE1hdGguc3FydCgxIC0gdnogKiB2eik7XG4gICAgICAgIHZhciB2eCA9IHZ6QmFzZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgdmFyIHZ5ID0gdnpCYXNlICogTWF0aC5zaW4oYW5nbGUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHZ4LCB2eSwgdnopO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2xpYi9tYXRoL3ZlY3Rvci50cyIsImltcG9ydCB7IEJhc2VPYmplY3QgfSBmcm9tIFwiLi4vbGliL2NhbnZhcy9kcmF3XCI7XG5pbXBvcnQgeyBDYW52YXMgfSBmcm9tIFwiLi4vbGliL2NhbnZhcy9jYW52YXNcIjtcblxuXG5leHBvcnQgY2xhc3MgUGFydGljbGUge1xuICAgIGlkOiBhbnk7XG4gICAgYm9keTogQmFzZU9iamVjdDtcbiAgICBwYXJlbnQ6IENhbnZhcztcbiAgICBlbGVtZW50czogQmFzZU9iamVjdFtdID0gW107XG5cbiAgICBzZXRQYXJlbnQoY25hdmFzOiBDYW52YXMpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBjbmF2YXM7XG4gICAgfVxuXG4gICAgc2V0SWQoaWQ6IGFueSkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuXG4gICAgdXBkYXRlRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGUucG9zaXRpb24gPSB0aGlzLmJvZHkucG9zaXRpb24uY29weSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jbGFzc2VzL3BhcnRpY2xlLnRzIiwiaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9hcHAvYXBwJztcbmltcG9ydCB7IFZlaGljbGUgfSBmcm9tICcuL2FwcC9jbGFzc2VzL3ZlaGljbGUnO1xuXG52YXIgYXBwID0gbmV3IEFwcCgpO1xuYXBwLnJ1bigpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiLCJcbmltcG9ydCAnZnBzbWV0ZXInO1xuaW1wb3J0IHsgVmVoaWNsZSB9IGZyb20gJy4vY2xhc3Nlcy92ZWhpY2xlJztcbmltcG9ydCB7IENhbnZhcyB9IGZyb20gJy4vbGliL2NhbnZhcy9jYW52YXMnO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi9saWIvbWF0aC92ZWN0b3InO1xuaW1wb3J0IHsgRm9vZCB9IGZyb20gJy4vY2xhc3Nlcy9mb29kJztcbmltcG9ydCB7IE0gfSBmcm9tICcuL2xpYi9tYXRoL20nO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgICBtZXRlcjogRlBTTWV0ZXI7XG4gICAgZnJhbWU6IG51bWJlciA9IDA7XG4gICAgY2FudmFzOiBDYW52YXM7XG5cbiAgICBtYXhQb3B1bGF0aW9uOiBudW1iZXIgPSAxMDtcblxuICAgIHZlaGljbGVzOiBWZWhpY2xlW10gPSBbXTtcbiAgICB2ZWhpY2xlSGFzaFRhYmxlID0ge307XG4gICAgZm9vZDogRm9vZFtdID0gW107XG4gICAgZm9vZEhhc2hUYWJsZSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbml0Q2FsbGJhY2s/OiBGdW5jdGlvbiwgcHJpdmF0ZSByZW5kZXJDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubWV0ZXIgPSBuZXcgRlBTTWV0ZXIoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IG5ldyBDYW52YXMoJ2NhbnZhcycsIHtcbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNhbnZhcy5zZXRCYWNrZ3JvdW5kKCcjNTU1Jyk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVWZWhpY2xlKCk7XG5cbiAgICAgICAgdGhpcy5zZXRDYW52YXNFdmVudHMoKTtcblxuICAgICAgICBpZih0eXBlb2YgdGhpcy5pbml0Q2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5pbml0Q2FsbGJhY2sodGhpcy5jYW52YXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q2FudmFzRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5tb3VzZUNsaWNrZWQpO1xuICAgICAgICAvLyB0aGlzLmNhbnZhcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlKTtcbiAgICB9XG5cbiAgICByZW5kZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubWV0ZXIudGlja1N0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMudXBkYXRlQmFja2dyb3VuZCgpO1xuXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnJlbmRlckNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2FsbGJhY2sodGhpcy5jYW52YXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhdGUgPSAxIC8gKHRoaXMuZm9vZC5sZW5ndGggKiAwLjAxKTtcbiAgICAgICAgaWYocmF0ZSA+IDEpIHJhdGUgPSAxO1xuICAgICAgICBNLmZpcmVBdFJhdGUocmF0ZSwgKCkgPT4gdGhpcy5jcmVhdGVGb29kKCkpO1xuXG4gICAgICAgIHRoaXMuZm9vZC5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgZi5mb2xsb3dlcnMgPSBbXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52ZWhpY2xlcy5mb3JFYWNoKHZlaGljbGUgPT4ge1xuICAgICAgICAgICAgdmVoaWNsZS5ib3VuZGFyaWVzKHRoaXMuY2FudmFzLmJvZHkud2lkdGgsIHRoaXMuY2FudmFzLmJvZHkuaGVpZ2h0KTtcbiAgICAgICAgICAgIHZlaGljbGUudXBkYXRlKCk7XG4gICAgICAgICAgICBNLmZpcmVBdFJhdGUoMC4wMDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZWhpY2xlcy5sZW5ndGggPCB0aGlzLm1heFBvcHVsYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdmVoaWNsZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFZlaGljbGUoY2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZih2ZWhpY2xlLmhlYWx0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVWZWhpY2xlKHZlaGljbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNsb3Nlc3QgPSB2ZWhpY2xlLmZpbmRDbG9zZXN0Rm9vZCh0aGlzLmZvb2QpO1xuICAgICAgICAgICAgaWYoY2xvc2VzdCkge1xuICAgICAgICAgICAgICAgIGlmKHZlaGljbGUuZWF0KGNsb3Nlc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRm9vZChjbG9zZXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xuXG4gICAgICAgIHRoaXMuZnJhbWUrKztcbiAgICAgICAgdGhpcy5tZXRlci50aWNrKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlcik7XG4gICAgfVxuXG4gICAgbW91c2VDbGlja2VkID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmKHRoaXMudmVoaWNsZXMubGVuZ3RoID09IHRoaXMubWF4UG9wdWxhdGlvbikge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gTS5yYW5kb21JbnQodGhpcy52ZWhpY2xlcy5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVWZWhpY2xlKHRoaXMudmVoaWNsZXNbaW5kZXhdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3JlYXRlVmVoaWNsZShcbiAgICAgICAgICAgIG5ldyBWZWN0b3IoZXZlbnQueCwgZXZlbnQueSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBtb3VzZU1vdmUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy52ZWhpY2xlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRUYXJnZXQoXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcihldmVudC54LCBldmVudC55KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcnVuKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ29tcG9uZW50cy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICBjcmVhdGVWZWhpY2xlKHBvc2l0aW9uPzogVmVjdG9yKSB7XG4gICAgICAgIGlmICh0aGlzLnZlaGljbGVzLmxlbmd0aCA8IHRoaXMubWF4UG9wdWxhdGlvbikge1xuICAgICAgICAgICAgbGV0IHYgPSBuZXcgVmVoaWNsZShcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5kcmF3LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLmFkZFZlaGljbGUodik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRWZWhpY2xlKHZlaGljbGU/OiBWZWhpY2xlKSB7XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZCh2ZWhpY2xlLmJvZHksIDEwKTtcbiAgICAgICAgdGhpcy52ZWhpY2xlcy5wdXNoKHZlaGljbGUpO1xuXG4gICAgICAgIHZlaGljbGUuc2V0SWQoTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpICsgJ18nICsgK25ldyBEYXRlKCkpO1xuICAgICAgICB2ZWhpY2xlLnNldEFwcGxpY2F0aW9uKHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWluZGV4VmVoaWNsZSgpO1xuICAgIH1cblxuICAgIHJlbW92ZVZlaGljbGUodmVoaWNsZTogVmVoaWNsZSkge1xuICAgICAgICB2ZWhpY2xlLmVsZW1lbnRzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5yZW1vdmUoZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodmVoaWNsZS5ib2R5LCAxMCk7XG4gICAgICAgIHRoaXMudmVoaWNsZXMuc3BsaWNlKHRoaXMudmVoaWNsZUhhc2hUYWJsZVt2ZWhpY2xlLmlkXSwgMSk7XG5cbiAgICAgICAgdGhpcy5yZWluZGV4VmVoaWNsZSgpO1xuICAgIH1cblxuICAgIHJlaW5kZXhWZWhpY2xlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmVoaWNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMudmVoaWNsZUhhc2hUYWJsZVt0aGlzLnZlaGljbGVzW2ldLmlkXSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVGb29kKHBvc2l0aW9uPzogVmVjdG9yKSB7XG4gICAgICAgIHZhciBmb29kID0gbmV3IEZvb2QoXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5kcmF3LFxuICAgICAgICAgICAgcG9zaXRpb25cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNhbnZhcy5hZGQoZm9vZC5ib2R5LCAxKTtcbiAgICAgICAgdGhpcy5mb29kLnB1c2goZm9vZCk7XG4gICAgICAgIGZvb2Quc2V0SWQodGhpcy5mb29kLmxlbmd0aCAtIDEgKyAnXycgKyArbmV3IERhdGUoKSk7XG5cbiAgICAgICAgdGhpcy5yZWluZGV4Rm9vZCgpO1xuICAgIH1cblxuICAgIHJlbW92ZUZvb2QoZm9vZDogRm9vZCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5yZW1vdmUoZm9vZC5ib2R5LCAxKTtcbiAgICAgICAgdGhpcy5mb29kLnNwbGljZSh0aGlzLmZvb2RIYXNoVGFibGVbZm9vZC5pZF0sIDEpO1xuXG4gICAgICAgIHRoaXMucmVpbmRleEZvb2QoKTtcbiAgICB9XG5cbiAgICByZWluZGV4Rm9vZCgpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZm9vZC5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgICAgIHRoaXMuZm9vZEhhc2hUYWJsZVt0aGlzLmZvb2RbaV0uaWRdID0gaTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvYXBwLnRzIiwiLyohXG4gKiBGUFNNZXRlciAwLjMuMSAtIDl0aCBNYXkgMjAxM1xuICogaHR0cHM6Ly9naXRodWIuY29tL0RhcnNhaW4vZnBzbWV0ZXJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cbjsoZnVuY3Rpb24gKHcsIHVuZGVmaW5lZCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgRWxlbWVudCB0eXBlIG5hbWUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9XG5cdCAqL1xuXHRmdW5jdGlvbiBuZXdFbChuYW1lKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdGhlbWUgQ1NTIHByb3BlcnRpZXMgdG8gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBET00gZWxlbWVudC5cblx0ICogQHBhcmFtICB7T2JqZWN0fSAgdGhlbWUgICBUaGVtZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9XG5cdCAqL1xuXHRmdW5jdGlvbiBhcHBseVRoZW1lKGVsZW1lbnQsIHRoZW1lKSB7XG5cdFx0Zm9yICh2YXIgbmFtZSBpbiB0aGVtZSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZWxlbWVudC5zdHlsZVtuYW1lXSA9IHRoZW1lW25hbWVdO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHR5cGUgb2YgdGhlIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtNaXhlZH0gdmFsdWVcblx0ICpcblx0ICogQHJldHVybiB7U3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gdHlwZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gU3RyaW5nKHZhbHVlKTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLm1hdGNoKC9cXHMoW2Etel0rKS9pKVsxXS50b0xvd2VyQ2FzZSgpIHx8ICdvYmplY3QnO1xuXHRcdH1cblxuXHRcdHJldHVybiB0eXBlb2YgdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciB0aGUgdmFsdWUgaXMgaW4gYW4gYXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSAge01peGVkfSB2YWx1ZVxuXHQgKiBAcGFyYW0gIHtBcnJheX0gYXJyYXlcblx0ICpcblx0ICogQHJldHVybiB7SW50ZWdlcn0gQXJyYXkgaW5kZXggb3IgLTEgd2hlbiBub3QgZm91bmQuXG5cdCAqL1xuXHRmdW5jdGlvbiBpbkFycmF5KHZhbHVlLCBhcnJheSkge1xuXHRcdGlmICh0eXBlKGFycmF5KSAhPT0gJ2FycmF5Jykge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0XHRpZiAoYXJyYXkuaW5kZXhPZikge1xuXHRcdFx0cmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpO1xuXHRcdH1cblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IGFycmF5Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0aWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBvb3IgbWFuJ3MgZGVlcCBvYmplY3QgZXh0ZW5kLlxuXHQgKlxuXHQgKiBFeGFtcGxlOlxuXHQgKiAgIGV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXHQgKlxuXHQgKiBAcmV0dXJuIHtWb2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHRcdHZhciBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGZvciAodmFyIGtleSBpbiBhcmdzWzFdKSB7XG5cdFx0XHRpZiAoYXJnc1sxXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdHN3aXRjaCAodHlwZShhcmdzWzFdW2tleV0pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGV4dGVuZCh7fSwgYXJnc1swXVtrZXldLCBhcmdzWzFdW2tleV0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdhcnJheSc6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBhcmdzWzFdW2tleV0uc2xpY2UoMCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBhcmdzWzFdW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFyZ3MubGVuZ3RoID4gMiA/XG5cdFx0XHRleHRlbmQuYXBwbHkobnVsbCwgW2FyZ3NbMF1dLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAyKSkpIDpcblx0XHRcdGFyZ3NbMF07XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBIU0wgY29sb3IgdG8gSEVYIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtICB7QXJyYXl9IGhzbCBBcnJheSB3aXRoIFtodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzc10uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0FycmF5fSBBcnJheSB3aXRoIFtyZWQsIGdyZWVuLCBibHVlXS5cblx0ICovXG5cdGZ1bmN0aW9uIGhzbFRvSGV4KGgsIHMsIGwpIHtcblx0XHR2YXIgciwgZywgYjtcblx0XHR2YXIgdiwgbWluLCBzdiwgc2V4dGFudCwgZnJhY3QsIHZzZjtcblxuXHRcdGlmIChsIDw9IDAuNSkge1xuXHRcdFx0diA9IGwgKiAoMSArIHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2ID0gbCArIHMgLSBsICogcztcblx0XHR9XG5cblx0XHRpZiAodiA9PT0gMCkge1xuXHRcdFx0cmV0dXJuICcjMDAwJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWluID0gMiAqIGwgLSB2O1xuXHRcdFx0c3YgPSAodiAtIG1pbikgLyB2O1xuXHRcdFx0aCA9IDYgKiBoO1xuXHRcdFx0c2V4dGFudCA9IE1hdGguZmxvb3IoaCk7XG5cdFx0XHRmcmFjdCA9IGggLSBzZXh0YW50O1xuXHRcdFx0dnNmID0gdiAqIHN2ICogZnJhY3Q7XG5cdFx0XHRpZiAoc2V4dGFudCA9PT0gMCB8fCBzZXh0YW50ID09PSA2KSB7XG5cdFx0XHRcdHIgPSB2O1xuXHRcdFx0XHRnID0gbWluICsgdnNmO1xuXHRcdFx0XHRiID0gbWluO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAxKSB7XG5cdFx0XHRcdHIgPSB2IC0gdnNmO1xuXHRcdFx0XHRnID0gdjtcblx0XHRcdFx0YiA9IG1pbjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMikge1xuXHRcdFx0XHRyID0gbWluO1xuXHRcdFx0XHRnID0gdjtcblx0XHRcdFx0YiA9IG1pbiArIHZzZjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMykge1xuXHRcdFx0XHRyID0gbWluO1xuXHRcdFx0XHRnID0gdiAtIHZzZjtcblx0XHRcdFx0YiA9IHY7XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDQpIHtcblx0XHRcdFx0ciA9IG1pbiArIHZzZjtcblx0XHRcdFx0ZyA9IG1pbjtcblx0XHRcdFx0YiA9IHY7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyID0gdjtcblx0XHRcdFx0ZyA9IG1pbjtcblx0XHRcdFx0YiA9IHYgLSB2c2Y7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJyMnICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGhzbFRvSGV4LlxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xuXHRcdGMgPSBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KTtcblx0XHRyZXR1cm4gYy5sZW5ndGggPT09IDEgPyAnMCcgKyBjIDogYztcblx0fVxuXG5cdC8qKlxuXHQgKiBNYW5hZ2UgZWxlbWVudCBldmVudCBsaXN0ZW5lcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSAge05vZGV9ICAgICBlbGVtZW50XG5cdCAqIEBwYXJhbSAge0V2ZW50fSAgICBldmVudE5hbWVcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcblx0ICogQHBhcmFtICB7Qm9vbH0gICAgIHJlbW92ZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtWb2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyLCByZW1vdmUpIHtcblx0XHRpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0XHRlbGVtZW50W3JlbW92ZSA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdhZGRFdmVudExpc3RlbmVyJ10oZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0fSBlbHNlIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG5cdFx0XHRlbGVtZW50W3JlbW92ZSA/ICdkZXRhY2hFdmVudCcgOiAnYXR0YWNoRXZlbnQnXSgnb24nICsgZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0XHR9XG5cdH1cblxuXHQvLyBQcmVmZXJyZWQgdGltaW5nIGZ1bnRpb25cblx0dmFyIGdldFRpbWU7XG5cdChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHBlcmYgPSB3LnBlcmZvcm1hbmNlO1xuXHRcdGlmIChwZXJmICYmIChwZXJmLm5vdyB8fCBwZXJmLndlYmtpdE5vdykpIHtcblx0XHRcdHZhciBwZXJmTm93ID0gcGVyZi5ub3cgPyAnbm93JyA6ICd3ZWJraXROb3cnO1xuXHRcdFx0Z2V0VGltZSA9IHBlcmZbcGVyZk5vd10uYmluZChwZXJmKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Z2V0VGltZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuICtuZXcgRGF0ZSgpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0oKSk7XG5cblx0Ly8gTG9jYWwgV2luZG93QW5pbWF0aW9uVGltaW5nIGludGVyZmFjZSBwb2x5ZmlsbFxuXHR2YXIgY0FGID0gdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3LmNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0dmFyIHJBRiA9IHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHQoZnVuY3Rpb24gKCkge1xuXHRcdHZhciB2ZW5kb3JzID0gWydtb3onLCAnd2Via2l0JywgJ28nXTtcblx0XHR2YXIgbGFzdFRpbWUgPSAwO1xuXG5cdFx0Ly8gRm9yIGEgbW9yZSBhY2N1cmF0ZSBXaW5kb3dBbmltYXRpb25UaW1pbmcgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uLCBkaXRjaCB0aGUgbmF0aXZlXG5cdFx0Ly8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoZW4gY2FuY2VsQW5pbWF0aW9uRnJhbWUgaXMgbm90IHByZXNlbnQgKG9sZGVyIHZlcnNpb25zIG9mIEZpcmVmb3gpXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSB2ZW5kb3JzLmxlbmd0aDsgaSA8IGwgJiYgIWNBRjsgKytpKSB7XG5cdFx0XHRjQUYgPSB3W3ZlbmRvcnNbaV0rJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd1t2ZW5kb3JzW2ldKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcblx0XHRcdHJBRiA9IGNBRiAmJiB3W3ZlbmRvcnNbaV0rJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuXHRcdH1cblxuXHRcdGlmICghY0FGKSB7XG5cdFx0XHRyQUYgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdFx0dmFyIGN1cnJUaW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0XHR2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcblx0XHRcdFx0bGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG5cdFx0XHRcdHJldHVybiB3LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LCB0aW1lVG9DYWxsKTtcblx0XHRcdH07XG5cblx0XHRcdGNBRiA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoaWQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0oKSk7XG5cblx0Ly8gUHJvcGVydHkgbmFtZSBmb3IgYXNzaWduaW5nIGVsZW1lbnQgdGV4dCBjb250ZW50XG5cdHZhciB0ZXh0UHJvcCA9IHR5cGUoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykudGV4dENvbnRlbnQpID09PSAnc3RyaW5nJyA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JztcblxuXHQvKipcblx0ICogRlBTTWV0ZXIgY2xhc3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gYW5jaG9yICBFbGVtZW50IHRvIGFwcGVuZCB0aGUgbWV0ZXIgdG8uIERlZmF1bHQgaXMgZG9jdW1lbnQuYm9keS5cblx0ICogQHBhcmFtIHtPYmplY3R9ICBvcHRpb25zIE9iamVjdCB3aXRoIG9wdGlvbnMuXG5cdCAqL1xuXHRmdW5jdGlvbiBGUFNNZXRlcihhbmNob3IsIG9wdGlvbnMpIHtcblx0XHQvLyBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRpZiAodHlwZShhbmNob3IpID09PSAnb2JqZWN0JyAmJiBhbmNob3Iubm9kZVR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0b3B0aW9ucyA9IGFuY2hvcjtcblx0XHRcdGFuY2hvciA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghYW5jaG9yKSB7XG5cdFx0XHRhbmNob3IgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblxuXHRcdC8vIFByaXZhdGUgcHJvcGVydGllc1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR2YXIgbyA9IGV4dGVuZCh7fSwgRlBTTWV0ZXIuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG5cdFx0dmFyIGVsID0ge307XG5cdFx0dmFyIGNvbHMgPSBbXTtcblx0XHR2YXIgdGhlbWUsIGhlYXRtYXBzO1xuXHRcdHZhciBoZWF0RGVwdGggPSAxMDA7XG5cdFx0dmFyIGhlYXRpbmcgPSBbXTtcblxuXHRcdHZhciB0aGlzRnJhbWVUaW1lID0gMDtcblx0XHR2YXIgZnJhbWVUaW1lID0gby50aHJlc2hvbGQ7XG5cdFx0dmFyIGZyYW1lU3RhcnQgPSAwO1xuXHRcdHZhciBsYXN0TG9vcCA9IGdldFRpbWUoKSAtIGZyYW1lVGltZTtcblx0XHR2YXIgdGltZTtcblxuXHRcdHZhciBmcHNIaXN0b3J5ID0gW107XG5cdFx0dmFyIGR1cmF0aW9uSGlzdG9yeSA9IFtdO1xuXG5cdFx0dmFyIGZyYW1lSUQsIHJlbmRlcklEO1xuXHRcdHZhciBzaG93RnBzID0gby5zaG93ID09PSAnZnBzJztcblx0XHR2YXIgZ3JhcGhIZWlnaHQsIGNvdW50LCBpLCBqO1xuXG5cdFx0Ly8gRXhwb3NlZCBwcm9wZXJ0aWVzXG5cdFx0c2VsZi5vcHRpb25zID0gbztcblx0XHRzZWxmLmZwcyA9IDA7XG5cdFx0c2VsZi5kdXJhdGlvbiA9IDA7XG5cdFx0c2VsZi5pc1BhdXNlZCA9IDA7XG5cblx0XHQvKipcblx0XHQgKiBUaWNrIHN0YXJ0IGZvciBtZWFzdXJpbmcgdGhlIGFjdHVhbCByZW5kZXJpbmcgZHVyYXRpb24uXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYudGlja1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZnJhbWVTdGFydCA9IGdldFRpbWUoKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRlBTIHRpY2suXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYudGljayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHR0aGlzRnJhbWVUaW1lID0gdGltZSAtIGxhc3RMb29wO1xuXHRcdFx0ZnJhbWVUaW1lICs9ICh0aGlzRnJhbWVUaW1lIC0gZnJhbWVUaW1lKSAvIG8uc21vb3RoaW5nO1xuXHRcdFx0c2VsZi5mcHMgPSAxMDAwIC8gZnJhbWVUaW1lO1xuXHRcdFx0c2VsZi5kdXJhdGlvbiA9IGZyYW1lU3RhcnQgPCBsYXN0TG9vcCA/IGZyYW1lVGltZSA6IHRpbWUgLSBmcmFtZVN0YXJ0O1xuXHRcdFx0bGFzdExvb3AgPSB0aW1lO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBQYXVzZSBkaXNwbGF5IHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChmcmFtZUlEKSB7XG5cdFx0XHRcdHNlbGYuaXNQYXVzZWQgPSAxO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoZnJhbWVJRCk7XG5cdFx0XHRcdGNBRihmcmFtZUlEKTtcblx0XHRcdFx0Y0FGKHJlbmRlcklEKTtcblx0XHRcdFx0ZnJhbWVJRCA9IHJlbmRlcklEID0gMDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZXN1bWUgZGlzcGxheSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCFmcmFtZUlEKSB7XG5cdFx0XHRcdHNlbGYuaXNQYXVzZWQgPSAwO1xuXHRcdFx0XHRyZXF1ZXN0UmVuZGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlIG9wdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgT3B0aW9uIG5hbWUuXG5cdFx0ICogQHBhcmFtIHtNaXhlZH0gIHZhbHVlIE5ldyB2YWx1ZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zZXQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdG9bbmFtZV0gPSB2YWx1ZTtcblx0XHRcdHNob3dGcHMgPSBvLnNob3cgPT09ICdmcHMnO1xuXG5cdFx0XHQvLyBSZWJ1aWxkIG9yIHJlcG9zaXRpb24gZWxlbWVudHMgd2hlbiBzcGVjaWZpYyBvcHRpb24gaGFzIGJlZW4gdXBkYXRlZFxuXHRcdFx0aWYgKGluQXJyYXkobmFtZSwgcmVidWlsZGVycykgIT09IC0xKSB7XG5cdFx0XHRcdGNyZWF0ZU1ldGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5BcnJheShuYW1lLCByZXBvc2l0aW9uZXJzKSAhPT0gLTEpIHtcblx0XHRcdFx0cG9zaXRpb25NZXRlcigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoYW5nZSBtZXRlciBpbnRvIHJlbmRlcmluZyBkdXJhdGlvbiBtb2RlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNob3dEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93JywgJ21zJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlIG1ldGVyIGludG8gRlBTIG1vZGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvd0ZwcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93JywgJ2ZwcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFRvZ2dsZXMgYmV0d2VlbiBzaG93OiAnZnBzJyBhbmQgc2hvdzogJ2R1cmF0aW9uJy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnNldCgnc2hvdycsIHNob3dGcHMgPyAnbXMnIDogJ2ZwcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhpZGUgdGhlIEZQU01ldGVyLiBBbHNvIHBhdXNlcyB0aGUgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnBhdXNlKCk7XG5cdFx0XHRlbC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTaG93IHRoZSBGUFNNZXRlci4gQWxzbyByZXN1bWVzIHRoZSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYucmVzdW1lKCk7XG5cdFx0XHRlbC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2sgdGhlIGN1cnJlbnQgRlBTIGFuZCBzYXZlIGl0IGluIGhpc3RvcnkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGhpc3RvcnlUaWNrKCkge1xuXHRcdFx0Zm9yIChpID0gby5oaXN0b3J5OyBpLS07KSB7XG5cdFx0XHRcdGZwc0hpc3RvcnlbaV0gPSBpID09PSAwID8gc2VsZi5mcHMgOiBmcHNIaXN0b3J5W2ktMV07XG5cdFx0XHRcdGR1cmF0aW9uSGlzdG9yeVtpXSA9IGkgPT09IDAgPyBzZWxmLmR1cmF0aW9uIDogZHVyYXRpb25IaXN0b3J5W2ktMV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBoZWF0IGhleCBjb2xvciBiYXNlZCBvbiB2YWx1ZXMgcGFzc2VkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gaGVhdG1hcFxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbHVlXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gbWluXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gbWF4XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGdldEhlYXQoaGVhdG1hcCwgdmFsdWUsIG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gaGVhdG1hcHNbMHxoZWF0bWFwXVtNYXRoLnJvdW5kKE1hdGgubWluKCh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSAqIGhlYXREZXB0aCwgaGVhdERlcHRoKSldO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSBjb3VudGVyIG51bWJlciBhbmQgbGVnZW5kLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiB1cGRhdGVDb3VudGVyKCkge1xuXHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZCBvbmx5IHdoZW4gY2hhbmdlZFxuXHRcdFx0aWYgKGVsLmxlZ2VuZC5mcHMgIT09IHNob3dGcHMpIHtcblx0XHRcdFx0ZWwubGVnZW5kLmZwcyA9IHNob3dGcHM7XG5cdFx0XHRcdGVsLmxlZ2VuZFt0ZXh0UHJvcF0gPSBzaG93RnBzID8gJ0ZQUycgOiAnbXMnO1xuXHRcdFx0fVxuXHRcdFx0Ly8gVXBkYXRlIGNvdW50ZXIgd2l0aCBhIG5pY2VseSBmb3JtYXRlZCAmIHJlYWRhYmxlIG51bWJlclxuXHRcdFx0Y291bnQgPSBzaG93RnBzID8gc2VsZi5mcHMgOiBzZWxmLmR1cmF0aW9uO1xuXHRcdFx0ZWwuY291bnRbdGV4dFByb3BdID0gY291bnQgPiA5OTkgPyAnOTk5KycgOiBjb3VudC50b0ZpeGVkKGNvdW50ID4gOTkgPyAwIDogby5kZWNpbWFscyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmVuZGVyIGN1cnJlbnQgRlBTIHN0YXRlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR0aW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0Ly8gSWYgcmVuZGVyZXIgc3RvcHBlZCByZXBvcnRpbmcsIGRvIGEgc2ltdWxhdGVkIGRyb3AgdG8gMCBmcHNcblx0XHRcdGlmIChsYXN0TG9vcCA8IHRpbWUgLSBvLnRocmVzaG9sZCkge1xuXHRcdFx0XHRzZWxmLmZwcyAtPSBzZWxmLmZwcyAvIE1hdGgubWF4KDEsIG8uc21vb3RoaW5nICogNjAgLyBvLmludGVydmFsKTtcblx0XHRcdFx0c2VsZi5kdXJhdGlvbiA9IDEwMDAgLyBzZWxmLmZwcztcblx0XHRcdH1cblxuXHRcdFx0aGlzdG9yeVRpY2soKTtcblx0XHRcdHVwZGF0ZUNvdW50ZXIoKTtcblxuXHRcdFx0Ly8gQXBwbHkgaGVhdCB0byBlbGVtZW50c1xuXHRcdFx0aWYgKG8uaGVhdCkge1xuXHRcdFx0XHRpZiAoaGVhdGluZy5sZW5ndGgpIHtcblx0XHRcdFx0XHRmb3IgKGkgPSBoZWF0aW5nLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0XHRcdFx0aGVhdGluZ1tpXS5lbC5zdHlsZVt0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRPbl0gPSBzaG93RnBzID9cblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRtYXAsIHNlbGYuZnBzLCAwLCBvLm1heEZwcykgOlxuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdG1hcCwgc2VsZi5kdXJhdGlvbiwgby50aHJlc2hvbGQsIDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChlbC5ncmFwaCAmJiB0aGVtZS5jb2x1bW4uaGVhdE9uKSB7XG5cdFx0XHRcdFx0Zm9yIChpID0gY29scy5sZW5ndGg7IGktLTspIHtcblx0XHRcdFx0XHRcdGNvbHNbaV0uc3R5bGVbdGhlbWUuY29sdW1uLmhlYXRPbl0gPSBzaG93RnBzID9cblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZS5jb2x1bW4uaGVhdG1hcCwgZnBzSGlzdG9yeVtpXSwgMCwgby5tYXhGcHMpIDpcblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZS5jb2x1bW4uaGVhdG1hcCwgZHVyYXRpb25IaXN0b3J5W2ldLCBvLnRocmVzaG9sZCwgMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVwZGF0ZSBncmFwaCBjb2x1bW5zIGhlaWdodFxuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvLmhpc3Rvcnk7IGorKykge1xuXHRcdFx0XHRcdGNvbHNbal0uc3R5bGUuaGVpZ2h0ID0gKHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0KGZwc0hpc3Rvcnlbal0gPyBNYXRoLnJvdW5kKGdyYXBoSGVpZ2h0IC8gby5tYXhGcHMgKiBNYXRoLm1pbihmcHNIaXN0b3J5W2pdLCBvLm1heEZwcykpIDogMCkgOlxuXHRcdFx0XHRcdFx0KGR1cmF0aW9uSGlzdG9yeVtqXSA/IE1hdGgucm91bmQoZ3JhcGhIZWlnaHQgLyBvLnRocmVzaG9sZCAqIE1hdGgubWluKGR1cmF0aW9uSGlzdG9yeVtqXSwgby50aHJlc2hvbGQpKSA6IDApXG5cdFx0XHRcdFx0KSArICdweCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZXF1ZXN0IHJlbmRlcmluZyBsb29wLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7SW50fSBBbmltYXRpb24gZnJhbWUgaW5kZXguXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVxdWVzdFJlbmRlcigpIHtcblx0XHRcdGlmIChvLmludGVydmFsIDwgMjApIHtcblx0XHRcdFx0ZnJhbWVJRCA9IHJBRihyZXF1ZXN0UmVuZGVyKTtcblx0XHRcdFx0cmVuZGVyKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmcmFtZUlEID0gc2V0VGltZW91dChyZXF1ZXN0UmVuZGVyLCBvLmludGVydmFsKTtcblx0XHRcdFx0cmVuZGVySUQgPSByQUYocmVuZGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBNZXRlciBldmVudHMgaGFuZGxlci5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZXZlbnRIYW5kbGVyKGV2ZW50KSB7XG5cdFx0XHRldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblx0XHRcdGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG5cdFx0XHRcdGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRzZWxmLnRvZ2dsZSgpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIERlc3Ryb3lzIHRoZSBjdXJyZW50IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRzZWxmLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBTdG9wIHJlbmRlcmluZ1xuXHRcdFx0c2VsZi5wYXVzZSgpO1xuXHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnRzXG5cdFx0XHRyZW1vdmVNZXRlcigpO1xuXHRcdFx0Ly8gU3RvcCBsaXN0ZW5pbmdcblx0XHRcdHNlbGYudGljayA9IHNlbGYudGlja1N0YXJ0ID0gZnVuY3Rpb24gKCkge307XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZSBtZXRlciBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZW1vdmVNZXRlcigpIHtcblx0XHRcdC8vIFVuYmluZCBsaXN0ZW5lcnNcblx0XHRcdGlmIChvLnRvZ2dsZU9uKSB7XG5cdFx0XHRcdGxpc3RlbmVyKGVsLmNvbnRhaW5lciwgby50b2dnbGVPbiwgZXZlbnRIYW5kbGVyLCAxKTtcblx0XHRcdH1cblx0XHRcdC8vIERldGFjaCBlbGVtZW50XG5cdFx0XHRhbmNob3IucmVtb3ZlQ2hpbGQoZWwuY29udGFpbmVyKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBTZXRzIHRoZSB0aGVtZSwgYW5kIGdlbmVyYXRlcyBoZWF0bWFwcyB3aGVuIG5lZWRlZC5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBzZXRUaGVtZSgpIHtcblx0XHRcdHRoZW1lID0gRlBTTWV0ZXIudGhlbWVbby50aGVtZV07XG5cblx0XHRcdC8vIEdlbmVyYXRlIGhlYXRtYXBzXG5cdFx0XHRoZWF0bWFwcyA9IHRoZW1lLmNvbXBpbGVkSGVhdG1hcHMgfHwgW107XG5cdFx0XHRpZiAoIWhlYXRtYXBzLmxlbmd0aCAmJiB0aGVtZS5oZWF0bWFwcy5sZW5ndGgpIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IHRoZW1lLmhlYXRtYXBzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0aGVhdG1hcHNbal0gPSBbXTtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IGhlYXREZXB0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRoZWF0bWFwc1tqXVtpXSA9IGhzbFRvSGV4KDAuMzMgLyBoZWF0RGVwdGggKiBpLCB0aGVtZS5oZWF0bWFwc1tqXS5zYXR1cmF0aW9uLCB0aGVtZS5oZWF0bWFwc1tqXS5saWdodG5lc3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGVtZS5jb21waWxlZEhlYXRtYXBzID0gaGVhdG1hcHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhbmQgYXR0YWNoZXMgdGhlIG1ldGVyIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGNyZWF0ZU1ldGVyKCkge1xuXHRcdFx0Ly8gUmVtb3ZlIG9sZCBtZXRlciBpZiBwcmVzZW50XG5cdFx0XHRpZiAoZWwuY29udGFpbmVyKSB7XG5cdFx0XHRcdHJlbW92ZU1ldGVyKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGVtZVxuXHRcdFx0c2V0VGhlbWUoKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGVsZW1lbnRzXG5cdFx0XHRlbC5jb250YWluZXIgPSBhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY29udGFpbmVyKTtcblx0XHRcdGVsLmNvdW50ID0gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb3VudCkpO1xuXHRcdFx0ZWwubGVnZW5kID0gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5sZWdlbmQpKTtcblx0XHRcdGVsLmdyYXBoID0gby5ncmFwaCA/IGVsLmNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuZ3JhcGgpKSA6IDA7XG5cblx0XHRcdC8vIEFkZCBlbGVtZW50cyB0byBoZWF0aW5nIGFycmF5XG5cdFx0XHRoZWF0aW5nLmxlbmd0aCA9IDA7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gZWwpIHtcblx0XHRcdFx0aWYgKGVsW2tleV0gJiYgdGhlbWVba2V5XS5oZWF0T24pIHtcblx0XHRcdFx0XHRoZWF0aW5nLnB1c2goe1xuXHRcdFx0XHRcdFx0bmFtZToga2V5LFxuXHRcdFx0XHRcdFx0ZWw6IGVsW2tleV1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHcmFwaFxuXHRcdFx0Y29scy5sZW5ndGggPSAwO1xuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdC8vIENyZWF0ZSBncmFwaFxuXHRcdFx0XHRlbC5ncmFwaC5zdHlsZS53aWR0aCA9IChvLmhpc3RvcnkgKiB0aGVtZS5jb2x1bW4ud2lkdGggKyAoby5oaXN0b3J5IC0gMSkgKiB0aGVtZS5jb2x1bW4uc3BhY2luZykgKyAncHgnO1xuXG5cdFx0XHRcdC8vIEFkZCBjb2x1bW5zXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBvLmhpc3Rvcnk7IGkrKykge1xuXHRcdFx0XHRcdGNvbHNbaV0gPSBlbC5ncmFwaC5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY29sdW1uKSk7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5ib3R0b20gPSAwO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUucmlnaHQgPSAoaSAqIHRoZW1lLmNvbHVtbi53aWR0aCArIGkgKiB0aGVtZS5jb2x1bW4uc3BhY2luZykgKyAncHgnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUud2lkdGggPSB0aGVtZS5jb2x1bW4ud2lkdGggKyAncHgnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBpbml0aWFsIHN0YXRlXG5cdFx0XHRwb3NpdGlvbk1ldGVyKCk7XG5cdFx0XHR1cGRhdGVDb3VudGVyKCk7XG5cblx0XHRcdC8vIEFwcGVuZCBjb250YWluZXIgdG8gYW5jaG9yXG5cdFx0XHRhbmNob3IuYXBwZW5kQ2hpbGQoZWwuY29udGFpbmVyKTtcblxuXHRcdFx0Ly8gUmV0cmlldmUgZ3JhcGggaGVpZ2h0IGFmdGVyIGl0IHdhcyBhcHBlbmRlZCB0byBET01cblx0XHRcdGlmIChlbC5ncmFwaCkge1xuXHRcdFx0XHRncmFwaEhlaWdodCA9IGVsLmdyYXBoLmNsaWVudEhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdFx0aWYgKG8udG9nZ2xlT24pIHtcblx0XHRcdFx0aWYgKG8udG9nZ2xlT24gPT09ICdjbGljaycpIHtcblx0XHRcdFx0XHRlbC5jb250YWluZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3RlbmVyKGVsLmNvbnRhaW5lciwgby50b2dnbGVPbiwgZXZlbnRIYW5kbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBQb3NpdGlvbnMgdGhlIG1ldGVyIGJhc2VkIG9uIG9wdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHBvc2l0aW9uTWV0ZXIoKSB7XG5cdFx0XHRhcHBseVRoZW1lKGVsLmNvbnRhaW5lciwgbyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ29uc3RydWN0LlxuXHRcdCAqL1xuXHRcdChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBDcmVhdGUgbWV0ZXIgZWxlbWVudFxuXHRcdFx0Y3JlYXRlTWV0ZXIoKTtcblx0XHRcdC8vIFN0YXJ0IHJlbmRlcmluZ1xuXHRcdFx0cmVxdWVzdFJlbmRlcigpO1xuXHRcdH0oKSk7XG5cdH1cblxuXHQvLyBFeHBvc2UgdGhlIGV4dGVuZCBmdW5jdGlvblxuXHRGUFNNZXRlci5leHRlbmQgPSBleHRlbmQ7XG5cblx0Ly8gRXhwb3NlIHRoZSBGUFNNZXRlciBjbGFzc1xuXHR3aW5kb3cuRlBTTWV0ZXIgPSBGUFNNZXRlcjtcblxuXHQvLyBEZWZhdWx0IG9wdGlvbnNcblx0RlBTTWV0ZXIuZGVmYXVsdHMgPSB7XG5cdFx0aW50ZXJ2YWw6ICAxMDAsICAgICAvLyBVcGRhdGUgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLlxuXHRcdHNtb290aGluZzogMTAsICAgICAgLy8gU3Bpa2Ugc21vb3RoaW5nIHN0cmVuZ3RoLiAxIG1lYW5zIG5vIHNtb290aGluZy5cblx0XHRzaG93OiAgICAgICdmcHMnLCAgIC8vIFdoZXRoZXIgdG8gc2hvdyAnZnBzJywgb3IgJ21zJyA9IGZyYW1lIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcy5cblx0XHR0b2dnbGVPbjogICdjbGljaycsIC8vIFRvZ2dsZSBiZXR3ZWVuIHNob3cgJ2ZwcycgYW5kICdtcycgb24gdGhpcyBldmVudC5cblx0XHRkZWNpbWFsczogIDEsICAgICAgIC8vIE51bWJlciBvZiBkZWNpbWFscyBpbiBGUFMgbnVtYmVyLiAxID0gNTkuOSwgMiA9IDU5Ljk0LCAuLi5cblx0XHRtYXhGcHM6ICAgIDYwLCAgICAgIC8vIE1heCBleHBlY3RlZCBGUFMgdmFsdWUuXG5cdFx0dGhyZXNob2xkOiAxMDAsICAgICAvLyBNaW5pbWFsIHRpY2sgcmVwb3J0aW5nIGludGVydmFsIGluIG1pbGxpc2Vjb25kcy5cblxuXHRcdC8vIE1ldGVyIHBvc2l0aW9uXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsIC8vIE1ldGVyIHBvc2l0aW9uLlxuXHRcdHpJbmRleDogICAxMCwgICAgICAgICAvLyBNZXRlciBaIGluZGV4LlxuXHRcdGxlZnQ6ICAgICAnNXB4JywgICAgICAvLyBNZXRlciBsZWZ0IG9mZnNldC5cblx0XHR0b3A6ICAgICAgJzVweCcsICAgICAgLy8gTWV0ZXIgdG9wIG9mZnNldC5cblx0XHRyaWdodDogICAgJ2F1dG8nLCAgICAgLy8gTWV0ZXIgcmlnaHQgb2Zmc2V0LlxuXHRcdGJvdHRvbTogICAnYXV0bycsICAgICAvLyBNZXRlciBib3R0b20gb2Zmc2V0LlxuXHRcdG1hcmdpbjogICAnMCAwIDAgMCcsICAvLyBNZXRlciBtYXJnaW4uIEhlbHBzIHdpdGggY2VudGVyaW5nIHRoZSBjb3VudGVyIHdoZW4gbGVmdDogNTAlO1xuXG5cdFx0Ly8gVGhlbWVcblx0XHR0aGVtZTogJ2RhcmsnLCAvLyBNZXRlciB0aGVtZS4gQnVpbGQgaW46ICdkYXJrJywgJ2xpZ2h0JywgJ3RyYW5zcGFyZW50JywgJ2NvbG9yZnVsJy5cblx0XHRoZWF0OiAgMCwgICAgICAvLyBBbGxvdyB0aGVtZXMgdG8gdXNlIGNvbG9yaW5nIGJ5IEZQUyBoZWF0LiAwIEZQUyA9IHJlZCwgbWF4RnBzID0gZ3JlZW4uXG5cblx0XHQvLyBHcmFwaFxuXHRcdGdyYXBoOiAgIDAsIC8vIFdoZXRoZXIgdG8gc2hvdyBoaXN0b3J5IGdyYXBoLlxuXHRcdGhpc3Rvcnk6IDIwIC8vIEhvdyBtYW55IGhpc3Rvcnkgc3RhdGVzIHRvIHNob3cgaW4gYSBncmFwaC5cblx0fTtcblxuXHQvLyBPcHRpb24gbmFtZXMgdGhhdCB0cmlnZ2VyIEZQU01ldGVyIHJlYnVpbGQgb3IgcmVwb3NpdGlvbiB3aGVuIG1vZGlmaWVkXG5cdHZhciByZWJ1aWxkZXJzID0gW1xuXHRcdCd0b2dnbGVPbicsXG5cdFx0J3RoZW1lJyxcblx0XHQnaGVhdCcsXG5cdFx0J2dyYXBoJyxcblx0XHQnaGlzdG9yeSdcblx0XTtcblx0dmFyIHJlcG9zaXRpb25lcnMgPSBbXG5cdFx0J3Bvc2l0aW9uJyxcblx0XHQnekluZGV4Jyxcblx0XHQnbGVmdCcsXG5cdFx0J3RvcCcsXG5cdFx0J3JpZ2h0Jyxcblx0XHQnYm90dG9tJyxcblx0XHQnbWFyZ2luJ1xuXHRdO1xufSh3aW5kb3cpKTtcbjsoZnVuY3Rpb24gKHcsIEZQU01ldGVyLCB1bmRlZmluZWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vIFRoZW1lcyBvYmplY3Rcblx0RlBTTWV0ZXIudGhlbWUgPSB7fTtcblxuXHQvLyBCYXNlIHRoZW1lIHdpdGggbGF5b3V0LCBubyBjb2xvcnNcblx0dmFyIGJhc2UgPSBGUFNNZXRlci50aGVtZS5iYXNlID0ge1xuXHRcdGhlYXRtYXBzOiBbXSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBhZGRpbmc6ICc1cHgnLFxuXHRcdFx0bWluV2lkdGg6ICc5NXB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzMwcHgnLFxuXHRcdFx0dGV4dEFsaWduOiAncmlnaHQnLFxuXHRcdFx0dGV4dFNoYWRvdzogJ25vbmUnXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHR0b3A6IDAsXG5cdFx0XHRyaWdodDogMCxcblx0XHRcdHBhZGRpbmc6ICc1cHggMTBweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGZvbnRTaXplOiAnMjRweCcsXG5cdFx0XHRmb250RmFtaWx5OiAnQ29uc29sYXMsIEFuZGFsZSBNb25vLCBtb25vc3BhY2UnLFxuXHRcdFx0ekluZGV4OiAyXG5cdFx0fSxcblx0XHRsZWdlbmQ6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0dG9wOiAwLFxuXHRcdFx0bGVmdDogMCxcblx0XHRcdHBhZGRpbmc6ICc1cHggMTBweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGZvbnRTaXplOiAnMTJweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMzJweCcsXG5cdFx0XHRmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0Jyxcblx0XHRcdHpJbmRleDogMlxuXHRcdH0sXG5cdFx0Z3JhcGg6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0Ym94U2l6aW5nOiAncGFkZGluZy1ib3gnLFxuXHRcdFx0TW96Qm94U2l6aW5nOiAncGFkZGluZy1ib3gnLFxuXHRcdFx0aGVpZ2h0OiAnMTAwJScsXG5cdFx0XHR6SW5kZXg6IDFcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdHdpZHRoOiA0LFxuXHRcdFx0c3BhY2luZzogMSxcblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGxcblx0XHR9XG5cdH07XG5cblx0Ly8gRGFyayB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5kYXJrID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjgsXG5cdFx0XHRsaWdodG5lc3M6IDAuOFxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyMyMjInLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdGJvcmRlcjogJzFweCBzb2xpZCAjMWExYTFhJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgIzIyMidcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHRoZWF0T246ICdjb2xvcidcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyMzZjNmM2YnXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBMaWdodCB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5saWdodCA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC41LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjVcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdGNvbG9yOiAnIzY2NicsXG5cdFx0XHRiYWNrZ3JvdW5kOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjUpLCAtMXB4IC0xcHggMCByZ2JhKDI1NSwyNTUsMjU1LC41KScsXG5cdFx0XHRib3hTaGFkb3c6ICcwIDAgMCAxcHggcmdiYSgwLDAsMCwuMSknXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0aGVhdE9uOiAnY29sb3InXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjZWFlYWVhJ1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gQ29sb3JmdWwgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUuY29sb3JmdWwgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuNSxcblx0XHRcdGxpZ2h0bmVzczogMC42XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRoZWF0T246ICdiYWNrZ3JvdW5kQ29sb3InLFxuXHRcdFx0YmFja2dyb3VuZDogJyM4ODgnLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgwLDAsMCwuMiknLFxuXHRcdFx0Ym94U2hhZG93OiAnMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjEpJ1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzc3NycsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4yKSdcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFRyYW5zcGFyZW50IHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLnRyYW5zcGFyZW50ID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjgsXG5cdFx0XHRsaWdodG5lc3M6IDAuNVxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0cGFkZGluZzogMCxcblx0XHRcdGNvbG9yOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMCwwLDAsLjUpJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdHBhZGRpbmc6ICcwIDVweCcsXG5cdFx0XHRoZWlnaHQ6ICc0MHB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICc0MHB4J1xuXHRcdH0sXG5cdFx0bGVnZW5kOiB7XG5cdFx0XHRwYWRkaW5nOiAnMCA1cHgnLFxuXHRcdFx0aGVpZ2h0OiAnNDBweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnNDJweCdcblx0XHR9LFxuXHRcdGdyYXBoOiB7XG5cdFx0XHRoZWlnaHQ6ICc0MHB4J1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHR3aWR0aDogNSxcblx0XHRcdGJhY2tncm91bmQ6ICcjOTk5Jyxcblx0XHRcdGhlYXRPbjogJ2JhY2tncm91bmRDb2xvcicsXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHR9XG5cdH0pO1xufSh3aW5kb3csIEZQU01ldGVyKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZnBzbWV0ZXIvZGlzdC9mcHNtZXRlci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBQYXJ0aWNsZSB9IGZyb20gXCIuL3BhcnRpY2xlXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vbGliL21hdGgvdmVjdG9yXCI7XG5pbXBvcnQgeyBDYW52YXNEcmF3LCBUcmlhbmdsZSB9IGZyb20gXCIuLi9saWIvY2FudmFzL2RyYXdcIjtcbmltcG9ydCB7IE0gfSBmcm9tIFwiLi4vbGliL21hdGgvbVwiO1xuaW1wb3J0IHsgRm9vZCB9IGZyb20gXCIuL2Zvb2RcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4uL2xpYi9jYW52YXMvY29sb3JcIjtcbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuLi9hcHBcIjtcbmltcG9ydCB7IEROQSB9IGZyb20gXCIuL2RuYVwiO1xuXG5leHBvcnQgY2xhc3MgVmVoaWNsZSBleHRlbmRzIFBhcnRpY2xlIHtcbiAgICBhcHA6IEFwcDtcbiAgICBib2R5OiBUcmlhbmdsZTtcbiAgICBpbmRleDogbnVtYmVyO1xuXG4gICAgZHJhdzogQ2FudmFzRHJhdztcblxuICAgIHRhcmdldDogVmVjdG9yO1xuICAgIHZlbG9jaXR5OiBWZWN0b3I7XG4gICAgYWNjZWxlcmF0aW9uOiBWZWN0b3I7XG4gICAgbWF4U3BlZWQ6IG51bWJlciA9IDQ7XG4gICAgbWF4Rm9yY2U6IG51bWJlciA9IDAuMjtcblxuICAgIHdpZHRoOiBudW1iZXIgPSAxNTtcbiAgICBoZWlnaHQ6IG51bWJlciA9IDI1O1xuICAgIGhlYWx0aDogbnVtYmVyID0gMTAwO1xuXG4gICAgdGFyZ2V0RGlzdGFuY2U6IG51bWJlciA9IDA7XG5cbiAgICBmb29kU2Vla1JhZGl1czogbnVtYmVyID0gTS5yYW5kb21JbnQoMCwgMTAwKTtcbiAgICBwb2lzb25TZWVrUmFkaXVzOiBudW1iZXIgPSBNLnJhbmRvbUludCgwLCAxMDApO1xuXG4gICAgY29uc3RydWN0b3IoZHJhdzogQ2FudmFzRHJhdywgcG9zaXRpb24/OiBWZWN0b3IsIGRuYT86IEROQSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZHJhdyA9IGRyYXc7XG5cbiAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgTS5yYW5kb21JbnQoZHJhdy5wYXJlbnQuYm9keS53aWR0aCksIFxuICAgICAgICAgICAgTS5yYW5kb21JbnQoZHJhdy5wYXJlbnQuYm9keS5oZWlnaHQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ib2R5ID0gZHJhdy50cmlhbmdsZShcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGRuYSkge1xuICAgICAgICAgICAgdGhpcy5tYXhTcGVlZCA9IGRuYS5tYXhTcGVlZDtcbiAgICAgICAgICAgIHRoaXMubWF4Rm9yY2UgPSBkbmEubWF4Rm9yY2U7XG4gICAgICAgICAgICB0aGlzLmZvb2RTZWVrUmFkaXVzID0gZG5hLmZvb2RTZWVrUmFkaXVzO1xuICAgICAgICAgICAgdGhpcy5wb2lzb25TZWVrUmFkaXVzID0gZG5hLnBvaXNvblNlZWtSYWRpdXM7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZkNpcmNsZSA9IGRyYXcuZWxsaXBzZShwb3NpdGlvbiwgdGhpcy5mb29kU2Vla1JhZGl1cyk7XG4gICAgICAgIGZDaXJjbGUuc3R5bGVzLmZpbGwgPSBcInJnYmEoMTM2LCAyMTYsIDE3NiwgMC4yKVwiO1xuXG4gICAgICAgIGxldCBwQ2lyY2xlID0gZHJhdy5lbGxpcHNlKHBvc2l0aW9uLCB0aGlzLnBvaXNvblNlZWtSYWRpdXMpO1xuICAgICAgICBwQ2lyY2xlLnN0eWxlcy5maWxsID0gXCJyZ2JhKDI0MSwgODQsIDg2LCAwLjIpXCI7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtmQ2lyY2xlLCBwQ2lyY2xlXTtcbiAgICAgICAgZHJhdy5wYXJlbnQuYWRkKGZDaXJjbGUpO1xuICAgICAgICBkcmF3LnBhcmVudC5hZGQocENpcmNsZSk7XG5cbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IFZlY3Rvci5yYW5kb20yRCgpLm11bHRpcGx5KDUpO1xuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDsgXG4gICAgfVxuXG4gICAgc2V0QXBwbGljYXRpb24oYXBwOiBBcHApIHtcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgfVxuXG4gICAgc2V0VGFyZ2V0KHRhcmdldDogVmVjdG9yKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIGxldCBzdGVhcmluZ0ZvcmNlID0gdGhpcy5zZWVrKHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShzdGVhcmluZ0ZvcmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSB2ZWxvY2l0eVxuICAgICAgICB0aGlzLnZlbG9jaXR5LmFkZCh0aGlzLmFjY2VsZXJhdGlvbik7XG4gICAgICAgIC8vIExpbWl0IHNwZWVkXG4gICAgICAgIHRoaXMudmVsb2NpdHkubGltaXQodGhpcy5tYXhTcGVlZCk7XG4gICAgICAgIHRoaXMuYm9keS5wb3NpdGlvbi5hZGQodGhpcy52ZWxvY2l0eSk7XG4gICAgICAgIC8vIFJlc2V0IGFjY2VsZXJhdGlvbiB0byAwIGVhY2ggY3ljbGVcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24ubXVsdGlwbHkoMCk7XG5cbiAgICAgICAgdmFyIHRoZXRhID0gdGhpcy52ZWxvY2l0eS5oZWFkaW5nKCkgKyBNYXRoLlBJIC8gMjtcbiAgICAgICAgdGhpcy5ib2R5LmFuZ2xlID0gdGhldGE7XG5cbiAgICAgICAgLy8gU2xvd2x5IGRpZSB1bmxlc3MgeW91IGVhdFxuICAgICAgICB0aGlzLmhlYWx0aCAtPSAwLjA5O1xuXG4gICAgICAgIGlmICh0aGlzLmhlYWx0aCA+IDEwMCkge1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oZWFsdGggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsZXQgY29sb3IgPSBDb2xvci5sZXJwKCcjMDAwMDAwJywgJyNmZmZmZmYnLCB0aGlzLmhlYWx0aCAvIDEwMCk7XG4gICAgICAgIGxldCBjb2xvciA9IENvbG9yLmxlcnAoJyNGMTU0NTYnLCAnIzg4ZDhiMCcsIHRoaXMuaGVhbHRoIC8gMTAwKTtcblxuICAgICAgICB0aGlzLmJvZHkuc3R5bGVzLnN0cm9rZUNvbG9yID0gJyNmZmYnO1xuICAgICAgICB0aGlzLmJvZHkuc3R5bGVzLmZpbGwgPSBjb2xvcjtcblxuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnRzKCk7XG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZShmb3JjZTogVmVjdG9yKSB7XG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uLmFkZChmb3JjZSk7XG4gICAgfVxuXG4gICAgc2Vlayh0YXJnZXQ6IFZlY3Rvcikge1xuXG4gICAgICAgIHZhciBkZXNpcmVkID0gdGFyZ2V0LmNvcHkoKS5zdWJ0cmFjdCh0aGlzLmJvZHkucG9zaXRpb24pOyAvLyBBIHZlY3RvciBwb2ludGluZyBmcm9tIHRoZSBsb2NhdGlvbiB0byB0aGUgdGFyZ2V0XG4gICAgICAgIGRlc2lyZWQuc2V0TWFnbml0dWRlKHRoaXMubWF4U3BlZWQpO1xuXG4gICAgICAgIC8vIFN0ZWVyaW5nID0gRGVzaXJlZCBtaW51cyB2ZWxvY2l0eVxuICAgICAgICB2YXIgc3RlZXIgPSBkZXNpcmVkLmNvcHkoKS5zdWJ0cmFjdCh0aGlzLnZlbG9jaXR5KTtcblxuICAgICAgICAvLyBOb3QgbGltaXRpbmcgaGVyZVxuICAgICAgICBzdGVlci5saW1pdCh0aGlzLm1heEZvcmNlKTtcblxuICAgICAgICByZXR1cm4gc3RlZXI7XG4gICAgfVxuXG4gICAgZmluZENsb3Nlc3RGb29kKGxpc3Q6IEZvb2RbXSk6IEZvb2Qge1xuICAgICAgICBsZXQgZm9vZDogRm9vZCA9IG51bGw7XG4gICAgICAgIGxldCBmaXNydEl0ZW0gPSBsaXN0LnNsaWNlKCkuc2hpZnQoKTtcblxuICAgICAgICBpZihmaXNydEl0ZW0pIHtcbiAgICAgICAgICAgIGxldCBtaW5EaXN0ID0gdGhpcy5ib2R5LnBvc2l0aW9uLmRpc3QoZmlzcnRJdGVtLmJvZHkucG9zaXRpb24pO1xuICAgIFxuICAgICAgICAgICAgbGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmZvbGxvd2Vycy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGQgPSB0aGlzLmJvZHkucG9zaXRpb24uZGlzdChpdGVtLmJvZHkucG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgaWYoZCA8IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5lYXQoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwLnJlbW92ZUZvb2QoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihkIDw9IG1pbkRpc3RcbiAgICAgICAgICAgICAgICAmJiBkIDwgKChpdGVtLnZhbHVlID4gMCkgPyB0aGlzLmZvb2RTZWVrUmFkaXVzIDogdGhpcy5wb2lzb25TZWVrUmFkaXVzKSkge1xuICAgICAgICAgICAgICAgICAgICBmb29kID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgbWluRGlzdCA9IGQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0RGlzdGFuY2UgPSBtaW5EaXN0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvb2Q7XG4gICAgfVxuXG4gICAgZWF0KGZvb2Q6IEZvb2QpOmJvb2xlYW4ge1xuICAgICAgICBmb29kLmFkZEZvbGxld2VyKHRoaXMpO1xuICAgICAgICB0aGlzLnNldFRhcmdldChmb29kLmJvZHkucG9zaXRpb24pO1xuXG4gICAgICAgIGlmKHRoaXMudGFyZ2V0RGlzdGFuY2UgPCA1KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCArPSBmb29kLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZXRUYXJnZXQobnVsbCk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldERpc3RhbmNlID0gMDtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBib3VuZGFyaWVzKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdmFyIGQgPSAxMDtcbiAgICAgICAgdmFyIGRlc2lyZWQgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5ib2R5LnBvc2l0aW9uLnggPCBkKSB7XG4gICAgICAgICAgICBkZXNpcmVkID0gbmV3IFZlY3Rvcih0aGlzLm1heFNwZWVkLCB0aGlzLnZlbG9jaXR5LnkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYm9keS5wb3NpdGlvbi54ID4gd2lkdGggLSBkKSB7XG4gICAgICAgICAgICBkZXNpcmVkID0gbmV3IFZlY3RvcigtdGhpcy5tYXhTcGVlZCwgdGhpcy52ZWxvY2l0eS55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJvZHkucG9zaXRpb24ueSA8IGQpIHtcbiAgICAgICAgICAgIGRlc2lyZWQgPSBuZXcgVmVjdG9yKHRoaXMudmVsb2NpdHkueCwgdGhpcy5tYXhTcGVlZCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ib2R5LnBvc2l0aW9uLnkgPiBoZWlnaHQgLSBkKSB7XG4gICAgICAgICAgICBkZXNpcmVkID0gbmV3IFZlY3Rvcih0aGlzLnZlbG9jaXR5LngsIC10aGlzLm1heFNwZWVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZXNpcmVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICBkZXNpcmVkLnNldE1hZ25pdHVkZSh0aGlzLm1heFNwZWVkKTtcbiAgICAgICAgICAgIHZhciBzdGVlciA9IGRlc2lyZWQuc3VidHJhY3QodGhpcy52ZWxvY2l0eSk7XG4gICAgICAgICAgICBzdGVlci5saW1pdCh0aGlzLm1heEZvcmNlKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShzdGVlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9uZSgpOiBWZWhpY2xlIHtcbiAgICAgICAgbGV0IGRuYSA9IG5ldyBETkEodGhpcyk7XG4gICAgICAgIGRuYS5tdXRhdGUoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFZlaGljbGUodGhpcy5kcmF3LCB0aGlzLmJvZHkucG9zaXRpb24uY29weSgpLCBkbmEpO1xuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY2xhc3Nlcy92ZWhpY2xlLnRzIiwiZXhwb3J0IGVudW0gQ09MT1JfTU9ERSB7XG4gICAgUkdCQSA9ICdSR0JBJyxcbiAgICBIRVggPSAnSEVYJyxcbiAgICBIU0IgPSAnSFNCJ1xufVxuXG5jbGFzcyBCYXNlQ29sb3Ige1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgdmFsdWVzQXJyYXk6IGFueVtdO1xuICAgIG1vZGU6IENPTE9SX01PREU7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2RlOiBDT0xPUl9NT0RFKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcbiAgICB9XG59XG5cbmNsYXNzIFJHQkEgZXh0ZW5kcyBCYXNlQ29sb3Ige1xuICAgIHJlZDogbnVtYmVyO1xuICAgIGdyZWVuOiBudW1iZXI7XG4gICAgYmx1ZTogbnVtYmVyO1xuICAgIGFsZmE6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIsIGE6IG51bWJlciA9IDEpIHtcbiAgICAgICAgc3VwZXIoQ09MT1JfTU9ERS5SR0JBKTtcblxuICAgICAgICB0aGlzLnJlZCA9IHI7XG4gICAgICAgIHRoaXMuZ3JlZW4gPSBnO1xuICAgICAgICB0aGlzLmJsdWUgPSBiO1xuICAgICAgICB0aGlzLmFsZmEgPSBhO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSAncmdiYSgnICsgdGhpcy5yZWQgKyAnLCcgKyB0aGlzLmdyZWVuICsgJywnICsgdGhpcy5ibHVlICsgJywnICsgdGhpcy5hbGZhICsgJyknO1xuICAgICAgICB0aGlzLnZhbHVlc0FycmF5ID0gWyB0aGlzLnJlZCwgdGhpcy5ncmVlbiwgdGhpcy5ibHVlLCB0aGlzLmFsZmEgXTtcbiAgICB9XG59XG5cbmNsYXNzIEhFWCBleHRlbmRzIEJhc2VDb2xvciB7XG4gICAgcmVkOiBudW1iZXI7XG4gICAgZ3JlZW46IG51bWJlcjtcbiAgICBibHVlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKENPTE9SX01PREUuSEVYKTtcblxuICAgICAgICB0aGlzLnJlZCA9IHI7XG4gICAgICAgIHRoaXMuZ3JlZW4gPSBnO1xuICAgICAgICB0aGlzLmJsdWUgPSBiO1xuXG4gICAgICAgIC8vIHRoaXMudmFsdWUgPSAncmdiYSgnICsgdGhpcy5yZWQgKyAnLCcgKyB0aGlzLmdyZWVuICsgJywnICsgdGhpcy5ibHVlICsgJywnICsgdGhpcy5hbGZhICsgJyknO1xuICAgICAgICB0aGlzLnZhbHVlc0FycmF5ID0gW3RoaXMucmVkLCB0aGlzLmdyZWVuLCB0aGlzLmJsdWVdO1xuICAgIH1cbn1cblxuY2xhc3MgSFNCIGV4dGVuZHMgQmFzZUNvbG9yIHtcbiAgICBodWU6IG51bWJlcjsgLy8gMC4uMzYwXG4gICAgc2F0dXJhdGlvbjogbnVtYmVyOyAvLyAwLi4xMDBcbiAgICBicmlnaHRuZXNzOiBudW1iZXI7IC8vIDAuLjEwMFxuXG4gICAgY29uc3RydWN0b3IoaDogbnVtYmVyLCBzOiBudW1iZXIsIGI6IG51bWJlcikge1xuICAgICAgICBzdXBlcihDT0xPUl9NT0RFLkhTQik7XG5cbiAgICAgICAgdGhpcy5odWUgPSBoO1xuICAgICAgICB0aGlzLnNhdHVyYXRpb24gPSBzO1xuICAgICAgICB0aGlzLmJyaWdodG5lc3MgPSBiO1xuXG4gICAgICAgIC8vIHRoaXMudmFsdWUgPSAncmdiYSgnICsgdGhpcy5yZWQgKyAnLCcgKyB0aGlzLmdyZWVuICsgJywnICsgdGhpcy5ibHVlICsgJywnICsgdGhpcy5hbGZhICsgJyknO1xuICAgICAgICB0aGlzLnZhbHVlc0FycmF5ID0gW3RoaXMuaHVlLCB0aGlzLnNhdHVyYXRpb24sIHRoaXMuYnJpZ2h0bmVzc107XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29sb3Ige1xuICAgIGN1cnJlbnQ6IEJhc2VDb2xvcjtcblxuICAgIHJnYmE6IFJHQkE7XG4gICAgaGV4OiBIRVg7XG4gICAgaHNiOiBIU0I7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xvclN0cmluZzogc3RyaW5nKSB7XG4gICAgICAgIGlmICgvXigoPzpyZ2IpYT8pXFxzKlxcKChbXlxcKV0qKVxcKS8udGVzdChjb2xvclN0cmluZykpIHtcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IC9cXCgoLiopXFwpLy5leGVjKGNvbG9yU3RyaW5nKVsxXS5yZXBsYWNlKCcgJywgJycpLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICB0aGlzLnJnYmEgPSBSR0JBLmFwcGx5KHRoaXMsIHBhcnRzKTtcbiAgICAgICAgfSBlbHNlIGlmKC9eKCg/OmhzYikpXFxzKlxcKChbXlxcKV0qKVxcKS8udGVzdChjb2xvclN0cmluZykpIHtcblxuICAgICAgICB9IGVsc2UgaWYoL14jW0EtRmEtZjAtOV0rJC8udGVzdChjb2xvclN0cmluZykpIHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGxlcnAoYSwgYiwgYW1vdW50KSB7XG5cbiAgICAgICAgdmFyIGFoID0gcGFyc2VJbnQoYS5yZXBsYWNlKC8jL2csICcnKSwgMTYpLFxuICAgICAgICAgICAgYXIgPSBhaCA+PiAxNiwgYWcgPSBhaCA+PiA4ICYgMHhmZiwgYWIgPSBhaCAmIDB4ZmYsXG4gICAgICAgICAgICBiaCA9IHBhcnNlSW50KGIucmVwbGFjZSgvIy9nLCAnJyksIDE2KSxcbiAgICAgICAgICAgIGJyID0gYmggPj4gMTYsIGJnID0gYmggPj4gOCAmIDB4ZmYsIGJiID0gYmggJiAweGZmLFxuICAgICAgICAgICAgcnIgPSBhciArIGFtb3VudCAqIChiciAtIGFyKSxcbiAgICAgICAgICAgIHJnID0gYWcgKyBhbW91bnQgKiAoYmcgLSBhZyksXG4gICAgICAgICAgICByYiA9IGFiICsgYW1vdW50ICogKGJiIC0gYWIpO1xuXG4gICAgICAgIHJldHVybiAnIycgKyAoKDEgPDwgMjQpICsgKHJyIDw8IDE2KSArIChyZyA8PCA4KSArIHJiIHwgMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2xpYi9jYW52YXMvY29sb3IudHMiLCJpbXBvcnQgeyBWZWhpY2xlIH0gZnJvbSBcIi4vdmVoaWNsZVwiO1xuaW1wb3J0IHsgTSB9IGZyb20gXCIuLi9saWIvbWF0aC9tXCI7XG5cbmV4cG9ydCBjbGFzcyBETkEge1xuICAgIG11dGF0aW9uUmF0ZSA9IDE7XG5cbiAgICBtYXhTcGVlZDogbnVtYmVyID0gMDtcbiAgICBtYXhGb3JjZTogbnVtYmVyID0gMDtcblxuICAgIGZvb2RTZWVrUmFkaXVzOiBudW1iZXIgPSAwO1xuICAgIHBvaXNvblNlZWtSYWRpdXM6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcih2OiBWZWhpY2xlKSB7XG4gICAgICAgIHRoaXMubWF4U3BlZWQgPSBOdW1iZXIodi5tYXhTcGVlZCk7XG4gICAgICAgIHRoaXMubWF4Rm9yY2UgPSBOdW1iZXIodi5tYXhGb3JjZSk7XG4gICAgICAgIHRoaXMuZm9vZFNlZWtSYWRpdXMgPSBOdW1iZXIodi5mb29kU2Vla1JhZGl1cyk7XG4gICAgICAgIHRoaXMucG9pc29uU2Vla1JhZGl1cyA9IE51bWJlcih2LnBvaXNvblNlZWtSYWRpdXMpO1xuICAgIH1cblxuICAgIG11dGF0ZSgpIHtcbiAgICAgICAgTS5maXJlQXRSYXRlKHRoaXMubXV0YXRpb25SYXRlLCAoKSA9PiB7XG4gICAgICAgICAgICBNLmZpcmVBdFJhdGUoMC41LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXhTcGVlZCArPSBNLnJhbmRvbUludCgtMSwgMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgTS5maXJlQXRSYXRlKDAuNSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWF4Rm9yY2UgKz0gTS5yYW5kb21GbG9hdCgtMC4xLCAwLjEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE0uZmlyZUF0UmF0ZSgwLjUsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvb2RTZWVrUmFkaXVzICs9IE0ucmFuZG9tSW50KC0xNSwgMTUpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZm9vZFNlZWtSYWRpdXMgPCAxMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb2RTZWVrUmFkaXVzID0gMTA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE0uZmlyZUF0UmF0ZSgwLjUsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvaXNvblNlZWtSYWRpdXMgKz0gTS5yYW5kb21JbnQoLTE1LCAxNSk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wb2lzb25TZWVrUmFkaXVzIDwgMTApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2lzb25TZWVrUmFkaXVzID0gMTA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY2xhc3Nlcy9kbmEudHMiLCJpbXBvcnQgeyBDYW52YXNEcmF3LCBCYXNlT2JqZWN0IH0gZnJvbSBcIi4vZHJhd1wiO1xuXG5pbnRlcmZhY2UgSUNhbnZhc09wdGlvbnMge1xuICAgIGhlaWdodD86IG51bWJlcixcbiAgICB3aWR0aD86IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgQ2FudmFzIHtcbiAgICBib2R5OiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIGJhY2tncm91bmQ6IHN0cmluZyA9ICcjZmZmJztcbiAgICBwcml2YXRlIG9iamVjdHM6IEJhc2VPYmplY3RbXSA9IFtdO1xuICAgIHByaXZhdGUgbGF5ZXJzOiBhbnkgPSB7fTtcbiAgICBcbiAgICBkcmF3OiBDYW52YXNEcmF3O1xuICAgIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaWQ6IHN0cmluZywgcHJpdmF0ZSBvcHRpb25zOiBJQ2FudmFzT3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmJvZHkuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5ib2R5LndpZHRoID0gdGhpcy5vcHRpb25zLndpZHRoO1xuICAgICAgICB0aGlzLmJvZHkuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmhlaWdodDtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5ib2R5LmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuZHJhdyA9IG5ldyBDYW52YXNEcmF3KHRoaXMpO1xuICAgIH1cblxuICAgIGFkZChvYmo6IEJhc2VPYmplY3QsIGxheWVyOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIC8vIHRoaXMub2JqZWN0cy5wdXNoKG9iaik7IFxuXG4gICAgICAgIHRoaXMubGF5ZXJzW2xheWVyXSA9IHRoaXMubGF5ZXJzW2xheWVyXSB8fCBbXTtcbiAgICAgICAgdGhpcy5sYXllcnNbbGF5ZXJdLnB1c2gob2JqKTtcbiAgICB9XG5cbiAgICByZW1vdmUob2JqOiBCYXNlT2JqZWN0LCBsYXllcjogbnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLmxheWVyc1tsYXllcl0gPSB0aGlzLmxheWVyc1tsYXllcl0gfHwgW107XG4gICAgICAgIGxldCBpID0gdGhpcy5sYXllcnNbbGF5ZXJdLmluZGV4T2Yob2JqKTtcbiAgICAgICAgaWYoaSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMubGF5ZXJzW2xheWVyXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRCYWNrZ3JvdW5kKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gY29sb3I7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuYm9keS53aWR0aCwgdGhpcy5ib2R5LmhlaWdodCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQmFja2dyb3VuZCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZDtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuYm9keS53aWR0aCwgdGhpcy5ib2R5LmhlaWdodCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGxheWVyOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMubGF5ZXJzW2xheWVyXS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBvYmoucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlckFsbCgpIHtcbiAgICAgICAgZm9yKGxldCBsYXllciBpbiB0aGlzLmxheWVycykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIocGFyc2VJbnQobGF5ZXIpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2xpYi9jYW52YXMvY2FudmFzLnRzIiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL21hdGgvdmVjdG9yXCI7XG5pbXBvcnQgeyBDYW52YXMgfSBmcm9tIFwiLi9jYW52YXNcIjtcblxuZXhwb3J0IGVudW0gUFJJTUlUSVZFUyB7XG4gICAgUE9JTlQgPSAnUE9JTlQnLFxuICAgIEVMTElQU0UgPSAnRUxMSVBTRScsXG4gICAgUkVDVEFOR0xFID0gJ1JFQ1RBTkdMRScsXG4gICAgVFJJQU5HTEUgPSAnVFJJQU5HTEUnLFxuICAgIFBPTFlHT04gPSAnUE9MWUdPTidcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VPYmplY3Qge1xuICAgIGRyYXc6IENhbnZhc0RyYXc7XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcG9zaXRpb246IFZlY3RvcjtcbiAgICB0eXBlOiBQUklNSVRJVkVTO1xuICAgIHBhcmVudDogYW55O1xuXG4gICAgc3R5bGVzOiB7XG4gICAgICAgIHN0cm9rZUNvbG9yPzogc3RyaW5nLFxuICAgICAgICBzdHJva2VXaWR0aD86IG51bWJlcixcbiAgICAgICAgZmlsbD86IHN0cmluZ1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGQ6IENhbnZhc0RyYXcsIHQ6IFBSSU1JVElWRVMsIHA6IFZlY3Rvcikge1xuICAgICAgICB0aGlzLmRyYXcgPSBkO1xuICAgICAgICB0aGlzLmN0eCA9IGQucGFyZW50LmNvbnRleHQ7XG4gICAgICAgIHRoaXMudHlwZSA9IHQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwO1xuXG4gICAgICAgIHRoaXMuc3R5bGVzID0ge1xuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICAgICAgZmlsbDogJyNmZmZmZmYnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB9XG5cbiAgICBhcHBseVN0eWxlcygpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5zdHlsZXMuZmlsbDtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLnN0eWxlcy5zdHJva2VDb2xvcjtcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gdGhpcy5zdHlsZXMuc3Ryb2tlV2lkdGg7XG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgZW5kKCkge1xuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgc2V0UGFyZW50KHA6IGFueSkge1xuICAgICAgICB0aGlzLnBhcmVudCA9IHA7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRWxsaXBzZSBleHRlbmRzIEJhc2VPYmplY3Qge1xuICAgIHJ4OiBudW1iZXI7XG4gICAgcnk6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGQ6IENhbnZhc0RyYXcsIHBvc2l0aW9uOiBWZWN0b3IsIHJ4OiBudW1iZXIsIHJ5OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoZCwgUFJJTUlUSVZFUy5FTExJUFNFLCBwb3NpdGlvbik7XG4gICAgICAgIHRoaXMucnggPSByeDtcbiAgICAgICAgdGhpcy5yeSA9IHJ5O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB0aGlzLmN0eC5lbGxpcHNlKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnJ4LCB0aGlzLnJ5LCAwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIHRoaXMuZW5kKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGFuZ2xlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihkOiBDYW52YXNEcmF3LCBwb3NpdGlvbjogVmVjdG9yLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgYW5nbGU6IG51bWJlcikge1xuICAgICAgICBzdXBlcihkLCBQUklNSVRJVkVTLlRSSUFOR0xFLCBwb3NpdGlvbik7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKHRoaXMuYW5nbGUpO1xuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgLXRoaXMuaGVpZ2h0IC8gMik7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKC10aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKDAsIC10aGlzLmhlaWdodCAvIDIpO1xuICAgICAgICB0aGlzLmVuZCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGVudW0gRElTUExBWV9NT0RFIHtcbiAgICBDRU5URVIgPSAnQ0VOVEVSJyxcbiAgICBDT1JORVIgPSAnQ09STkVSJ1xufVxuXG5leHBvcnQgY2xhc3MgQ2FudmFzRHJhdyB7XG4gICAgcGFyZW50OiBDYW52YXM7XG5cbiAgICBESVNQTEFZX01PREU6IERJU1BMQVlfTU9ERSA9IERJU1BMQVlfTU9ERS5DRU5URVI7XG5cbiAgICBjb25zdHJ1Y3RvcihjOiBDYW52YXMpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBjO1xuICAgIH1cblxuICAgIGVsbGlwc2UocG9zaXRpb246IFZlY3Rvciwgcng6IG51bWJlciwgcnk/OiBudW1iZXIpOiBFbGxpcHNlIHtcbiAgICAgICAgcnkgPSByeSB8fCByeDtcbiAgICAgICAgcmV0dXJuIG5ldyBFbGxpcHNlKHRoaXMsIHBvc2l0aW9uLCByeCwgcnkpO1xuICAgIH1cblxuICAgIHRyaWFuZ2xlKHBvc2l0aW9uOiBWZWN0b3IsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBhbmdsZT86IG51bWJlcik6IFRyaWFuZ2xlIHtcbiAgICAgICAgYW5nbGUgPSBhbmdsZSB8fCAwO1xuICAgICAgICByZXR1cm4gbmV3IFRyaWFuZ2xlKHRoaXMsIHBvc2l0aW9uLCB3aWR0aCwgaGVpZ2h0LCBhbmdsZSk7XG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9saWIvY2FudmFzL2RyYXcudHMiLCJpbXBvcnQgeyBQYXJ0aWNsZSB9IGZyb20gXCIuL3BhcnRpY2xlXCI7XG5pbXBvcnQgeyBFbGxpcHNlLCBDYW52YXNEcmF3IH0gZnJvbSBcIi4uL2xpYi9jYW52YXMvZHJhd1wiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uL2xpYi9tYXRoL3ZlY3RvclwiO1xuaW1wb3J0IHsgTSB9IGZyb20gXCIuLi9saWIvbWF0aC9tXCI7XG5pbXBvcnQgeyBWZWhpY2xlIH0gZnJvbSBcIi4vdmVoaWNsZVwiO1xuXG5leHBvcnQgY2xhc3MgRm9vZCBleHRlbmRzIFBhcnRpY2xlIHtcbiAgICBib2R5OiBFbGxpcHNlO1xuICAgIGluZGV4OiBudW1iZXI7XG5cbiAgICByYWRpdXM6IG51bWJlciA9IDU7XG4gICAgdmFsdWU6IG51bWJlciA9IDA7XG5cbiAgICBmb2xsb3dlcnM6IFZlaGljbGVbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoZHJhdzogQ2FudmFzRHJhdywgcG9zaXRpb24/OiBWZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IG5ldyBWZWN0b3IoXG4gICAgICAgICAgICBNLnJhbmRvbUludChkcmF3LnBhcmVudC5ib2R5LndpZHRoKSxcbiAgICAgICAgICAgIE0ucmFuZG9tSW50KGRyYXcucGFyZW50LmJvZHkuaGVpZ2h0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYm9keSA9IGRyYXcuZWxsaXBzZShcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgdGhpcy5yYWRpdXNcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmJvZHkuc2V0UGFyZW50KHRoaXMpO1xuXG4gICAgICAgIGlmKE0ucmFuZG9tSW50KDAsIDEwKSA+IDgpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNLnJhbmRvbUludCgtMTAsIC0xKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBNLnJhbmRvbUludCgxLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnZhbHVlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnN0eWxlcy5maWxsID0gJyM4OGQ4YjAnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnN0eWxlcy5maWxsID0gJyNGMTU0NTYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkRm9sbGV3ZXIodjogVmVoaWNsZSkge1xuICAgICAgICBpZih0aGlzLmZvbGxvd2Vycy5pbmRleE9mKHYpID09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmZvbGxvd2Vycy5wdXNoKHYpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jbGFzc2VzL2Zvb2QudHMiXSwic291cmNlUm9vdCI6IiJ9