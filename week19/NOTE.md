
## 持续继承
### git hooks 的使用

### Eslint 的使用
**安装**
```sh
npm i eslint -D
```
**初始化** 
```sh
npx eslint --init
```
稍加配置
```sh
eslint-demo git:(master) ✗ npx eslint --init
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JavaScript
Successfully created .eslintrc.js file in /Users/jialuzhang/MyCode/Frontend-02-Template/week19/eslint-demo
➜  eslint-demo git:(master) ✗ 
```
会自动生成一个eslint的配置文件(默认是`.eslintrc.js`)
```diff
    eslint-demo
+   ├── .eslintrc.js
    ├── node_modules
    ├── package-lock.json
    └── package.json
```
**.eslintrc.js**
```js
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
    }
};
```
### Chrome Headless 检查dom
无头浏览器是自动化测试和不需要可见UI外壳的服务器环境的绝佳工具。