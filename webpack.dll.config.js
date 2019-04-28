const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        react: ['react','react-dom']
    },
    output:{
        // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
        filename: '[name].dll.js',
        path: path.join(__dirname,'dist/dll'),
        // library必须和后面dllplugin中的name一致 后面会说明
        library: '[name]_dll_[hash]'
    },
    plugins:[
        new webpack.DllPlugin({
            name: '[name]_dll_[hash]',
            path: path.join(__dirname,'dist/dll','[name].manifest.json')
        })
    ]
}