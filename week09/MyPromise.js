const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    constructor(executor) {
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
        // if (this.state === FULFILLED) {
        //     onFulfilled(this.value);
        // }else if (this.state === REJECTED) {
        //     onRejected(this.reason);
        // }
        this.onFullfilledCallbacks.push(onFulfilled)
        this.onRejectedCallbacks.push(onRejected)
    }

}

let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    })
})
p1.then(res => {
    console.log("res1", res);
}, error => {
    console.log("error1", error);
} )

p1.then(res => {
    console.log("res2", res);
}, error => {
    console.log("error2", error);
} )
console.log(p1.value, p1.state)