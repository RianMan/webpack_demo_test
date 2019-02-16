class Api{
    constructor(){
        this.user = {name: 'zs', id: 1};
        this.friend = ['Bob','Alice','Jack'];
        this.photo = 'not found'
    }

    getUser(){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(this.user)
            }, 800);
        })
    }

    getFriend(id){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(this.friend[id])
            }, 1000);
        })
    }

    getPhoto(name){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(this.photo +" "+ name + ' photo ')
            }, 800);
        })
    }
}

const api = new Api()
async function fn () {
    let user = await api.getUser();
    let friend = await api.getFriend(user.id);
    let res = await api.getPhoto(friend);
    console.lo(res);
}

let xhl = new XMLHttpRequest();

xhl.open('get','api/user',true)

xhl.onload = () => {
    console.log(xhl.response)
}

xhl.send();