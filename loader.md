## webpack loader的相关
1. 编写一个自己的loader
    * 现在有一个需求，打包的时候去掉所有的console语句，那么自己写一个的逻辑是什么样的呢？
    * 第一步我们要知道所有的loader都是一个函数，然后导出，我们在这个函数里面做逻辑的处理  那我们建一个loader的文件夹，里面创建一个delete-log-loader.js文件
    * 建好之后我们先别急着写东西，我们先去修改一下我们的webpack的配置文件,我们先把我们写的loader的路径给处理好，下面代码的意思，就是在babel-loader处理我们的文件以前先用我们的loader去处理一遍再给你去处理，
    ```
        {
            test: /\.js$/,
            use: [
                    'babel-loader',
                    {
                        loader: path.join(__dirname,'loader','delete-log-loader'),
                        options:{
                            // 配置环境变量，如果开发环境才去干掉日志
                            isDelete: _env ==='prd'
                        }
                    }
                ],
            },
        {
    ```
    * 这一步搞定了之后，接下来去写我们的loader了,我们首先明白几个点
        1. 我们是需要导出一个函数，然后函数的第一个参数就是源代码；
        2. 想清楚我们要干嘛，我的需求就是干掉console.log(),
        3. 这个源代码就是一个字符串，那我们只需要写一个正则去匹配这样一个语句，然后替换掉就行了，
        4. 那就搞定了啊，然后我们返回我们修改后的代码
        5. loader-utils返回的是一个对象可以拿到我们options的配置
        6. 然后我们打包发现我们的console就没了,那我们第一个loader就写好了，哈哈很爽;
        ```
            const loaderUtils = require('loader-utils');

            module.exports = function(content, map, meta) {
                let nextSource;
                let options = loaderUtils.getOptions(this);
                let { isDelete } = options;
                // 通过loaderUtils拿到对应的配置项，进行逻辑处理，当用户不想要删除日志的时候就不删除， 
                if(isDelete){
                nextSource = content.replace(/console.log\(.+\)/g,'');
                return nextSource;
                }else{
                return content;
                }
            };
        ```