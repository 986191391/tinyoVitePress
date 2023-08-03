# CSS 基本知识


## 水平居中的方法
[codepen例子](https://codepen.io/986191391/pen/oNYEzxd)
1. margin: 0 auto;
2. display: flex; justify-content: center;
3. position: absolute;
4. transform: translateX();


## 垂直方向居中

1. display: flex; align-items: center;
2. position: absolute; top: 50%; transform: translateY(50%);
3. display: grid; align-items: center;
4. height: 100px; line-height: 100px; // 只包含文本, 将高度设置为父元素高度

## dom元素消失的方法
1. 透明度 opacity: 0
2. 定位 position: absolute; top: -10000px
3. 宽高 width: 0px; height: 0px; overflow: hidden;
4. 缩放 transform: scale(0) // 或者位移到看不见的地方或者3d旋转到其他面
5. display: none
6. visibility: hidden

#### **opacity:0 / visibility: hidden / display: none 的区别是什么**
- opacity: 0
透明度设置为0, 该元素只是视觉上的消失了, 但实际还占用着区域, 区域中定义的方法仍然可以被触发, 例如click方法。不会触发重绘。
- visibility: hidden
与前者很相似, 同样也占用着区域，不一样的是该区域定义的方法是不能被触发的。浏览器会渲染visibility属性为hidden的元素。改变此属性时会引起重绘。
- display: none
与前面两项的差距比较大, 不但从视觉上消失了, 而且还不占用的区域。浏览器不会渲染display属性为none的元素。改变此属性时会引起回流(重排)。


## 什么是BFC
<!-- [BFC 参考文章](https://blog.csdn.net/sinat_36422236/article/details/88763187) -->

**BFC(Block formatting context): 称为块级格式化上下文**，是CSS中的一种渲染机制。是一个拥有独立渲染区域的盒子(也可以理解为结界)，规定了内部元素如何布局，并且盒子内部元素与外部元素互不影响。
画重点！*盒子内部元素与外部元素互不影响*。<br>
所以通过设置BFC可以解决很多问题，例如：清除浮动，上下容器margin值重叠的问题。

设置BFC的方式：
- float的值不为none。
- position的值不为static或者relative。
- display的值是inline-block、table-cell、flex、grid、table-caption或者inline-flex等
- overflow的值不为visible


**IFC (Inline Formatting Contexts)行内格式化上下文**

## Flex布局
参考：[Flex 布局教程：语法篇 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

当使用 flex 布局时，首先想到的是两根轴线 — 主轴和交叉轴。主轴由 flex-direction 定义，另一根轴垂直于它。我们使用 flexbox 的所有属性都跟这两根轴线有关。

主轴由 flex-direction 定义，可以取 4 个值：`row/row-reserve/column/column-reserve`。

交叉轴垂直于主轴，所以如果你的`flex-direction` (主轴) 设成了 `row` 或者 `row-reverse` 的话，交叉轴的方向就是沿着列向下的。如果主轴方向设成了 `column` 或者 `column-reverse`，交叉轴就是水平方向。

理解主轴和交叉轴的概念对于对齐 flexbox 里面的元素是很重要的；flexbox 的特性是沿着主轴或者交叉轴对齐之中的元素。



Flex作为当前最流行的布局, 是否了解它的所有属性了？

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。<br>
这一段描述就很好的解释了，为什么用flex定义的区域编写”超出部分省略号“不能生效，因为子元素也自动变成了flex item。

flex布局的基本属性在文章中很详细的解析了。最需要注意及面试官最喜欢问到的问题就是，flex: 1 属性是由哪些属性组成？

#### flex-grow属性
flex-grow属性定义项目的放大比例，`默认为0`，即如果存在剩余空间，也不放大。<br>
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

#### flex-shrink属性
flex-shrink属性定义了项目的缩小比例，`默认为1`，即如果空间不足，该项目将缩小。<br>
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，属性为0的项目不缩小。负值对该属性无效。

#### flex-basis属性
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。<br>
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

#### flex属性
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。


## CSS 盒模型

由 box-sizing 属性定义, 可选值为 content-box 和 border-box, 默认值为 content-box

-  标准盒模型 content-box
width 只等于内容区域，不包括border和padding
-  怪异(IE)盒模型 border-box
width = 内容区宽度 + border + padding


## CSS 权重
!important > 内联样式(1000) > id选择器(100) > class选择器(10) = 伪类选择器(10) = 属性选择器(10) > 元素选择器(1)

内联样式: 写在标签里的style<br>
id: id = “id-selector”<br>
class: class = “class-selector”<br>
伪类: .class-selector:first-child<br>
属性: a[href=“https://example.org”]<br>
元素: .class-selector > div

## em、rem、vw、vh、vmin、vmax 分别是做什么的?
em：相对长度单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值<br>
rem：是相对长度单位。相对于HTML根元素的字体大小。<br>
vw：视窗宽度的百分比（1vw 代表视窗的宽度为 1%）<br>
vh：视窗高度的百分比<br>
vmin：当前 vw 和 vh 中较小的一个值<br>
vmax：当前 vw 和 vh 中较大的一个值

## 伪类和伪元素
这个东西是真的特别容易搞混来，区别伪类和伪元素的关键就是<br>
**如果没有伪元素(或伪类)，是否需要添加元素才能达到目的，如果是则是伪元素，反之则是伪类。**

举两个例子：
1. hover一个div的时候，我想给它添加一个背景颜色。我们不用伪类的时候，添加元素可以达成这个效果吗？不借助js的话显然是不行的，所以 `:hover 就是伪类`

2. 我想在当前的div后面添加一个文本片段内容为“你好”，当我们不使用伪元素的时候，显然在当前文本后面添加一个元素是可以做到的，所以 `:after 是伪元素`

这样子看起来好像就好理解了很多，反正我是这样记下来的哈！

gtp告诉我这样区分：
1. 伪类选择器选择的是已经存在于文档中的元素，并且它们通过检查元素的状态、位置或属性来进行选择。伪类选择器通常用于为元素的特定状态应用样式，比如悬停、被选中、第一个子元素等。
2. 伪元素选择器选择的是不存在于文档中的虚拟元素，它们用于在元素的内容之前或之后插入额外的样式化元素。常见的伪元素有 `::before、::after、::first-letter、::first-line` 等。

## inline-block 问题

dispaly: inline-block的margintop/bottom无效

1. **垂直对齐问题：**

使用 inline-block 布局时，元素默认是基于基线对齐的。这可能导致在布局中出现不一致的垂直对齐，尤其是当元素的高度不同时。解决这个问题的方法之一是使用 CSS 的垂直对齐属性（如 vertical-align）来控制对齐方式。

在编写nocdoe页面的时候遇到过这个问题，拖入图片组件，底部的高度和旁边的span便签不一致。使用`vertical-align: text-bottom;`解决了这个问题。

2. **空白间隙：**

当使用 inline-block 布局时，HTML 中元素之间的换行和空格字符会被渲染为可见空白间隙，这可能会导致布局中的间距出现偏差。可以通过将相关元素放在同一行，或者使用 HTML 注释或特殊的布局技巧来解决这个问题。

3. **水平滚动条：**

如果 inline-block 元素之间的总宽度超过其容器的宽度，那么容器可能会出现水平滚动条。这是因为 inline-block 元素默认具有换行行为，可以通过将父容器设置为 white-space: nowrap 来防止换行。

4. **不可控制的间距：**

inline-block 元素之间的换行符和空格字符在渲染时会导致一些间距，这些间距无法通过普通的 CSS 盒模型属性（如 margin 和 padding）进行控制。可以使用负 margin 或 font-size: 0 等技巧来减小或消除这些间距。

这个我在坑爹的css里举过例子，inline-block的元素无法定义margin，padding。

5. **溢出问题：**

当使用 inline-block 布局时，元素可能会因为容器的宽度不足而发生溢出。这可以通过设置 overflow 属性来处理，例如将容器设置为 overflow: hidden。




