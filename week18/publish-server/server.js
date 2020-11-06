let http = require('http');
let fs = require('fs');
let path = require('path');

console.log(path.resolve(__dirname, '../public/index.html'));
http.createServer(function (req, res) {
    console.log(req.headers);
    // 使用 path.resolve(__dirname, '../public/index.html') 防止命令行执行路径不同导致文件路径不对
    let outfile = fs.createWriteStream(path.resolve(__dirname, '../public/index.html'));
    // req.on('data', (chunk) => {
    //     console.log(chunk.toString());
    //     outfile.write(chunk.toString());
    // })
    
    // req.on('end', (chunk) => {
    //     res.end('Succeed');
    //     outfile.end(chunk);
    //     // outfile.write(chunk.toString());
    // })

    req.pipe(outfile);
    req.on('end', () => {
        res.end('Succeed');
        outfile.end();
    })
}).listen(8089);