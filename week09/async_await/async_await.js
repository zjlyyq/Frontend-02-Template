let sleep = (sleepTime) => {
    console.log("sleepTime");
    return new Promise((resolve, reject) => {
        setTimeout(resolve, sleepTime);
    });
};
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

async function go() {
    while (true) {
        red();
        await sleep(1000);
        yellow();
        await sleep(2000);
        green();
        await sleep(3000);
    }
}
go();
