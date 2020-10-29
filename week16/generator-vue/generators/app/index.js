var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }
    
    async writingPkgJson() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name: ",
                default: this.appname // Default to current folder name
            },
            // {
            //     type: "input",
            //     name: "version",
            //     default: '1.0.0',
            //     message: "version: "
            // },
            // {
            //     type: "description",
            //     name: "description",
            //     default: '',
            //     message: "description: "
            // },
            // {
            //     type: "entry",
            //     name: "entry",
            //     default: 'index.js',
            //     message: "entry point: "
            // },
            // {
            //     type: "confirm",
            //     name: "cool",
            //     message: "Would you like to enable the Cool feature?"
            // }
        ]);

        this.fs.copyTpl(
            this.templatePath('index.html'), 
            this.destinationPath('src/index.html'),
            { title: answers.name }
        );
        this.fs.copyTpl(
            this.templatePath('README.md'), 
            this.destinationPath('README.md'),
            { projectName: answers.name }
        );
        const pkgJson = {
            "name": answers.name,
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "serve": "webpack-dev-server",
                "build": "webpack --config webpack.config.js"
            },
            "devDependencies": {
            },
            "dependencies": {
            },
            "author": "",
            "license": "ISC"
        }
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(['vue'], { 'save-dev': false });
        this.npmInstall(
            [
                'webpack', 
                'webpack-cli', 
                'html-webpack-plugin',
                'copy-webpack-plugin', 
                'vue-loader', 
                'vue-template-compiler', 
                'vue-style-loader', 
                'css-loader',
                'postcss-loader',
                'webpack-dev-server'
            ], 
            { 'save-dev': true }
        );
    }

    copeFiles() {
        this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'), 
            this.destinationPath('src/components/HelloWorld.vue')
        );
        this.fs.copyTpl(
            this.templatePath('App.vue'), 
            this.destinationPath('src/App.vue')
        );
        this.fs.copyTpl(
            this.templatePath('main.js'), 
            this.destinationPath('src/main.js')
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'), 
            this.destinationPath('webpack.config.js')
        );
    }
    // installDependencies() {
    //     this.npmInstall();
    // }

    // file utilities
    // writingHtml() {
    //     this.fs.copyTpl(
    //         this.templatePath('index.html'),
    //         this.destinationPath('public/index.html'),
    //         { title: 'Templating with Yeoman' }
    //     );
    // }
};