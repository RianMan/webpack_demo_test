const { SyncWaterfallHook } = require('tapable');
// 同步勾子
class Movie{
    constructor(){
       this.hook = new SyncWaterfallHook(['name']); 
    }

    listen(){
        this.hook.tap('Wandering earth',(name) => {
            console.log('Wandering earth',name)
        })

        this.hook.tap('car life',(data) => {
            console.log('car life',data)
        })
    }

    start(){ 
        this.hook.call('today');
    }
}

const m = new Movie();
m.listen();
m.start();
