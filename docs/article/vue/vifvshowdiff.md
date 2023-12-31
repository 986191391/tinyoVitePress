# v-show / v-if 的区别

- v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

值得注意的是：<br>
v-if操作的是dom，通过对dom的插入和删除来控制元素的显示。<br>
v-show则通过操作元素的css的display属性来控制元素的显示。


所以，v-if和v-show都会触发页面的`回流`。

----

### 回流和重绘

回流必将引起重绘，而重绘不一定会引起回流

- 当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。<br>
- 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。


|         | opacity           | visibility          | display            |
| ------------- |:-------------:|:-------------:|:-------------:|
| 回流      | 否 | 否 | 是 |
| 重绘      | 是 | 是 | 是 |