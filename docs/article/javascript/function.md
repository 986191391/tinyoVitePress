# 普通函数与箭头函数的区别

## 定义的方式不同

```js
// 普通函数
function fun() {}

// 箭头函数
const fun = () => {}
```

## this指向

箭头函数没有this的概念，在箭头函数内定义this，则this为父级作用域的this。

而普通函数内的this取决于该函数如何被调用。

## 构造函数和改变this

箭头函数不能够定义为构造函数。

箭头函数不能使用call/apply/bind方法来改变this指向。

```js
const Person = () => {
  this.name = 'tinyo';
};
const usr = new Person(); // Person is not a constructor
```

## arguments
在普通函数内部，可以使用arguments来获取传入的参数，是一个类数组对象。而在箭头函数内不能够使用arguments来获取传入的参数。
```js
// 普通函数
function func() {
  console.log(arguments);
}
func(1, 2, 3); // [Arguments] { '0': 1, '1': 2, '2': 3 }

// 箭头函数
const getfunc = () => {
  // 浏览器环境
  console.log(arguments); // arguments is not defined
};
getfunc(1, 2, 3);
```

## new.target

普通函数定义的构造函数内部，支持使用new.target，返回构造实例的构造函数。而在箭头函数中是不被允许的。

```js
// 普通函数
function Person() {
  this.name = 'tinyo';
  console.log(new.target);
}
// 指向构造函数
new Person(); // [Function: Person]

// 箭头函数
const Son = () => {
  this.name = 'tinyo';
  console.log(new.target);
}
// 浏览器环境
new Son(); // new.target expression is not allowed here
```