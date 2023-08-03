# JS 笔试题

笔试题是gpt给我出的。上面统一放题目，想要题目和答案一起看的可以往下滚动。

## 简单难度
1. 编写一个函数，接受一个字符串作为参数，并返回该字符串的反转结果。例如，输入"Hello World!"，输出"!dlroW olleH"。
2. 编写一个函数，接受一个数组作为参数，将数组中的元素按照从小到大的顺序进行排序，并返回排序后的数组。例如，输入[5, 3, 8, 2, 1]，输出[1, 2, 3, 5, 8]。
3. 编写一个函数，接受一个数字作为参数，并判断该数字是否为素数。素数是只能被 1 和自身整除的数字。例如，输入 7，返回 true；输入 12，返回 false。
4. 编写一个函数，接受一个数组作为参数，并返回数组中的最大值和最小值。例如，输入[2, 5, 1, 9, 3]，返回最大值 9 和最小值 1。
5. 编写一个函数，接受一个字符串作为参数，判断该字符串是否是回文。回文是指正向和反向拼写都相同的单词、短语或数字序列。例如，输入"level"，返回 true；输入"hello"，返回 false。

## 中等难度
6. 编写一个函数，接受一个字符串作为参数，并返回字符串中出现次数最多的字符及其出现次数。如果存在多个字符出现次数相同且最多，则返回任意一个即可。例如，输入"abbcccddddeeeee"，返回 { char: 'e', count: 5 }。
7. 编写一个函数，接受一个数组作为参数，返回一个新数组，其中的元素是原数组中的偶数，并且按照从小到大的顺序排列。例如，输入[3, 8, 2, 1, 6, 4]，返回 [2, 4, 6, 8]。
8. 编写一个函数，接受一个字符串作为参数，判断该字符串是否是有效的括号序列。有效的括号序列指的是括号的开闭顺序正确且嵌套规则正确。例如，输入"()[]{}"，返回 true；输入"([)]"，返回 false。
9. 编写一个函数，接受一个正整数作为参数，返回一个包含斐波那契数列的数组，数组的长度为该正整数。斐波那契数列是指后一个数字是前两个数字之和的数列。例如，输入 8，返回 [0, 1, 1, 2, 3, 5, 8, 13]。
10. 编写一个函数，接受一个字符串作为参数，返回一个新的字符串，其中的单词以相反的顺序排列，但单词内部的字符顺序不变。例如，输入"The quick brown fox"，返回 "ehT kciuq nworb fox"。
11. 编写一个函数，接受一个字符串作为参数，并返回一个新字符串，其中的每个单词的首字母都转换为大写。例如，输入"hello world"，返回 "Hello World"。
12. 编写一个函数，接受一个二维数组作为参数，将其转换为一个一维数组，并且保持原数组中所有元素的顺序不变。例如，输入[[1, 2], [3, 4], [5, 6]]，返回 [1, 2, 3, 4, 5, 6]。
13. 编写一个函数，接受一个正整数作为参数，并返回该正整数的阶乘结果。阶乘是指从 1 到该正整数的所有整数的乘积。例如，输入 5，返回 120（1 * 2 * 3 * 4 * 5）。
14. 编写一个函数，接受一个字符串作为参数，并返回该字符串中最长的连续数字串。如果存在多个最长的连续数字串，则返回第一个遇到的。例如，输入"abcd12345efgh6789"，返回 "12345"。

## 困难难度
15. 编写一个函数，接受一个整数数组和一个目标值作为参数，在数组中找到两个数，使它们的和等于目标值，并返回这两个数的索引。假设每个输入只有一个正确答案，并且同一个元素不能使用两次。例如，输入数组 [2, 7, 11, 15]，目标值为 9，那么函数应该返回 [0, 1]。
16. 编写一个函数，接受一个整数数组作为参数，并返回数组中乘积最大的连续子数组的乘积。例如，输入数组 [2, 3, -2, 4]，最大乘积的连续子数组是 [2, 3]，乘积为 6。
17. 实现一个函数 findLongestPalindrome，接受一个字符串作为参数，并返回该字符串中最长的回文子串。回文子串是指正序和倒序读都相同的字符串片段。例如，输入字符串 "babad"，函数应该返回 "bab" 或 "aba"。
18. 实现一个函数 uniquePaths，接受两个正整数 m 和 n 作为参数，表示一个 m x n 的网格。从网格的左上角出发，每次只能向下或向右移动一步，到达网格的右下角。函数应该返回从起始位置到达终点位置的不同路径数量。例如，对于 m = 3，n = 2，函数应该返回 3，因为有三种不同的路径：向下、向右、向右。


