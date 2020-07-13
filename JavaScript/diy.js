Array.prototype.myForeach=function(fun) {
  for (let i=0; i < this.length; i++) {
    fun.call(this,this[i], i,this)
  }
}
Array.prototype.myMap=function(fun) {
  let newArr = [];
  for (let i=0; i < this.length; i++) {
    newArr.push(fun.call(this,this[i], i,this))
  }
  return newArr
}
Array.prototype.myEvery = function(fun) {
  for (var i=0; i < this.length; i++) {
    if (!fun.apply(this,[this[i],i,this])) {
      return false;
    }
  }
  return true;
}
Array.prototype.mySome = function(fun) {
  for (var i = 0; i < this.length; i++) {
    if (fun.call(this, this[i], i, this)) {
      return true
    }
  }
  return false;
}
Array.prototype.myReduce = function(fun,initValue) {
  var result = initValue || this[0];
  for (var i= initValue ? 0 : 1; i < this.length; i++) {
    result=fun.apply(this,[result,this[i],i,this])
  }
  return result;
}
Array.prototype.myRightReduce = function(fun,initValue) {
  var result = initValue || this[this.length-1];
  for (var i= initValue ? this.length-1 : this.length-2; i > -1; i--) {
    result=fun.apply(this,[result,this[i],i,this])
  }
  return result;
}

class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    // if (this.state === 'fulfilled') {
    //   onFulfilled(this.value);
    // };
    // if (this.state === 'rejected') {
    //   onRejected(this.reason);
    // };
    // // 当状态state为pending时
    // if (this.state === 'pending') {
    //   // onFulfilled传入到成功数组
    //   this.onResolvedCallbacks.push(()=>{
    //     onFulfilled(this.value);
    //   })
    //   // onRejected传入到失败数组
    //   this.onRejectedCallbacks.push(()=>{
    //     onRejected(this.value);
    //   })
    // }
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    return promise2;
  }
  catch(fn){
    return this.then(null,fn);
  }
}
function resolvePromise(promise2, x, resolve, reject){
  if(x === promise2){
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  let called;
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if(called)return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if(called)return;
          called = true;
          reject(err);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if(called)return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

//resolve方法
Promise.resolve = function(val){
  return new Promise((resolve,reject)=>{
    resolve(val)
  });
}
//reject方法
Promise.reject = function(val){
  return new Promise((resolve,reject)=>{
    reject(val)
  });
}
//race方法
Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject)
    };
  })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises){
  let arr = [];
  let i = 0;
  function processData(index,data){
    arr[index] = data;
    i++;
    if(i == promises.length){
      resolve(arr);
    };
  };
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(data=>{
        processData(i,data);
      },reject);
    };
  });
}
