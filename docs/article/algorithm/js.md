# JS题

## 变量什么提前考察

```js
function cool(a) {
    console.log(a);
    function a() {}
    var a = 2;
    console.log(a)
}
cool()
```
变量申明提前的题目需要注意两点：

1. 同名的变量和函数的声明，函数的提前优先于变量。
2. var 定义变量的申明提前的关键前提是，该变量未被定义。

该题的输出结果是 function 2


## 事件循环的输出结果考察


```js
async function async1 () {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2 () {
  console.log('async 2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise 1');
  resolve();
}).then(() => {
  console.log('promise 2');
})

console.log('script end');
```

主要考察 promise 定时器的回调执行顺序，需要注意的有几点：

1. promise的第一部分是同步执行的，then函数才是异步。
2. 微任务和宏任务的优先级。
3. async 的异步函数中，在await之前的部分属于同步任务，await后的属于异步，类似于then。

该题的输出结果为： script start -> async1 start -> async 2 -> promise 1 ->  script end -> async1 end -> promise 2 -> setTimeout


## 隐式转换
```js
var num1 = 10;
var num2 = '20';
var num3 = num1 + (num2 > 10);
console.log(num3); // 11

if ([] == false) {
    console.log(1);// 1
}
if ([]) {
    console.log(3);// 3
}
if ({} == false ) {
    console.log(2);// undefined 
}
if ({}) {
    console.log(2);// 2
}
if ([1] == [1]) {
    console.log(4);// undefined 
}
```


## 数据类型值的引用考察

```js
var foo = { bar: 1 };
var arr1 = [1, 2, foo];
var arr2 = arr1.slice(1);
arr2[0]++;
arr2[1].bar++;
foo.bar++;
arr1[2].bar++;

console.log(arr1[1] === arr2[0]); 
console.log(arr1[2] === arr2[1]);
console.log(foo.bar);
```

主要考察的是对象和数组此类引用数据类型值的引用，最后的输出结果为 false  true  4


## 申明提前和new字符

1. 考察变量和函数的申明提前的优先级
2. 考察new字符的使用

需要注意的是，函数的申明提前优先于变量，当var定义的变量和function定义的函数名重复时，function的函数名会优先申明提前。而var定义的变量申明提前存在一个前提，就是需要查看定义的变量是否已经存在，如果不存在则申明提前，如果已经存在，则进行重新赋值的操作。

```js
function Foo() {
    getName = function() { console.log(2) };
    return this;
}
Foo.getName = function() { console.log(1) };
Foo.prototype.getName = function() { console.log(6) }
var getName = function () { console.log(5) };
function getName () { console.log(4) }

// 写出一下结果的输出
new Foo.getName()
Foo.getName()
getName()
Foo().getName()
getName()
new Foo().getName()
new new Foo().getName()
```

该题输出的结果是：1 1 5 2 2 6 6


## 考察严格模式 this指向


1. 考察call、apply的使用。
2. 考察严格模式下的使用。

```js
// 正常情况
(function () {
    var obj = { age: 18 }
    function people () {
        console.log(this.age);
        function student() {
            obj.age++;
            console.log(obj.age);
        }
        return student;
    }
    people.call(null, { age: 20 });
    people.apply(obj, [obj])();
})()
```
```js
// 使用严格模式
'use strict';
(function () {
    var obj = { age: 18 }
    function people () {
        console.log(this.age);
        function student() {
            obj.age++;
            console.log(obj.age);
        }
        return student;
    }
    people.call(null, { age: 20 });
    people.apply(obj, [obj])();
})()
```

正常模式下，call输出undefined，apply输出18 19。<br>
严格模式下，call会报错。


## 自执行函数问题
[下面的代码打印什么内容，为什么？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/48)

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();

```
重点是自执行函数内的变量不能够重新赋值。
```js
var b = 10;
(function b() {
   // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
   // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
   //（这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
    b = 20;
    console.log(b); // [Function b]
    console.log(window.b); // 10，不是20
})();
```


理解了以上的点后来做下第二题：
```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```

## 连续赋值问题

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```

定义了a变量指向`{n: 1}`区域，后称为y区域。定义 b 等于 a，所以 b 也指向y区域。

连等的执行如下：a.x 等于 `a = {n: 2}`执行后返回的结果，也就是在y区域下定义了一个x变量等于`a = {n: 2}`的执行结果。`a = {n: 2}`执行的结果就是将a指向的新的区域，称之为z区域，返回结果为z区域。

最后a指向了z区域，即`{n: 2}`。b还是指向y区域，即 `{n: 1, x: z区域}`