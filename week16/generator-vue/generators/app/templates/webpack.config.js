const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
// const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

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
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         { from: './src/*.html', to: '[name].[ext]' },
        //     ],
        // }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        open: true,
        hot: true
    }
};