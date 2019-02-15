const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename:'index.js',
        path: path.resolve(__dirname,'dist')
    },
    devServer: {
        proxy: {
            "/api": 'http://localhost:9100'
        }
    },
    module:{
        rules:[
            {
                'test': /\.js$/,
                'use':{
                    loader: 'babel-loader',
                    options:{
                        // 转化es6 =》es5语法
                        presets:['@babel/preset-env'],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                            "@babel/plugin-transform-runtime"
                        ]
                    },
                },
                exclude:/node_modules/
            },
            {
                'test': /\.css$/,
                'use':['style-loader','css-loader']
            },
            {
                'test': /\.less$/,
                // 规则先将less文件转为css，然后通过style-loader插入到html 中
                'use':['style-loader','css-loader','less-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'index.html'),
        })
    ]
}