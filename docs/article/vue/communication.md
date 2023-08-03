# 组件通信

## props/$emit
Props 是一种在父组件向子组件传递数据的方式。父组件可以通过在子组件的标签上绑定属性来向子组件传递数据，子组件通过接收这些属性来获取数据。父组件的数据通过 props 属性传递给子组件，子组件可以通过在 props 选项中声明接收的属性名来使用这些数据。

子组件通过调用 $emit 方法并指定事件名称来触发事件，父组件则通过在子组件标签上监听这个事件来接收消息。

## provide / inject
Provide / Inject 是一种用于跨多个层级的组件通信的高级技术。通过在父组件中使用 provide 方法提供数据，然后在子组件中使用 inject 方法注入数据。这样可以让子孙组件直接访问父组件提供的数据，而不需要通过 props 一层层传递。

父组件中的使用方式：
```vue
<template>
  <div>
    <ChildComponent />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  provide() {
    return {
      message: 'Hello from parent'
    };
  }
};
</script>
```
子组件中的使用方式：
```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  inject: ['message']
};
</script>
```






## $parent / $children

`$parent` 和 `$children` 是两个特殊的实例属性，用于实现父组件和子组件之间的通信。它们提供了一种简单的方式来访问组件树中的其他组件实例。

使用 $parent 和 $children 通信方式需要注意以下几点：

1. $parent 和 $children 是实例属性，只能在组件实例中使用，无法在模板中直接访问。

2. $parent 属性指向当前组件的父组件实例，而 $children 属性是一个数组，包含当前组件的所有直接子组件实例。

3. $parent 和 $children 是不响应式的，也就是说当组件树发生变化时，它们的值不会自动更新。如果需要实时更新，可以使用其他通信方式或结合 Vue 的响应式系统来处理。




## EventBus ($emit / $on)

事件总线是一种基于 Vue 实例的事件系统，可以用于在任意组件之间进行通信。你可以创建一个全局的 Vue 实例作为事件总线，通过它来触发和监听事件。

创建事件总线：
```js
// eventBus.js
import Vue from 'vue';
export const eventBus = new Vue();
```
在组件中使用事件总线：
```vue
<script>
import { eventBus } from './eventBus.js';

export default {
  methods: {
    sendMessage() {
      eventBus.$emit('message', 'Hello from component');
    }
  }
};
</script>
```
在其他组件中监听事件：
```vue
<script>
import { eventBus } from './eventBus.js';

export default {
  created() {
    eventBus.$on('message', message => {
      console.log(message); // 输出：Hello from component
    });
  }
};
</script>
```




## $attrs/$listeners
隔代组件通信, 用的较少啊，要使用的话百度吧。

## Vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。
- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 改变 store 中的状态的唯一途径就是显式地提交  (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。


## 浏览器缓存

可以使用浏览器的本地存储 (LocalStorage 或 SessionStorage) 在不同组件之间进行数据共享。这些存储方式允许你将数据保存在浏览器中，从而可以在页面刷新后仍然保留数据。