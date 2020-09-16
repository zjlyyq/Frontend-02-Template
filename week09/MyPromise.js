const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    constructor(executor) {
        this.PID = Math.random();   // 没用，只不过有利于调试的时候查看
        this.value = null
        this.reason = null
        this.state = PENDING;
        this.onFullfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            this.value = value
            this.state = FULFILLED
            this.onFullfilledCallbacks.forEach(onFullfilledCallback => {
                onFullfilledCallback(this.value)
            })
            console.log('Promise state is ' + this.state)
        }
        const reject = (reason) => {
            this.reason = reason
            this.state = REJECTED
            this.onRejectedCallbacks.forEach(onRejectedCallback => {
                onRejectedCallback(this.reason)
            })
            console.log('Promise state is ' + this.state)
        }
        try {
            executor(resolve, reject)
        }catch (reason){
            this.reject(reason)
        }
    }

    then(onFulfilled, onRejected) {
        console.log('then called')
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.state === PENDING) {
                this.onFullfilledCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    }catch(error) {
                        reject(error);
                    }
                })

                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    }catch(error) {
                        reject(error)
                    }
                })
            }
            else if (this.state === FULFILLED) {
                try {
                    let x = onFulfilled(this.value);
                    this.resolvePromise(promise2, x, resolve, reject);
                }catch (error) {
                    reject(error)
                }
            }
            else if (this.state === REJECTED) {
                try {
                    let x = onRejected(this.value);
                    this.resolvePromise(promise2, x, resolve, reject);
                }catch (error) {
                    reject(error)
                }
            }
        })

        return promise2;
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            reject(new TypeError('Chaining Cycle'));
        }
        if (x && typeof x === 'object' || typeof x === 'function') {
            let used;
            try {
                let then = x.then;
                // x.then 是 function 说明 x 是promise
                if (typeof then === 'function') {
                    then.call(x, (y) => {
                        if (used) return;
                        used = true;
                        this.resolvePromise(promise2, y, resolve, reject)
                    }, (r) => {
                        if (used) return;
                        used = true;
                        reject(r);
                    })
                } else {
                    if (used) return;
                    used = true;
                    resolve(x);
                }
            }catch (error) {
                if (used) return;
                used = true
                reject(error)
            }
        } else {
            resolve(x);
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    })
})
let p2 = p1.then(res => {
    return 2;
}, error => {
    console.log("error1", error);
} )

p2.then( res => {
    console.log(res)
}, error => {
    console.log("error1", error);
} )

// p1.then(res => {
//     console.log("res2", res);
// }, error => {
//     console.log("error2", error);
// } )
// console.log(p1.value, p1.state)