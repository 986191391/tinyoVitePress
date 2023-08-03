# JS基本知识

## 基本数据类型

1. 原始数据类型
- 数字（Number）：整数和浮点数，例如 42 或 3.14。
- 字符串（String）：由字符组成的文本，例如 "Hello" 或 'World'。
- 布尔值（Boolean）：表示真（true）或假（false）的值。
- undefined：表示未定义或未赋值的值。
- null：表示空值。
- Symbol（ES6引入的新类型）：表示唯一的标识符。
- bigInt

2. 引用数据类型
- 对象（Object）

## let 和 var 的区别

1. let定义的变量在同一作用域内不能重复声明, var 定义的变量重复声明会覆盖之前的值。
2. let定义的变量值在块级作用域内有效。
3. var 定义变量存在声明提前的问题, let 定义的变量不存在该问题。
4. 在全局作用域中使用 var 声明的变量会成为全局对象（如 window 对象）的属性。使用 let 声明的全局变量不会成为全局对象的属性。

## undefined 和 null 的区别

[tinyo docs - JS类型比较](http://43.139.113.7:89/article/jstype.html)

可以将两者分别这样理解：<br>
undefined: 没有定义<br>
null: 定义了没有给值
```javascript
undefined == null // true
undefined === null //false
typeof undefined // 'undefined'
typeof null // 'object'
```

## 判断类型的方式


- **typeof**：  可以较好的判断基本数据类型 ， 对引用数据类型的判断不友好，不能区分数组和对象和null，结果都为object。

- **instanceof**： 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。对引用数据类型判断较好，对基本数据类型的判断不友好。

- **Object.prototype.toString.call([])**： 自认为最准确的判断方式


```javascript
 Object.prototype.toString.call() // "[object Undefined]"
 Object.prototype.toString.call('') // "[object String]"
 Object.prototype.toString.call(2) //"[object Number]"
 Object.prototype.toString.call(false) // "[object Boolean]"
 Object.prototype.toString.call(undefined) // "[object Undefined]"
 Object.prototype.toString.call(null) // "[object Null]"
 Object.prototype.toString.call([1,2]) // "[object Array]"
 Object.prototype.toString.call({}) // "[object Object]"
```

## JS的事件机制

JavaScript 事件触发有三个阶段。 
- 事件捕获阶段（Event Capturing Phase）：事件从文档的根元素开始向下传播，直到达到事件的目标元素。

- 目标阶段（Target Phase）：事件到达目标元素，触发事件处理函数。

- 事件冒泡阶段（Event Bubbling Phase）：事件从目标元素开始向上冒泡，直到达到文档的根元素。

事件冒泡是指当一个元素上的事件被触发时，事件会从该元素开始向上冒泡到其父元素，直到到达文档的根元素（通常是 `<html>` 元素）。换句话说，事件会从最具体的元素（例如按钮）一直向上传播到最不具体的元素（文档的根元素）。

事件捕获则是相反的过程。在事件捕获阶段，事件会从文档的根元素开始，逐级向下传播到最具体的元素。事件捕获阶段是事件传播的第一个阶段，而事件冒泡阶段是第二个阶段。

默认情况下，事件处理会发生在事件冒泡阶段。但是，您可以使用 addEventListener 方法的第三个参数来指定事件处理发生在捕获阶段还是冒泡阶段。例如：

```js
element.addEventListener('click', handler, true); // 在捕获阶段处理事件
element.addEventListener('click', handler, false); // 在冒泡阶段处理事件（默认）
```


<!-- `addEventListener(‘click’, function(){}, false); // 默认为false 冒泡阶段`
通过addEventListener方法可以给dom元素添加事件监听函数。当事件被触发时, 通过回调函数进行响应。 

**冒泡**，实际开发的场景中, 当父元素和子元素同时绑定了click方法时, 点击子元素, 父元素的click方法也会被触发。这是因为事件的冒泡导致的, 所以可以通过event.stopPropagation()方法来阻止事件的冒泡。在对图片进行拖拽时, 松开鼠标后图片会有一个回弹到原位的动作。这是属于浏览器的默认事件。同样通过e.preventDefault()可以取消元素的默认事件。

**事件委托**，简述使用场景，好处。其实是性能优化的一种方式

举个例子，手写一个计算器，可以把事件绑定在父亲最外层，点击后通过currentTarget / target 来判断当前点击的元素是哪个，从而编写我处理逻辑。（个人网站中的viewport操作页面中有使用到）

> **currentTarget和target的区别是什么** < 参考文章：[currentTarget和target的区别](https://www.jianshu.com/p/1dd668ccc97a)> -->


<!-- ## EventLoop  JS的事件循环机制
参考文章： [阮一峰 - EventLoop](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)

- 所有同步任务都在主线程上执行，形成一个[执行栈](http://www.ruanyifeng.com/blog/2013/11/stack.html) (execution context stack)。
- 主线程之外，还存在一个”任务队列”(task queue)。只要异步任务有了运行结果，就在”任务队列”之中放置一个事件。
- 一旦”执行栈”中的所有同步任务执行完毕，系统就会读取”任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
- 主线程不断重复上面的第三步。

经典的，非常经典的问题题目，笔试面试经常提问！

```javascript
setTimeout(() => {
	console.log(1);
}, 0);

new Promise((resolve) => {
	console.log(2);
	resolve();
	console.log(3);
}).then(() => {
	console.log(4);
})

console.log(5);
```

## 线程和进程
参考：[从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872)

setTimeout导致往后延了才执行 是为什么呢
setTimeout和setInterval的运行机制是，将指定的代码移出本次执行，放到任务队列中，等到下一轮Event Loop时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮Event Loop时重新判断。这意味着，setTimeout指定的代码，必须等到本次执行的所有代码都执行完，才会执行。Promise的任务也是如此。

**为什么Promise的then操作输出比setTimeout的先执行？**
promise属于一种微任务，当他的代码执行完以后会推入到本次的事件循环中，而setTimeout要等到下一次的事件循环，所以promise比setTimeout先执行。 -->


<!-- ## JavaScript垃圾回收
参考：[阮一峰 - JavaScript 内存泄漏教程](https://www.ruanyifeng.com/blog/2017/04/memory-leak.html)<br>
参考：[「硬核JS」你真的了解垃圾回收机制吗](https://juejin.cn/post/6981588276356317214)<br>

垃圾回收并不是实时的，因为开销比较大，所以垃圾回收器会周期性的释放程序中已经不在被引用的垃圾对象。
- 标记清除法

这是目前浏览器大多基于标记清除法。我们可以分为两个阶段：

标记：从根节点遍历为每个可以访问到的对象都打上一个标记，表示该对象可达。
清除：在没有可用分块时，对堆内存遍历，若没有被标记为可达对象就将其回收。

- 引用计数法

追踪每个变量被引用的次数，当引用数为0将可以被回收掉 -->


<!-- ## Cookie 、LocalStorage和SessionStorage的区别
参考：[JS数据存储](https://www.cnblogs.com/sylvia-Camellia/p/11589569.html)

- Cookie

1.cookie 的存放数据大小为4K左右。一般由服务器生成, 可设置失效时间。<br>
2.如果在浏览器端生成Cookie, 默认是关闭浏览器后失效。<br>
3.cookie因为保存在客户端中, 其中包含的任何数据都可以被他人访问, cookie安全性比较低。<br>
4.与服务器通信时, 每次都会携带在HTTP头中。<br>
5.cookie需要在客户端和服务器端之间来回传送, 会浪费不必要的资源如果过多会带来性能问题。

- localStorage

1.localStorage的大小一般为5MB, 保存在本地, 除非被清除, 否则永久保存。<br>
2.仅在客户端中保存, 不参与和服务器的通信。<br>
3.是以key/value的形式进行存储, value值只能存储字符串。如果想要存储对象, 可以用JSON.stringify()进行转换为字符串, 取值的时候再使用JSON.parse()解析。

```javascript  
// 存储的两种方式
localStorage.setItem("isConfirm", "true");
localStorage.isConfirm= "true";

// 读取
localStorage.getItem("isConfirm");
localStorage.isConfirm; 
```

- sessionStorage

1.一般为5MB，仅在当前会话下有效，关闭页面或浏览器后被清除。<br>
2.仅在客户端(即浏览器)中保存，不参与和服务器的通信。<br>
3.存储在sessionStorage中的数据可以跨越页面刷新而存在。<br>
4.受到同源策略限制，若想在不同页面之间对同一个sessionStorage进行操作，这些页面必须在同一协议、同一主机名和同一端口下。<br>
5.是以key/value的形式进行存储，value值只能存储字符串。

```javascript  
// 存储的两种方式
sessionStorage.setItem("isConfirm", "true");
sessionStorage.isConfirm= "true";

// 读取
sessionStorage.getItem("isConfirm");
sessionStorage.isConfirm; 
``` -->
