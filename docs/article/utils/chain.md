# 实现链式调用函数

中高级的企业笔试题常常出现，尝试手写实现一下以下函数。要求如下：

```js

LazyMan('tinyo');
// Hi i am tinyo

LazyMan('tinyo').sleep(10).eat('lunch');
// Hi i am tinyo
// 等待10s
// i am eating lunch

LazyMan('tinyo').eat('lunch').sleep(10).eat('dinner');
// Hi i am tinyo
// i am eating lunch
// 等待10s
// i am eating dinner

LazyMan('tinyo').sleep(10).eat('dinner').sleepImmediate(20);
// 等待20s
// Hi i am tinyo
// 等待10s
// i am eating dinner
```

主要的思路就是设置一个队列将所有的任务排序后依次执行。

写法一：
```js
function LazyMan(name) {
  const stack = [];
  stack.push(() => {
    console.log(`Hi i am ${name}`);
    _self.next();
  })
  Promise.resolve().then(() => {
    _self.next();
  })
  const _self = {
    eat: function (food) {
      stack.push(() => {
        console.log(`i am eating ${food}`);
        this.next();
      })
      return this;
    },
    sleep: function (delay) {
      stack.push(() => {
        setTimeout(() => {
          console.log(`等待${delay}s`);
          this.next();
        }, delay)
      })
      return this;
    },
    sleepImmediate: function (delay) {
      stack.unshift(() => {
        setTimeout(() => {
          console.log(`等待${delay}s`);
          this.next();
        }, delay)
      })
      return this;
    },
    next: function () {
      const task = stack.shift();
      if (!task) return;
      task();
    }
  }
  return _self
}
```





写法二：

```js
class LazyMan {
  constructor(name) {
    this.stack = [];
    this.introduce(name);
    Promise.resolve().then(() => this.next())
  }

  introduce (name) {
    this.stack.push(() => {
      console.log(`Hi i am ${name}`);
      this.next();
    })
    return this;
  }

  sleep (delay) {
    this.stack.push(() => {
      setTimeout(() => {
        console.log(`等待${delay}s`)
        this.next();
      }, delay)
    })
    return this;
  }

  eat (food) {
    this.stack.push(() => {
      console.log(`i am eating ${food}`)
      this.next();
    })
    return this;v
  }

  sleepImmediate (delay) {
    this.stack.unshift(() => {
      setTimeout(() => {
        console.log(`等待${delay}s`)
        this.next();
      }, delay)
    })
    return this;
  }

  next () {
    const task = this.stack.shift();
    if (!task) return;
    task();
  }
}
```
