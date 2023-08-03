# Vue 生命周期

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

## vue2生命周期

![在这里插入图片描述](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/19/16ca74f183827f46~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)


| 生命周期        | 描述           |
| ------------- |:-------------:|
| beforeCreate | 实例被创建之前执行，此时data和methods等属性都还不能访问，一般用于全局注入或者是自定义插件化等场景。 |
| created      | 实例已经创建完成后执行，此时该实例的data、computed、methods等属性都已经可以访问了，但DOM相关的操作还未开始。适合发起初始化xhr请求。   |
| beforeMount | 在实例挂载到DOM元素前执行，此时template和render函数都已被编译为虚拟节点（VNode）但并未渲染到页面。可以将一些需要依赖DOM的操作放在这个钩子中。   |
| mounted | 实例已经挂载到DOM元素上，此时可以通过vm.$el获取到指定的DOM节点，一般用于初始化页面数据或与第三方库交互，比如初始化swiper。 |
| beforeUpdate | 在数据更新后且虚拟DOM重新渲染前调用，此时可以进一步修改数据或更新组件状态。  |
| updated | 组件更新完毕后调用，此时可以进行DOM操作，但需要注意防止无限循环更新，比如在这里再次修改组件数据。     |
| activated |  当 keep-alive 包裹的动态组件被激活时调用，此时可以做一些数据加载或修改页面状态等操作。  |
| deactivated | 当 keep-alive 包裹的动态组件被停用时调用，此时可以做一些清理工作或保存数据等操作。  |
| beforeDestory | 在组件实例被销毁前调用，可以在这里清除定时器、取消事件监听等操作。  |
| destoryed | 组件实例被销毁并清理完毕后调用，此时组件中的数据和DOM元素都已经被卸载，可以进行内存回收等操作。  |

## vue3生命周期

vue3的生命周期相比vue2有所改变

