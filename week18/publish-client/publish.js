let http = require('http');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const archive = archiver('zip', {
    zlib: { level: 9 }
});

archive.directory(path.resolve(__dirname, '../sample/'), false);
archive.finalize();

fs.stat(path.resolve(__dirname, '../sample/sample.html'), function(err, stats) {
    if (err) throw err;
    console.log(stats);
    let request = http.request({
        hostname: "121.199.20.52",
        port: 8089,
        method: 'post',
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
    })
})
