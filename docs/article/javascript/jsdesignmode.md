# JS设计模式

了解JavaScript的设计模式可以帮助我们更好地组织和设计我们的代码，使其更加灵活、可维护和可扩展。设计模式是一种经过验证的解决问题的方法，它可以帮助我们避免常见的错误和陷阱，并提高我们的代码质量和效率。

例如，适配器模式可以帮助我们将一个不兼容的API转换为另一个API，或者将一个旧的API转换为一个新的API。装饰者模式可以帮助我们通过包装一个对象来扩展其功能，而不是通过修改对象本身来实现。代理模式可以帮助我们创建一个代理对象来控制对另一个对象的访问，从而实现对象的延迟加载、缓存、权限控制等功能。

了解这些设计模式可以使我们更加熟悉和熟练地使用JavaScript，并帮助我们写出更好的代码。

以下举例几个常见的JS设计模式。

## 工厂模式

工厂模式是一种创建对象的模式，它通过一个工厂方法来创建对象，而不是使用 new 关键字。在 JavaScript 中，可以使用函数来实现工厂模式。

以下是一个使用函数实现工厂模式的示例：
```javascript
function createPerson(name, age) {
  return {
    name,
    age,
    sayHello() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
  };
}

const john = createPerson('John', 30);
john.sayHello();
```
在这个示例中，createPerson 函数返回一个包含 name、age 和 sayHello 方法的对象。通过调用 createPerson 函数，可以创建一个新的 Person 对象。

工厂模式的优点在于可以将对象的创建过程封装起来，从而使代码更加模块化和可维护。此外，工厂模式还可以根据需要动态地创建不同类型的对象，从而提高代码的灵活性和可扩展性。

## 单例模式


单例模式是一种保证一个类只有一个实例的模式。在 JavaScript 中，可以使用闭包来实现单例模式。

以下是一个使用闭包实现单例模式的示例：
```javascript
const Singleton = (function() {
  let instance;

  function createInstance() {
    const object = new Object({ name: 'John' });
    return object;
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true
```
在这个示例中，Singleton 对象使用闭包来保证只有一个实例。createInstance 函数用于创建实例，而 getInstance 方法用于获取实例。当第一次调用 getInstance 方法时，会创建一个新的实例并将其赋值给 instance 变量。之后再次调用 getInstance 方法时，会直接返回已经创建的实例。这样就保证了 Singleton 对象只有一个实例。

单例模式的优点在于可以保证一个类只有一个实例，从而节省内存空间。此外，单例模式还可以提供全局访问点，方便对实例进行操作。但是，单例模式也有一些缺点，例如可能会导致代码的耦合性增加，从而降低代码的灵活性和可维护性。因此，在使用单例模式时需要权衡其优缺点，根据具体情况进行选择。

### 实际例子

EventBus（事件总线）的实现通常使用单例模式。EventBus 是一种在应用程序中用于处理事件传递和通信的机制，它允许不同组件之间进行解耦，通过订阅和发布事件来实现通信。在实际开发中，我们通常希望整个应用程序共用一个 EventBus 实例，以确保事件的一致性和全局订阅。这种需求很适合使用单例模式来实现。

## 观察者模式

**实际例子：Vue 的响应式数据机制可以看作是观察者模式（Observer Pattern）的一种实现。**

观察者模式是一种行为型设计模式，它定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象，当主题对象发生变化时，它的所有观察者都会收到通知并进行相应的处理。在 JavaScript 中，可以使用观察者模式来实现事件驱动的编程。

在观察者模式中，有两个核心角色：主题对象和观察者对象。主题对象负责维护一组观察者对象，并在状态发生变化时通知它们；观察者对象则负责接收主题对象的通知，并进行相应的处理。

```javascript
class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  addListener(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }

  removeListener(event, listener) {
    if (this.listeners.has(event)) {
      const listeners = this.listeners.get(event);
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  emit(event, ...args) {
    if (this.listeners.has(event)) {
      const listeners = this.listeners.get(event);
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }
}

const emitter = new EventEmitter();

emitter.addListener('foo', () => {
  console.log('foo event fired');
});

emitter.addListener('bar', (arg1, arg2) => {
  console.log(`bar event fired with args ${arg1} and ${arg2}`);
});

emitter.emit('foo'); // logs "foo event fired"
emitter.emit('bar', 'hello', 'world'); // logs "bar event fired with args hello and world"
```
这段代码实现了一个事件发射器（EventEmitter）类，它可以用来实现观察者模式。该类包含三个方法：

addListener(event, listener)：向事件监听器列表中添加一个监听器。<br>
removeListener(event, listener)：从事件监听器列表中移除一个监听器。<br>
emit(event, ...args)：触发指定事件，并将参数传递给所有监听器。<br>

使用该类可以方便地实现事件驱动的编程。例如，在示例代码中，我们创建了一个 EventEmitter 实例，并向其添加了两个监听器，分别监听 'foo' 和 'bar' 事件。当 'foo' 事件被触发时，会输出 "foo event fired"；当 'bar' 事件被触发时，会输出 "bar event fired with args hello and world"。这些输出语句是在监听器函数中定义的。

Vue.js 的发布订阅模式就是观察者模式。在 Vue.js 中，每个组件实例都是一个观察者对象，它可以监听自身的数据变化，并在数据变化时更新视图。而数据变化则是由另一个对象——数据模型（或称为“数据中心”）——来驱动的。数据模型负责维护应用程序的状态，并在状态发生变化时通知所有观察者对象。这种一对多的依赖关系就是观察者模式的经典应用。



