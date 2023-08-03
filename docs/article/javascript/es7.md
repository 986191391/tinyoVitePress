# ES7 引入了什么

## Array.prototype.includes

`includes` 方法用于判断数组是否包含某个元素，并返回布尔值。它可以替代 `Array.prototype.indexOf` 方法，更加直观和易读。
```javascript
const array = [1, 2, 3, 4, 5];

console.log(array.includes(3)); // 输出: true
console.log(array.includes(6)); // 输出: false
```

## 指数运算符（Exponentiation Operator）

`**` 运算符用于进行指数运算。
```javascript
console.log(2 ** 3); // 输出: 8 (2 的 3 次方)
```

## Object.entries/Object.values

`Object.entries` 方法返回一个给定对象可枚举属性的键值对数组，而 `Object.values` 方法返回一个给定对象可枚举属性的值数组。
```javascript
const obj = { a: 1, b: 2, c: 3 };

console.log(Object.entries(obj)); // 输出: [["a", 1], ["b", 2], ["c", 3]]
console.log(Object.values(obj)); // 输出: [1, 2, 3]
```

## async/await
ES7 引入了用于处理异步操作的 async 和 await 关键字。async 关键字用于声明一个异步函数，await 关键字用于等待一个 Promise 对象的解决结果。
```javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

getData().then(data => {
  console.log('Data:', data);
});
```







