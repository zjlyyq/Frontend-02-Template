let dictionary = ['Number', 'WhiteSpace', 'LineTerminator', '+', '-', '*', '/'];
// g 全局匹配;找到所有匹配，而不是在第一个匹配后停止
let regexp = /([0-9\.]+)|([ \t]+)|(\n)|(\+)|(\-)|(\*)|(\/)/g;
let EOF = Symbol('EOF')
function* tokenize(expression){
    let result = null;
    let lastIndex = 0;
    while(true){
        lastIndex = regexp.lastIndex;
        result = regexp.exec(expression);
        if (result == null) break;
        if (regexp.lastIndex - lastIndex > result[0].length) {
            break;
        }
        let token = {
            type: null,
            value: null
        }
        for(let i = 1;i <= dictionary.length;i ++ ) {
            if (result[i]) {
                token.type = dictionary[i-1];
                break;
            }
        }
        token.value = result[0];  
        yield token;
    }
    yield {
        type: "EOF",
        value: EOF
    }
}


function AdditionExpress(source){
    if (source[0].type === 'MultiplcativeExpress') {
        let node = {
            type: 'AdditionExpress',
            children: [source[0]]
        }
        source[0] = node;
        return AdditionExpress(source);
    }
    if (source[0].type === 'AdditionExpress' && source[1] && source[1].type === '+' ) {
        let node = {
            type: 'AdditionExpress',
            operator: '+',
            children: []
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplcativeExpress(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditionExpress(source);
    }
    if (source[0].type === 'AdditionExpress' && source[1] && source[1].type === '-' ) {
        let node = {
            type: 'AdditionExpress',
            operator: '-',
            children: []
        }
        node.chirdren.push(source.shift());
        node.chirdren.push(source.shift());
        MultiplcativeExpress(source);
        node.chirdren.push(source.shift());
        source.unshift(node);
        return AdditionExpress(source);
    }
    if (source[0].type === 'AdditionExpress' ) {
        return source[0];
    }
    MultiplcativeExpress(source)
    return AdditionExpress(source)
}

function MultiplcativeExpress(source) {
    if (source[0].type === 'Number') {
        let node = {
            type: 'MultiplcativeExpress',
            chirdren: [source[0]]
        }
        source[0] = node
        return MultiplcativeExpress(source)
    }
    if (source[0].type === 'MultiplcativeExpress' && source[1] && source[1].type === '*') {
        let node = {
            type: 'MultiplcativeExpress',
            operator: '*',
            chirdren: []
        }
        node.chirdren.push(source.shift());
        node.chirdren.push(source.shift());
        node.chirdren.push(source.shift());
        source.unshift(node);
        return MultiplcativeExpress(source);
    }
    if (source[0].type === 'MultiplcativeExpress' && source[1] && source[1].type === '/') {
        let node = {
            type: 'MultiplcativeExpress',
            operator: '/',
            chirdren: []
        }
        node.chirdren.push(source.shift());
        node.chirdren.push(source.shift());
        node.chirdren.push(source.shift());
        source.unshift(node);
        return MultiplcativeExpress(source)
    }
    return source[0];
}
let source = [];
for (let token of tokenize(`\n1024 + 8 * 25\n`)) {
    console.log(token)
    if (token.type != 'WhiteSpace' && token.type != 'LineTerminator') {
        source.push(token)
    }
}
AdditionExpress(source)

console.log(source)