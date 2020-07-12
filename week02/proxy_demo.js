const handler = {
    get: function (obj, prop) {
        console.log(`A value of key[${prop}] has been accessed`);
        return obj[prop]; // Return the value stored in the key being accessed
    }
}

const initialObj = {
    id: 1,
    name: 'Foo Bar'
}

const proxiedObj = new Proxy(initialObj, handler);

console.log(proxiedObj.name);
console.log(proxiedObj.id);