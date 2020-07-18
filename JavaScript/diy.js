// 箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有以下几点差异：

// 1、函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

// 2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

// 3、不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

// 4、不可以使用 new 命令，因为：

// 没有自己的 this，无法调用 call，apply。
// 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto__
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

Function.prototype.myCall = function(obj) {
  const context = obj || window;
  context.func = this;
  const arg = Array.from(arguments).slice(1)
  const res = arg.length > 0 ? context.func(...arg) : context.func();
  delete context.func;
  return res;
}

Function.prototype.myApply = function(obj) {
  const context = obj || window;
  context.func = this;
  const arg = Array.from(arguments).slice(1)
  const res = arg.length > 0 ? context.func(arg) : context.func();
  delete context.func;
  return res;
}

Function.prototype.myBind = function(obj) {
  const context = obj || window;
  context.func = this;
  const arg = Array.from(arguments).slice(1);
  return function () {
    const arg1 = Array.from(arguments);
    const allArgs = arg.concat(arg1);
    return allArgs.length > 0 ? context.func(...allArgs) : context.func()
  }
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

function bubbleSort (arr) {
  for(var i =0; i< arr.length; i++) {
    for(var j=i; j<arr.length; j++) {
      if (arr[i]>arr[j]) {
        var tem = arr[i]
        arr[i] = arr[j];
        arr[j] = tem;
      }
    }
  }
  return arr
}

function bigNumberAdd(a, b) {
  var str1 = a.split("").reverse();
  var str2 = b.split("").reverse();
  var tem = 0;
  var addFlag = 0;
  var bigger = [];
  var little = [];
  var res = [];
  if (parseInt(a) > parseInt(b)) {
    bigger = str1;
    little = str2;
  } else {
    bigger = str2;
    little = str1;
  }
  for (var i = 0; i< bigger.length; i++) {
    if (i < little.length) {
      tem = parseInt(bigger[i]) + parseInt(little[i]) + addFlag;
    } else {
      tem = parseInt(bigger[i]) + addFlag;
    }
    if (tem < 10) {
      res[i] = tem;
      addFlag = 0;
    } else {
      res[i] = tem - 10;
      addFlag = 1;
      if (i == bigger.length -1) {
        res[bigger.length] =1;
      }
    }
  }
  return res.reverse().join("");
}

function add(a,b){
  var str1,str2,temp;
  var addFlag = 0;
  var max = [],min = [],res = [];
  str1 = a.split("").reverse();//分割字符串，并且反转
  str2 = b.split("").reverse();

  if (parseInt(a) >= parseInt(b)) {
      max = str1;
      min = str2;
  }
  else{
      max = str2;
      min = str1;
  }
  for (var i = 0; i <= max.length - 1; i++) {
      if (i <= min.length - 1) {
          temp = parseInt(max[i]) + parseInt(min[i]) + addFlag;
      }
      else{
          temp = parseInt(max[i]) + addFlag;
      }

      if (temp > 9) {
          res[i] = temp - 10;
          addFlag = 1;
          if (i == max.length - 1) {
              res[max.length] = 1;//如果是最后一位，要进位
          }
      }
      else{
          res.push(temp);
          addFlag = 0;
      }
  };
  return res.reverse().join("");
}