## 递归
19. 阶乘计算：编写一个函数，接受一个正整数作为输入，并返回该数的阶乘。要求使用递归来解决该问题。
20. 斐波那契数列：编写一个函数，接受一个正整数 n 作为输入，并返回斐波那契数列的第 n 个数。斐波那契数列中的每个数都是前两个数的和。要求使用递归来解决该问题
21. 二叉树遍历：给定一个二叉树的根节点，编写三个函数来实现其前序遍历、中序遍历和后序遍历。要求使用递归来解决该问题。
22. 目录树遍历：给定一个目录结构的根节点，每个节点包含名称和子目录的数组。编写一个函数来遍历整个目录树，并打印出所有文件的路径。要求使用递归来解决该问题。
```js
// 示例目录结构
const directory = {
  name: 'Root',
  isFile: false,
  children: [
    {
      name: 'Folder 1',
      isFile: false,
      children: [
        { name: 'File 1', isFile: true },
        { name: 'File 2', isFile: true },
      ],
    },
    {
      name: 'Folder 2',
      isFile: false,
      children: [
        { name: 'File 3', isFile: true },
        { name: 'File 4', isFile: true },
      ],
    },
  ],
};

// traverseDirectory(directory);
// 输出：
// Root/Folder 1/File 1
// Root/Folder 1/File 2
// Root/Folder 2/File 3
// Root/Folder 2/File 4
```
23. 汉诺塔问题：汉诺塔是一种经典的问题，包括三个塔和一些盘子，每个盘子的大小不同。目标是将所有盘子从一个塔移动到另一个塔，同时遵循以下规则：每次只能移动一个盘子，大盘子不能放在小盘子上面。编写一个函数来解决汉诺塔问题。要求使用递归来解决该问题。



## 题目合答案
1. 编写一个函数，接受一个字符串作为参数，并返回该字符串的反转结果。例如，输入"Hello World!"，输出"!dlroW olleH"。
```js
function strReserve(str) {
  return str.split('').reserve().join('');
}
```

2. 编写一个函数，接受一个数组作为参数，将数组中的元素按照从小到大的顺序进行排序，并返回排序后的数组。例如，输入[5, 3, 8, 2, 1]，输出[1, 2, 3, 5, 8]。
```js
function arrSort(arr) {
  // x - y 输出[1, 2, 3, 5, 8]
  // y - x 输出[8, 5, 3, 2, 1]
  return arr.sore((x, y) => x - y);
}
```

3. 编写一个函数，接受一个数字作为参数，并判断该数字是否为素数。素数是只能被 1 和自身整除的数字。例如，输入 7，返回 true；输入 12，返回 false。
```js
function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(isPrime(7));  // 输出：true
console.log(isPrime(12));  // 输出：false
```

4. 编写一个函数，接受一个数组作为参数，并返回数组中的最大值和最小值。例如，输入[2, 5, 1, 9, 3]，返回最大值 9 和最小值 1。
```js
function getMinMaxNum(arr) {
  let min = arr[0];
  let max = arr[0];
  for (let key of  arr) {
    if (key < min) min = key;
    if (key > max) max = key;
  }
  return { max, min }
}
```

5. 编写一个函数，接受一个字符串作为参数，判断该字符串是否是回文。回文是指正向和反向拼写都相同的单词、短语或数字序列。例如，输入"level"，返回 true；输入"hello"，返回 false。
```js
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}
```

