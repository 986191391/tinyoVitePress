# 手写简易Promise

Promise有三个状态，一开始是pending，成功后为fulfilled，失败后为rejected。


## 第一步 实现基本架构resolve和reject
```js
class MyPromise {
    constructor(executor) {
        this._state = 'pending';
        this._value = undefined;
        executor(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(value) {
        this._state = 'fulfilled';
        this._value = value ;
    }

    _reject(reason) {
        this._state = 'rejected';
        this._value = reason;
    }
}


const myPro = new MyPromise((resolve, reject) => {
    resolve(111);
})

console.log(myPro)
```

## 第二步 封装与优化

1. 抽离一些公用的变量
2. 定义公用的修改状态方法
3. 在修改状态的同时判断状态是否已经更改(promise的状态只可改变一次)。
4. 捕获promise执行的同步代码报错，同时修改为rejected状态。
```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        this._state = PENDING;
        this._value = undefined;
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject, error)
        }
    }

    _resolve(value) {
        this._changeState(FULFILLED, value);
    }

    _reject(reason) {
        this._changeState(REJECTED, reason);
    }

    _changeState(newState, value) {
        if (this._state !== PENDING) {
            return;
        }
        this._state = newState;
        this._value = value;
    }
}
```

## 第三步 微队列函数封装

因为promise.then的方法的回调函数会包装成任务放入到微队列中，所以我们要考虑如何封装一个微队列函数来提供给then函数使用。

1. 引入js可以运行在node和浏览器环境，所以需要同时考虑。
2. node环境的process.nextTick方法可以将callback放入到微任务队列中。
3. 浏览器环境的MutationObserver可以将callback放入到微任务队列中，但需要判断兼容性。
4. 如果都不支持，则用setTimeout最终替补方案。

```js
function runMicroTask(callback) {
    // 判断是否为node环境
    if (process && process.nextTick) {
        process.nextTick(callback);
    } else if (MutationObserver){
        // 判断浏览器环境是否支持MutationObserver
        const p = document.createElement('p');
        const observer = new MutationObserver(callback);
        observer.observe(p, {
            children: true // 观察元素内部变化
        });
        p.innerHTML = '1';
    } else {
        setTimeout(callback, 0)
    }
}
```

## 第四步 then函数基本架构


需要思考的点是：
1. 在编写了一系列的then方法后，then方法内的回调函数会存放在一个队列中，当promise的状态发生改变后，根据状态调度执行。
2. 为了让then方法可以一直调用then，所以在then方法内部实际是返回了一个新的promise。
3. then方法内部返回的promise也需要根据前一个任务的状态来执行，从而改变自身的状态，才能使下一个then执行。
4. 所以在往队列中插入方法时，需要将成功和失败的可能性都传入，在执行时根据状态来判断。

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


function runMicroTask(callback) {
    // ...
}

class MyPromise {
  constructor(executor) {
      this._state = PENDING;
      this._value = undefined;
      this.handlers = [];
      try {
          executor(this._resolve.bind(this), this._reject.bind(this));
      } catch (error) {
          this._reject(error)
      }
  }

  then (onFulfilled, onRejected) {
      // promise可以一直执行then操作，所以返回一个promise本身
      return new MyPromise((resolve, reject) => {
          this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
          this._pushHandler(onRejected, REJECTED, resolve, reject);
      });
  }

  _pushHandler(executor, state, resolve, reject) {
      this.handlers.push({
          executor,
          state,
          resolve,
          reject
      });
  }

  _resolve(value) {
      this._changeState(FULFILLED, value);
  }

  _reject(reason) {
      this._changeState(REJECTED, reason);
  }

  _changeState(newState, value) {
      if (this._state !== PENDING) {
          return;
      }
      this._state = newState;
      this._value = value;
  }
}

const pro = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 0)
})


pro.then(function A() {}, function B() {})
pro.then(function C() {}, function D() {})

console.log('pro', pro)
```


## 第五步 执行队列

1. 状态发生改变后，开始执行队列里的方法

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


function runMicroTask(callback) {
    // 判断是否为node环境
    if (process && process.nextTick) {
        process.nextTick(callback);
    } else if (MutationObserver){
        // 判断浏览器环境是否支持MutationObserver
        const p = document.createElement('p');
        const observer = new MutationObserver(callback);
        observer.observe(p, {
            children: true // 观察元素内部变化
        });
        p.innerHTML = '1';
    } else {
        setTimeout(callback, 0)
    }
}

function isPromise(obj) {
    return !!(obj && typeof obj === 'object' &&  typeof obj.then === 'function');
}

class MyPromise {
    constructor(executor) {
        this._state = PENDING;
        this._value = undefined;
        this.handlers = [];
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error)
        }
    }

    then (onFulfilled, onRejected) {
        // promise可以一直执行then操作，所以返回一个promise本身
        return new MyPromise((resolve, reject) => {
            this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
            this._pushHandler(onRejected, REJECTED, resolve, reject);
            this._runHandler(); // 判断状态改变，执行
        });
    }

    _pushHandler(executor, state, resolve, reject) {
        this.handlers.push({
            executor,
            state,
            resolve,
            reject
        });
    }

    _runHandler() {
        while(this.handlers[0]) {
            this._runOneHandler(this.handlers[0]);
            this._handlers.shift();
        }
    }

    _runOneHandler({ executor, state, resolve, reject }) {
        runMicroTask(() => {
            if (state !== this._state) {
                return;
            }
            if (typeof executor !== 'function') {
                this._state === FULFILLED
                ? resolve(this._value)
                : reject(this._value)
                return
            }
            try {
                const result = executor(this._value);
                if (isPromise(result)) {
                    result.then(resolve, reject);
                } else {
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    _resolve(value) {
        this._changeState(FULFILLED, value);
    }

    _reject(reason) {
        this._changeState(REJECTED, reason);
    }

    _changeState(newState, value) {
        if (this._state !== PENDING) {
            return;
        }
        this._state = newState;
        this._value = value;
        this._runHandler(); // 状态改变，执行
    }
}
```