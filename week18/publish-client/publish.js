let http = require('http');
const fs = require('fs');
const path = require('path');

let request = http.request({
    hostname: "121.199.20.52",
    port: 8089,
    method: 'post',
    headers: {
        'Content-Type': 'application/octet-stream'
    }
}, res => {
    console.log(res.toString());
})

let data = fs.createReadStream(path.resolve(__dirname, './sample.html'));

// data.on('data', (chunk) => {
//     console.log('chunk:', chunk);
//     request.write(chunk);
// })

// data.on('end', (chunk) => {
//     console.log('read finished', chunk);
//     request.end(chunk);
// })

data.pipe(request);
data.on('end', () => {
    request.end();
})
