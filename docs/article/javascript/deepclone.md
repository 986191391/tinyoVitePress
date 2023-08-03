# 实现一个深拷贝函数

这个问题是笔试面试高频出现的题目，也是我们实际开发中常见的问题。要实现一个深拷贝函数，我们首先得理解什么是深拷贝，什么是浅拷贝。

**浅拷贝** 是指创建一个新对象的过程，该新对象是现有对象的副本，新对象的属性、引用与原始对象相同。

**深拷贝** 是一种创建新对象的技术，新对象是现有对象的精确副本。这包括复制其所有属性和任何嵌套对象，而不是引用。当您需要两个不共享引用的独立对象时，深拷贝很有用，可确保对一个对象的更改不会影响另一个对象。

下面的例子来实现一个简单的深拷贝函数：



- 序列化

```js
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
```


- 递归
```js
function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;

    const newObj = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key]);
        }
    }

    return newObj;
}
```