const { SyncLoopHook } = require('tapable');
// 同步勾子
class Movie{
    constructor(){
       this.index = 0;
       this.hook = new SyncLoopHook(['name']); 
    }

    listen(){
        this.hook.tap('Wandering earth',(name) => {
            console.log('Wandering earth',name);
            return ++this.index === 3 ? undefined : 'i need watch again'
        })

        this.hook.tap('car life',(name) => {
            console.log('car life',name)
        })
    }

    start(){ 
        this.hook.call('today');
    }
}

const m = new Movie();
m.listen();
m.start();
