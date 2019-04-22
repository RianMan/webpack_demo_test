#从0配置一个webpack4.0环境
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