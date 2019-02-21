class  SyncLoopHook_my{
    constructor(){
        this.tasks = [];
    }

    tap(name,callback){
        this.tasks.push(callback)
    }

    call(...agrs){
        this.tasks.forEach((v) => {
            let result;
            do {
                result =  v(...agrs);
            } while (result !== undefined );
        })
    }
}

const h = new SyncLoopHook_my();
let total = 0;
h.tap('wandering earth' ,(name) => {
    console.log('wandering earth',name);
    return ++total === 3 ? undefined : 'again watch';
})
h.tap('car life' ,(name) => {
    console.log('car life',name);
})
h.tap('crazy ufo' ,(name) => {
    console.log('crazy ufo',name)
})
h.call('today');