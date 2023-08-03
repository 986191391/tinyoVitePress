# JS继承

## 构造继承

在子类构造函数中调用父类构造函数并传递相应参数的方式来实现属性的继承。

缺点：无法继承父类原型上的属性和方法
```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name) {
  Parent.call(this, name); // 构造函数继承
}
```
通过call或者apply方法指向自己执行父类的方法, 通过这种方式可以继承父类构造函数的属性, 但是不能继承原型链上的属性。


## 原型链继承

通过将子类的原型指向父类的实例对象来实现属性和方法继承的方式。

```javascript
function Parent() {
  this.name = 'parent';
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child() {}

Child.prototype = new Parent(); // 原型链继承
```

缺点：原型链继承存在一个明显的问题，即如果多个子类公用同一个父类实例，就会出现对该实例引用类型属性共享修改的情况。比如上面代码中parent构造函数内的name值。因此，在使用原型链继承时需要慎用引用类型属性。


## 组合继承

将原型链继承和构造函数继承结合起来使用的一种方式，通过在子类构造函数中调用父类构造函数实现属性继承，并将子类原型指向一个新创建的父类实例对象，从而既能够继承父类的属性，也能够继承父类原型上的方法。

```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 构造函数继承
  this.age = age;
}

Child.prototype = new Parent(); // 原型链继承
```

缺点：在创建子类实例时会调用两次父类构造函数，一次是在 `Parent.call(this, name)` 中，另一次是在 `new Parent()` 中。这不仅会影响性能，还可能导致父类某些属性被覆盖。

**ES6的方式**
```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

const ad = new Dog('ad', 'breed');
ad.speak() // ad makes a sound.
```

## 原型式继承

创建一个临时性的构造函数，将原型设置为一个父类实例对象，并返回一个该临时构造函数的新实例对象。
```javascript
function createObject(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

const parent = {
  name: 'parent',
  sayName() {
    console.log(this.name);
  }
};

const child = createObject(parent); // 原型式继承

child.sayName(); // 输出 "parent"
```

缺点：原型式继承是一种浅拷贝，父类原型上的引用类型属性会被所有子类实例共享。


## 寄生式继承
寄生式继承是一种基于原型式继承的模式，其思想是创建一个仅用于封装继承过程的函数，在该函数内部以某种方式增强对象，最后返回这个对象。这个被增强的对象就是新的子类实例。

寄生式继承就是对原型式继承进行了二次封装和增强。在封装的过程中，我们会先使用 Object.create() 方法基于传入的父类对象来创建一个空的子类对象。然后可以为这个子类对象增加一些额外的属性或方法，并返回这个增强后的子类对象。

```javascript
function createSubObject(obj) {
  const clone = Object.create(obj);

  // 在子类实例上增加额外的属性或方法
  clone.sayHello = function () {
    console.log('Hello World!');
  };

  return clone;
}

// 使用示例
const parent = {
  name: 'parent',
  sayName() {
    console.log(this.name);
  }
};

const child = createSubObject(parent);

console.log(child.name); // 输出 "parent"
child.sayHello();  // 输出 "Hello World!"
```

## 寄生组合式继承

解决组合继承中调用两次父类构造函数的问题的一种方式，它通过使用 Object.create() 方法来优化组合继承的实现。

```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 构造函数继承
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype); // 原型链继承
Child.prototype.constructor = Child; // 修复 constructor 属性指向错误
```

使用了 Object.create() 方法创建了一个新对象，并将该对象的 [[Prototype]] 属性设置为父类的原型对象，然后将子类的原型指向这个新对象。这样做的好处是既避免了调用父类构造函数时制造重复工作，也避免了共享父类引用类型属性的问题。









