let http = require('http');
let https = require('https');
let fs = require('fs');
let path = require('path');
let unzipper = require('unzipper');
const queryString = require('querystring');
const { use } = require('../express-generator-app/routes');

function getAccessToken(code, cb) {
    console.log(`/login/oauth/access_token?code=${code}&client_id=Iv1.737cbe94d227d18b&client_secret=290beacc9ede444f8694ae201e988eaea9dc065a`)
    let request = 
    https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.737cbe94d227d18b&client_secret=290beacc9ede444f8694ae201e988eaea9dc065a`,
        method: 'POST',
        port: 443
    }, function(response) {
        let body = "";
        response.on('data', chunk => {
            console.log(chunk.toString());
            body += chunk.toString();
        })

        response.on('end', chunk => {
            if (chunk) body += chunk;
            let o = queryString.parse(body);
            cb(o);
        })
        // console.log(response);
    })

    request.end();
}

function getUserInfo(token, cb) {
    console.log({
        Authorization: `token ${token}`,
        // User-Agent: 'zjl-toy-publish'
    })
    let request = https.request({
        hostname: 'api.github.com',
        path: `/user`,
        method: 'GET',
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": 'zjl-toy-publish'
        },
        port: 443
    }, function(response) {
        let body = "";
        response.on('data', chunk => {
            // console.log(chunk.toString());
            body += chunk.toString();
        })

        response.on('end', chunk => {
            if (chunk) body += chunk;
            
            cb(JSON.parse(body));
        })
        // console.log(response);
    })
    request.end();
}
// auth 路由： 接受code ,post(Parameters: code + client_id + client_secret)请求换取access_token
function auth(request, response) {
    const params = request.url.match(/^\/auth\?([\s\S]+)$/);
    const query = queryString.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    
    let code = query['code'];
    if (code) getAccessToken(code, function(userInfo){
        response.end(`<a href="http://localhost:8090?token=${userInfo.access_token}">publish</a>`)
        console.log(userInfo);
    });
}

// publish
function publish(request, response) {
    const params = request.url.match(/^\/publish\?([\s\S]+)$/);
    const query = queryString.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    const token = query.token;

    console.log('token: ' + token);
    getUserInfo(token, function(userInfo) {
        console.log(userInfo)
        if (userInfo.login === 'zjlyyq') {
            request.pipe(unzipper.Extract({ path: path.resolve(__dirname, '../public/') }));
            request.on('end', () => {
                response.end('Succeed!');
            })
        }else {
            response.end('sorry, you do are forbidden for this operation.')
        }
    });
}

http.createServer(function (req, res) {
    console.log(req.url);
    if (req.url.match(/^\/auth\?/)){
        auth(req, res);
    }
    else if (req.url.match(/^\/publish\?/)) {
        publish(req, res);
    }
    else {
        if (req.url === '/favicon.ico') return;
        console.log(req.url)
        req.pipe(unzipper.Extract({ path: path.resolve(__dirname, '../public/') }));
        req.on('end', () => {
            res.end('Succeed');
        })
    } 
}).listen(8089);