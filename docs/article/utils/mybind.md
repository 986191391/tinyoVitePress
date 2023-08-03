# 手写bind方法


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