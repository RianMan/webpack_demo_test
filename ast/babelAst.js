let babel = require('@babel/core');
let types = require('@babel/types');

let code = `let sum = (a,b)=>a+b`;

// 定义一个观察者来修改ast
let visitor = {
    // 先比照转换前后的不同点在哪，在不同的地方做文章
    ArrowFunctionExpression(ast){
        let body = types.blockStatement([
            types.returnStatement(ast.node.body)
        ])
        let func = types.functionExpression(null, ast.node.params, body,false,false);
        ast.replaceWith(func);
    }
}

let arrowPlugin = {visitor}

// 然后通过babel转换ast为正常的代码
let result = babel.transform(code,{
    plugins:[arrowPlugin]
});
console.log(result.code)