### mocha 简单使用

> 8.0以后, Mocha 需要 Node.js的版本号高于 v10.12.0

### 配置支持ES6模块

Mocha默认是一个nodejs模块，默认需要使用amd模块的导入导出方式。

**test-demo/amtSub.js**

```js
// export as AMD Module
module.exports = function amtSub(amt1, amt2) {
		// TODO 
}
```

**test-demo/test/test-amtSub.js**

```js
var assert = require('assert');
const amtSub = require('../amtSub');  // import as AMD Module

describe('test price utils', function () {
    describe('float price sub', function () {
        it('100.02 - 0.02 should be 100.00', function () {
            assert.strictEqual(amtSub('100.02', '0.02'), '100.00');
        });
    });
});
```

#### 借助babel插件

+ babel/core
+ [babel/register](https://babeljs.io/docs/en/babel-register) 

```js
mocha --require @babel/register
```

