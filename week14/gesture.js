// const VConsole = require('vconsole');
// new VConsole();
let docElement = document.documentElement;

let handle;
let contexts = new Map();
let isLinsteningMode= false;

docElement.addEventListener('mousedown', event =>  {
    console.log(event);
    let context = Object.create(null);
    contexts.set("mouse" + (1 << event.button), context);
    // debugger
    start(event, context);
    let mousemove = (event) => {
        // console.log(event.clientX, event.clientY);
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
                let context = contexts.get("mouse" + key);
                // debugger
                move(event, context);
            }
            button = button << 1;
        }
    }   

    let mouseup = (event) => {
        console.log('up', event.button);
        let context = contexts.get("mouse" + (1 << event.button));
        end(event, context);
        contexts.delete("mouse" + (1 << event.button));
        
        if (event.buttons === 0) {
            docElement.removeEventListener("mousemove", mousemove);
            docElement.removeEventListener("mouseup", mouseup);
            isLinsteningMode = false;
        }
    }

    if (!isLinsteningMode) {
        docElement.addEventListener('mousemove', mousemove);
        docElement.addEventListener('mouseup', mouseup);
        isLinsteningMode = true;
        // debugger
    }
    
})



docElement.addEventListener('touchstart', (event) => {
    for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        start(touch, context);
    }
})

docElement.addEventListener('touchmove', (event) => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        move(touch, context);
    }
})

docElement.addEventListener('touchend', (event) => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        end(touch, context);
    }
})

docElement.addEventListener('touchcancel', (event) => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        cancel(touch, context);
    }
})

function start(point, context) {
    console.log('touchstart', point.clientX, point.clientY);
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

function move(point, context){
    // console.log('touchmove', point.clientX, point.clientY);
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isPan = true;
        context.isTap = false;
        context.isPress = false;
        console.log('pan start');
        clearTimeout(context.handle);
    }

    if (context.isPan) {
        console.log(dx, dy);
        console.log('pan');
    }
    // 只存当前时间半秒内的点
    context.points.filter(point => Date.now() - point.t < 500);
    context.points.push({
        t: Date.now(),
        x: point.clientX,
        y: point.clientY
    })
}

function end(point, context) {
    if (context.isTap) {
        clearInterval(context.handle);
        console.log('tab end');
        dispatch('tap', {})
    }
    if (context.isPress) {
        console.log('press end');
    }
    if (context.isPan) {
        console.log('pan end');
    }
    // contexts.delete()
    console.log('touchend', point.clientX, point.clientY);
    let d, v;
    if (context.points.length === 0) {
        v = 0;
    }else {
        d = Math.sqrt((point.clientX - context.points[0].x) ** 2 +(point.clientY - context.points[0].y) ** 2)
        v = d / (Date.now() - context.points[0].t);
        console.log(`t = ${(Date.now() + context.points[0].t)}, v = ${v}`);
    }
    if (v > 1.5) {
        console.log('flick')
        context.isFlick = true;
    }else {
        context.isFlick = false;
    }
}

function cancel(point, context) {
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
}

function dispatch(type, properties) {
    let event = new Event(type);
    console.log(event);
    for (let name in properties) {
        event[name] = properties[name];
    }
    docElement.dispatchEvent(event);
}

