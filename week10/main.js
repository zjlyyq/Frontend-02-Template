let dictionary = ['NUmber', 'WhiteSpace', 'LineTerminator', '+', '-', '*', '/'];
// g 全局匹配;找到所有匹配，而不是在第一个匹配后停止
let regexp = /([0-9\.]+)|([ \t]+)|(\n)|(\+)|(\-)|(\*)|(\/)/g;

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
}


for (let token of tokenize('1024 + 8 * 25')) {
    console.log(token);
}