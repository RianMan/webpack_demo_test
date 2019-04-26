let esprima = require('esprima');
let estraverse = require('estraverse');
let escodegen = require('escodegen');

let code = 'var sum = function(){}'
// 这就是一个大概的转换流程
// 1. 解析语法 转成抽象语法树
let ast = esprima.parseScript(code);

// 2. 定义转换规则
estraverse.traverse(ast, {
    enter: function (node, parent) {
        console.log('entering : ',node.name);
        node.name += '_enter';
    },
    leave: function (node, parent) {
        console.log('leaving',node.name);
        node.name += '_leave';
    }
});

// 将修改后的ast转成正常的代码
let result = escodegen.generate(ast);

console.log(result);

