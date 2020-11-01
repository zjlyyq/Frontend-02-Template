const cssParser = require('css');
const layout = require('./layout')
const EOF = Symbol('EOF');

function data(c) {
    if (c === '<') {
        return tagOpen;
    }else if(c === EOF){
        return data;
    }else {
        emitToken({type: "text", value: c});
        return data;
    }
}

function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)) {
        currentToken = {type: 'starttag', tagName: ''};
        return tagName(c);
    }else {
        return tagOpen;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {type: 'endtag', tagName: ''};
        return tagName(c);
    }else if(c === '>') {
        return data;
    }
}

function tagName(c) {
    // U+0009 CHARACTER TABULATION (tab)
    // U+000A LINE FEED (LF)
    // U+000C FORM FEED (FF)
    // U+0020 SPACE
    // Switch to the before attribute name state.
    // <script src="..." 即将进入属性判断
    if (c.match(/^[\t\n\f ]$/)) {
        // emitToken(currentToken);
        return beforeAttributeName;
    }else if(c === "/") {  // <br/> 
        // console.log('selfClosingStartTag');
        return selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    }else if(c === ">") {
        emitToken(currentToken);
        return data;
    }else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    // U+0009 CHARACTER TABULATION (tab)
    // U+000A LINE FEED (LF)
    // U+000C FORM FEED (FF)
    // U+0020 SPACE
    // Ignore the character.
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    }else if(c === '>' || c === "/") { // <div class></div>
        return afterAttributeName(c);
    }else if(c === "=") {  //<title =
        // return beforeAttributeValue(c);
    }else {
        currentAttr = {
            name: "",
            value: "",
            type: "attr"
        }
        return attributeName(c);
    }
}
function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
        return afterAttributeName(c);   // <div class = "app" id></div>
    }else if(c === "=") {
        return beforeAttributeValue;
    }
    else {
        currentAttr["name"] += c;
        return attributeName;
    }
} 

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/) ){
        return afterAttributeName;
    }
    if (c === "/") {   // <div  app/>
        return selfClosingStartTag;
    }else if(c === ">"){
        emitToken(currentToken);
        return data;
    }else if(c === "=") {
        return beforeAttributeValue;
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === "/") {
        return beforeAttributeValue;   // <div id= ></div>
    }else if(c === "\"") {
        return doubleQuotedAttributevalue;
    }else if(c === "\'") {
        return singleQuotedAttributevalue;
    }else if (c === ">") {
        emitToken(currentToken);
        // currentToken[currentAttr.name] = currentAttr.value;
        return data;
    }else {   // <div height=120></div>
        return unquotedAttributevalue(c);
    }
}

function doubleQuotedAttributevalue(c) {
    if (c === "\"") {
        //emitToken(currentAttr);
        currentToken[currentAttr.name] = currentAttr.value;
        return afterDoubleQuotedAttributevalue;
    }else {
        currentAttr.value += c;
        return doubleQuotedAttributevalue;
    }
}
function afterDoubleQuotedAttributevalue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    }else if(c === "/") {
        // // console.log('afterDoubleQuotedAttributevalue:', c, currentToken)
        return selfClosingStartTag;
    }else if (c === '>'){
        emitToken(currentToken);
        return data;
    }
}
function singleQuotedAttributevalue(c) {
    if (c === "\'") {
        //emitToken(currentAttr);
        currentToken[currentAttr.name] = currentAttr.value;
        return beforeAttributeName;
    }else {
        currentAttr.value += c;
        return singleQuotedAttributevalue;
    }
}

function unquotedAttributevalue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        //emitToken(currentAttr);
        currentToken[currentAttr.name] = currentAttr.value;
        return beforeAttributeName;
    }else if(c === "/") {
        // //emitToken(currentAttr);
        
        return selfClosingStartTag;
    }else if(c === ">") {
        //emitToken(currentAttr);
        currentToken[currentAttr.name] = currentAttr.value;
        emitToken(currentToken);
        return data;
    }else {
        currentAttr.value += c;
        return unquotedAttributevalue;
    }
}

