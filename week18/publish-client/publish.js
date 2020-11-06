let http = require('http');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const child_process = require('child_process');
const queryString = require('querystring');

child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.737cbe94d227d18b`);

let server = http.createServer(function (request, response) {
    if (request.url.match(/^\/auth\?/)){
        
    }
    else {
        if (request.url === '/favicon.ico') return;
        const query = queryString.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
        let token = query['token'];
        console.log(token);
        // response.end(token);
        publish(token, function() {
            response.end('publish succeed!');
        });
    } 
})
server.listen(8090)
// listen(8090);


function publish(token, cb) {
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    
    archive.directory(path.resolve(__dirname, '../sample/'), false);
    archive.finalize();
    
    let request = http.request({
        // hostname: "121.199.20.52",
        hostname: 'localhost',
        port: 8089,
        method: 'post',
        path: '/publish?token=' + token,
        headers: {
            'Content-Type': 'application/octet-stream',
        }
    }, res => {
        console.log(res.toString());
    })
    archive.pipe(request);
    archive.on('error', function(err) {
        throw err;
    });
    archive.on('end', () => {
        console.log('pipe end');
        request.end();
        cb();
    })   
}
