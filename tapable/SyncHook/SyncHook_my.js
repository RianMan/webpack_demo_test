class  SyncHook_my{
    constructor(){
        this.tasks = [];
    }

    // 发布订阅模式
    tap(name,callback){
        this.tasks.push(callback)
    }

    call(...agrs){
        this.tasks.forEach((v) => {v(...agrs)})
    }
}

const h = new SyncHook_my();
h.tap('wandering earth' ,(name) => {
    console.log('wandering earth',name)
})
h.tap('car life' ,(name) => {
    console.log('car life',name)
})
h.call('today');