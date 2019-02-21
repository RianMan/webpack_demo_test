class  SyncWaterfallHook_my{
    constructor(){
        this.tasks = [];
    }

    tap(name,callback){
        this.tasks.push(callback)
    }

    call(...agrs){
       let firstFn = this.tasks.shift();
       this.tasks.reduce((p,c) => {
           return c(p);
       },firstFn(...agrs));
    }
}

const h = new SyncWaterfallHook_my();
h.tap('wandering earth' ,(name) => {
    console.log('wandering earth',name);
    return 'it is very good';
})
h.tap('car life' ,(data) => {
    console.log('car life',data);
    return 'yes i do'
})
h.tap('crazy ufo' ,(data) => {
    console.log('crazy ufo',data)
})
h.call('today');