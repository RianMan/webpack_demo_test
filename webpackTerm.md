### 介绍一些webpack的术语，来自webpack的官网解释

1. tree shaking: 通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

>>> 就是指一个模块中导出了五个变量或者方法，但是我们只用了其中了两个，按照常理，webpack打包应该只需要打包这引入的两个即可，但是webpack依然打包了五个，这显然是不合理的，所以就需要用到 tree shaking.

2. 代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：

- 入口起点：使用 entry 配置手动地分离代码。
- 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。

>>>   防止重复:  optimization: { splitChunks: {chunks: 'all'} }

>>> 动态导入(dynamic imports): const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');


3. shim 预置依赖

>>>  new webpack.ProvidePlugin({ _: 'lodash' }) 这样就可以直接使用_了