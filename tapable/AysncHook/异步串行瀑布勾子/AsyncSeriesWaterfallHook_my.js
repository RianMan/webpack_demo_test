class  AsyncSeriesWaterfallHook_my{
    constructor(){
        this.tasks = [];
    }

    tapAsync(name,callback){
        this.tasks.push(callback)
    }

    callAysnc(...agrs){
        let finalFn = agrs.pop();
        let done = (res,data) => {
            
        }
    }
}

const h = new AsyncSeriesWaterfallHook_my();
h.tapAsync('wandering earth' ,(name, cb) => {
    setTimeout(() => {
        console.log('Wandering earth', name);
        cb(null,'yes true,go on~');
    },1000)
})
h.tapAsync('car life' ,(data, cb) => {
    setTimeout(() => {
        console.log('car life', name);
        cb();
    },1000)
})
h.callAysnc('chinese movie',() => {
    console.log('i am feel good')
});