const cssParser = require('css');

const EOF = Symbol('EOF');

function data(c) {
    if (c === '<') {
        return tagOpen;
    }else if(c === EOF){
        console.log("EOF");
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
    }else if(c === "/") {
        console.log('selfClosingStartTag');
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
    }else if(c === '>' || c === "/") {
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
        return afterAttributeName(c);
    }else if(c === "=") {
        return beforeAttributeValue;
    }
    else {
        currentAttr["name"] += c;
        return attributeName;
    }
} 

function afterAttributeName(c) {
    if (c === "/") {
        return selfClosingStartTag;
    }else if(c === ">"){
        return data;
    }else if(c === "=") {
        return beforeAttributeValue(c);
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === "/" || c ===">" || c === EOF) {
        return beforeAttributeValue;
    }else if(c === "\"") {
        return doubleQuotedAttributevalue;
    }else if(c === "\'") {
        return singleQuotedAttributevalue;
    }else if (c === ">") {
        //emitToken(currentAttr);
        currentToken[currentAttr.name] = currentAttr.value;
    }else {
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
        // console.log('afterDoubleQuotedAttributevalue:', c, currentToken)
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

function unquotedAttributevalue() {
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

let stack = [{type: "document", children: []}]
let currentTextNode = null;

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
    // console.log(token);
    if (token.type === "starttag") {
        currentTextNode = null;
        let element = {
            name: token.tagName,
            type: 'element',
            children: [],
            attaributes: []
        }

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
        if (token.tagName != node.name) {
            throw new Error("Tag start end doesn't match!")
        }else {
            if (token.tagName === 'style') {
                addCSSRules(node.children[0].content);
            }
            stack.pop();
        }
    }
}

function addCSSRules(cssNode) {
    let ast = cssParser.parse(cssNode);
    console.log(ast);
}

module.exports = {
    parserHtml:function parserHtml(html) {
        let state = data;
        let currentToken = {};
        let currentAttr = {};
        for(let c of html) {
            state = state(c);
        }
        state(EOF);
        // console.log(stack[0]);
    }
} 

