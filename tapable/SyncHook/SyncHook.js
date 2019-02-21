const { SyncHook } = require('tapable');
// 同步勾子
class Movie{
    constructor(){
       this.hook = new SyncHook(['name']); 
    }

    listen(){
        this.hook.tap('Wandering earth',(name) => {
            console.log('Wandering earth',name)
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
