const http = require('http');

const serve = http.createServer((req, res) => {
    res.write('Hello Node!');
    res.end();
})

serve.listen(3000);
console.log("serve start in port 3000");
