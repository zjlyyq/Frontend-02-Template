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
let data = {a: {x: 1, y: 2}, b: 2, r: 0, g: 0, b: 0}

let po = reactive(data);
let c = 0;
effect(() => c = po.a.x)
console.log(c)   // 1
po.a.x = 3;
console.log(c)   // 3