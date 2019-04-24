const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output:{
        path: path.join(__dirname,'dist'),
        filename:'main.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        outputPath: 'assets/'
                      }
                    }
                  ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'hello webpack'
        })
    ]
}