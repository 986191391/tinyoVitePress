# keep-alive

在Vue中，keep-alive是一个抽象组件，用于缓存动态组件或组件树。它可以在组件切换时保留组件状态或避免重新渲染组件。

当一个组件被包裹在keep-alive组件中时，它的状态将被缓存。当组件被切换时，Vue会检查缓存中是否有该组件的实例。如果有，它将从缓存中获取该实例并重新挂载到DOM中。如果没有，它将创建一个新的实例并将其添加到缓存中。

**根据Vue官方文档的描述，keep-alive组件的缓存是存储在内存中的。**

keep-alive组件有两个生命周期钩子函数：activated和deactivated。当一个被缓存的组件被激活时，activated钩子函数将被调用。当一个被缓存的组件被停用时，deactivated钩子函数将被调用。

在使用keep-alive组件时，需要注意以下几点：

- keep-alive组件只能包裹动态组件或组件树，不能包裹静态组件。
- keep-alive组件只会缓存有name属性的组件，如果没有name属性，则不会缓存该组件。
- keep-alive组件只会缓存组件的状态，不会缓存组件的事件监听器或DOM节点。

以下是一个使用keep-alive组件的示例：
```vue
<template>
  <div>
    <button @click="toggle">切换组件</button>
    <keep-alive>
      <component :is="currentComponent" :key="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: 'ComponentA'
    }
  },
  methods: {
    toggle() {
      this.currentComponent = this.currentComponent === 'ComponentA' ? 'ComponentB' : 'ComponentA'
    }
  },
}
</script>
```
在上面的示例中，我们定义了一个包含两个组件的Vue应用程序。当用户点击按钮时，应用程序将切换当前组件。这两个组件都被包裹在keep-alive组件中，以便在组件切换时保留组件状态或避免重新渲染组件。


keep-alive组件的实现原理是通过Vue的抽象组件实现的。抽象组件是一种特殊的组件，它本身不会渲染任何内容，而是提供了一些公共的功能或行为，可以被其他组件继承或混入。

在Vue中，keep-alive组件是一个抽象组件，它提供了缓存动态组件或组件树的功能。当一个组件被包裹在keep-alive组件中时，它会被转换为一个抽象组件，并且该组件的状态将被缓存。

