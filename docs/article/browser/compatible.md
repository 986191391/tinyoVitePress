# 浏览器兼容问题

## CSS兼容问题

**1. 内外边距**
不同浏览器标签默认的外边距和内边距不同, 经常开发的人肯定会看见这句话, 也是解决这个问题的基本操作。
```css
* {
  margin: 0px;
  padding: 0px;
}
```

<!-- 2. 滚动

```overflow: scroll```; 

设置该属性, 火狐浏览器的区域会显示滚动条, 而chrome和safari是不会的, 编写该样式时务必加上以下样式,  用于隐藏火狐浏览器的滚动条。

```scrollbar-width: none;```

3. 滑动卡顿

通过media写好了手机端的适配方案，在手机上启动时，滑动时页面不会自动往下滚，而是卡住了。
手机端部分滚动区域可能会出现不顺畅的情况(不会经常出现), 加上以下样式

```-webkit-overflow-scrolling: touch; overflow-scrolling: touch;``` -->

**2. 隐藏滚动条的方式不同**

```css
/* chrome */
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
/* firefox */
scrollbar-width: none;
```

**3. css权重取值不同**

chrome和firefox不同，穿透样式修改时，firefox不生效。

**4. 字体大小**

chrome的默认最小字号大小为12px, 用户可以自行通过浏览器设置最小的字号。<br>
而safari/firefox的最小字号可以到0px, 这就导致小于12px的字体不能在chrome更好的显示。

解决的办法:
- transform 将文字按比例缩小, 但是会带来问题, 缩小不会改变实际的dom元素大小, 只能有视觉上的缩小。
- image 将所要展示的内容区域转换成图片来显示。 

**5.  CSS3的阴影效果**
```css
.box {
  -webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}
```


<!-- ## flex上面固定下面滚动

上面的固定高度需要写高度，下面得区域也得写高度，不然其他浏览器就会有问题。<br>
例如头部50px，那么下面的区域则为 calc( 100% - 50px ) / calc(100vh - 50px) -->

**6. input输入框高度问题**

输入框写了高度，一定要给line-height，不然safari会出现文字位置不对的问题。

## 移动端
**1. vedio标签在安卓端不能自动播放**

ios设备可以较好的对vedio标签的api进行调用, 而安卓设备存在的问题较多。


**2. 移动端使用100vh问题**

原因: 页面内容区域用的单位是vh, 而在第一次进入加载时, 还没有对应的路由栈信息, 所以底部不会出现后退前进的操作拦, 但是当进行了路由操作后, 操作栏就出现了, 但是高度还是计算了这一部分,  导致页面无法拖动到最底部。



## JS兼容问题

**1. scrollTop取值**
```js
scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
```

**2. 获取元素的文本内容**
```js
var element = document.getElementById('myElement');
var text = element.textContent || element.innerText;
```

**3. 添加事件处理程序**
不同浏览器对事件处理程序的支持方式也存在差异。例如，旧版本的Internet Explorer使用`attachEvent()`而不是`addEventListener()`。
```js
var button = document.getElementById('myButton');
if (button.addEventListener) {
  button.addEventListener('click', myFunction);
} else if (button.attachEvent) {
  button.attachEvent('onclick', myFunction);
}
```

**4. AJAX**

不同浏览器对Ajax请求的处理方式也有所不同。例如，某些浏览器可能不支持原生的XMLHttpRequest对象，而需要使用ActiveX对象。
```js
// 创建XMLHttpRequest对象
function createXHR() {
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
      for (var i = 0; i < versions.length; i++) {
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch (ex) {
          // 忽略错误
        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    throw new Error('No XHR object available.');
  }
}
```


**5. IE 取消冒泡/取消默认事件的方式不同**

