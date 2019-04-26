let babel = require('@babel/core');
let types = require('@babel/types');

const code = "import {get, cloneDeep} from 'loadsh';";

const visitor = {
    ImportDeclaration(path){
        let node = path.node;
        let specifiers = node.specifiers;
        let newImports = specifiers.map(specifier=>(
            types.importDeclaration([types.ImportDefaultSpecifier(specifier.local)], 
            types.stringLiteral(`${node.source.value}/${specifier.local.name}`))
        )); 
        path.replaceWithMultiple(newImports);
    }
}

const decreasePlugin = {visitor};
let result = babel.transform(code,{
    plugins:[
        decreasePlugin
    ]
});
console.log(result)