6. 编写一个函数，接受一个字符串作为参数，并返回字符串中出现次数最多的字符及其出现次数。如果存在多个字符出现次数相同且最多，则返回任意一个即可。例如，输入"abbcccddddeeeee"，返回 { char: 'e', count: 5 }。
```js
function mostFrequentChar(str) {
  const numObj = {};
  let count = 0;
  let char = '';

  for (let key of str) {

    numObj[key] = (numObj[key] || 0) + 1;
    if (numObj[key] > count) {
      count = numObj[key];
      char = key;
    }
  }
  return { char, count }
}
```

7. 编写一个函数，接受一个数组作为参数，返回一个新数组，其中的元素是原数组中的偶数，并且按照从小到大的顺序排列。例如，输入[3, 8, 2, 1, 6, 4]，返回 [2, 4, 6, 8]。
```js
function oddSort(arr) {
  return arr.filter(i => !(i % 2)).sort((x, y) => x - y);
}
```

8. 编写一个函数，接受一个字符串作为参数，判断该字符串是否是有效的括号序列。有效的括号序列指的是括号的开闭顺序正确且嵌套规则正确。例如，输入"()[]{}"，返回 true；输入"([)]"，返回 false。
```js
function isValidParentheses(str) {
  const stack = [];
  const parenthesesMap = {
    '(': ')',
    '[': ']',
    '{': '}'
  };

  for (let char of str) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      const top = stack.pop();

      if (char !== parenthesesMap[top]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(isValidParentheses("()[]{}"));  // 输出：true
console.log(isValidParentheses("([)]"));  // 输出：false
```

9. 编写一个函数，接受一个正整数作为参数，返回一个包含斐波那契数列的数组，数组的长度为该正整数。斐波那契数列是指后一个数字是前两个数字之和的数列。例如，输入 8，返回 [0, 1, 1, 2, 3, 5, 8, 13]。
```js
function fibonacciSequence(num) {
  if (num === 0) return [];
  if (num === 1) return [0];
  let retArr = [0, 1];
  for(let i = 2; i < num; i++) {
    retArr.push(retArr[i - 1] + retArr[i - 2]);
  }
  return retArr;
}
```


10. 编写一个函数，接受一个字符串作为参数，返回一个新的字符串，其中的单词以相反的顺序排列，但单词内部的字符顺序不变。例如，输入"The quick brown fox"，返回 "ehT kciuq nworb fox"。
```js
function reverseWords(str) {
  return str.split(' ').map(word => word.split('').reverse().join('')).join(' ');
}

console.log(reverseWords("The quick brown fox"));  // 输出："ehT kciuq nworb xof"
```

11. 编写一个函数，接受一个字符串作为参数，并返回一个新字符串，其中的每个单词的首字母都转换为大写。例如，输入"hello world"，返回 "Hello World"。
```js
function capitalizeWords(str) {
  return str.replace(/\b\w/g, match => match.toUpperCase());
}

console.log(capitalizeWords("hello world"));  // 输出："Hello World"
```
正则表达式 `/\b\w/g` 的含义是匹配单词的首字母。

`\b` 是一个单词边界的元字符，用于匹配单词的开始或结束位置。
`\w` 是一个字符类元字符，匹配任意字母、数字或下划线。
所以，`/\b\w/g` 的正则表达式会匹配字符串中的每个单词的首字母。


12. 编写一个函数，接受一个二维数组作为参数，将其转换为一个一维数组，并且保持原数组中所有元素的顺序不变。例如，输入[[1, 2], [3, 4], [5, 6]]，返回 [1, 2, 3, 4, 5, 6]。
```js
// GPT的答案是这样的, 我觉得还不是最简单的方法。
function flattenArray(arr) {
  return arr.reduce((result, current) => result.concat(current), []);
}
console.log(flattenArray([[1, 2], [3, 4], [5, 6]]));  // 输出：[1, 2, 3, 4, 5, 6]

// 我认为最简单的办法
function flattenArray(arr) {
  return arr.toString().spilit(',');
}

// 如果是多层级数组
function flattenArray(arr) {
  let flattened = [];
  
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      flattened = flattened.concat(flattenArray(element));
    } else {
      flattened.push(element);
    }
  });
  
  return flattened;
}
console.log(flattenArray([1, [2, 3], [4, 5, [6, 7, 8, [9, 10]]]]))
```


