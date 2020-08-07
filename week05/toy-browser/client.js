const net = require('net');
const parser = require('./parser');
const images = require('images');

class ChunkedBodyParser{
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;

        this.current = this.WAITING_LENGTH;
        this.isFinished = false;
        this.length = 0;
        this.content = [];
    }

    receiveChar(char) {
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    // console.log('isFinishedisFinished')
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            }else {
                this.length *= 16;
                this.length += parseInt(char, 16);
                console.log('length:',this.length);
            }
        }else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        }else if(this.current === this.READING_TRUNK && !this.isFinished) {
            this.content.push(char);
            // console.log(this.content);
            this.length --;
            if (this.length === 0) {
                // console.log('this.length === 0')
                this.current = this.WAITING_NEW_LINE;
            }
        }else if(this.current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                // console.log('WAITING_NEW_LINE_END')
                this.current = this.WAITING_NEW_LINE_END;
            }
        }else if(this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                // console.log('WAITING_LENGTH_LINE_END')
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}

class ResponseParser {

    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
        this.isFinished = false;
        this.response = {};
    }

    receive(string) {
        for(let i = 0;i < string.length;i ++) {
            this.receiveChar(string.charAt(i));
        }
    }

    receiveChar(char) {
        // console.log(char);
        if (this.current === this.WAITING_STATUS_LINE) {
            // console.log('WAITING_STATUS_LINE');
            if (char === '\n') {
                // console.log('nnnnnnn');
                this.current = this.WAITING_STATUS_LINE_END;
            }
            if (char === '\r') {
                // console.log('rrrrrr');
                this.current = this.WAITING_STATUS_LINE_END;
            }else {
                this.statusLine += char;
            }
        }else if(this.current === this.WAITING_STATUS_LINE_END) {
            if (char === "\n") {
                // console.log('WAITING_STATUS_LINE_END');
                this.current = this.WAITING_HEADER_NAME;
                this.headerName = "";
            }
        }else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ":") {
                this.current = this.WAITING_HEADER_SPACE;
            }else if(char === "\r") {
                // console.log('WAITING_HEADER_BLOCK_END');
                // console.log(this.headers);
                this.current = this.WAITING_HEADER_BLOCK_END;
                if (this.headers["Transfer-Encoding"] === "chunked") {
                    this.bodyParser = new ChunkedBodyParser();
                    // this.isFinished = this.bodyParser.isFinished;
                }
            }else {
                this.headerName += char;
            }
        }else if(this.current === this.WAITING_HEADER_SPACE){
            if (char === " ") {
                this.current = this.WAITING_HEADER_VALUE;
                this.headerValue = "";
            }
        }else if(this.current === this.WAITING_HEADER_VALUE) {
            if (char === "\r") {
                // console.log("WAITING_HEADER_LINE_END")
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = "";
            }else {
                this.headerValue += char;
            }
        }else if(this.current === this.WAITING_HEADER_LINE_END) {
            if(char === "\n") {
                // console.log("WAITING_HEADER_NAME")
                this.current = this.WAITING_HEADER_NAME;
            }
        }else if(this.current === this.WAITING_HEADER_BLOCK_END) {
            if (char === "\n") {
                this.current = this.WAITING_BODY;
            }
        }else if (this.current === this.WAITING_BODY) {
            this.bodyParser.receiveChar(char);
            this.isFinished = this.bodyParser.isFinished;
            if (this.isFinished) {
                this.response = {
                    statusCode: this.statusLine,
                    headers: this.headers,
                    body: this.bodyParser.content.join('')
                }
            }
        }
    }
}
class Request {
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = "application/x-www-form-urlencoded";
        }
        if (this.headers['Content-Type'] === "application/x-www-form-urlencoded") {
            this.bodyText = JSON.stringify(this.body);
        }
        else if(this.headers['Content-Type'] === "application/json") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join("&");
        }
        this.headers['Content-Length'] = this.bodyText.length;

        // console.log(this);
    }

    
    /**
     * request请求格式:
     * GET / HTTP/1.1     #request line
     * Host: time.geekbang.org    # 请求头 
     * 
     */
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\n\n${this.bodyText}`;
    }

    send(connection) {
        // console.log(this.toString()+"\n");
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();
            if (connection) {
                connection.write(this.toString());
            }else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                })
            }
            console.log("-------- responce ---------");
            connection.on('data', (data) => {
                console.log(data.toString());
                parser.receive(data.toString());
                if (parser.isFinished) {
                    console.log('isFinished')
                    resolve(parser.response);
                    connection.end();
                }
            })

            connection.on('error', (err) => {
                reject(err);
                connection.end();
            })
        })
    }
}

void async function() {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: "/",
        headers: {
            // "Content-Type": "application/json",
            // ["X-Foo2"]: "customed"
        },
        body: {
            name: "the shy"
        }
    })

    let responsed = await request.send();
    console.log(responsed.body);

    // 将responsed解析为dom树
    let dom = parser.parserHtml(responsed.body);
    console.log(dom);

    let viewport = images(800, 600);
    let render = (viewport, element) => {
        let img = images(element.style.width, element.style.height);
        if (element.style && element.style.background) {
            let color = element.style.background || "rgb(100,10,0)";
            color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3));
            viewport.draw(img,  element.style.left || 0, element.style.top || 0);
            for (let c of element.children) {
                if (c.type === 'element')
                    render(viewport, c);
            }
        }
    };
    let el = dom.children[1].children[3].children[1];
    render(viewport, el)
    viewport.save("./viewport.jpg");
}();
