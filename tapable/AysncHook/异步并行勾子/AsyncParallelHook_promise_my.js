class  AsyncSeriesHook_my{
    constructor(){
        this.tasks = [];
    }

    tapPromise(name,callback){
        this.tasks.push(callback)
    }

    promise(...agrs){
        let promiseArr = this.tasks.map((v) => {return v(...agrs)});
        return Promise.all(promiseArr)
    }
}

const h = new AsyncSeriesHook_my();
h.tapPromise('wandering earth' ,(name) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Wandering earth', name);
            resolve();
        },1000)
    })
})
h.tapPromise('car life' ,(name) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('car life', name);
            resolve();
        },1000)
    }) 
})
h.promise('chinese movie').then(() => {
    console.log('i am feel good')
});