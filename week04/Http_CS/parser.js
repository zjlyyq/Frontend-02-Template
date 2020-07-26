const { match } = require("assert");

const EOF = Symbol('EOF');

function data(c) {
    if (c === '<') {
        return tagOpen;
    }else if(c === "\n"){
        emitToken({type: "text", value: c});
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
        currentToken = {type: 'starttag', name: ''};
        return tagName(c);
    }else {
        return tagOpen;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {type: 'endtag', name: ''};
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
        emitToken(currentToken);
        return beforeAttributeName;
    }else if(c === "/") {
        return selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]$/)) {
        currentToken.name += c;
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
            value: ""
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
        emitToken(currentAttr);
    }else {
        return unquotedAttributevalue(c);
    }
}

function doubleQuotedAttributevalue(c) {
    if (c === "\"") {
        emitToken(currentAttr);
        console.log('doubleQuotedAttributevalue')
        return beforeAttributeName;
    }else {
        currentAttr.value += c;
        return doubleQuotedAttributevalue;
    }
}

function singleQuotedAttributevalue(c) {
    if (c === "\'") {
        emitToken(currentAttr);
        return beforeAttributeName;
    }else {
        currentAttr.value += c;
        return singleQuotedAttributevalue;
    }
}

function unquotedAttributevalue() {
    if (c.match(/^[\t\n\f ]$/)) {
        emitToken(currentAttr);
        return beforeAttributeName;
    }else if(c === "/") {
        emitToken(currentAttr);
        return selfClosingStartTag;
    }else if(c === ">") {
        emitToken(currentAttr);
        return data;
    }else {
        currentAttr.value += c;
        return unquotedAttributevalue;
    }
}

function selfClosingStartTag(c) {
    if (c === ">") {
        currentToken.isSelfClosing = true;
        return data;
    }else {
        
    }
}

function emitToken(token) {
    console.log(token);
    currentToken = {}
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
    }
} 