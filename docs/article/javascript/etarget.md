# e.target 和 e.currentTarget 的区别

`e.target` 和 `e.currentTarget` 是事件对象（Event Object）中的两个属性，用于获取触发事件的元素和当前绑定事件处理程序的元素。它们的区别如下：

1. e.target：表示触发事件的最具体的（原始）目标元素。它指向实际触发事件的元素，即用户进行交互的元素。

2. e.currentTarget：表示当前正在处理事件的元素，即绑定事件处理程序的元素。它始终指向绑定事件处理程序的元素，不会随事件冒泡而改变。

用一个事件委托的例子来看，马上就能明白：

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```
```js
var list = document.getElementById("list");

function handleClick(event) {
  console.log("target:", event.target.textContent);
  console.log("currentTarget:", event.currentTarget.id);
}

list.addEventListener("click", handleClick);
```
当点击列表`Item 1`项时，控制台会输出以下结果：
```
target: Item 1
currentTarget: list
```

这表明 `e.target` 是指向触发事件的最具体目标元素，即被点击的 `<li>` 元素。而 `e.currentTarget` 是指向当前绑定事件处理程序的元素，即 `<ul>` 元素。