function selfClosingStartTag(c) {
    if (c === ">") {
        currentToken.isSelfClosing = true;
        emitToken(currentToken);
        return data;
    }else {
        
    }
}


function emitToken(token) {
    let node = stack[stack.length-1];
    if (token.type === "text") {
        if (currentTextNode === null) {
            currentTextNode = {
                type: "string",
                content: ""
            }
            node.children.push(currentTextNode);
        }
        currentTextNode.content += token.value;
    }
    // // console.log(token);
    if (token.type === "starttag") {
        currentTextNode = null;
        let element = {
            tagName: token.tagName,
            type: 'element',
            children: [],
            attaributes: []
        }
        computeCSS(element);
        for (let attr in token) {
            if (attr != "type" && attr != "tagName") {
                element.attaributes.push({
                    name: attr,
                    value: token[attr]
                })
            }
        }

        node.children.push(element);
        element.parent = node;

        if (!token.isSelfClosing) {
            stack.push(element);
        }
    }
    if (token.type === "endtag") {
        currentTextNode = null;
        if (token.tagName != node.tagName) {
            throw new Error("Tag start end doesn't match!")
        }else {
            if (token.tagName === 'style') {
                addCSSRules(node.children[0].content);
            }
            layout(node);
            stack.pop();
        }
    }
}
// 收集css
function addCSSRules(cssNode) {
    let ast = cssParser.parse(cssNode);
    // console.log(JSON.stringify(ast));
    rules = ast.stylesheet.rules;
}

// 计算css
function computeCSS(element) {
    let parents = stack.slice().reverse();
    if (!element.computedStyle) {
        element.computedStyle = {};
    }
    for (let rule of rules) {
        let selectors = rule.selectors;
        for (let selector of selectors) {
            let selections = selector.split(" ").reverse();
            let specificity = getSpecificity(selector);
            if (!match(element, selections[0])) continue;
            if (loopCheck(parents, selections.slice(1))){
                getComputedStyle(rule.declarations, element, specificity);
                break;
            }
        }
    }
}

// 计算选择器是否和元素匹配
function match(element, selector) {
    return element.tagName === selector;
}

function loopCheck(elements, selections) {
    let j = 0;
    for (let i = 0;j < selections.length && i < elements.length;i ++) {
        if (match(elements[i], selections[j])) {
            j ++;
        }
    } 
    return j === selections.length;
}

// 从rule的declarations生成元素的computed属性
function getComputedStyle(declarations, element, specificity) {
    let computedStyle = element.computedStyle;
    for(let declear of declarations) {
        if (!computedStyle[declear.property]) {
            computedStyle[declear.property] = {specificity: specificity, value: declear.value}
        }else {
            if (computedStyle[declear.property].specificity <= specificity) {
                computedStyle[declear.property] = {specificity: specificity, value: declear.value}
            }
        }
    }
    // console.log(element.computedStyle)
}  

// 计算css优先级
function getSpecificity(selector) {
    let selections = selector.split(" ").reverse();
    let p = [0 ,0, 0, 0];
    for (let selection of selections) {
        if (selection.charAt("0") === "#") {
            p[1] += 1;
        }else if (selection.charAt(0) === ".") {
            p[2] += 2;
        }else {
            p[3] += 1;
        }
    }
    return p;
}
let rules = [];
let stack = [{type: "document", children: []}]
let currentTextNode = null;

module.exports = {
    parserHtml:function parserHtml(html) {
        stack = [{type: "document", children: []}];
        currentTextNode = null;
        rules = [];

        let state = data;
        let currentToken = {};
        let currentAttr = {};
        for(let c of html) {
            state = state(c);
        }
        state(EOF);
        // console.log(stack[0]);
        return stack[0];
    }
} 

