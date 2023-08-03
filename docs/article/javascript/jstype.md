# JS类型比较

源于我一次面试中被问到答不上来， 我决定专门写一遍来加深我的印象

```javascript
typeof NaN // number

undefined == false // false  NaN不等于任何值

1 + undefined // NaN
```

摸清它的原因吧！



## NaN
NaN 不等于任何值，包括他自己
```javascript
NaN == NaN // false
NaN === NaN // false
```
但是用typeof对NaN进行类型判断的时候 发现NaN属于Number类型
```javascript
typeof NaN // number
```
NaN加任何 数值 都为NaN

```javascript
NaN + 1 // NaN
NaN + true // NaN
NaN + 'asd' // 'NaNasd'
```


## 在 String / Numer /  Boolean / Undefined 之间进行比较
这一类情况会将他们的值转换成number类型来进行判断，看下面几个例子

```javascript
'' == 0 // true          ''转为number后是0 
'123' == 123 // true     '123'转为number后是123
'asd' == 1 // false      'asd'转为number后为NaN
'asd' == true // false   'asd'转为number后为NaN 
'' == true // false      ''转为number后是0 true转为number后是1
'1' == true // true		 '1'转为number后是1 true转为number后是1
undefined == 0 // false  undefined转为number后是NaN
undefined == 'undefined' // false  undefined转为number后是NaN 'undefined'转为number后是NaN NaN不等于它本身
```


## undefined 与 null
[阮一峰 - undefined与null](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)
```javascript
typeof undefined // undefined
typeof null // object

undefined == null // true
undefined === null // false 

undefined + 1 // NaN   
null + 1 // 1
```



## Boolean / String / Number 与 Object / Array 进行比较时
引用数据类型的比较，是拿指针进行比较的咯，如果两个变量的指针指向同一片内存地址，那么他们肯定相等，看例子：

```javascript
[] == []; // false
[] === []; // false

let arr = [1, [2, 3], 4];
let a = arr[1];
let b = arr[1];
let c = [2, 3];
a == b // true
a == c // false
```


规则：在判断 Object和Array 的时候，先调用对象的valueOf方法，以期待返回一个标量，如果对象的valueOf方法返回的仍然是一个复合对象的话，就接着调用对象的toString方法以期待返回一个标量，如果仍然没有返回标量的话，就判为不相等

看下面的例子：

```javascript
let a = {};
a.valueof(); // {}
a.toString(); // "[object Object]"
```
输出一下你就会发现

```javascript
a == "[object Object]" // true
```
---
再来一个数组的看看

```javascript
let arr = [1, 2, 3];
arr.valueOf(); // [1, 2, 3]
arr.toString(); // '1,2,3'

arr == '1,2,3' // true

let arr2 = [];
arr2.valueOf(); // []
arr2.toString(); // ''

arr2 == '' // true
```
知道了这个有什么用呢，那你再看看这个，你觉得应该输出什么呢

```javascript
1 == [1] // ? 你觉得应该输出什么呢
```
它的流程应该是这样的，[1] 是引用数据类型，会先根据上面的规则进行一个转换。

```javascript
[1].valueOf(); // [1]
[1].toString(); // '1'
```
发现最后toString() 返回了一个标量，就拿着这个标量接着进行下面的比较

```javascript
1 == '1'
```
到了这一步就发现它变成了 数值和字符串的比较，又运用到 **第二步** 的规则了，全部转换成number类型，
自然它就相等了！ 返回的结果为true







