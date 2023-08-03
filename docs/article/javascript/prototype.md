# 原型和原型链

之所以存在原型，是因为JS语言要实现面向对象，而原型是面向对象的实现手段之一。`能否判断一个实例的类型`成为了一个语言能否支持面向对象的标准。JS通过原型的方式避免了类型的丢失，通过原型可以知道某个对象属于哪个类型。

在 JavaScript 中，每一个引用数据类型都有一个内部属性 `_proto_`，该属性指向另外一个对象，该对象被称之为原型(prototype)。

```js
let arr = [];
let obj = {};
let func = function() {};

arr.__proto__ === Array.prototype; // true
obj.__proto__ === Object.prototype; // true
func.__proto__ === Function.prototype; // true
```

在这些引用数据类型的原型上，定义了一些公用的变量和方法。当我们定义对应类型的变量时，就可以通过原型链的方式继承到这些公用的属性和方法。


## 构造函数
原型(prototype)通常在构造函数中定义：
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function() {
  console.log('hi!, i am ' + this.name);
}

let ming = new Person('小明', 18)
ming.say(); // hi!, i am 小明
```
如上所示，定义了一个名为`Person`的构造函数，在构造函数的原型上定义了`say`方法。通过`Person`构造函数创建出来的实例对象中，其原型上都会存在`say`方法。当执行`ming.say()`时，会现在ming实例对象中查找是否存在`say`方法，如果没有找到，则通过原型链的方式找到这个对象的原型，从而执行原型上的`say`方法。

```js
ming.valueOf(); // Person {name: '小明', age: 18}
```
如上所示，在ming这个实例对象和它的原型上，都没有定义valueOf方法，为什么调用了valueOf方法没有报错呢？继续往下探究。

前面说到，`每一个引用数据类型都有一个内部属性 _proto_，该属性指向另外一个对象，该对象被称之为原型。`而ming这个实例对象的原型，本身也是一个对象，它也有`__proto__`属性，所以它也会有自己的原型，也就是Object这个构造函数的原型。而Object构造函数的原型上定义了我们常见的对象处理方法，例如`hasOwnProperty`/`isPrototypeOf`/`toString`等等，当然也包括例子中的`valueOf`。

实际上，还是通过原型链的方式，找到了Object的原型，从而调用了对应的方法。

需要注意的是，Object构造函数的原型也是对象，也存在`__proto__`属性，但是它为`null`，原型链的顶端就到`null`为止。


## 总结

综上所述，我认为原型就是一个用来存放公用的变量和方法的对象。通过原型链的方式可以继承一些公用的变量和方法，从而让代码更加的清晰和简洁，每一个对象或方法可以更专注于本身所需要处理的业务逻辑。


<!-- 在 JavaScript 中，每个对象（除了 null 和 undefined）都有一个内部属性 [[Prototype]]，也称为原型或隐式原型。[[Prototype]] 属性指向另外一个对象，这个对象就是当前对象的原型。当访问一个对象的属性时，会先在该对象本身属性中查找，如果没有找到，就会去它的原型上寻找对应的属性。每个对象的原型又可以拥有自己的原型，形成原型链。

### 构造函数

在构造函数的原型上定义公用的变量和方法，这样当我们使用构造函数来创建实例时，所有的实例都能够使用该原型上的属性。


```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.run = function() {
  console.log(this.name + '跑起来了')
}
Person.prototype.say = function() {
  console.log(this.name + '说：你好！')
}
let ming = new Person('小明', 15)
```

ming这个对象中并没有run和say方法，但是当我们访问ming.run时，却可以找到对应的方法数据。原因就是当访问一个对象的属性时，会先在该对象本身属性中查找，如果没有找到，就会去它的原型上寻找对应的属性。因为ming的原型上存在run和say方法，理所当然能够找到并调用了。



```javascript
let str = new String()
let arr = new Array()
let obj = new Object()
let func = new Function()
```
通过new字符串创建出来的变量，其本质都是通过构造函数创建出来的，这个变量自然也应该存在[[prototype]]属性。 -->
