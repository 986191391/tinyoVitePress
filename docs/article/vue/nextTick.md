# Vue.$nextTick



源码：
```js
const callbacks = []
let pending = false
let timerFunc

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

从上诉的代码中可以看出，在一个 vue 示例方法中，多次调用 nextTick 方法，会按顺序将 nextTick 的回调函数放入到 callbacks 数组中。定义了一个 pending 变量来控制 nextTick 的执行。



```js
// timerFunc 函数
// 根据浏览器的兼容性，将timerFunc变量最终设置为符合当前环境执行的方法。
export let isUsingMicroTask = false
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  //判断1：是否原生支持Promise
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  //判断2：是否原生支持MutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  //判断3：是否原生支持setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  //判断4：上面都不行，直接用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```
做了一些兼容性的判断，对当前环境进行不断的降级处理。会先判断浏览器是否支持使用微任务的方式创建，最后再判断 setImmediate 和 setTimeout。最终将 timerFunc 函数设置为执行函数，同时调用flushCallbacks函数。

```js
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```
在flushCallbacks函数中，拷贝了一份callbacks数组后将其置为空，最后依次执行拷贝的数组中的函数，即传入的回调函数。