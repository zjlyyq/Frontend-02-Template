const VConsole = require('vconsole');
new VConsole();
let docElement = document.documentElement;

let handle;
let contexts = new Map();

docElement.addEventListener('mousedown', event =>  {
    console.log(event);
    let context = Object.create(null);
    contexts.set("mouse" + (1 << event.button), context);
    start(event, context);
    let mousemove = (event) => {
        // console.log(event.clientX, event.clientY);
        let button = 1;

        while(button <= event.buttons) {
            if (event.buttons && button) {
                let context = contexts.get("mouse" + (1 << event.button));
                move(event, context);
            }
            button = button << 1;
        }
    }   

    let mouseup = (event) => {
        let context = contexts.get("mouse" + (1 << event.button));
        end(event, context);
        contexts.delete("mouse" + (1 << event.button));

        docElement.removeEventListener("mousemove", mousemove);
        docElement.removeEventListener("mouseup", mouseup);
    }

    docElement.addEventListener('mousemove', mousemove);
    docElement.addEventListener('mouseup', mouseup);
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
}

function end(point, context) {
    if (context.isTap) {
        clearInterval(context.handle);
        console.log('tab end');
    }
    if (context.isPress) {
        console.log('press end');
    }
    if (context.isPan) {
        console.log('pan end');
    }
    // contexts.delete()
    console.log('touchend', point.clientX, point.clientY);
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