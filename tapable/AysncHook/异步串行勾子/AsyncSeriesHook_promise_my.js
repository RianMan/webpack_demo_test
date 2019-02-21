class  AsyncParallelHook_my{
    constructor(){
        this.tasks = [];
    }

    tapPromise(name,callback){
        this.tasks.push(callback)
    }

    promise(...agrs){
        let [first,...others] = this.tasks;
        let a = others.reduce((p,c) => {
            // redux 源码
            return p.then(() => c(...agrs))
        },first(...agrs)); 
        return a; 
    }
}

const h = new AsyncParallelHook_my();
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
h.tapPromise('crazy ufo' ,(name) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('crazy ufo', name);
            resolve();
        },1000)
    }) 
})
h.promise('chinese movie').then(() => {
    console.log('i am feel good')
});