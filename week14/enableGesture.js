let docElement = document.documentElement;

class Listener {
    constructor(element,recognizer) {
        this.handle = null;
        this.contexts = new Map();
        this.isLinsteningMode= false;
        element.addEventListener('mousedown', event =>  {
            let context = Object.create(null);
            this.contexts.set("mouse" + (1 << event.button), context);
            recognizer.start(event, context);
            let mousemove = (event) => {
                let button = 1;
                // 右键被按： button=2 event.buttons = 2
                while(button <= event.buttons) {
                    if (event.buttons & button) {
                        // event.button event.buttons is not same
                        let key;
                        if (button === 2) 
                            key = 4;
                        else if (button === 4) 
                            key = 2;
                        else 
                            key = button;
                        let context = this.contexts.get("mouse" + key);
                        recognizer.move(event, context);
                    }
                    button = button << 1;
                }
            }   
        
            let mouseup = (event) => {
                let context = this.contexts.get("mouse" + (1 << event.button));
                recognizer.end(event, context);
                this.contexts.delete("mouse" + (1 << event.button));
                
                if (event.buttons === 0) {
                    docElement.removeEventListener("mousemove", mousemove);
                    docElement.removeEventListener("mouseup", mouseup);
                    this.isLinsteningMode = false;
                }
            }
        
            if (!this.isLinsteningMode) {
                docElement.addEventListener('mousemove', mousemove);
                docElement.addEventListener('mouseup', mouseup);
                this.isLinsteningMode = true;
            }
        })
    }
}

class Recognizer{
    constructor(dispatch){
        this.dispatchtor = dispatch;
    }
    start(point, context) {
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.isPress = false;
        context.isPan = false;
        context.isTap = true;
        context.points = [];
        context.handle = setTimeout(() => {
            context.isPress = true;
            context.isTap = false;
            context.handle = null;
            console.log('press')
        }, 500)
    }
    
    move(point, context){
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            context.isPan = true;
            context.isTap = false;
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy);
            // console.log('pan start');
            this.dispatchtor.dispatch('panStart', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            })
            clearTimeout(context.handle);
        }
    
        if (context.isPan) {
            this.dispatchtor.dispatch('paning', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            })
        }
        // 只存当前时间半秒内的点
        context.points.filter(point => Date.now() - point.t < 500);
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        })
    }
    
    end(point, context) {
        let d, v;
        if (context.points.length === 0) {
            v = 0;
        }else {
            d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +(point.clientY - context.points[0].y) ** 2)
            v = d / (Date.now() - context.points[0].t);
            // console.log(`t = ${(Date.now() + context.points[0].t)}, v = ${v}`);
        }
        if (v > 1.5) {
            context.isFlick = true;
            this.dispatchtor.dispatch('flick', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick,
                velocity: v
            })
        }else {
            context.isFlick = false;
        }
        if (context.isTap) {
            clearInterval(context.handle);
            console.log('tab end');
            this.dispatchtor.dispatch('tap', {})
        }
        if (context.isPress) {
            // console.log('press end');
            this.dispatchtor.dispatch('pressEnd', {})
        }
        if (context.isPan) {
            this.dispatchtor.dispatch('panEnd', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            })
        }
    }
    
    cancel(point, context) {
        console.log('touchcancel', point.clientX, point.clientY);
        if (context.isTap) {
            clearInterval(handle);
            console.log('tab cancel');
        }
        if (context.isPress) {
            console.log('press cancel');
        }
        if (context.isPan) {
            console.log('pan cancel');
        }
        this.dispatchtor.dispatch('cancel', {})
    }
}

class Dispatch {
    constructor(element) {
        this.element = element;
    }
    
    dispatch(type, properties) {
        let event = new Event(type);
        for (let name in properties) {
            event[name] = properties[name];
        }
        this.element.dispatchEvent(event);
    }
}

export default function enableGesture(element) {
    return new Listener(element, new Recognizer(new Dispatch(element)))
}