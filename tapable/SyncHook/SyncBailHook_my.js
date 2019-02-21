class  SyncBailHook_my{
    constructor(){
        this.tasks = [];
    }

    tap(name,callback){
        this.tasks.push(callback)
    }

    call(...agrs){
        let index = 0;
        let result;
        do{
            result = this.tasks[index](...agrs);
            index += 1;
        }while(result === undefined && index <= this.tasks.length - 1);
    }
}

const h = new SyncBailHook_my();
h.tap('wandering earth' ,(name) => {
    console.log('wandering earth',name);
})
h.tap('car life' ,(name) => {
    console.log('car life',name)
})
h.call('today');