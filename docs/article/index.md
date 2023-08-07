<style>
  @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
  @keyframes move {
    from {
      opacity: 0;
      transform: translateY(50%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  .tinyo-docs {
    margin-bottom: 2rem;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: #f1f1f1; */
    text-align: center;
    letter-spacing: 10px;
    color: #e6e6e6;
    font-size: 102px;
    font-family: 'Luckiest Guy';
    font-weight: 300;
    text-shadow: 1px -1px #fff, -1px 1px #999, -5px 5px 5px #808080;
  }
  .tinyo-docs .items {
    display: flex;
    align-items: center;
    height: 5.2rem;
  }
  .tinyo-docs .items > span {
    opacity: 0;
    animation: move 1s cubic-bezier(0.56, 0.09, 0.49, 1.37) forwards var(--delay);
  }
</style>

# 文档 Document

<!-- <div class="tinyo-docs">
  <div class="items">
    <span style="--delay: 0.1s">d</span>
    <span style="--delay: 0.2s">o</span>
    <span style="--delay: 0.3s">c</span>
    <span style="--delay: 0.4s">u</span>
    <span style="--delay: 0.5s">m</span>
    <span style="--delay: 0.6s">e</span>
    <span style="--delay: 0.7s">n</span>
    <span style="--delay: 0.8s">t</span>
    <span style="--delay: 0.9s">s</span>
  </div>
  <div class="items">
    <span style="--delay: 0.6s">d</span>
    <span style="--delay: 0.7s">o</span>
    <span style="--delay: 0.8s">c</span>
    <span style="--delay: 0.9s">s</span>
  </div>
</div> -->

文档知识记录来源于各大博客、ChatGPT、个人总结等。<br>
知识点总结不完全正确，如果错误或建议请 <a href="/author/#联系我">联系我</a>，十分感谢！

## 归类

大致分为HTML、CSS、JavaScript、Vue、网络等模块。

其中 JavaScript 、Vue 及 网络模块为重点板块，学习模块涉及算法知识的内容。这几个模块的内容在实战面试中经常被提问，值得我们研究学习。

“花里胡哨”模块中，记录了用前端手段实现的小工具，在工作生活中都能够发挥大用处！

```ts
// DO SOMETHING
@Watch('mood', { immediate: true, deep: true })
private watchMood(mood: string): void {
  if (mood === 'unhappy') return this.removeWorry();
  return this.doWhatYouFeelLike();
}
```


<!-- <div style="textAlign: center;display: flex; flexDirection: column; justifyContent: center;alignItems: center">
  <div style="padding: 40px 0; color: #e6e6e6;fontSize: 102px;fontFamily: 'Luckiest Guy'; letterSpacing: 5px; fontWeight: 300;textShadow: 1px -1px #fff, -1px 1px #999, -5px 5px 5px #808080;">
    play & learn
  </div>
</div> -->