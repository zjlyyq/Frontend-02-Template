let dictionary = ['NUmber', 'WhiteSpace', 'LineTerminator', '+', '-', '*', '/'];
// g 全局匹配;找到所有匹配，而不是在第一个匹配后停止
let regexp = /([0-9\.]+)|([ \t]+)|(\n)|(\+)|(\-)|(\*)|(\/)/g;

function tokenize(expression){
    let result = null;
    let count = 9;
    while(true){
        result = regexp.exec(expression);
        if (result == null) break;
        console.log(result)
    }
}


tokenize("1024 + 8 * 25")