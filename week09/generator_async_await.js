
let sleep1 = (sleepTime) => {
    console.log("sleepTime");
    return new Promise((resolve, reject) => {
        setTimeout(resolve, sleepTime);
    });
};
let bt = document.querySelector('#next');
let sleep = () => {
    return new Promise((resolve, reject) => {
        bt.addEventListener('click', resolve);
    });
}
let lights = document.getElementsByClassName("ll");
let yellowLight = document.querySelector("#yellow");
let greenLight = document.querySelector("#green");
let redLight = document.querySelector("#red");
function green() {
    Array.from(lights).forEach((element) => {
        element.className = "ll";
    });
    greenLight.classList.add("green");
}

function yellow() {
    Array.from(lights).forEach((element) => {
        element.className = "ll";
    });
    yellowLight.classList.add("yellow");
}

function red() {
    Array.from(lights).forEach((element) => {
        element.className = "ll";
    });
    redLight.classList.add("red");
}


function* generator() {
    while(true) {
        red();
        yield sleep(1000);
        yellow();
        yield sleep(2000);
        green();
        yield sleep(3000);
    }
}

function run(iterator) {
    let {value, done} = iterator.next();
    if (value instanceof Promise) {
        value.then(() => {
            run(iterator);
        })
    }
}
run(generator());
// let it = generator();
// for (let i of [1,2,3]) {
//     console.log(i, it.next().value);
// }