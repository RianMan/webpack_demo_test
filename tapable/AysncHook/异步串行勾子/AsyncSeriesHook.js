const { AsyncSeriesHook } = require('tapable');
// 异步勾子 串行
// 异步事件必须一步一步的来执行，而不是同时执行
// 注册事件的方法： tap ， tapAsync，tapPromise
class Movie{
    constructor(){
       this.hook = new AsyncSeriesHook(['name']); 
    }

    listen(){
        this.hook.tapAsync('Wandering earth',(name,cb) => {
            setTimeout(() => {
                console.log('Wandering earth', name);
                cb();
            },1000)
        })

        this.hook.tapAsync('car life',(name,cb) => {
            setTimeout(() => {
                console.log('car life', name)
                cb();
            },1000)
        })
    }

    start(){ 
        this.hook.callAsync('WuJin', () => {
            console.log('i feel very good')
        });
    }
}

const m = new Movie();
m.listen();
m.start();

