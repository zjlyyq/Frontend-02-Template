function match(selector, element) {
    for (let c of selector) {
        if (c.match(/[a-z]|[A-Z]/) === null) {
            if (type === "#") {
                if (element.getAttribute('id') != token) {
                    return false
                }
            } else if (type === ".") {
                if (!element.getAttribute('class').includes(token)) {
                    return false;
                }
            } else {
                if (element.tagName.toLowerCase() != token) {
                    return false;
                }
            }
            token = "";
            type = c;
        } else {
            token += c;
        }
    }
    return true;
}

function match_class(selectors, element) {
    selectors = selectors.split(' ').reverse();
    let combinator = " ";
    for (let i = 0;i < selectors.length; ) {
        if (selectors[i] === '>' || selectors[i] === '+') {
            combinator = selectors[i];
            i ++;
        }else {
            combinator = " ";
            if (match(selectors[i], element)) {
                i ++;
                if (combinator === ">") {
                    element = element.parentNode;
                }else if (combinator === "+"){
                    element = element.previousElementSibling;
                }else {
                    element = element.parentNode;
                }
            }else {
                // 当前未匹配，且combinator不是空格，可以确定无法匹配
                if (combinator != ' '){
                    return false;
                }
            }
        }
    } 

    return true;
}

cosnole.log(match_class("div > #id.class", ""));

// div#a.b .c[id=x] 0 1 3 1 
// #a:not(#b) 0 2 0 0 
// *.a 0 0 1 0 
// div.a 0 0 1 1