13. 编写一个函数，接受一个正整数作为参数，并返回该正整数的阶乘结果。阶乘是指从 1 到该正整数的所有整数的乘积。例如，输入 5，返回 120（1 * 2 * 3 * 4 * 5）。
```js
function factorial(n) {
  if (n <= 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

console.log(factorial(5));  // 输出：120
```


14. 编写一个函数，接受一个字符串作为参数，并返回该字符串中最长的连续数字串。如果存在多个最长的连续数字串，则返回第一个遇到的。例如，输入"abcd12345efgh6789"，返回 "12345"。

还是用的正则表达式啊，看来这个东西是又简便又好用，如果能学的很好可以很快的解决很多问题。
```js
function findLongestDigits(str) {
  const matches = str.match(/\d+/g);

  if (!matches) {
    return "";
  }

  return matches.reduce((longest, current) => {
    if (current.length > longest.length) {
      return current;
    }
    return longest;
  }, "");
}

console.log(findLongestDigits("abcd12345efgh6789"));  // 输出："12345"
```


15. 编写一个函数，接受一个整数数组和一个目标值作为参数，在数组中找到两个数，使它们的和等于目标值，并返回这两个数的索引。假设每个输入只有一个正确答案，并且同一个元素不能使用两次。例如，输入数组 [2, 7, 11, 15]，目标值为 9，那么函数应该返回 [0, 1]。

一般的思路肯定是写一个冒泡，遍历嵌套遍历记录index。可以实现当不用想都知道不是最优解法。
```js
function findTwoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }

  return [];
}

console.log(findTwoSum([2, 7, 11, 15], 9));  // 输出：[0, 1]
```

16. 编写一个函数，接受一个整数数组作为参数，并返回数组中乘积最大的连续子数组的乘积。例如，输入数组 [2, 3, -2, 4]，最大乘积的连续子数组是 [2, 3]，乘积为 6。
```js
// GPT的解法
function maxProduct(nums) {
  let maxProd = nums[0];
  let minProd = nums[0];
  let maxResult = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const curr = nums[i];
    const tempMax = Math.max(curr, maxProd * curr, minProd * curr);
    minProd = Math.min(curr, maxProd * curr, minProd * curr);
    maxProd = tempMax;
    maxResult = Math.max(maxResult, maxProd);
  }

  return maxResult;
}
console.log(maxProduct([2, 3, -2, 4]));  // 输出：6

// 我的解法
function a(arr) {
  let max = 0;
  for(let i = 0; i < arr.length - 1; i++) {
    const num = arr[i] * arr[i + 1];
    if (num > max) max = num;
  }
  return max;
}
console.log(a([2, 3, -2, 4]));  // 输出：6
```

17. 实现一个函数 findLongestPalindrome，接受一个字符串作为参数，并返回该字符串中最长的回文子串。回文子串是指正序和倒序读都相同的字符串片段。例如，输入字符串 "babad"，函数应该返回 "bab" 或 "aba"。

思路：<br>
- 遍历字符串中的每个字符，以当前字符为中心，向两侧扩展，查找回文子串。
- 考虑回文子串长度为奇数和偶数的情况，分别以单个字符和两个字符为中心进行扩展。
- 保持一个变量记录找到的最长回文子串，不断更新最长回文子串的值。
- 最后返回最长回文子串。

```js
function findLongestPalindrome(s) {
  let longestPalindrome = '';

  function expandFromCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }

    // 回文子串的长度为 right - left - 1
    const length = right - left - 1;

    if (length > longestPalindrome.length) {
      longestPalindrome = s.slice(left + 1, right);
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandFromCenter(i, i); // 以单个字符为中心
    expandFromCenter(i, i + 1); // 以两个字符为中心
  }

  return longestPalindrome;
}

console.log(findLongestPalindrome("babad"));  // 输出："bab"
```


