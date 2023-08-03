# 超时功能 Fetch

封装一个带超时功能的fetch方法。

```js
function newFetch(url, options, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const signalController = new AbortController();
    fetch(url, {
      ...options,
      signal: signalController.signal
    }).then((resolve, reject));
    setTimeout(() => {
      reject(new Error('timeout'));
      signalController.abort();
    }, timeout)
  })
}
```