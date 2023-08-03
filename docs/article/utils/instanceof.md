# instanceof 原理


手写一个instanceof方法，更好的理解实现的基本原理。

当使用 instanceof 判断一个对象实例的构造函数时，只要是在实例的原型链上的构造函数，instanceof 都返回true

```js
function instanceof(left, right) {
  left = left.__proto__
  while(true) {
    if (left === undefined || left === null) return false;
    if (left === right.prototype) return true;
    left = left.__proto__
  }
}
```