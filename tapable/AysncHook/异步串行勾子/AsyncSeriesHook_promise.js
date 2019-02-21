const { AsyncSeriesHook } = require('tapable');
// 异步勾子 并行
// tapable库中注册事件的方法： tap（同步）， tapAsync(异步)，tapPromise（异步promise）
class Movie{
    constructor(){
       this.hook = new AsyncSeriesHook(['name']); 
    }

    // 监听函数
    listen(){
        this.hook.tapPromise('Wandering earth',(name) => {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    console.log('Wandering earth', name);
                    resolve();
                },1000)
            })
        })

        this.hook.tapPromise('car life',(name) => {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    console.log('car life', name);
                    resolve();
                },1000)
            })
        })
    }

    // 执行函数
    start(){ 
        this.hook.promise('WuJin').then(() => {
            console.log('i feel very good')
        });
    }
}

const m = new Movie();
m.listen();
m.start();