## 装饰者模式

简单的理解这个模式：写一个方法，不影响传入的原始数据，通过原始数据返回另一个包装过的新数据

装饰者模式是一种结构型设计模式，它允许在不影响同一类其他对象的情况下，
静态或动态地向单个对象添加行为。在JavaScript中，可以使用闭包和高阶函数的组合来实现装饰者模式。

以下是JavaScript中装饰者模式的示例实现：
```javascript
function wrapData(originalData) {
  // 对原始数据进行包装或处理
  var wrappedData = "Wrapped: " + originalData;
  return wrappedData;
}

// 使用装饰者函数包装原始数据
var originalData = "Hello";
var wrappedData = wrapData(originalData);

console.log(originalData); // 输出 "Hello"，原始数据不受影响
console.log(wrappedData); // 输出 "Wrapped: Hello"，经过包装的新数据
```
装饰者模式的优点是它可以动态地添加行为，而不需要修改现有的代码。这使得它非常适合在运行时扩展对象的功能。然而，装饰者模式也有一些缺点。它可能会导致代码变得复杂，因为每个装饰器都需要实现与原始对象相同的接口。此外，如果使用过多的装饰器，可能会导致性能问题。

## 适配器模式

适配器模式是一种设计模式，它允许我们将一个类的接口转换为另一个类的接口，以便这两个类可以协同工作。在JavaScript中，适配器模式通常用于将一个不兼容的API转换为另一个API，或者将一个旧的API转换为一个新的API。以下是使用适配器模式在JavaScript中实现一个简单的例子：

假设我们有一个旧的库，它定义了一个名为oldRequest的函数，该函数接受一个回调函数作为参数，并在异步操作完成后调用该回调函数。我们想要使用一个新的库，它定义了一个名为newRequest的函数，该函数返回一个Promise对象。我们可以使用适配器模式来将oldRequest函数转换为newRequest函数的接口。以下是适配器模式的实现：
```javascript
function oldRequest(callback) {
  setTimeout(() => {
    callback('response');
  }, 1000);
}

function newRequest() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('response');
    }, 1000);
  });
}

function adapter() {
  return new Promise(resolve => {
    oldRequest(response => {
      resolve(response);
    });
  });
}

// 使用适配器模式将 oldRequest 转换为 newRequest 的接口
newRequest().then(response => {
  console.log(response); // logs "response"
});

adapter().then(response => {
  console.log(response); // logs "response"
});
```
在这个示例中，我们定义了一个名为oldRequest的函数，它模拟了一个异步操作，并在操作完成后调用回调函数。我们还定义了一个名为newRequest的函数，它返回一个Promise对象。最后，我们定义了一个名为adapter的函数，它将oldRequest函数转换为newRequest函数的接口。adapter函数返回一个Promise对象，该对象在异步操作完成后解析为response。


## 代理模式

代理模式是一种设计模式，它允许我们创建一个代理对象来控制对另一个对象的访问。在JavaScript中，代理模式通常用于实现对象的延迟加载、缓存、权限控制等功能。

以下是JavaScript中代理模式的示例实现：
```javascript
const expensiveObject = {
  someMethod() {
    console.log('Expensive operation');
  }
};

const proxy = new Proxy(expensiveObject, {
  someMethod() {
    console.log('Proxy operation');
    return Reflect.apply(expensiveObject.someMethod, expensiveObject, arguments);
  }
});

proxy.someMethod(); // logs "Proxy operation" and "Expensive operation"
```
在这个示例中，我们定义了一个名为expensiveObject的对象，它包含一个名为someMethod的方法。我们还定义了一个名为proxy的代理对象，它使用Proxy构造函数创建。在代理对象中，我们重写了someMethod方法，并在方法中打印日志。然后，我们使用Reflect.apply方法调用原始对象的someMethod方法，并返回结果。

代理模式的核心思想是通过创建一个代理对象来控制对另一个对象的访问。代理对象可以拦截对原始对象的访问，并在访问前后执行一些操作。这种方法可以使代码更加灵活和可维护，因为它允许我们在不修改原始对象的情况下扩展其功能。

## 策略模式

策略模式是一种行为设计模式，它允许我们定义一系列算法，并将它们封装在独立的类中，以使它们可以相互替换。在JavaScript中，策略模式可以通过使用对象字面量和函数来实现。

以下是JavaScript中策略模式的示例实现：
```javascript
const strategies = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

function calculate(strategy, a, b) {
  return strategies[strategy](a, b);
}

console.log(calculate('add', 2, 3)); // logs 5
console.log(calculate('subtract', 5, 3)); // logs 2
console.log(calculate('multiply', 2, 3)); // logs 6
console.log(calculate('divide', 6, 3)); // logs 2
```
在这个示例中，我们定义了一个名为strategies的对象，它包含了一系列算法，每个算法都是一个函数。我们还定义了一个名为calculate的函数，它接受一个策略名称、两个数字作为参数，并返回策略函数的结果。最后，我们使用calculate函数来执行不同的算法，并打印结果。

策略模式的核心思想是将算法封装在独立的类中，以使它们可以相互替换。这种方法可以使代码更加灵活和可维护，因为它允许我们在运行时动态地选择算法，并且不需要修改调用算法的代码。

