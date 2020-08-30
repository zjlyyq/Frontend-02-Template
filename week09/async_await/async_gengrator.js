
let sleep = (sleepTime) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, sleepTime);
    });
};

async function* generator() {
    let i = 0;
    while(true) {
        yield i ++;
        await sleep(1000);
    }
}
let it = generator();
// (async function(){
//     for await(let i of it) {
//         console.log(i, typeof(i));
//     }
// })()
generator().next().then(v =>console.log(v))
console.log(generator)
console.log(generator().next())