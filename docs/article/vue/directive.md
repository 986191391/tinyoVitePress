# Vue 指令

Vue指令是一种特殊的HTML属性，用于向Vue实例添加交互性和动态性。指令以v-开头，后面跟着指令的名称，例如v-if、v-for、v-bind等。指令的值可以是JavaScript表达式，用于动态地计算指令的行为。

以下是一些常用的Vue指令：

- v-if：根据表达式的值来条件性地渲染元素。
- v-for：根据数组或对象的值来循环渲染元素。
- v-bind：将元素的属性绑定到Vue实例的数据上。
- v-on：将元素的事件监听器绑定到Vue实例的方法上。
- v-model：将表单元素的值绑定到Vue实例的数据上，实现双向数据绑定。
- v-show：根据表达式的值来条件性地显示或隐藏元素。
- v-text：将元素的文本内容绑定到Vue实例的数据上。
- v-html：将元素的HTML内容绑定到Vue实例的数据上。

指令是Vue中非常重要的一部分，它们使得开发人员可以轻松地添加交互性和动态性到应用程序中。同时，Vue还提供了自定义指令的功能，允许开发人员根据自己的需求创建自定义指令。


## Vue2自定义指令

在Vue中，自定义指令允许开发人员创建自己的自定义行为，可以应用于DOM元素。这对于添加内置指令未提供的功能或将复杂行为封装到可重用组件中非常有用。

要创建自定义指令，您可以使用Vue.directive方法。以下是一个示例，该示例创建了一个自定义指令，当单击元素时将其背景颜色设置为红色：
```javascript
Vue.directive('red-background', {
  bind: function (el, binding, vnode) {
    el.style.backgroundColor = 'red';
  }
});
```
在上面的示例中，Vue.directive方法接受两个参数：指令名称和指令选项对象。指令选项对象可以包含多个钩子函数，例如bind，inserted，update，componentUpdated和unbind。这些钩子函数允许您在指令的生命周期中执行自定义逻辑。

例如，在上面的示例中，我们使用了bind钩子函数来设置元素的背景颜色。bind钩子函数在元素第一次绑定指令时调用。如果您想在元素插入到DOM中时执行逻辑，则可以使用inserted钩子函数。

### 钩子函数

- bind：此钩子函数在指令绑定到元素时调用。它接收三个参数：元素，绑定对象和指令附加到的虚拟节点（vnode）。您可以使用此钩子函数执行一次性设置任务，例如设置初始值。

- inserted：此钩子函数在元素插入到DOM中时调用。它接收三个参数：元素，绑定对象和指令附加到的虚拟节点（vnode）。您可以使用此钩子函数执行与DOM交互的任务，例如添加事件监听器或进行DOM操作。

- update：此钩子函数在元素的绑定值发生更改时调用，但不包括初始值。它接收三个参数：元素，绑定对象和指令附加到的虚拟节点（vnode）。您可以使用此钩子函数对元素进行更新，例如更改样式或属性。

- componentUpdated：此钩子函数在元素的绑定值发生更改时调用，包括初始值。它接收三个参数：元素，绑定对象和指令附加到的虚拟节点（vnode）。您可以使用此钩子函数执行与DOM交互的任务，例如添加事件监听器或进行DOM操作。

- unbind：此钩子函数在指令从元素上解绑时调用。它接收两个参数：元素和绑定对象。您可以使用此钩子函数执行清理任务，例如删除事件监听器或其他DOM操作。

### 举例实际场景