[vue3生命周期官方](https://cn.vuejs.org/guide/essentials/lifecycle.html)

![在这里插入图片描述](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)


<!-- | 生命周期        | 描述           |
| ------------- |:-------------:|
| setup      | 开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method |
| onBeforeMount      | 组件挂载到节点上之前执行的函数    |
| onMounted | 组件挂载完成后执行的函数      |
| onBeforeUpdate | 组件更新之前执行的函数     |
| onUpdated | 组件更新完成之后执行的函数   |
| onBeforeUnmount | 组件卸载之前执行的函数     |
| onUnmounted | 组件卸载完成后执行的函数   |
| onActivated | 被包含在 keep-alive 中的组件，会多出两个生命周期钩子函数，被激活时执行   |
| onDeactivated | 比如从 A 组件，切换到 B 组件，A 组件消失时执行     |
| onErrorCaptured | 当捕获一个来自子孙组件的异常时激活钩子函数。     | -->

| 生命周期        |   描述    |
| ------------- |:-------------:|
| ***创建阶段*** |                |
| beforeCreate      | 在实例初始化之后、数据观测 (data observer) 和 event/watcher 事件配置之前被调用。此时模板已还未编译成DOM结构，组件实例的 el 属性和 $refs 对象还不存在。因此，在 beforeCreate 生命周期中不能访问这些属性，但可以执行一些必要的初始化操作。 |
| created      | 在实例已经完成以下的配置：数据观测 (data observer)，property 和 method 的运算，watch/event 事件回调。同时也完成了组件实例 (vm) 的挂载。在这个钩子函数中，我们通常可以对数据进行更改或请求数据，做一些初始化操作。    |
| ***挂载阶段*** |                |
| beforeMount      | 在组件挂载到页面之前被调用，这是发生在 create 和 mount 生命钩子之间的最后一个钩子。可以使用 $el 访问到尚未渲染的虚拟 DOM 树。 |
| mounted      | 组件挂载后被调用，在该钩子函数中我们可以获取到真实 DOM 并对其进行操作。当需要根据窗口大小对节点位置等进行重定位，就可以使用 mounted 钩子函数。  |
| ***更新阶段*** |                |
| beforeUpdate      | 数据更新时，虚拟 DOM 重新渲染之前被调用的钩子函数，在这里是提供前一个状态的快照，如果需要，可以进行一些比对逻辑或执行副作用。 |
| updated      | 虚拟 DOM 重渲染和打补丁（DOM diff）完成后调用。在该钩子函数可以访问到最新的虚拟 DOM 和真实的 DOM，并且可以执行额外的DOM操作，但在此期间不要对数据进行修改，否则可能会导致无限递归的更新过程。  |
| ***销毁阶段*** |                |
| beforeUnmount      | 组件卸载之前被调用，这个钩子可以在组件销毁前执行必要的清理工作，如取消网络请求、定时器等等。 |
| unmounted      | 解除 Vue 实例与对应元素的关联并销毁相关的数据引用，在该钩子中的所有指令及事件监听器都已经移除，组件和其子组件实例完全从内存中卸载。  |

## 组合式 API：生命周期钩子​

[组合式 API：生命周期钩子​](https://cn.vuejs.org/api/composition-api-lifecycle.html)

组合式 API 是 Vue 3 中的一项新功能，通过提供新的 Vue 函数和 setup 函数，帮助用户更方便、灵活地组织和复用组件逻辑。生命周期钩子函数是组合式 API 中必不可少的一部分，它们被用来管理组件在运行过程中的不同状态和所需要执行的操作。

在组合式 API 中，生命周期钩子函数通过相应名称的函数进行定义，例如 onMounted 代替了 Vue 2.x 版本中的 mounted。Vue 3 中常见的生命周期钩子函数包括：


| 生命周期        | 描述           |
| ------------- |:-------------:|
| setup | 开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method |
| onBeforeMount   | 在组件挂载到页面之前被调用   |
| onMounted | 在组件挂载到页面后被调用   |
| onBeforeUpdate | 在组件更新之前调用 |
| onUpdated | 在组件更新之后调用  |
| onBeforeUnmount | 在组件销毁之前调用     |
| onUnmounted |  在组件销毁之后调用  |
| onErrorCaptured | 可以获取子孙组件抛出的错误信息，如果需要处理组件函数中的错误，就可以在此钩子函数内部进行处理。请注意，这个钩子只能捕获该组件的儿子或孙子组件所发生的错误，而不是其他组件的错误。  |

使用组合式 API 的过程中，需要注意以下几点:

生命周期钩子函数必须被调用到正确的地方才能生效，在 setup 函数中声明的各个变量在不同的阶段会发生不同的变化，如果在错误的时刻调用生命周期钩子函数，将会导致出现错误。
在组合式 API 中实现生命周期钩子函数时，需要遵循特定的书写规则，例如函数名称需要以 "on" 作为前缀。
和 Vue 2.x 版本不同，Vue 3 中的生命周期钩子函数并没有在模板中直接使用，而是在 setup 函数内部定义和调用。


## 个人见解

vue3 组合式API愈发流行，有点像react的函数式组件的编程模式，同样摆脱了this的束缚。

组合式API的生命周期当然也只适用于用setup创建的vue组件，需要编写在setup函数内才能生效。

与React相比，两者都是基于函数实现的组件模型，可以使用 hooks 或 composition API 来管理组件内部状态，具有更强的可组合性和复用性。它们都将关注点分离为 UI 和行为，使得代码更加清晰简洁。相比于 Vue 2.x 的选项式 API，组合式 API/函数组件更容易进行单元测试、代码重构以及代码分割等工作。

其次，由于 Vue 拥有完整的模板系统，组合式 API 不需要像 React 函数组件那样渲染返回 JSX 的语法。在 Vue 组件中仍然可以使用模板语法，甚至还引入了新的 template 标签，在组件内部结合了 JSX 和模板的优点。

最后，Vue 的 API 设计也有一些独特的特色，例如 ref 变量、computed 计算属性、watchEffect 监听属性变化、provide/inject 分发/接收依赖等，这些都是 React 没有的概念。虽然 React 社区也有尝试实现类似的 API（如 MobX 和 Hooks），但与 Vue 的使用场景和理念可能有所不同。

<!--
## vue2与vue3生命周期比较

 ```javascript
vue2           -------      vue3
 
beforeCreate   --------      setup(()=>{})
created        --------      setup(()=>{})
beforeMount    --------      onBeforeMount(()=>{})
mounted        --------     onMounted(()=>{})
beforeUpdate   --------     onBeforeUpdate(()=>{})
updated        --------      onUpdated(()=>{})
beforeDestroy  --------      onBeforeUnmount(()=>{})
destroyed      --------      onUnmounted(()=>{})
activated      --------      onActivated(()=>{})
deactivated    --------      onDeactivated(()=>{})
errorCaptured  --------      onErrorCaptured(()=>{})
``` 

-->

