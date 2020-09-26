const TICK = Symbol('tick');
const TICK_HANDLE = Symbol('tick_handle');
const ANIMATIONS = Symbol('ANIMATIONS');
const ADD_TIMES = Symbol('add_times');
export class Timeline {
    constructor() {
        this[ANIMATIONS] = new Set();
        this[ADD_TIMES] = new Map();
    }
    
    start() {
        const startTime = Date.now();
        this[TICK] = () => {
            console.log('%c tikc', 'color:blue;');
            for(let animation of this[ANIMATIONS]) {
                let now = Date.now();
                let startTime = this[ADD_TIMES].get(animation);
                let t_d = now - startTime;
                if (animation.duration > t_d) {
                    animation.receiveTime(t_d);
                }else {
                    animation.receiveTime(animation.duration);
                    this[ANIMATIONS].delete(animation);
                }
            }
            requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }

    pause() {}
    
    resume() {}

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
    constructor(object, property, startValue, endValue, duration, timingFunction) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.timingFunction = timingFunction;
    }

    receiveTime(time) {
        let range = (this.endValue - this.startValue);
        this.object[this.property] = this.startValue + range * time / this.duration;
        console.log(`%c property.a = ${this.object['a']} duration = ${this.duration}`, "color: red;");
    }
}