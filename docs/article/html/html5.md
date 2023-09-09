# HTML5 新特性

## 语义化标签

常见的语义化标签例如 `header`、`main`、`footer`、`aside`、`article`、`section`等等。

语义化标签最主要的作用是提升页面的阅读性，有利于页面的SEO。
当然，从实际的代码开发角度来看，也有利于我们平常在开发时对代码结构的维护，相比于DIV+CSS的模式能够更快的定位标签的作用，使代码结构更加清晰。


## 新增媒体元素

`vedio`和`audio`是HTML5提供的音视频标签，该标签能够很容易的输出音频或视频流，提供便利的获取文件信息的API。

[MDN文档](https://developer.mozilla.org/zh-CN/docs/web/html/element/video)

## 绘图

`canvas`标签是用于绘画的标签，在当前的浏览器环境中使用频率很高。

用于绘画的canvas属性 Canvas API 提供了一个通过JavaScript 和 HTML的canvas元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

[MDN canvas文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

## 本地存储方式

新增了`sessionStorage`和`localStorage`两种本地存储方式。

sessionStorage 用于存储会话级别的数据，会话关闭，数据消失，不可设置过期时间。
localStorage 用于存储需要进行持久化存储的数据，只要不主动删除，数据不会消失。

## 加强表单

新增的表单控件：calendar、date、time、email、url、search等等。


## 其他新技术

webworker：用于多线程编程<br>
websocket：客户端与服务端双向数据通信协议<br>
svg绘图: SVG是指可伸缩的矢量图形<br>
拖放API<br>
地理定位:
```js
window.navigator.getlocation {
    getCurrentPosition:  fn  用于获取当前的位置数据
    watchPosition: fn  监视用户位置的改变
    clearWatch: fn  清除定位监视
}
```
