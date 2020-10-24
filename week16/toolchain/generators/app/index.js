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
    writingPkgJson() {
        const pkgJson = {
            devDependencies: {
                eslint: '^3.15.0'
            },
            dependencies: {
                vue: '^2.6.11'
            }
        };
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
    installDependencies() {
        this.npmInstall();
    }
    // Output Location Context and Path
    outputFileSystemContext() {
        console.log('Destination context: ', this.destinationRoot());   // return the position where the command run 
        console.log('Destination path: ', this.destinationPath('package.json'));
        console.log('Template context: ', this.sourceRoot());      // return the position's sub direction templates where the command location 
        console.log('Template path: ', this.templatePath('index.html'));
    }

    // file utilities
    writingHtml() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'),
            { title: 'Templating with Yeoman' }
        );
    }
};