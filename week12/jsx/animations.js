const TICK = Symbol('tick');
const TICK_HANDLE = Symbol('tick_handle');
const ANIMATIONS = Symbol('ANIMATIONS');
const ADD_TIMES = Symbol('add_times');
const PAUSE_START = Symbol('pause_start');
const PAUSE_TIME = Symbol('pause_time');

export class Timeline {
    constructor() {
        this[ANIMATIONS] = new Set();
        this[ADD_TIMES] = new Map();
        this[PAUSE_TIME] = 0;
    }
    
    start() {
        const startTime = Date.now();
        this[TICK] = () => {
            // console.log('%c tikc', 'color:blue;');
            for(let animation of this[ANIMATIONS]) {
                let now = Date.now();
                let startTime = this[ADD_TIMES].get(animation);
                let t_d = now - startTime - this[PAUSE_TIME];
                if (animation.duration > t_d) {
                    animation.receiveTime(t_d);
                }else {
                    animation.receiveTime(animation.duration);
                    this[ANIMATIONS].delete(animation);
                }
            }
            this[TICK_HANDLE] = requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }

    pause() {
        cancelAnimationFrame(this[TICK_HANDLE]);
        this[PAUSE_START] = Date.now();
    }
    
    resume() {
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START] ;
        this[TICK]();
    }

    reset() {}

    add(animation, addTime) {
        if (arguments.length < 2) {
            addTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[ADD_TIMES].set(animation, addTime);
    }
}


export class Animation {
    constructor(object, property, startValue, endValue, duration, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.timingFunction = timingFunction;
        this.template = template;
    }

    receiveTime(time) {
        let range = (this.endValue - this.startValue);
        this.object[this.property] = this.template(this.startValue + range * time / this.duration);
        console.log(`%c ${this.property} = ${this.object[this.property]} duration = ${this.duration}`, "color: red;");
    }
}