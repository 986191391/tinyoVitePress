# 有(坑)趣(爹)的CSS

## 不可替换行盒

不可替换行盒例如span标签，是不能使用transform属性的

## 竖向方向margin值重叠

[codepen示例](https://codepen.io/986191391/pen/KKzQvEg)

```html
<div class="demo1">demo1</div>
<div class="demo2">demo2</div>
```
```css
.demo1 {
  width: 200px;
  background-color: pink;
  margin-bottom: 50px;
}

.demo2 {
  width: 200px;
  background-color: green;
  margin-top: 50px;
}
```
demo1有向下的marginBottom: 50px<br>
而demo2有向上的marginTop: 50px<br>
但是他们竟然重叠在了一起！

如果将demo1向下的margin值设置为70，那demo1与demo2之间的距离则为70，会取最大值！

## 子元素的margin将父元素位移
[codepen示例](https://codepen.io/986191391/pen/bGKmxoz)

```html
<div class="father">
  <div class="son">son</div>
</div>
```
```css
.father {
  margin: 0;
}

.son {
  margin-top: 100px;
}
```

父元素设置了margin值为0，但是因为子元素的缘故，导致视图上父元素距离顶部存在100px的距离。

## overflow: ellipsis的隐藏条件
[codepen示例](https://codepen.io/986191391/pen/eYZVEjv)

```html
<div class="ellipsis-demo">
  <div class="demo1">ddddddddddddddddddddddddddddddddd</div>
  <div class="demo2">ddddddddddddddddddddddddddddddddd</div>
</div>
```
```css
.demo1 {
  width: 100px;
  display: flex;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: pink;
}

.demo2 {
  margin-top: 50px;
  width: 100px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: pink;
}
```
从结果来看，demo1不然展示超出部分省略号，而demo2是可以的！

设置为flex布局的元素，ellipsis是无效的！

## position: fixed的定位
[codepen示例](https://codepen.io/986191391/pen/OJEapxw)

从以往的学习资料，我们知道fixed的定位是相对于浏览器视口进行定位的。<br>
而当我们给当前元素的父亲元素添加了transform属性后，这一规则就打破了！<br>
实验证明scale/translateX等属性都存在该问题。

```html
<div class="father">
  <div class="son1">son1</div>
  <div class="son2">
    son2
    <div class="innerson">
      innerson
    </div>
  </div>
</div>
```
```css
.father {
  width: 100%;
  height: 100%;
}

.son1 {
  width: 100px;
  height: 100px;
  position: fixed;
  left: 0;
  top: 0;
  background: red;
}

.son2 {
  width: 200px;
  height: 200px;
  position: fixed;
  left: 200px;
  top: 200px;
  background: pink;
  transform: scale(1);
  /* transform: translateX(10px); */
}

.innerson {
  width: 100px;
  height: 100px;
  position: fixed;
  left: 10px;
  top: 10px;
  background: blue;
}

```

## transform: scale()不改变dom大小

transform的scale属性可以将dom元素放大显示，而该放大只是视觉上的放大，实际获取dom后读取高宽，会发现并没有发生变化。

## dispaly: inline-block的margintop/bottom无效

其实inline-block就是行内元素的一种表现，所以也存在行内元素该有的特征。

## img 图片中间为什么会有 4-6px 的间距

img图片默认排版为 inline-block;而所有的inline-block元素之间都会有空白。