# 递归

1. 实现斐波那契数列。
即[1, 1, 2, 3, 5, 8, 13, 21]

```js
function fibonacci(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;
  return fibonacci(n - 2) + fibonacci(n - 1)
}
```

2. 进阶版本，给以上 fibonacci 函数添加缓存。

```js
function createFibonacci() {
  let cache = [1, 1];
  return function fibonacci(n) {
    if (cache[n]) return cache[n];
    const result = fibonacci(n - 2) + fibonacci(n - 1);
    cache[n] = result;
    return result;
  }
}

const fibonacci = createFibonacci();
```

3. 台阶，每次可以走1步或2步或3步，求第n步时有多少种走法。
```js
function getStepNumber(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (n === 3) return 4;
  return getStepNumber(n - 3) + getStepNumber(n - 2) + getStepNumber(n - 1);
}
```

4. 阶乘计算：编写一个函数，接受一个正整数作为输入，并返回该数的阶乘。要求使用递归来解决该问题。
```js
function deep(n) {
  if (n === 1) return 1;
  return n + deep(n - 1)
}
```


5. 快速排序
```js
function quickSort(arr) {
  const midNum = arr.splice(Math.floor(arr.length / 2), 1)[0];
  let leftArr = [];
  let rightArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midNum) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }
  return quickSort(leftArr).concat(midNum, quickSort(rightArr));
}
```

6. 目录树遍历：给定一个目录结构的根节点，每个节点包含名称和子目录的数组。编写一个函数来遍历整个目录树，并打印出所有文件的路径。要求使用递归来解决该问题。
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

```js
function traverseDirectory(root, folder = '') {
  if (root.isFile) return console.log(folder + root.name)
  root.children.forEach((itm) => {
    traverseDirectory(itm, folder + itm.name + '/')
  })
}
```