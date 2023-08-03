# 如何处理 Node.js 中未捕获的异常

1. 全局异常处理器（uncaughtException）

Node.js 提供了 uncaughtException 事件来捕获未被捕获的异常。你可以在应用程序的入口点或主模块中添加一个全局异常处理器来处理未捕获的异常。例如：
```js
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // 在此处进行日志记录、清理资源等操作
  process.exit(1); // 可以选择退出应用程序
});
```
在使用全局异常处理器时，应该谨慎处理异常，以确保应用程序的状态和资源正常处理。


2. Promise 的错误处理（catch）

如果你在代码中使用了 Promise，并且忘记了捕获错误，那么错误将成为未捕获的异常。为了处理这种情况，你应该在每个 Promise 链中使用 .catch() 方法来捕获和处理错误。

```js
somePromise()
  .then((result) => {
    // 处理 Promise 成功的情况
  })
  .catch((error) => {
    console.error('Promise Error:', error);
    // 在此处进行日志记录、清理资源等操作
  });
```

3. 异步函数的错误处理（try/catch）

如果你在异步函数中使用了 try/catch 块，那么可以捕获并处理函数内部的异常。但要注意，try/catch 块只能捕获同步部分的异常，不能捕获异步操作的异常。
```js
async function someAsyncFunction() {
  try {
    // 异步操作
  } catch (error) {
    console.error('Async Function Error:', error);
    // 在此处进行日志记录、清理资源等操作
  }
}
```
当使用 await 关键字调用异步操作时，如果发生错误，它将被抛出并被 try/catch 块捕获。


