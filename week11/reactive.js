let callbacks = new Map();
let useRective = []
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
let data = {a: {x: 1, y: 2}, b: 2}

let po = reactive(data);

