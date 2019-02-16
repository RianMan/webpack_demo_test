let path = require('path');
let webpack = require('webpack');

module.exports = {
    mode:'development',
    entry: ['react', 'react-dom'],
    output:{
        filename:'_dll_[name].js',
        path: path.resolve(__dirname,'dist'),
        library: "_dll_react"
    },
    plugins:[
        new webpack.DllPlugin({
            name:'_dll_react',
            path: path.resolve(__dirname, 'dist',"manifest.json"),
        })
    ]
}