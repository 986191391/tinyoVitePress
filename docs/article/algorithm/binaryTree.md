# 二叉树

此处先定义一个二叉树节点的构造函数
```js
class TreeNode {
  constroctor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log('root', root);

// root TreeNode {
//   val: 1,
//   left: TreeNode {
//     val: 2,
//     left: TreeNode { val: 4, left: null, right: null },
//     right: TreeNode { val: 5, left: null, right: null }
//   },
//   right: TreeNode { val: 3, left: null, right: null }
// }
```

## 实现二叉树的前中后序遍历

前序 -> 根左右<br>
中序 -> 左根右<br>
后序 -> 左右根

前序遍历

```js
function preorderTraversal(root) {
  if (root === null) return null;

  let result = [];
  result.push(root.val);
  if (root.left) result.push(...preorderTraversal(root.left));
  if (root.right) result.push(...preorderTraversal(root.right));
  
  return result;
}

console.log(preorderTraversal(root)); // [1, 2, 4, 5, 3]
```

中序遍历

```js
function inorderTraversal(root) {
  if (root === null) return null;

  let result = [];
  if (root.left) result.push(...inorderTraversal(root.left));
  result.push(root.val);
  if (root.right) result.push(...inorderTraversal(root.right));
  
  return result;
}

console.log(inorderTraversal(root)); // [4, 2, 5, 1, 3]
```

后序遍历

```js
function postorderTraversal(root) {
  if (root === null) return null;

  let result = [];
  if (root.left) result.push(...postorderTraversal(root.left));
  if (root.right) result.push(...postorderTraversal(root.right));
  result.push(root.val);
  
  return result;
}

console.log(postorderTraversal(root)); // [4, 5, 2, 3, 1]
```

## 计算二叉树的最大深度

```js
function getTreeDepth(root) {
  if (root === null) return 0;

  return Math.max(getTreeDepth(root.left) + getTreeDepth(root.right)) + 1
}
```


## 判断当前二叉树是否为平衡二叉树

平衡二叉树条件：
1. 对于任意一个节点，它的左子树和右子树的高度差不超过 1。
2. 左子树和右子树本身也都是平衡二叉树。

注意：
1. 在平衡二叉树的定义中，空节点（null）被认为是平衡的。

```js
function isBalanced(root) {
  if (root === null) return true;

  const leftHeight = getHeight(root.left);
  const rightHeight = getHeight(root.right);
  if (Math.abs(leftHeight - rightHeight) > 1) return false;

  return isBalanced(root.left) && isBalanced(root.right);
}

function getHeight(root) {
  if (root === null) return 0;

  return Math.max(getHeight(root.left), geiHeight(root.right)) + 1
}

```

## 路径总合

给定一个二叉树和一个目标值，判断是否存在从根节点到叶子节点的路径，使得路径上所有节点值的和等于目标值。

```js
// 1
function checkPath(root, target) {
  function loop(root, val = 0) {
    if (root === null) return false;
    let total = root.val + val;
    if (total === target) return true;

    return loop(root.left, total) || loop(rooot.right, total);
  }
  return loop(root);
}

// 2
function checkPath(root, target) {
  if (root === null) return false;
  if (root.val === target) return true;
  return checkPath(root.left, target - root.val) || checkPath(root.right, target - root.val)
}
```

<!-- ## 计算二叉树中路径节点值之和的最大值

```js
function getTreeTotalMax(root) {
  let max = 0;
  function loop(root, total = 0) {
    if (root === null) return;
    const curVal = root.val + total;
    if (curVal > max) {
      max = curVal
    }
    loop(root.left, curVal);
    loop(root.right, curVal);
  }
  loop(root);
  return max;
}

function maxPathSum(root) {
  if (root === null) return 0;

  return Math.max(maxPathSum(root.left), maxPathSum(root.right)) + root.val;
}
``` -->

