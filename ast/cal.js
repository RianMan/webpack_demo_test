let babel = require('@babel/core');
let types = require('@babel/types');

let code = "const day = 1000 * 60";

let visitor = {
    BinaryExpression(ast){
        let node = ast.node;
        if(!isNaN(node.left.value) && !isNaN(node.right.value)){
            let value = eval(node.left.value + node.operator + node.right.value);
            console.log(value)
            let result = types.numericLiteral(value)
            ast.replaceWith(result);
        }

    }
}
const calPlugin = {visitor}

let result = babel.transform(code,{
    plugins:[calPlugin]
})
console.log(result.code);