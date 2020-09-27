const TICK = Symbol('tick');
const TICK_HANDLE = Symbol('tick_handle');
const ANIMATIONS = Symbol('ANIMATIONS');
const ADD_TIMES = Symbol('add_times');
const PAUSE_START = Symbol('pause_start');
const PAUSE_TIME = Symbol('pause_time');

export class Timeline {
    constructor() {
        this.state = "INITED";
        this[ANIMATIONS] = new Set();
        this[ADD_TIMES] = new Map();
        this[PAUSE_TIME] = 0;
    }
    
    start() {
        if (this.state != "INITED") return;
        this.state = "STARTED";
        this[TICK] = () => {
            // console.log('%c tikc', 'color:blue;');
            for(let animation of this[ANIMATIONS]) {
                let now = Date.now();
                let startTime = this[ADD_TIMES].get(animation);
                let t_d = now - startTime - this[PAUSE_TIME] - animation.delay;
                if (animation.duration > t_d) {
                    if (t_d > 0)  
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
        if (this.state != 'STARTED') return;
        this.state = 'PAUSED';
        cancelAnimationFrame(this[TICK_HANDLE]);
        this[PAUSE_START] = Date.now();
    }
    
    resume() {
        if (this.state != 'PAUSED') return;
        this.state = 'STARTED';
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[TICK]();
    }

    reset() {
        this.state = 'INITED';
        this.pause();
        this[PAUSE_START] = 0;
        this[PAUSE_TIME] = 0;
        this[ANIMATIONS] = new Set();
        this[ADD_TIMES] = new Map();
        this[TICK_HANDLE] = null;
    }

    add(animation, addTime) {
        if (arguments.length < 2) {
            addTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[ADD_TIMES].set(animation, addTime);
    }
}


export class Animation {
    constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay || 0;
        this.timingFunction = timingFunction || (v => v);
        this.template = template;
    }

    receiveTime(time) {
        let range = (this.endValue - this.startValue);
        let progress = this.timingFunction(time / this.duration);
        this.object[this.property] = this.template(this.startValue + range * progress);
        console.log(`%c ${this.property} = ${this.object[this.property]} duration = ${this.duration}`, "color: red;");
    }
}