// import {get, cloneDeep} from 'loadsh';
import cloneDeep from 'loadsh/cloneDeep';
import get from 'loadsh/get';

// z这两种方式引入区别很大，这样大大节约了我们打包之后的代码体积；
// 所以我们需要写一个plguin把第一种代码转化为下面的这种形式
let obj = {name:'zs',age:19};
let cloneObj = cloneDeep(obj);
cloneObj.name = 'lisi';
console.log(cloneObj)
console.log(obj)

export default cloneObj;