# 从0配置一个webpack4.0环境
------
## 基础配置
1. 首先通过npm下载webpack, webpack-cli, webpack-dev-server,这些包用来搭建初步的webpack环境

2. 修改我们的package.json文件
    * 在 scripts 中加入 ,通过命令行npm run build 可以打包我们的文件
    ```
        "scripts": {
            "build": "webpack"
        },
    ```

3. 修改我们的webpack.config.js中的文件
    * 首先配置我们最基本的出口和入口,然后我们通过命令行执行npm run build 执行一下
    ```
        module.exports = {
            entry: './src/index.js',
            output:{
                path: path.join(__dirname,'dist'),
                filename:'main.js'
            },
        }
    ```

4. 接下来我们来创建一个html文件来打包进入到dist目录中去，但是我们会通过一个webpack的插件帮我们去做这件事件，npm i html-webpack-plugin -D
    * 首选我们创建一个模版html,路径随便，然后去我们的配置文件添加plugins这个属性，
    这就是webpack的插件配置的地方  
    然后可以在这里面配置一些参数，通过模版（ejs）进行传参数到html文件中去
    ```
        plugins:[
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'hello webpack'
            })
        ]
    ```

5. 接下来我们配置一个css的环境，首先下载style-loader,css-loader,然后写到module.rule这个属性中去，因为有很多的加载项，所以这个rules是一个数组
    * style-loader: 将css-loader转译的css文件插入到body中去
    * css-loader: 编译css文件
        > 所以loader编写的顺序是从右向左，从下往上去执行， 
    ```
        rules:[
            {
                test: /.css$/,
                use:['style-loader','css-loader']
            }
        ]
    ```

6. 然后我们会去加载一些图片文件，那我们需要使用file-loader和url-loader去解析
    * 区别： url-loader可以设置一定的大小区间去判断如果在某个数值以内就直接使用base64  
            style-loader则不具备这个功能
    
    * 配置： 使用style-loader去解析,outputPath是去打包后生成一个文件目录，而不是publicPath，切记。。。。
    ```
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                outputPath: 'assets/'
                }
            }
        ]
    ```

7. 解析js文件
    * 说实话babel真的很让人头疼，看网上的下载都不咋靠谱，因为他老是更新，我遇到一个问题，就是下载@babel/preset-stage-0，然后配置到presets中去，就一直报错，原来是移除了这个映射，坑了好久

    * 现在babel7.0以上的版本,然后需要下载
    ```
        npm i @babel-core @babel-cli @babel-preset-env -D
    ```
    ```
         {
            test: /\.js$/,
            use:{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
    ```

8. webpack的环境变量
    * 要在开发和生产构建之间，消除 webpack.config.js 的差异，需要环境变量
        > 举个例子，你有一个loader是消除里面console.log，但是我们开发的时候需要这些log日志，但是上线以后并不需要，所以这里我们就需要去判断环境然后去决定loader的使用与否
    * 我们首先去package.json文件去重新修改我们的脚本
        > webpack --env.NODE_ENV=local --mode production,但是这种方式我们需要将webpack的配置文件改成一个函数(env) => {...}，这样的形式才能拿到env变量的值
    * 我们需要一个webpack插件去帮我们做这个工作webpack.DefinePlugin
    ```
        //_env就是我们首先定义的变量，判断是什么开发环境
        new webpack.DefinePlugin({
            PRODUCTION: _env === 'prd',
            APIHOST: _env === 'prd' ? 'www.host.com' : 'wee.dev.com',
        })
        //然后我们在任何组件里面都可以拿到这里面定义的变量去做不同环境的逻辑判断
    ```
    
-----
## 优化配置项
1.  有的时候利用react,vue这种框架开发的时候不能组件改变了，而整个页面都刷新了，所以就要用到（HRM）
    + 下载react-hot-loader
    + 在webpack.config.js和.babelrc里面加入一些plugin
    ```
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ```
    ```
        "plugins": ["react-hot-loader/babel"],
    ```
    + 在我们的入口组件里面（Main）中引入hot，然后导出hot(Main)
    ```
        import React from 'react';
        import { hot } from 'react-hot-loader/root';
        import Button from './Button';
        import List from './List';

        function Main(props){
            return (
                <div>
                    <List list={['jack','bob','shawVi']} />
                    <Button style={{backgroundColor:'skyblue',color:"#fff"}}>取消</Button>
                </div>)
        }
        export default hot(Main);
    ```
    + 然后去修改List和Button组件的时候页面不会刷新，而只是刷新单个的组件，这样体验就好了很多；

2. 利用happypack进行多线程打包，提升构建速度，感觉小demo看不出来有什么优势
    + npm i happypack -D ;
    + 在webpack.config.js里面配置
    ```
         module: {
             rules:[
                {
                    test: /\.js$/,
                    use: 'happypack/loader?id=jsx',
                },
                {
                    test: /.css$/,
                    use:'happypack/loader?id=css'
                },
             ]
         },
         // id就对应上方id，threads表示所需分配的线程的个数，然后loaders还是我们之前所对应的loaders
         plugins:[
             new HappyPack({
                id:'jsx',
                threads: 1,
                loaders: ['babel-loader']
            }),
            new HappyPack({
                id:'css',
                threads: 2,
                loaders: ['style-loader','css-loader']
            })
         ]
    ```

3. 配置动态链接库，[DLLPlugin 和 DLLReferencePlugin](https://www.webpackjs.com/plugins/dll-plugin/) 实现了拆分 bundles，同时还大大提升了构建的速度
    + 开发工程中很多第三方包很少更新所以我们一般不需要重新打包，例如react，react-dom这些，他们很大，所以很影响打包时间，所以我们可以把这些配置到动态链接库，如果更新我们重新配置就行了;

    + 首先我们创建一个webpack.dll.config.js进行，穿件一个动态链接库出来(要先修改package.json文件的脚本命令执行这个配置文件)
    ```
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
    ```

    + 然后我们去修改我们的主配置文件，加一个插件webpack.DLLReferencePlugin;
    所以我们一般先要生成一个动态链接库，在去打包我们的代码，这样我们的主文件代码就会小很多，而且构建速度大大加快啊
    ```
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/dll/react.manifest.json')
        }),
    ```
