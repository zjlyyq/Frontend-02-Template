// const { resolve } = require("path");
/*
class MyPromise {
    // executor 是立即执行
    constructor(executor) {
        this.executor = executor;
        this.onResolve = null;
        this.onReject = null;
    }

    then() {

    }

    catch() {

    }
}
*/

class MyPromise {
    constructor(executor) {
        this.executor = executor;
        this.onResolve = null;
        this.onReject = null;
    }

    then(onResolve) {
        this.onResolve = (parame) => {
            // 存储成功回调函数的结果： 例如true?怎么构建需要透传到外部的Promise
            let res = onResolve(parame);
            return typeof res === MyPromise ? res : new MyPromise(executor);
        }
        this.onReject = (err) => {
            // 存储失败回调函数的结果： 例如false?怎么构建需要透传到外部的Promise
            // let err = onReject(err);
            return new MyPromise(() => {

            })
        }
        this.executor(this.onResolve, this.onReject)
    }

    catch(onReject) {
        this.onResolve = (parame) => {
            // 存储成功回调函数的结果： 例如true?怎么构建需要透传到外部的Promise
            // let res = onResolve(parame);
            return new MyPromise(executor)
        }
        this.onReject = (err) => {
            // 存储失败回调函数的结果： 例如false?怎么构建需要透传到外部的Promise
            let error = onReject(err);
            return typeof err === MyPromise ? error : new MyPromise(executor);
        }
        this.executor(this.onResolve, this.onReject)
    }
}

let executor = (resolve, reject) => { 
    let rand = Math.random(); 
    console.log(1) 
    console.log(rand) 
    if (rand > 0.5) 
        resolve() 
    else 
        reject() 
}

let p1 = new MyPromise(executor)
console.log(p1);
p1.then(res => {
    console.log('succeed1')
}).catch(error => {
    console.log('error')
})
