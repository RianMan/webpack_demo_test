# webpack配置

### 1. 多页面的配置
        在entry中配置成对象形式
            {
                home: './src/home.js',
                other: './src/other.js',
            }
        在output中相应的也改变配置
            {
                filename:'[name].js',
                path:'./dist'
            }
        在HtmlWebpackPulgin中也改变配置
            {
                new HtmlWebpackPulgin({
                    filename:'home.html',
                    template:'index.html',
                    chunks:'home.js'
                }),
                 new HtmlWebpackPulgin({
                    filename:'other.html',                     
                    template:'index.html',
                    chunks:'home.js'
                })
            }
        这样配置以后就可以实现多入口应用了；
### 2. 利用dev-sever解决跨域问题！
        在devServer中配置porxy选项，
        原理利用自己的开发服务器去访问远程服务器的sever，然后通过本地去访问开发服务器，解决跨域问题；
        porxy:'http://localhost:9000',
### 3. 配置watch进行实时打包文件！
        例如我们每次改变文件都要打包（npm run build）的时候，这样显得很麻烦，如果我们添加
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
        这样我们就可以进行实时打包，但是实际开发中好像并没有什么卵用～
### 4. 利用resolve进行文件的解析（import时候更加方便）！
        这个属性在开发的时候最常见的就是引入文件的时候
        （import Banner form ‘./Banner.js’）我们可以配置省去后面的.js
        当然还有更复杂的用法，但是项目中最常用的还是这个
### 5. 在devtool中配置source-map进行文件快速定位错误！
        这是一个非常好的配置，因为不论是写vue还是react，当我们线上出现bug的时候我们很难定位，因为线上的js文件都是打包之后的，所以利用这个配置将快速定位bug位置；
        配置的话加入
        1. devtool:'source-map'(产生一个.map的映射文件，好像不好用)
        2. devtool:'eval-source-map'(不会产生一个多余文件，会定位行)
        。。。
        还有很多，但是我觉得用eval-source-map就可以了；
