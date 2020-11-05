let http = require('http');
const fs = require('fs');

let request = http.request({
    hostname: "127.0.0.1",
    port: 3001,
    method: 'post',
    headers: {
        'Content-Type': 'application/octet-stream'
    }
}, res => {
    console.log(res);
})

let data = fs.createReadStream('../publish-server/package.json');
data.on('data', (chunk) => {
    console.log('chunk:', chunk);
    request.write(chunk);
})

data.on('end', (chunk) => {
    console.log('read finished', chunk);
    request.end(chunk);
})



// request.end();