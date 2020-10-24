# 使用Yeoman创建脚手架
## 起步
### NodeJS模块
首先，创建一个文件夹，将在其中编写我们的脚手架（文件夹📂必须被命名为`generator-name`, generator是你的脚手架名字, 因为Yeoman依靠文件系统来查找可用的生成器。）

在文件夹下创建一个`package.json`文件。

```json
{
  "name": "generator-demo",
  "version": "1.0.0",
  "description": "",
  "keywords": ["yeoman-generator"],
  "author": "Jialu Zhang",
  "files": [
    "generators"
  ],
  "license": "ISC",
  "dependencies": {
    "yeoman-generator": "^4.12.0"
  }
}
```
### 目录结构
Yeoman的功能取决于您如何构造目录树。每个子生成器都包含在其自己的文件夹中。

调用 `yo name` 时使用的默认生成器是 `app` generator。它必须包含在app /目录中。

调用 `yo name:subcommand` 用于生成其他子生成器。

```diff
+    .
+    ├── generators
+    │   └── app
+    │       └── index.js
+    ├── package-lock.json
+    └── package.json
```
Yeoman允许两种不同的目录结构。

1. ./
2. generators/
   
前面的示例也可以编写如下：
```diff
+    .
+    ├───app/
+    │   └───index.js
+    ├───package.json
```
### 编写生成器
有了以上的结构，才可以编写生成器。

Yeoman提供了一个基本生成器，您可以扩展它来实现自己的行为。该基本生成器将添加您希望简化任务的大多数功能。

在生成器的index.js文件中，以下是扩展基本生成器的方法：
```js
var Generator = require('yeoman-generator');

module.exports = class extends Generator {};
```
### 重写构造函数
某些生成器方法只能在构造函数内部调用。这些特殊方法可能会执行诸如设置重要状态控件之类的操作，并且可能无法在构造函数之外运行。

```js
var Generator = require('yeoman-generator');

mmodule.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }
};
```
### 添加自己的功能
调用生成器后，添加到原型的每个方法都将运行，并且通常按顺序运行。但是，正如我们将在下一节中看到的那样，一些特殊的方法名称将触发特定的运行顺序。

```js
var Generator = require('yeoman-generator');

mmodule.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }
    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }
};
```
稍后我们运行生成器时，会看到这些日志被记录到控制台。

### 运行生成器
由于我们是在本地开发生成器，因此尚未作为全局npm模块提供。可以使用npm创建一个全局模块并将其符号链接到本地​​模块。

在命令行上，从生成器项目的根目录（在generator-name /文件夹中），键入
```bash
npm link
```
这将安装您的项目依赖项，并将全局模块符号链接到本地​​文件。

![](./static/imgs/npm%20link.png)

最后，运行 `yo name`
![](./static/imgs/yo%20demo.png)
可以看到基本功能已经初步成型。


## 用户交互
### Prompts
Prompts 是最主要的脚手架与用户交互的方式，prompt模块由[Inquirer.js](https://github.com/SBoudrias/Inquirer.js)提供。

**generators/app/index.js**
```js
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    // interacting with the user
    async prompting() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);

        this.log("app name", answers.name);
        this.log("cool feature", answers.cool);
    }
};
```
![](./static/imgs/prompts.png)

## 使用文件系统
### 位置上下文和路径
+ Destination Conetxt —— 项目根目录相关
+ Template Context —— 模板目录相关
```js
// Output Location Context and Path
outputFileSystemContext() {
    console.log('Destination context: ', this.destinationRoot());   // return the position where the command run 
    console.log('Destination path: ', this.destinationPath('package.json'));
    console.log('Template context: ', this.sourceRoot());      // return the position's sub direction templates where the command location 
    console.log('Template path: ', this.templatePath('index.html'));
}
``` 
![](./static/imgs/file_utils.png)
### 使用文件工具
Generators 将所有的文件操作方法暴露在 `this.fs` 上， 它实际上是一个 [mem-fs editor](https://github.com/sboudrias/mem-fs-editor)
的实例。

**复制文件的例子**
```js
// file utilities
writing() {
    this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('public/index.html'),
        { title: 'Templating with Yeoman' }
    );
}
```
![](./static/imgs/file_utils.png)

## 管理依赖
Yeoman将npm 、Yarn 和 Bower等依赖管理工具进行了封装，以便于可以在程序中使用这些工具。

### npm
只需要调用 `this.npmInstall()` 即可运行npm安装, 也可以添加参数安装特定的包，`this.npmInstall(['lodash'], { 'save-dev': true });`。

