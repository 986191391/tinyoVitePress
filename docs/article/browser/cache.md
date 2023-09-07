# 浏览器缓存

## Memory Cache

`Memory Cache` 翻译过来便是“内存缓存”，顾名思义，它是存储在浏览器内存中的。其优点为获取速度快、优先级高，从内存中获取资源耗时为 0 ms，而其缺点也显而易见，比如生命周期短，当网页关闭后内存就会释放，同时虽然内存非常高效，但它也受限制于计算机内存的大小，是有限的。
那么如果要存储大量的资源，这是还得用到磁盘缓存。

## Disk Cache

`Disk Cache` 翻译过来是“磁盘缓存”的意思，它是存储在计算机硬盘中的一种缓存，它的优缺点与 `Memory Cache` 正好相反，比如优点是生命周期长，不触发删除操作则一直存在，而缺点则是获取资源的速度相对内存缓存较慢。

`Disk Cache` 会根据保存下来的资源的 `HTTP` 首部字段来判断它们是否需要重新请求，如果重新请求那便是强缓存的失效流程，否则便是生效流程。

从两者的优缺点中我们可以发现，`Memory Cache` 与 `Disk Cache` 珠联璧合，优势互补，共同构成了浏览器本地缓存的左右手。


例如localStorage, sessionStorage, cookie等。这些功能主要用于缓存一些必要的数据。需要分清楚它们之间的区别。

## cookie

1. cookie 的存放数据大小为4K左右。一般由服务器生成, 可设置失效时间。<br>
2. 如果在浏览器端生成Cookie, 默认是关闭浏览器后失效。<br>
3. cookie因为保存在客户端中, 其中包含的任何数据都可以被他人访问, cookie安全性比较低。<br>
4. 与服务器通信时, 每次都会携带在HTTP头中。<br>
5. cookie需要在客户端和服务器端之间来回传送, 会浪费不必要的资源如果过多会带来性能问题。

## localStorage

1. localStorage的大小一般为5MB, 保存在本地, 除非被清除, 否则永久保存。<br>
2. 仅在客户端中保存, 不参与和服务器的通信。<br>
3. 是以key/value的形式进行存储, value值只能存储字符串。如果想要存储对象, 可以用JSON.stringify()进行转换为字符串, 取值的时候再使用JSON.parse()解析。

```javascript  
// 存储的两种方式
localStorage.setItem("isConfirm", "true");
localStorage.isConfirm= "true";

// 读取
localStorage.getItem("isConfirm");
localStorage.isConfirm; 
```

## sessionStorage

1. 一般为5MB，仅在当前会话下有效，关闭页面或浏览器后被清除。<br>
2. 仅在客户端(即浏览器)中保存，不参与和服务器的通信。<br>
3. 存储在sessionStorage中的数据可以跨越页面刷新而存在。<br>
4. 受到同源策略限制，若想在不同页面之间对同一个sessionStorage进行操作，这些页面必须在同一协议、同一主机名和同一端口下。<br>
5. 是以key/value的形式进行存储，value值只能存储字符串。

```javascript  
// 存储的两种方式
sessionStorage.setItem("isConfirm", "true");
sessionStorage.isConfirm= "true";

// 读取
sessionStorage.getItem("isConfirm");
sessionStorage.isConfirm; 
```

## indexDB

## web worker

[web worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

## service worker

[service worker 是什么？看这篇就够了](https://zhuanlan.zhihu.com/p/115243059)
一个服务器与浏览器之间的中间人角色，如果网站中注册了service worker那么它可以拦截当前网站所有的请求，进行判断（需要编写相应的判断程序），如果需要向服务器发起请求的就转给服务器，如果可以直接使用缓存的就直接返回缓存不再转给服务器。从而大大提高浏览体验。