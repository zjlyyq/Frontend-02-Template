
// let sleep = (sleepTime) => {
//     console.log("sleepTime");
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, sleepTime);
//     });
// };
// let lights = document.getElementsByClassName("ll");
// let yellowLight = document.querySelector("#yellow");
// let greenLight = document.querySelector("#green");
// let redLight = document.querySelector("#red");
// function green() {
//     Array.from(lights).forEach((element) => {
//         element.className = "ll";
//     });
//     greenLight.classList.add("green");
// }

// function yellow() {
//     Array.from(lights).forEach((element) => {
//         element.className = "ll";
//     });
//     yellowLight.classList.add("yellow");
// }

// function red() {
//     Array.from(lights).forEach((element) => {
//         element.className = "ll";
//     });
//     redLight.classList.add("red");
// }


function* generator() {
    let count = 10;
    while(count) {
        yield count --;
    }
}

let it = generator();
for (let i of [1,2,3]) {
    console.log(i, it.next().value);
}