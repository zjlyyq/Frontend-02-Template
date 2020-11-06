let http = require('http');
let fs = require('fs');
let path = require('path');
let unzipper = require('unzipper');

console.log(path.resolve(__dirname, '../public/index.html'));
http.createServer(function (req, res) {
    console.log(req.headers);
    req.pipe(unzipper.Extract({ path: path.resolve(__dirname, '../public/') }));
    req.on('end', () => {
        res.end('Succeed');
    })
}).listen(8089);