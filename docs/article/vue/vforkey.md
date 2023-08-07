# v-for 中的 key

v-for指令用于循环渲染数组或对象，并生成对应的DOM元素。v-for指令要求提供一个唯一的key属性，用于帮助Vue跟踪每个节点的身份，以便在更新列表时进行优化。

当Vue.js重新渲染列表时，它会根据每个项的key属性来确定哪些元素是新增的、被修改的或被删除的。Vue使用key来识别每个节点的身份，并尽可能地重用已存在的DOM元素，从而提高性能。

在没有提供 key 的情况下，Vue 默认使用数组索引作为 key，但这样可能会导致一些问题，尤其是在列表数据发生变化时。如果列表数据的顺序改变或有新的数据插入或删除，而没有提供合适的 key，Vue 可能会错乱地重新渲染 DOM，导致意想不到的问题。

----

q1: 在进行vfor的操作中，key是必不可少的一个属性，那这个属性的作用是什么呢？

- key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。

举个例子：<br>
三胞胎站成一排，你怎么知道谁是老大？<br>
如果老大皮了一下子，和老三换了一下位置，你又如何区分出来？<br>
给他们挂个牌牌，写上老大、老二、老三。<br>
这样就不会认错了。key就是这个作用。

----

q2: 什么是diff操作？
- Vue 中使用虚拟 dom 且根据 diff 算法进行新旧 DOM 对比，从而更新真实 dom ，key 是虚拟 DOM 对象的唯一标识, 在 diff 算法中 key 起着极其重要的作用。

正因如此，key是`不能重复`的，必须是`唯一的`，重复的 key 将会导致渲染异常。
通常在开发中，会使用数据中的id/身份证号等唯一的标识来作为key。

----

q3: 在 Vue 中为什么不推荐用 index 做 key?

用index作为key，其实在正常开发保存时，eslint也会报错的。<br>
为了规避这个问题，在编写key时，我一般这样定义 :key="`string${index}`"<br>
加一个字符串，就可以规避掉eslint的报错，但是这样编写key和直接将index作为key是没有本质区别的。

为什么不推荐？举个例子：<br>
三胞胎站成一排，将他们视作一个数组['老大', '老二', '老三'],<br>
如果我们用index作为key, 则老大是0，老二是1，老三是2。<br>
此时出现了一个老六，站在了老大的后面，数组就变成了['老大', '老六', '老二', '老三']<br>
对应index则是老大是0，老六是1，老二是2，老三是3。<br>
在diff算法中，该数组就只是新增了一项，因为原本的数据中就存在key为1和2的数据，新的数据仅是多了一个key为3的值，它知道数组新增了值，但却不知道该值是从哪个位置插入的。

该例子的情况如果出现在表单中，原本填写在key为1和2位置上的值，在更新以后也会在key为1和2的位置上，因为key没有发生变化。

----

q4: 怎么解决q3的问题？<br>

1. 用唯一的标识作为key值，例如id，身份证号，手机号等。
2. 在更新后清空重置表单，重新填入表单值。(投机取巧，不建议)
3. 使用uuid库。
