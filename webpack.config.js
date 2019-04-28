const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:['react-hot-loader/patch','./src/index.js'],
    output:{
        path: path.join(__dirname,'dist'),
        filename:'main.js'
    },
    
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        open: true,
        hot: true,
        port:9000,
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
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
        }),
        // 配置HRM所需要的两个插件，NamedModulesPlugin以便更容易查看要修补(patch)的依赖
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // 配置HRM所需要的两个插件
    ]
}