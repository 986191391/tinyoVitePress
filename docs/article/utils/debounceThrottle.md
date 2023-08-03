# 防抖与节流

知识点及关键原理: **闭包的使用**

用一个例子来同时说防抖与节流。<br>

需求点: 
默认情况下导航栏的背景颜色为透明，当浏览器滚动时，背景颜色变为黑色。回到顶部时，背景颜色变回透明色。这就涉及到**浏览器滚动**。

## 浏览器滚动事件

在全局的window对象中存在一个onscroll方法，默认为null，定义后当浏览器滚动则触发该方法。所以我们可以给滚动事件绑定一个方法:
```javascript
// 定义方法
function scrollFunc () {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log(`滚动位置${scrollTop}`);
}

// 绑定方法
window.onscroll = scrollFunc
```
当我们不加以处理时，只要进行页面的滚动，就会一直触发该方法，打开控制台就会发现，满屏幕的log，这是非常影响浏览器性能的！<br>
基于这一类的问题， 就衍生出了防抖和节流两种来提升浏览器性能的方法。

## 防抖(debounce)
当我们第一次触发该方法的时候，该方法不会立即执行，我们设定了一个时间段
- 如果这个时间段内没有再次触发该方法，该方法就正常执行。
- 如果这个时间段内该方法被再次触发，则重置设定的时间段，直至满足前一条件。

所以当我们在一直滚动浏览器时，该方法一直没有被触发，直到停止滚动且达到设置的时效值。

```javascript
// func: 要执行的方法
// delay: 设置的时效值
function debounce (func， delay) {
  let timer = null;
  return function() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func， delay);
  }
}

```
结合我们的浏览器滚动时需要触发的方法:

```javascript
// 防抖方法
function debounce (func， delay) {
  let timer = null;
  return function() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func， delay);
  }
}

// 定于滚动触发方法
function scrollFunc () {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log(`滚动位置${scrollTop}`);
}

// 绑定方法
window.onscroll = debounce(scrollFunc， 1000)
```

总结: **对于短时间内连续触发的事件，防抖就是让其在某个时间段内，事件处理函数只执行一次。**

问题就来了:<br>
如果我就是花里胡哨，我就一直滚动浏览器不停下来，那我的方法就一直不会触发，我都滚动到底部了，导航栏的背景颜色还是没变，这种情况怎么办呢？有没有一种情况是可以让该方法即使一直在滚动，也可以在某个时间段内给出反馈呢？

## 节流(throttle)

节流的原理就像是一个阀门。
当我们第一次触发该方法的时候，阀门就被关上了且设定了一个时间段
- 在时间段内该方法被再次触发，因为阀门被关上了，所以不会有响应。
- 等到该时间段结束后，阀门会被打开，直到再次被触发，然后再把阀门关上，以此类推。


```javascript
// func: 要执行的方法
// delay: 设置的时效值
function throttle (func， delay) {
  // 阀门变量
  let timer = null;
  return function() {
    // 阀门被关上了！不执行！
    if (timer) return;
    // 否则, 把阀门关上！
    timer = setTimeout(() => {
      func();
      // 直到delay时间到, 重新把阀门打开。
      timer = null;
    }, delay);
  }
}

```

## 适用场景

- 输入框input事件，例如要支持输入实时搜索可以使用节流方案
- 按钮事件，可以通过节流的方法避免重发点击发出多次请求
- 浏览器页面resize事件
- 浏览器滚动scroll事件
- 鼠标mousemove事件

