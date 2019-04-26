#AST
1. 抽象语法树，各种各样的loader都是一个抽象语法树

2. esprima estraverse escodegen
    > 源代码转抽象语法树 => 遍历语法书 => 将抽象语法树转成正常的代码

3. babel-core 和 babel-types 也可以向他们一样去工作
    > 我所理解就是我们之前一种格式 ，中间通过一些规则的判断和修改以后， 产生一个我们想要的结果，  只要按照合格逻辑去做，我们就可以写出我们自己babel-plugin了；

4. 写一个plugin，引入第三方模块时按内容引入，减小打包体积，譬如loadsh这个库