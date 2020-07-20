// 原型链继承 不能向父类构造函数传参 对象实例共享所有属性和方法
function Father() {
  this.name = 'gg';
}

function Child () {
  this.age = '';
}
Child.prototype = new Father();
Child.prototype.constructor = Child;


// 构造函数 中改变this
function Father(name) {
  this.name = name;
}

function Child() {
  Father.call(this, 'xiaoming');
  this.age=20;
}

