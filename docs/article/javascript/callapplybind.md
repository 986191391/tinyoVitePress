# call/apply/bind

call, apply, 和 bind 是 JavaScript 中用于改变函数执行上下文（即函数内部的 this 值）的方法。它们是函数的原生方法，并且在日常编程中非常有用。


**call 方法**

```js 
function.call(thisArg, arg1, arg2, ...)
```

thisArg 是要指定的函数执行上下文（即 this 值），后面是可选的参数列表，用于传递给函数。

作用：call 方法会立即执行函数，并将函数内部的 this 值设置为 thisArg 所指定的值。此外，可以通过 call 方法将额外的参数传递给函数。

**apply 方法**

```js 
function.apply(thisArg, [argsArray])
```

thisArg 是要指定的函数执行上下文，argsArray 是一个数组，包含要传递给函数的参数。

作用：apply 方法也会立即执行函数，并将函数内部的 this 值设置为 thisArg 所指定的值。不同于 call，apply 接受参数的方式是通过数组传递，因此适用于已有参数列表的情况。

**bind 方法**

```js 
function.bind(thisArg, arg1, arg2, ...)
```

thisArg 是要绑定到函数的执行上下文，后面是可选的参数列表，用于创建一个新的函数。

作用：bind 方法不会立即执行函数，而是创建一个新的函数，并将函数内部的 this 值永久地绑定到 thisArg。绑定后的函数可以在稍后被调用，而 this 值将保持绑定状态。此外，您也可以传递额外的参数，这些参数将作为绑定函数的参数，不影响绑定时的参数传递。


## 示例
```js
const person = {
  name: 'John',
};

function sayHello(message) {
  console.log(`${message}, ${this.name}`);
}

// 使用 call 方法
sayHello.call(person, 'Hello'); // 输出：Hello, John

// 使用 apply 方法
sayHello.apply(person, ['Hello']); // 输出：Hello, John

// 使用 bind 方法
const boundFunction = sayHello.bind(person, 'Hello');
boundFunction(); // 输出：Hello, John
```

## 区别

1. 三者都可以改变函数的this对象指向。
2. 三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window。
3. 在严格模式下，即`use strict`。第一个参数为undefined或null，会报错。因为严格模式下this不能指向全局，浏览器环境即window。
4. 三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入。
5. bind 是返回绑定this之后的函数，便于稍后调用；apply 、call 则是立即执行 。


<!-- 可以使用 call、apply 或 bind 方法显示地指定函数内部的 this 绑定到某个对象上。
```javascript
const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

function greet() {
  console.log(`Hello, ${this.name}`);
}

greet.call(person1); // 输出 "Hello, Alice"
greet.apply(person2); // 输出 "Hello, Bob"

const greetPerson1 = greet.bind(person1);
greetPerson1(); // 输出 "Hello, Alice"
```
 -->


## 笔试题

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


### 手写bind方法


需要注意几点：

1. 调用bind的时可以传入参数，执行返回函数时也可以传入参数，这里需要对参数进行组合。
2. 需要考虑this的指向的问题。
3. 需要考虑使用new方式进行调用时的场景。


```js
Function.prototype.myBind = function(ctx) {
  var args = Array.prototype.slice.call(arguments, 1);
  var self = this;

  return function F() {
    var curArgs = Array.prototype.slice.call(arguments);
    var allArgs = curArgs.concat(args)

    if (Object.getPrototypeOf(this) === F.prototype) {
      var obj = {};
      // Object.setPrototypeOf(obj, self.prototype)
      obj.__proto__ = self.prototype;
      var result = fn.apply(obj, allArgs);
      return typeof result === 'object' ? result : obj;
    } else {
      return self.apply(ctx, allArgs)
    }
  }
}
```