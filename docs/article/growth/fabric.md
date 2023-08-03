# fabric库使用记录

[官方文档链接](http://fabricjs.com/docs/index.html)

Canvas 提供一个好的画布能力，但是 Api 不够友好。绘制简单图形其实还可以，不过做一些复杂的图形绘制，编写一些复杂的效果，就不是那么方便了。Fabric.js 就是为此而开发，它主要就是用对象的方式去编写代码。

本文主要记录个人博客中, fabric的使用。

## 声明创建画布

fabric.Canvas是有鼠标交互的画布。
与之对应的是 fabric.StaticCanvas, 是没有鼠标交互的画布。

```javascript
const canvas = new fabric.Canvas('canvas', {
  width: 500,
  height: 500,
  stopContextMenu: true, // 禁止画布默认右键菜单
  fill: 'red' // 填充的颜色
})
```

## 绘制规则图形

fabric.Rect

```javascript
let rect = new fabric.Rect({
  left:100, // 距离画布左侧的距离，单位是像素
  top:100, // 距离画布上边的距离
  fill:'red', // 填充的颜色
  width:30, // 方形的宽度
  height:30 // 方形的高度
});
canvas.add(rect); // 添加图形至画布
```

## 绘制不规则图形
使用路径绘图：用点和线的移动的方式进行绘图。通过对 线、曲线、弧的应用绘制非常复杂的图形。

在fabric.Path( )方法中，“M”代表“移动”命令，这个“M 00” 代表把画笔移动到（0,0）点坐标。

“L”代表“线”，“L 200 100 ”的意思是使用钢笔画一条线，从（0,0）坐标画到（200,100）坐标。 “z” 代表让图形闭合路径。

画好三角形后，我们可以用set( )方法对三角形的位置、颜色、角度、透明度等属性进行设置。

```javascript
let path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
path.set({ left: 120, top: 120,fill:'red' });
canvas.add(path);
```

## 插入图片

```javascript
const imgElement = document.createElement('img') // 声明我们的图片
imgElement.src = imgSrc

imgElement.onload = () => {
  const imgInstance = new fabric.Image(imgElement, {
    evented: true,
    selectable: true
  })
  this.canvasContainer.add(imgInstance)
}
```

这里有一个需要注意的点就是，当我们插入图片后，添加进画板的操作一定要写在img.onload的事件中，确保图片加载完成了，这样才能成功的插入图片至画板中。


## 插入文字

```javascript
const text = new fabric.IText('插入这些文字', { 
  fontSize: 26,
  evented: true,
  selectable: true
})
this.canvasContainer.add(text)
```

插入文字的api比较简单，直接将需要插入的文字按照指定的样式加入到画板中即可。


## 删除

删除文字、图片的前提肯定是要有文字或者图片了，这里以文字作为参考。<br>
需要将图片用变量记录下来，删除的使用选用这个变量即可实现。

```javascript
// 先上传一张图片
const imgElement = document.createElement('img')
imgElement.src = imgSrc

imgElement.onload = () => {
  this.imgInstance = new fabric.Image(imgElement, { // 将图片用imgInstance这个变量名记录下来
    evented: true,
    selectable: true
  })
  this.canvasContainer.add(this.imgInstance)
}

```
删除图片有以下两种方法，一种是带渐变过渡的，另一种则没有
```javascript
// 渐变
this.canvasContainer.fxRemove(this.imgInstance, {
  onChange() {
    console.log('在动画的每一步调用')
  },
  onComplete() {
    console.log('删除成功后调用')
  }
})
// 非渐变
this.canvasContainer.remove(this.imgInstance)
```