const TICK = Symbol('tick');
const TICK_HANDLE = Symbol('tick_handle');
const ANIMATIONS = Symbol('ANIMATIONS');
export class Timeline {
    constructor() {
        this[ANIMATIONS] = new Set();
    }
    
    start() {
        const startTime = Date.now();
        this[TICK] = () => {
            console.log('%c tikc', 'color:pink;');
            let t = Date.now() - startTime;
            for(let animation of this[ANIMATIONS]) {
                if (animation.duration > t) {
                    animation.receiveTime(t);
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

    add(animation) {
        this[ANIMATIONS].add(animation);
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
        console.log(`%c this.object['a'] = ${this.object['a']}`, "color: red;");
    }
}