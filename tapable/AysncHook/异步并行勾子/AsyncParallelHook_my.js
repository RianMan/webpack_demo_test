class  AsyncParallelHook_my{
    constructor(){
        this.tasks = [];
    }

    tapAsync(name,callback){
        this.tasks.push(callback)
    }

    callAysnc(...agrs){
        // 先取出参数中的函数存起来
        const finnalFn = agrs.pop();
        let num = 0;
        let done = () => {
            num ++;
            if(num === this.tasks.length){
                finnalFn();
            }
        };
        this.tasks.forEach((v) => {
            v(...agrs,done);
        })
    }
}

const h = new AsyncParallelHook_my();
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