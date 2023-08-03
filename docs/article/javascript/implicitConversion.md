# JS隐式转换与类型比较


## 隐式转换

隐式转换（Implicit Conversion）是指在表达式求值或操作中自动发生的类型转换。当使用不同的数据类型进行操作时，JavaScript 会自动进行类型转换以满足操作的要求。

隐式转换在编写逻辑时经常会出现，特别是在需要进行判断的逻辑场景中。举个例子：

```js
// 字符串和数字
var num = 42;
var str = "The answer is " + num; // 字符串拼接
console.log(str); // 输出 "The answer is 42"
var result = "3" - "1"; // 数字运算
console.log(result); // 输出 2

// 布尔值
if (1) {
console.log("条件为真"); // 1 被隐式转换为 true
}
var bool = !0; // 数字 0 被隐式转换为 false
console.log(bool); // 输出 false
```

需要注意的是，隐式转换虽然可以简化代码编写，但有时也可能导致意外的行为和错误。因此，当涉及类型转换时，建议使用显式转换（如 Number()、String()、parseInt() 等）来明确表达意图，使代码更加可读和可维护。


## 类型比较

使用`==`进行变量的比较时，不同类型的变量之间的比较会有变量的隐式转换的概念。

进行比较时通常会有几个步骤，先判断变量的类型是否相同，如果相同则直接判断值是否相同，如果不同则进行隐式的转换，转换的规则如下：

**一、基本数据类型的比较(String/Number/Boolean/undefined/null)**

- 第一步，将当前的变量值转换为Number类型的值
- 第二步，将转换后的变量值进行比较

```js
'23' == 23; // -> 23 == 23 -> true
'0' == false; // -> 0 == 0 -> true
'0' == undefined; // -> 0 == NaN -> false
'asd' == null; // -> NaN == NaN -> false
```
需要注意的是，不能转换为数字的值 / undefined / null最终都会变成NaN，而NaN是不等于任何值的，包括它自己。且以上规则不适用于null和undefined之间的比较。
`If x is null and y is undefined, return true` 规则就是如此。
```js
null == undefined; // true
null === undefined; // false
```


**二、引用数据类型的比较(Object/Array)**

此类数据类型的比较通常是判断指针的地址是否指向同一片内存空间，如果是的话则会返回true。
```js
const arr = [1, [2, 3], 4];
const copy1 = arr[1];
const copy2 = arr[1];
const copy3 = [2, 3];

copy1 == copy2; // true
copy1 == copy3; // false
```

**三、基本数据类型和引用数据类型之间的比较**

- 第一步：将引用数据类型的数据转换
- 第二步：将转换后的数据与基本数据类型进行比较

在第一步中，会先调用引用数据类型变量的valueOf方法，期待返回一个标量，如果没有返回标量，则继续执行数据的toString方法。将执行toString方法后得到的返回值与基本数据类型变量进行比较。

```js
const arr = [1];
arr == 1; // 猜测一下返回什么
// 调用valueOf方法，期待返回标量
arr.valueOf(); // [1]
// 返回的不是标量，继续执行toString方法，获取返回值
arr.toString(); // '1'

// 最后的比较就变成了如下
// 相当于变成了基本数据类型的比较
'1' == 1; // -> 1 == 1 -> true
```

再来深入理解一下
```js
const arr = [0];
arr == false;

arr.valueOf(); // [0]
arr.toString(); // '0'

'0' == false; // -> 0 == 0 -> true 
```
再使用对象试试
```js
const obj = { a: 1 };
obj == true;

obj.valueOf(); // { a: 1 }
obj.toString(); // '[object Object]'

// 最后的比较变成了如下代码
'[object Object]' == true; // -> NaN == 1 -> false
```
当然，如果对象返回了标量，结局就不同了。
```js
const obj = {
  a: 1,
  valueOf: () => 32
};
obj == '32';

// 返回了标量32，不再执行toString方法
obj.valueOf(); // 32

// 最后的比较变成了如下代码
32 == '32'; // -> 32 == 32 -> true
```

至此，是不是理解的更深了，领悟了以后面对各种类型判断都无需紧张了！




