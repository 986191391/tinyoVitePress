# CSS3 新特性

`CSS`，即层叠样式表（Cascading Style Sheets）的简称，是一种标记语言，由浏览器解释执行用来使页面变得更美观。CSS3 也增加了很多新特性，为开发带来了更佳的开发体验。

## 选择器

`CSS3`中新增了一些选择器，主要为如下图所示：
<img src="../../assets/css/css3selection.awebp" alt="" />

## 布局属性

[参考：MDN flex布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)<br>
[参考：MDN grid布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)

## 边框属性

border-radius：创建圆角边框

box-shadow：为元素添加阴影

border-image：使用图片来绘制边框


## 背景属性

分别是`background-clip`、`background-origin`、`background-size`、`background-break`

## 文字属性

`word-wrap`、`text-overflow`、`text-shadow`、`text-decoration`、颜色。


css3新增了新的颜色表示方式rgba与hsla

rgba分为两部分，rgb为颜色值，a为透明度<br>
hala分为四部分，h为色相，s为饱和度，l为亮度，a为透明度

## transition 过渡

transition属性可以被指定为一个或多个CSS属性的过渡效果，多个属性之间用逗号进行分隔，必须规定两项内容：1、过度效果 2、持续时间

```css
transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)

/* 四个属性拆分如下 */
transition-property: width; 
transition-duration: 1s;
transition-timing-function: linear;
transition-delay: 2s;
```

## transform 转换

transform属性允许你旋转，缩放，倾斜或平移给定元素

transform-origin：转换元素的位置（围绕那个点进行转换），默认值为(x,y,z):(50%,50%,0)

```css
transform: translate(120px, 50%); // 位移
transform: scale(2, 0.5); //缩放
transform: rotate(0.5turn); //旋转
transform: skew(30deg, 20deg); //倾斜
```

## animation 动画

animation-name：动画名称<br>
animation-duration：动画持续时间<br>
animation-timing-function：动画时间函数<br>
animation-delay：动画延迟时间<br>
animation-iteration-count：动画执行次数，可以设置为一个整数，也可以设置为infinite，意思是无限循环<br>
animation-direction：动画执行方向<br>
animation-paly-state：动画播放状态<br>
animation-fill-mode：动画填充模式

## 渐变

`linear-gradient` linear-gradient(direction, color-stop1, color-stop2, ...); //线性渐变

`radial-gradient` radial-gradient(0deg, red, green); //径向渐变

## 其他

多列布局、媒体查询、混合模式等等...