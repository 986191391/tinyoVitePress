# Vue3 渲染性能

## 静态提升

下面的静态节点会被提升：
- 元素节点
- 没有绑定动态内容

```js
// vue2 的静态节点
render () {
    createVNode("h1", null, "Hello World!")
    // ...
}

// vue3 的静态节点
const hoisted = createVNode("h1", null, "Hello World!")

function render () {
    // 直接使用 hoisted
}
```

静态属性会被提升

```html
<div class="user">
    {{ user.name }}
</div>
```

```js
const hoisted = { class: "user" }

function render () {
    createVNode("div", hoisted, user.name)
    // ...
}
```



## 预字符串化

```html
<div class="father">
    <div class="logo">
        <h1>logo</h1>
    </div>
    <ul class="nav">
        <li><a href="">menu</a></li>
        <li><a href="">menu</a></li>
        <li><a href="">menu</a></li>
        <li><a href="">menu</a></li>
        <li><a href="">menu</a></li>
    </ul>
    <div class="user">
        <span>{{ user.name }}</span>
    </div>
</div>
```

当编译器遇到大量连续的静态内容，会直接将其转换为一个普通字符串节点。vue2时会将所有节点都生成一个个的虚拟dom节点。

```js
const _hoisted_2 = _createStaticVNode("<div class=\"logo\"><h1>logo</h1></div><ul class=\"nav\"><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li></ul>")
```

## 缓存事件处理函数

```html
<button @click="count++">plus</button>
```


``` js
// vue2
render (ctx) {
    return createVNode("button", {
        onClick: function ($event) {
            ctx.count++;
        }
    })
}

// vue3
render (ctx, _cache) {
    return createVNode("button", {
        onClick: cache[0] || (cache[0] = ($event) => (ctx.count++))
    })
}
```

## Block Tree

vue2 在对比新旧树的时候，并不知道哪些节点是静态的，哪些是动态的，因此只能一层一层比较，这就浪费了大部分时间在对比静态节点上。

vue3 将所有的动态的节点记录在树的顶点中，树的顶点也称为block节点。在进行对比时，直接找到block节点，通过对比记录在block节点的动态节点数据。

当树不稳定时，不稳定的节点也会转换为子block节点，重复对比操作。大大提升对比效率。



## Patch Flag

vue2 在对比每一个节点时，并不知道这个节点哪些相关信息会发生变化，因此只能将所有信息依次比对。

vue3 在生成虚拟dom的过程中，会对每一个动态的节点进行标记，根据动态属性的位置设置不同的标记值，例如内容设置为1，class名称设置为2等。

在diff对比节点时，直接根据patch flag的标记值来判断节点是否发生改变，从而大大提升对比效率。