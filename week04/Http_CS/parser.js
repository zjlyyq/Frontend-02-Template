const { match } = require("assert");

const EOF = Symbol('EOF');

function data(c) {
    if (c === '<') {
        return tagOpen;
    }else if(c === "\n"){
        // emitToken(currentToken);
        return data;
    }else {
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
    if (c.match(/^[\t\n\f ]$/) || c === "/" || c ===">" || c === EOF) {
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
    }else if(c === "=") {
        return beforeAttributeValue(c);
    }
}

function beforeAttributeValue(c) {
    
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