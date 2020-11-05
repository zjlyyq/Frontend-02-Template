let http = require('http');
let fs = require('fs');


http.createServer(function (req, res) {
    console.log(req.headers);
    let outfile = fs.createWriteStream('../public/index.html');
    req.on('data', (chunk) => {
        console.log(chunk.toString());
        outfile.write(chunk.toString());
    })
    
    req.on('end', () => {
        res.end('Succeed');
        outfile.end();
        // outfile.write(chunk.toString());
    })
}).listen(8089);