[8个非常实用的Vue自定义指令](https://mp.weixin.qq.com/s/nBz1cxFWceU_txQhekBPZQ)


v-focus：将焦点设置在输入框上，以便用户可以立即开始输入。这对于表单非常有用，因为它可以提高用户体验并减少用户的点击次数。
```javascript
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});
```

v-scroll：在滚动时执行某些操作。例如，您可以使用此指令来实现无限滚动或懒加载图像。
```javascript
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});
```

v-tooltip：在鼠标悬停在元素上时显示工具提示。这对于提供有关元素的更多信息非常有用。
```javascript
Vue.directive('tooltip', {
  bind: function (el, binding) {
    let tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = binding.value;
    el.appendChild(tooltip);
    el.addEventListener('mouseenter', function () {
      tooltip.style.display = 'block';
    });
    el.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
    });
  }
});

```


## Vue3自定义指令

使用Vue.directive函数来创建自定义指令。它接受两个参数：指令名称和一个指令对象。指令对象可以包含一系列的钩子函数，用于定义指令的行为。
```javascript
Vue.directive('directive-name', {
  // 钩子函数
  mounted(el, binding, vnode, prevVnode) {
    // 指令被绑定到元素上时触发
  },
  updated(el, binding, vnode, prevVnode) {
    // 元素所在组件更新时触发
  },
  unmounted(el, binding, vnode, prevVnode) {
    // 指令所在组件被卸载时触发
  }
  // ...其他钩子函数
});
```

### 钩子函数

- 主要的钩子函数

mounted：指令被绑定到元素上时触发，可以在此处进行初始化操作。<br>
updated：元素所在组件更新时触发，可以根据需要更新指令的行为。<br>
unmounted：指令所在组件被卸载时触发，可以进行清理工作。

- 钩子函数接受一些参数

el：指令所绑定的元素。<br>
binding：一个对象，包含了指令的信息，如指令的值、参数、修饰符等。<br>
vnode：Vue编译生成的虚拟节点。<br>
prevVnode：上一个虚拟节点。

- 其他钩子函数

beforeMount：在元素挂载之前触发。<br>
beforeUpdate：在元素所在组件更新之前触发。<br>
beforeUnmount：在指令所在组件卸载之前触发。<br>
updated：在元素所在组件更新之后触发，与updated钩子函数不同，该钩子函数在虚拟节点更新之后触发。<br>
render：指令所在组件的渲染函数触发时触发。<br>
renderTracked：当与指令关联的响应式依赖被跟踪时触发。<br>
renderTriggered：当与指令关联的响应式依赖被触发更新时触发。

这些钩子函数提供了灵活的钩子机制，让你能够在不同的时机和状态下对指令进行操作和响应。根据具体的需求，你可以选择适当的钩子函数来实现自定义指令的行为和逻辑。

需要注意的是，在Vue 3中，钩子函数中的this上下文已被移除，可以通过参数binding来访问指令的信息和上下文。另外，钩子函数中的el参数也可以使用ref进行包装，以获得更多的操作能力。


### 示例

1. cockpit页面已运用起来，编写了简易的图片懒加载指令。

```ts
import { DirectiveBinding, Directive } from 'vue';

const placeholderSrc = 'data:image/png;base64,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';

// 定义自定义指令
const ImgLazyLoad: Directive<HTMLImageElement, unknown> = {
  beforeMount(el: HTMLImageElement, binding: DirectiveBinding) {
    const imgUrl = el.src;
    el.src = placeholderSrc;
    
    const lazyImg = new Image();
    lazyImg.src = imgUrl;
    lazyImg.onload = (e) => {
      el.src = imgUrl;
    };
  }
};

export default ImgLazyLoad;
```

2. 面板的拖拽改变宽度指令，nocode页面已使用。
```ts
import { DirectiveBinding, Directive } from 'vue';

// 定义自定义指令
const PanelDragResize: Directive<HTMLImageElement, unknown> = {
  beforeMount(el: HTMLImageElement, binding: DirectiveBinding) {
    let dragLock = false;
    let downClientX = 0;
    let onMouseMove: any = null;
    let onMouseUp: any = null;

    const { width, max, min, direction } = binding.value;
    el.style.width = `${width}px`;
    el.style.position = 'relative';

    const indicatorDiv = document.createElement('div');
    // indicatorDiv.className = 'drag-indicator';
    indicatorDiv.style.content = '';
    indicatorDiv.style.width = '5px';
    indicatorDiv.style.height = '100vh';
    indicatorDiv.style.position = 'absolute';
    if (direction === 'left') indicatorDiv.style.left = '-2px';
    if (direction === 'right') indicatorDiv.style.right = '-2px';
    indicatorDiv.style.top = '0px';
    indicatorDiv.style.backgroundColor = 'transparent';
    indicatorDiv.style.cursor = 'col-resize';
    indicatorDiv.onmousedown = (e: MouseEvent) => {
      dragLock = true;
      downClientX = e.clientX;
      console.log('mousedown');
      onMouseMove = (event: MouseEvent) => {
        if (dragLock) {
          let movePx = 0;
          if (direction === 'left') movePx = downClientX - event.clientX;
          if (direction === 'right') movePx = event.clientX - downClientX;
          const newPanelWidth = movePx + binding.value.width;

          if (newPanelWidth > min && newPanelWidth < max) downClientX = event.clientX;
          
          const widthVal = newPanelWidth < min ? min : (newPanelWidth > max ? max : newPanelWidth);

          el.style.width = `${widthVal}px`;
          binding.value.width = widthVal;
        }
      }
      onMouseUp = () => {
        dragLock = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        onMouseMove = null;
        onMouseUp = null;
        console.log('mouse up');
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
    el.appendChild(indicatorDiv);
  }
};

export default PanelDragResize;
```

<!-- 
beforeMount：在指令挂载到元素之前被调用。

mounted：在指令第一次绑定到元素并插入父节点后调用。

beforeUpdate：在包含组件的 VNode 更新之前调用，但是可能在其子 VNode 更新之后调用。

updated：在包含组件的 VNode 及其子 VNode 均已更新后调用。

beforeUnmount：在卸载绑定元素之前调用。

unmounted：在卸载绑定元素之后调用。

beforeBind：此函数接收了一个参数 binding: DirectiveBinding，在指令第一次绑定到元素时调用。

created：此函数在指令实例被创建时调用，可通过 binding.instance 访问组件实例，该函数在服务端渲染期间不可用。

注意：beforeBind 钩子是在指令绑定到元素之前执行的，而 beforeMount 是在指令绑定到元素后，准备挂载之前执行的。而 created 钩子是在指令实例被创建时调用的，与 beforeMount 和 mounted 钩子的调用时机略有不同。

需要注意的是，在 Vue.js 3.x 中，除了 mounted、beforeUnmount 和 unmounted 之外，其他的钩子函数不再接受 el 参数（对应指令绑定的元素），而是通过 binding.value、binding.oldValue 或 binding.arg 等参数来访问当前指令的状态和值。

-->