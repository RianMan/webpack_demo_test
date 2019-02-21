const { AsyncSeriesWaterfallHook  } = require('tapable');
// 异步勾子 串行瀑布
// 注册事件的方法： tap ， tapAsync
class Movie{
    constructor(){
       this.hook = new AsyncSeriesWaterfallHook (['name']); 
    }

    listen(){
        this.hook.tapAsync('Wandering earth',(name,cb) => {
            setTimeout(() => {
                console.log('Wandering earth', name);
                cb(null,'yes good!');
            },1000)
        })

        this.hook.tapAsync('car life',(data,cb) => {
            setTimeout(() => {
                console.log('car life', data)
                cb();
            },2000)
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

