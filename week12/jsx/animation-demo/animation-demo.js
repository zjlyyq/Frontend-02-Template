import { Animation, Timeline } from '../animations.js';

let t1 = new Timeline();
t1.start();

let animation = new Animation(
    document.querySelector('#app').style,
    "transform",
    0,
    500,
    10000,
    null,
    v => {
        console.log(v);
        return `translateX(${v}px)`;
    }
)
t1.add(animation);
document.querySelector('#cancel_bt').addEventListener(
    'click',
    () => {
        t1.pause();
    }
)
document.querySelector('#resume_bt').addEventListener(
    'click',
    () => {
        t1.resume();
    }
)