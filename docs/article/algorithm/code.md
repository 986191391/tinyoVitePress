# 代码题

## 给定一个字符串 str ，只会出现 {}()[] 这6种字符，请实现一个函数判断这个字符串中的括号是否是匹配的。

```js
function isValidParentheses(str) {
  const compareObj = {
    ']': '[',
    '}': '{',
    ')': '('
  }
  let stack = [];
  for (let val of str) {
    if (val === '[' || val === '{' || val === '(') {
      stack.push(val);
    } else {
      if (compareObj[val] !== stack.pop()) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
```

## ab两个有序数组，a长度小于等于b，怎么判断a是不是b的子集

```js
function check(a, b) {
  let i = 0;
  let j = 0;
  while(i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
    } else if (a[i] > b[j]) {
      j++
    } else {
      return false
    }
  }
  return i >= a.length;
}
```

## 给定一个数组，每项的值可以为负数正数或0，得到连续子项相加的最大值。
例如 arr = [1, -5, 3, 6, -3, 9, -8, 2], 最大值为  3 + 6 + -3 + 9 = 15

```js
function getMax(arr) {
  let curMax = 0;
  let retMax = 0;
  for (let i = 0; i < arr.length; i++) {
    curMax = Math.max(arr[i], arr[i] + curMax);
    retMax = Math.max(curMax, retMax);
  }
  return retMax;
}
```

## 编写一个函数，接受一个二维数组作为参数，将其转换为一个一维数组，并且保持原数组中所有元素的顺序不变。例如，输入[[1, 2], [3, 4], [5, 6, [7, 8]]]，返回 [1, 2, 3, 4, 5, 6, 7, 8]。

```js

// 1.
function deconstructionArr(arr) {
  return arr.toString().split(',');
}

// 2.递归
function deconstructionArr(arr) {
  let retArr = [];
  arr.forEach((arrItm) => Array.isArray(arrItm) ? retArr.push(...deconstructionArr(arrItm)) : retArr.push(arrItm))
  return retArr;
}

```

## 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。

**回文字符串** 是正着读和倒过来读一样的字符串。

**子字符串** 是字符串中的由连续字符组成的一个序列。

```js
示例 1：

输入：s = "abc"
输出：3
解释：三个回文子串: "a", "b", "c"

---

示例 2：

输入：s = "aaa"
输出：6
解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
```

```js
function huiwen(str) {
  let retArr = [];
  let retNum = 0;
  for (let i = 0; i < str.length; i++) {
    for (let j = i; j < str.length; j++) {
      if (i === j) {
        retArr.push(str[j]);
        retNum = retNum + 1;
      } else {
        const splitStr = str.slice(i, j + 1);
        const reverseStr = splitStr.split('').reverse().join('');
        if (splitStr === reverseStr) {
          retArr.push(splitStr);
          retNum = retNum + 1;
        }
      }
    }
  }
  return {
    retArr,
    retNum
  }
}
```