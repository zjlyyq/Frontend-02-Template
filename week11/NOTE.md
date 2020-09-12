### Proxy实现双向绑定
**基本原理**

proxy通过设置一个对象的代理。拥有可以监听对象属性读取和写入的能力。当对象读取时，保存读取操作，在对象被修改时，重新执行以保存的读取操作，实现绑定更新。

```js
let callbacks = new Map(); // 保存对象的属性绑定的读取事件
let useRective = []   // 保存对象，属性的二元组

function reactive(object) {
    return new Proxy(object, {
        set: function (obj, prop, val) {
            obj[prop] = val;
            if (callbacks.has(obj) && callbacks.get(obj).has(prop)) {
                for(let callback of callbacks.get(obj).get(prop)) 
                    callback()
            }
            return obj[prop];
        },
        get: function (obj, prop) {
            useRective.push([obj, prop])
            return obj[prop];
        }
    })
}

function effect(callback) {
    useRective = [];
    callback();
    console.log(useRective);
    for (let reactive of useRective) {
        if (!callbacks.has(reactive[0])) {
            callbacks.set(reactive[0], new Map());
        }
        if (!callbacks.get(reactive[0]).has(reactive[1])){
            callbacks.get(reactive[0]).set(reactive[1], []);
        }
        callbacks.get(reactive[0]).get(reactive[1]).push(callback);
    }
}
let data = {a: 1, b: 2}

let po = reactive(data);
let c = 0;
effect(() => c = po.b)
console.log(c)   // 2
po.b = 3;
console.log(c)   // 3
```
上述例子中，po是data的代理对象，当执行 `() => c = po.b` （记为`cb`）时，我们记录 `[data, 'b']` 的二元组，表示data的b属性被当前函数读取，随后在callbacks中记录该当前函数 `cb`。当po.b被改写时，重新执行 `cb` 从而实现了c的绑定修改。

但是，上面的程序有一个问题，就是只支持一层属性的绑定。当属性嵌套时（例如：po = {a: {x:1, y:2}, b: 2}）,c = po.a.x 并不能绑定更新。

例如：
```diff
    let callbacks = new Map(); // 保存对象的属性绑定的读取事件
    let useRective = []   // 保存对象，属性的二元组

    function reactive(object) {
        return new Proxy(object, {
            set: function (obj, prop, val) {
                obj[prop] = val;
                if (callbacks.has(obj) && callbacks.get(obj).has(prop)) {
                    for(let callback of callbacks.get(obj).get(prop)) 
                        callback()
                }
                return obj[prop];
            },
            get: function (obj, prop) {
                useRective.push([obj, prop])
                return obj[prop];
            }
        })
    }

    function effect(callback) {
        useRective = [];
        callback();
        console.log(useRective);
        for (let reactive of useRective) {
            if (!callbacks.has(reactive[0])) {
                callbacks.set(reactive[0], new Map());
            }
            if (!callbacks.get(reactive[0]).has(reactive[1])){
                callbacks.get(reactive[0]).set(reactive[1], []);
            }
            callbacks.get(reactive[0]).get(reactive[1]).push(callback);
        }
    }
-   let data = {a: 1, b: 2}
+   let data = {a: {x: 1, y: 2}, b: 2}
    let po = reactive(data);
    let c = 0;
-   effect(() => c = po.b)
+   effect(() => c = po.a.x)
    console.log(c)   // 1
-   po.b = 3;
+   po.a.x = 3;
    console.log(c)   // 1
```
可见变量 c 并不能实现绑定更新。

解决上述现象是要对子对象进行递归初始化Proxy。
```js
let proxyCache= new Map();
let callbacks = new Map(); // 保存对象的属性绑定的读取事件
let useRective = []   // 保存对象，属性的二元组

function reactive(object) {
    if (proxyCache.has(object)) {
        return proxyCache.get(object);
    }
    let proxy = new Proxy(object, {
        set: function (obj, prop, val) {
            obj[prop] = val;
            if (callbacks.has(obj) && callbacks.get(obj).has(prop)) {
                for(let callback of callbacks.get(obj).get(prop)) 
                    callback()
            }
            return obj[prop];
        },
        get: function (obj, prop) {
            useRective.push([obj, prop])
            if (typeof obj[prop] === 'object') 
                return reactive(obj[prop]);
            return obj[prop];
        }
    })
    proxyCache.set(object, proxy);
    return proxy;
}

function effect(callback) {
    useRective = [];
    callback();
    console.log(useRective);
    for (let reactive of useRective) {
        if (!callbacks.has(reactive[0])) {
            callbacks.set(reactive[0], new Map());
        }
        if (!callbacks.get(reactive[0]).has(reactive[1])){
            callbacks.get(reactive[0]).set(reactive[1], []);
        }
        callbacks.get(reactive[0]).get(reactive[1]).push(callback);
    }
}
let data = {a: {x: 1, y: 2}, b: 2}

let po = reactive(data);
let c = 0;
effect(() => c = po.a.x)
console.log(c)   // 1
po.a.x = 3;
console.log(c)   // 3
```

