# 取色器

文档： [EyeDropper](https://developer.mozilla.org/zh-CN/docs/Web/API/EyeDropper)
```js
javascript:(async function(){let a = new EyeDropper();const result = await a.open();alert('取色结果:' + result.sRGBHex)})();
```

将以上代码复制，在浏览器中添加书签，粘贴至书签的网址。点击对应书签即可调用取色器功能，得到你想要的颜色结果！

尝试一下：
<button onclick="(async function(){let a = new EyeDropper();const result = await a.open();alert('取色结果: ' + result.sRGBHex)})();">点击取色</button>


当然，EyeDropper是比较新的一个构造方法，兼容性也还不太完善。chrome浏览器版本需要在95以上，firefox和safari暂时还不支持，移动端目前也还未支持该功能。