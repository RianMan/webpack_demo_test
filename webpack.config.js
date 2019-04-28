const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
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
                use: 'happypack/loader?id=jsx',
            },
            {
                test: /.css$/,
                use:'happypack/loader?id=css'
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
            title: 'hello webpack',
        }),
        // 配置HRM所需要的两个插件，NamedModulesPlugin以便更容易查看要修补(patch)的依赖
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // 配置HRM所需要的两个插件
        // 配置happypack进行打包
        new HappyPack({
            id:'jsx',
            threads: 1,
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id:'css',
            threads: 2,
            loaders: ['style-loader','css-loader']
        }),
        // 配置动态链接库
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/dll/react.manifest.json')
        }),
    ]
}