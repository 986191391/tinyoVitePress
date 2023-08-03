# React生命周期

参考: [详解React生命周期](https://www.jianshu.com/p/514fe21b9914)

## v16以前流行版本

![reactcyclt](http://43.139.113.7:81/img/reactcycle.png)

### 一、初始化阶段(initialization)
```javascript
import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
  }
}
```
即上述代码中类的构造方法( constructor() )，Test类继承了react Component这个基类，也就继承这个react的基类，所以才有render(), 生命周期等方法可以使用，这也说明为什么`函数组件不能使用这些方法`的原因。

`super(props)`用来调用基类的构造方法( constructor() ), 也将父组件的props注入给子组件，供子组件读取(组件中props只读不可变，state可变)。<br>
而constructor()用来做一些组件的初始化工作，如定义this.state的初始内容。


### 二、挂载阶段(mounting)

- componentWillMount

在组件挂载到DOM前调用，且只会被调用一次，在这边调用this.setState不会引起组件重新渲染，也可以把写在这边的内容提前到constructor()中，所以项目中很少用。

- render

根据组件的props和state（两者的重传递和重赋值，无论值是否有变化，都可以引起组件重新render），return 一个React元素（描述组件，即UI），不负责组件实际渲染工作，之后由React自身根据此元素去渲染出页面DOM。render是纯函数（Pure function：函数的返回结果只依赖于它的参数；函数执行过程里面没有副作用），不能在里面执行this.setState，会有改变组件状态的副作用。

- componentDidMount

组件挂载到DOM后调用，且只会被调用一次

### 三、更新阶段(updation)

react组件更新机制：setState引起的state更新或父组件重新render引起的props更新，更新后的state和props相对之前无论是否有变化，都将引起子组件的重新render。
#### 造成组件更新有以下情况：

**1. 父组件重新render**

1.1 每当父组件重新render导致的重传props，子组件将直接跟着重新渲染，无论props是否有变化。可通过shouldComponentUpdate方法优化。
```javascript
class Child extends Component {
  shouldComponentUpdate(nextProps){ // 应该使用这个方法，否则无论props是否有变化都将会导致组件跟着重新渲染
    if(nextProps.someThings === this.props.someThings){
      return false
    }
  }
  render() {
    return <div>{this.props.someThings}</div>
  }
}
```

1.2 在componentWillReceiveProps方法中，将props转换成自己的state
```javascript
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someThings: props.someThings
    };
  }
  componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
    this.setState({someThings: nextProps.someThings});
  }
  render() {
    return <div>{this.state.someThings}</div>
  }
}
```

在函数(componentWillReceiveProps)中调用 this.setState() 将不会引起第二次渲染。

因为componentWillReceiveProps中判断props是否变化了，若变化了，this.setState将引起state变化，从而引起render，此时就没必要再做第二次因重传props引起的render了，不然重复做一样的渲染了。

**2. 组件本身调用setState，无论state有没有变化。**（可通过shouldComponentUpdate方法优化）

```javascript
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someThings:1
    }
  }
  shouldComponentUpdate(nextStates){ // 应该使用这个方法，否则无论state是否有变化都将会导致组件重新渲染
    if(nextStates.someThings === this.state.someThings){
      return false
    }
  }

  handleClick = () => { // 虽然调用了setState ，但state并无变化
    const preSomeThings = this.state.someThings
    this.setState({
      someThings: preSomeThings
    })
  }

  render() {
    return <div onClick = {this.handleClick}>{this.state.someThings}</div>
  }
}
```

- **componentWillReceiveProps(nextProps)**

此方法只调用于props引起的组件更新过程中，响应 Props 变化之后进行更新的唯一方式，参数nextProps是父组件传给当前组件的新props。但父组件render方法的调用不能保证重传给当前组件的props是有变化的，所以在此方法中根据nextProps和this.props来查明重传的props是否改变，以及如果改变了要执行啥，比如根据新的props调用this.setState出发当前组件的重新render

- **shouldComponentUpdate(nextProps, nextState)**

此方法通过比较nextProps，nextState及当前组件的this.props，this.state，返回true时当前组件将继续执行更新过程，返回false则当前组件更新停止，以此可用来减少组件的不必要渲染，优化组件性能。

ps：这边也可以看出，就算componentWillReceiveProps()中执行了this.setState，更新了state，但在render前（如shouldComponentUpdate，componentWillUpdate），this.state依然指向更新前的state，不然nextState及当前组件的this.state的对比就一直是true了。

如果shouldComponentUpdate 返回false，那就一定不用rerender(重新渲染 )这个组件了，组件的React elements(React 元素) 也不用去比对。 但是如果shouldComponentUpdate 返回true，会进行组件的React elements比对，如果相同，则不用rerender这个组件，如果不同，会调用render函数进行rerender。


- **componentWillUpdate(nextProps, nextState)**

此方法在调用render方法前执行，在这边可执行一些组件更新发生前的工作，一般较少用。

- **render**

根据新的props和state生成新的虚拟DOM。当组件的状态或属性发生变化时，React会自动调用render方法，重新计算组件的虚拟DOM，并将其与之前的虚拟DOM进行比较，从而确定需要更新的部分，并将更新的部分渲染到屏幕上。

具体来说，render()方法做了以下几件事情：
1. 计算组件的虚拟DOM：根据组件的状态和属性，计算出组件的虚拟DOM，描述组件在屏幕上的呈现方式。
2. 比较新旧虚拟DOM：将新的虚拟DOM与之前的虚拟DOM进行比较，找出需要更新的部分。
3. 更新DOM：将需要更新的部分渲染到屏幕上，更新DOM。
4. 需要注意的是，render()方法只负责计算虚拟DOM，不负责更新DOM。更新DOM是由React的调度器负责的，它会根据需要更新的部分，将更新的任务添加到更新队列中，并在适当的时候执行更新任务。


- **componentDidUpdate(prevProps, prevState)**

此方法在组件更新后被调用，可以操作组件更新的DOM，prevProps和prevState这两个参数指的是组件更新前的props和state


### 四、卸载阶段(unmounting)

- **componentWillUnmount**

此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清除组件中使用的定时器，清除componentDidMount中手动创建的DOM元素等，以避免引起内存泄漏。



## v16以后流行版本

React组件的生命周期可以分为三个阶段：挂载阶段、更新阶段和卸载阶段。每个阶段都有对应的生命周期方法，可以在这些方法中执行一些操作。

### 一、挂载阶段

constructor：组件被创建时调用，用于初始化组件的状态和绑定事件处理函数等操作。<br>
getDerivedStateFromProps：组件被创建或更新时调用，用于根据props计算state的值。<br>
render：组件被创建或更新时调用，用于渲染组件的UI。<br>
componentDidMount：组件被挂载到DOM后调用，用于执行一些需要DOM的操作，如获取元素的宽高等。

### 二、更新阶段

getDerivedStateFromProps：组件被更新时调用，用于根据props计算state的值。<br>
shouldComponentUpdate：组件被更新时调用，用于判断是否需要重新渲染组件。<br>
render：组件被更新时调用，用于渲染组件的UI。<br>
componentDidUpdate：组件被更新后调用，用于执行一些需要DOM的操作，如获取元素的宽高等。

### 三、卸载阶段

componentWillUnmount：组件被卸载前调用，用于执行一些清理操作，如取消定时器、取消事件监听等。