18. 实现一个函数 uniquePaths，接受两个正整数 m 和 n 作为参数，表示一个 m x n 的网格。从网格的左上角出发，每次只能向下或向右移动一步，到达网格的右下角。函数应该返回从起始位置到达终点位置的不同路径数量。例如，对于 m = 3，n = 2，函数应该返回 3，因为有三种不同的路径：向下、向右、向右。

```js
function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    dp[i][0] = 1; // 第一列的路径数量都为 1
  }

  for (let j = 0; j < n; j++) {
    dp[0][j] = 1; // 第一行的路径数量都为 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]; // 状态转移方程
    }
  }

  return dp[m - 1][n - 1];
}

console.log(uniquePaths(3, 2));  // 输出：3

// 我的解法
function uniquePaths(m, n) {
  if (m < 1 || n < 1) return 0;
  if (m === 1 || n === 1) return 1;
  return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
}
```

19. 阶乘计算：编写一个函数，接受一个正整数作为输入，并返回该数的阶乘。要求使用递归来解决该问题。
```js
function deep(n) {
  if (n === 1) return 1;
  return deep(n - 1) * n;
}
```

20. 斐波那契数列：编写一个函数，接受一个正整数 n 作为输入，并返回斐波那契数列的第 n 个数。斐波那契数列中的每个数都是前两个数的和。要求使用递归来解决该问题
```js
//  1  1  2  3  5  8  13
function func(n) {
  if (n === 1) return 1;
  if (n === 2) return 1;
  return func(n - 2) + func(n - 1)
}

```

21. 二叉树遍历：给定一个二叉树的根节点，编写三个函数来实现其前序遍历、中序遍历和后序遍历。要求使用递归来解决该问题。
```js
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// 前序遍历
function preorderTraversal(root) {
  if (root === null) {
    return [];
  }
  const result = [];
  result.push(root.val);
  result.push(...preorderTraversal(root.left));
  result.push(...preorderTraversal(root.right));
  return result;
}

// 中序遍历
function inorderTraversal(root) {
  if (root === null) {
    return [];
  }
  const result = [];
  result.push(...inorderTraversal(root.left));
  result.push(root.val);
  result.push(...inorderTraversal(root.right));
  return result;
}

// 后序遍历
function postorderTraversal(root) {
  if (root === null) {
    return [];
  }
  const result = [];
  result.push(...postorderTraversal(root.left));
  result.push(...postorderTraversal(root.right));
  result.push(root.val);
  return result;
}

// 创建二叉树
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(preorderTraversal(root)); // 输出 [1, 2, 4, 5, 3]
console.log(inorderTraversal(root)); // 输出 [4, 2, 5, 1, 3]
console.log(postorderTraversal(root)); // 输出 [4, 5, 2, 3, 1]
```

22. 目录树遍历：给定一个目录结构的根节点，每个节点包含名称和子目录的数组。编写一个函数来遍历整个目录树，并打印出所有文件的路径。要求使用递归来解决该问题。
```js

// 示例目录结构
const directory = {
  name: 'Root',
  isFile: false,
  children: [
    {
      name: 'Folder 1',
      isFile: false,
      children: [
        { name: 'File 1', isFile: true },
        { name: 'File 2', isFile: true },
      ],
    },
    {
      name: 'Folder 2',
      isFile: false,
      children: [
        { name: 'File 3', isFile: true },
        { name: 'File 4', isFile: true },
      ],
    },
  ],
};

function traverseDirectory(node, path = '') {
  if (node.isFile) {
    console.log(path + node.name);
  } else {
    node.children.forEach((child) => {
      const newPath = path + node.name + '/';
      traverseDirectory(child, newPath);
    });
  }
}

traverseDirectory(directory);
// 输出：
// Root/Folder 1/File 1
// Root/Folder 1/File 2
// Root/Folder 2/File 3
// Root/Folder 2/File 4
```

23. 汉诺塔问题：汉诺塔是一种经典的问题，包括三个塔和一些盘子，每个盘子的大小不同。目标是将所有盘子从一个塔移动到另一个塔，同时遵循以下规则：每次只能移动一个盘子，大盘子不能放在小盘子上面。编写一个函数来解决汉诺塔问题。要求使用递归来解决该问题。
