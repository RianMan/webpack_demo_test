class  AsyncSeriesHook_my{
    constructor(){
        this.tasks = [];
    }

    tapAsync(name,callback){
        this.tasks.push(callback)
    }

    callAysnc(...agrs){
        let finalFn = agrs.pop();
        let index = 0;
        let next = () => {
            if(index === this.tasks.length){
                return finalFn();
            }
            this.tasks[index++](...agrs,next)
        }
        next();
    }
}

const h = new AsyncSeriesHook_my();
h.tapAsync('wandering earth' ,(name, cb) => {
    setTimeout(() => {
        console.log('Wandering earth', name);
        cb();
    },1000)
})
h.tapAsync('car life' ,(name, cb) => {
    setTimeout(() => {
        console.log('car life', name);
        cb();
    },1000)
})
h.callAysnc('chinese movie',() => {
    console.log('i am feel good')
});