var assert = require('assert');
const parser = require('../src/parser');

const htmlString = `<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" />
    <title>Document</title>
</head>
<body>
    <p>HelloWorld</p>
</body>
</html>`;

describe('parseHtml function test', () => {
    it('<br/>', function() {
        const tree = parser.parserHtml('<br/>');
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'br');
    }) 
    it('<a>text</a>', function() {
        const tree = parser.parserHtml('<a>text</a>');
        // console.log(tree.children[0]);
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'a');
        assert.strictEqual(tree.children[0].children[0].type, 'string');
    }) 
    it('<div>text</div>', function() {
        const tree = parser.parserHtml('<div>text</div>');
        // console.log(tree);
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].children[0].type, 'string');
    }) 

    it('<div class="app">text</div>', function() {
        const tree = parser.parserHtml('<div class="app">text</div>');
        // console.log(tree.children[0].attaributes);
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].attaributes.length, 1);
    }) 

    it('<div  class="app"></div>', function() {
        const html = `<div  class="app"></div>`    
        const tree = parser.parserHtml(html);
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].children.length, 0);
    }) 
    it('<div  ></div>', function() {
        const html = `<div ></div>`    
        const tree = parser.parserHtml(html);
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].children.length, 0);
    }) 

    // // <div id></div>
    it('<div class ="app" id></div>', function() {
        const html = `<div class ="app" id></div>`    
        const tree = parser.parserHtml(html);
        // console.log(tree.children[0])
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].attaributes.length, 1);
    }) 
    // // <div id></div>
    it('<div class ="app" height=120 id= ></div>', function() {
        const html = `<div class ="app" height=120 id= ></div>`    
        const tree = parser.parserHtml(html);
        // console.log(tree.children[0])
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].attaributes.length, 2);
    }) 
    it(`<div class = 'app' id/>`, function() {
        const html = `<div class = 'app' id/>`   
        const tree = parser.parserHtml(html);
        // console.log(tree.children[0])
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].attaributes.length, 2);
        assert.strictEqual(tree.children[0].attaributes[1].name, "isSelfClosing");
    }) 
    it(`<div class = 'app'>`, function() {
        const html = `<div class = 'app'/>`   
        const tree = parser.parserHtml(html);
        // console.log(tree.children[0])
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].attaributes.length, 2);
        assert.strictEqual(tree.children[0].attaributes[1].name, "isSelfClosing");
    }) 
    it(`<div class = "app">`, function() {
        const html = `<div class = "app"/>`   
        const tree = parser.parserHtml(html);
        // console.log(tree.children[0])
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].attaributes.length, 2);
        assert.strictEqual(tree.children[0].attaributes[1].name, "isSelfClosing");
    }) 
    // 此处有问题
    it(`<div class = "app" height=120/>`, function() {
        const html = `<div class = "app" height=120/>`   
        const tree = parser.parserHtml(html);
        // console.log(tree.children[0])
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].attaributes.length, 2);
        assert.strictEqual(tree.children[0].attaributes[1].name, "isSelfClosing");
    }) 

    it(`<div class = "app" height=120></div>`, function() {
        const html = `<div class = "app" height=120></div>`   
        const tree = parser.parserHtml(html);
        // console.log(tree.children[0])
        assert.strictEqual(tree.children.length, 1);
        assert.strictEqual(tree.children[0].tagName, 'div');
        assert.strictEqual(tree.children[0].attaributes.length, 2);
        // assert.strictEqual(tree.children[0].attaributes[1].name, "isSelfClosing");
    }) 

    it(`<div class = "app" height=120></p>`, function() {
        const html = `<div class = "app" height=120></p>` 
        try {
            const tree = parser.parserHtml(html);
        } catch (error) {
            // console.log(error.toString())
            assert.strictEqual(typeof error, 'object');
        }  
    }) 

    it(`include style tag`, function() {
        const html = `<html lang="en">
<head>
    <title>Document</title>

    <style>
        body {
            font-size: 120px;
        }
        .container {
            height: 200px;
        }
        body .container {
            height: 400px;
        }
        #app {
            color: bule;
        }
        #app p {
            color: red;
        }
    </style>
</head>
<body>
    <div id="app" class="container" style="font-size: 12px;">
        <p>ppp</p>
        <span>content</span>
    </div>
</body>
</html>
        ` 
        // try {
        const tree = parser.parserHtml(html);
        console.log(tree.children[0]);
        // } catch (error) {
        //     // console.log(error.toString())
        //     assert.strictEqual(typeof error, 'object');
        // }  
    }) 
})