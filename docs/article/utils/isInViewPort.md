
# 判断dom元素是否出现在可视区域内

需求：<br>
浏览器页面中存在一个展示板块，板块内容为视频展示，需要做到该视频处于浏览器可视区域内时，才播放，不在时则暂停。

将需要判断的el元素传入到以下方法中，即可判断元素是否出现在可视区域内。

```javascript
// 判断dom元素是否出现在可视区域内
export function isInViewPort (element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  );
}
```

因为与onscroll方法绑定使用，所以也要注意一下使用防抖和节流来限时一下触发的频率！



## IntersectionObserve

图片懒加载示例

```js
const imgList = [...document.querySelectorAll('img')]

var io = new IntersectionObserver((entries) =>{
  entries.forEach(item => {
    // isIntersecting是一个Boolean值，判断目标元素当前是否可见
    if (item.isIntersecting) {
      item.target.src = item.target.dataset.src
      // 图片加载后即停止监听该元素
      io.unobserve(item.target)
    }
  })
}, {
  root: document.querySelector('.root')
})

// observe遍历监听所有img节点
imgList.forEach(img => io.observe(img))
```