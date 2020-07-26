const http = require('http');

const serve = http.createServer((req, res) => {
    let body = [];
    req.on('error', err => {
        console.error(err);
    }).on('data', chunk => {
        console.log("chunk")
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log("body", body);
        res.writeHead(200, {"Content-Type": "text/html"});
        // res.end("Hello World!\n");
        res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>html dom</title>
</head>
<body>
    hello world!
</body>
</html>
        `);
    })
})

serve.listen(8088);
console.log("serve start in port 8088");
