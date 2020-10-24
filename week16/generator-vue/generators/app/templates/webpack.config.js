const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack'); //to access built-in plugins
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            // 普通的 `.css` 文件和 `*.vue` 文件中的 `<style>` 块都应用它
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './src/*.html', to: '[name].[ext]' },
            ],
        }),
    ]
};