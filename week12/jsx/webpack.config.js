const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', {pragma: "creatElement"}]]
                    }
                }
            },
            {
                test: /.(jpg|png|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240 // 10k
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        port: 8080,
        host: '192.168.199.208'
    },
    mode: "development"
}