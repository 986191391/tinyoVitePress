# React面试题

## 什么是React？它有哪些特点？

React是一个用于构建用户界面的JavaScript库。它由Facebook开发，于2013年发布。React的主要特点包括：<br>
- 声明式编程：React采用声明式编程模式(只关注做什么而不是怎么做)，将UI抽象为组件，使得代码更加清晰、易于理解和维护。<br>
- 组件化：React将UI拆分为独立的组件，每个组件都有自己的状态和生命周期，使得代码复用更加容易。<br>
- 虚拟DOM：React使用虚拟DOM来描述UI，通过比较新旧虚拟DOM的差异，最小化DOM操作，提高性能。<br>
- 单向数据流：React采用单向数据流的数据流模型，使得数据的流动更加清晰、可控。<br>
- 高性能：React通过使用虚拟DOM和最小化DOM操作，提高了应用的性能。<br>
- 生态丰富：React拥有庞大的生态系统，包括React Router、Redux、React Native等，可以满足各种不同的需求。

React是一个用于构建用户界面的JavaScript库。它的核心思想是将用户界面抽象为一个组件树，每个组件都有自己的状态和属性，并且可以根据这些状态和属性来渲染出不同的界面。

React的工作原理可以分为三个阶段：渲染阶段、协调阶段和提交阶段。

在渲染阶段，React会根据组件的状态和属性来生成虚拟DOM（Virtual DOM）。虚拟DOM是一个轻量级的JavaScript对象，它描述了真实DOM的结构和属性。React会通过比较前后两个虚拟DOM的差异来确定需要更新哪些部分的真实DOM。

在协调阶段，React会根据前后两个虚拟DOM的差异来更新组件的状态和属性。React会先调用组件的生命周期方法来执行一些准备工作，然后再根据差异来更新组件的状态和属性。这个过程是一个递归的过程，从根组件开始，逐层向下更新子组件。

在提交阶段，React会将更新后的虚拟DOM转换为真实DOM，并将其插入到页面中。React会尽可能地复用已有的DOM节点，以提高性能。




## React的组件生命周期是什么？每个生命周期的作用是什么？

React组件的生命周期可以分为三个阶段：挂载阶段、更新阶段和卸载阶段。每个阶段都有对应的生命周期方法，可以在这些方法中执行一些操作。

- **挂载阶段**

constructor：组件被创建时调用，用于初始化组件的状态和绑定事件处理函数等操作。<br>
getDerivedStateFromProps：组件被创建或更新时调用，用于根据props计算state的值。<br>
render：组件被创建或更新时调用，用于渲染组件的UI。<br>
componentDidMount：组件被挂载到DOM后调用，用于执行一些需要DOM的操作，如获取元素的宽高等。

- **更新阶段**

getDerivedStateFromProps：组件被更新时调用，用于根据props计算state的值。<br>
shouldComponentUpdate：组件被更新时调用，用于判断是否需要重新渲染组件。<br>
render：组件被更新时调用，用于渲染组件的UI。<br>
componentDidUpdate：组件被更新后调用，用于执行一些需要DOM的操作，如获取元素的宽高等。

- **卸载阶段**

componentWillUnmount：组件被卸载前调用，用于执行一些清理操作，如取消定时器、取消事件监听等。

## 什么是虚拟DOM？它的作用是什么？
虚拟DOM是React的一个重要概念，它是一个轻量级的JavaScript对象，用于描述真实DOM的结构和属性。React通过比较新旧虚拟DOM的差异，最小化DOM操作，提高性能。

虚拟DOM的作用主要有以下几个方面：<br>
- 提高性能：虚拟DOM可以减少DOM操作的次数，从而提高应用的性能。<br>
- 简化开发：虚拟DOM可以将UI抽象为组件，使得代码更加清晰、易于理解和维护。<br>
- 跨平台：虚拟DOM可以在不同的平台上运行，如浏览器、服务器、移动端等。


## 什么是JSX？它的作用是什么？

JSX是React的一个重要特性，它是一种JavaScript的语法扩展，可以在JavaScript中编写类似HTML的代码。JSX可以将UI抽象为组件，使得代码更加清晰、易于理解和维护。

JSX的作用主要有以下几个方面：<br>
- 简化开发：JSX可以将UI抽象为组件，使得代码更加清晰、易于理解和维护。<br>
- 提高性能：JSX可以通过虚拟DOM来最小化DOM操作，提高应用的性能。<br>
- 类型检查：JSX可以使用静态类型检查工具，如TypeScript和Flow，来检查代码的类型错误。

将UI抽象为组件，是指将UI拆分为多个独立的、可复用的组件，每个组件只关注自己的UI和交互逻辑，从而使得代码更加清晰、易于理解和维护。

JSX是一种JavaScript语法扩展，它允许我们在JavaScript代码中编写类似于HTML的标记。当浏览器读取JavaScript文件时，它无法直接理解和执行JSX语法，因为它不是标准的JavaScript语法。

要使浏览器能够理解JSX，我们需要使用Babel等工具将包含JSX的代码转换为浏览器可理解的纯JavaScript代码。这个过程称为JSX编译。


## 什么是状态提升？它的作用是什么？

状态提升是指将组件之间共享的状态提升到它们的最近公共祖先组件中，
从而使得组件之间可以共享状态。状态提升可以使得代码更加清晰、易于理解和维护，同时也可以提高代码的复用性和可维护性。<br>
在React中，状态提升通常是通过将状态保存在父组件中，然后通过props将状态传递给子组件来实现的。这样，子组件就可以共享父组件的状态，从而实现组件之间的通信。<br>
状态提升的作用主要有以下几个方面：<br>
- 提高代码复用性：通过将状态提升到公共祖先组件中，可以使得多个组件共享同一个状态，从而提高代码的复用性。<br>
- 简化代码逻辑：通过将状态提升到公共祖先组件中，可以使得代码逻辑更加清晰，易于理解和维护。<br>
- 提高性能：通过将状态提升到公共祖先组件中，可以减少组件之间的通信，从而提高性能。



## 什么是React的上下文（context）？它的作用是什么？

React的上下文（context）是一种在组件树中共享数据的方法。它允许您在组件之间共享数据，而不必通过props将数据一级一级地传递下去。上下文可以使得代码更加简洁、易于理解和维护，
同时也可以提高代码的复用性和可维护性。

在React中，上下文是通过两个组件来实现的：Provider和Consumer。Provider组件用于提供数据，而Consumer组件用于消费数据。当一个组件需要从上下文中获取数据时，它可以使用Consumer组件来订阅上下文，然后在回调函数中获取数据。

上下文的作用主要有以下几个方面：

- 简化组件之间的数据传递：通过使用上下文，可以避免将数据一级一级地传递下去，从而简化了组件之间的数据传递。
- 提高代码复用性：通过使用上下文，可以将数据共享给多个组件，从而提高了代码的复用性。
- 提高代码的可维护性：通过使用上下文，可以将数据的管理集中在一处，从而提高了代码的可维护性。


在 React 中，上下文是通过 React.createContext 方法创建的。
例如，我们可以创建一个名为 ThemeContext 的上下文，用于共享应用程序的主题：

```javascript
import React from 'react';

const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button>{theme}</button>;
}

export default App;
```


## 什么是高阶组件（HOC）？它的作用是什么？

高阶组件（Higher-Order Component，HOC）是一个函数，它接受一个组件并返回一个新的组件。HOC 的作用是用于组件间代码的复用，可以将组件间共用的逻辑抽象出来，封装到 HOC 中，然后通过传入不同的组件来复用这些逻辑。HOC 可以用于很多场景，比如：代码复用、逻辑抽象、渲染劫持、状态管理等等。在 React 中，HOC 是一种常见的代码复用方式，它可以用来增强组件的功能。

比如：添加 props、渲染劫持、状态管理等等。在 React 中，HOC 通常是一个函数，它接受一个组件作为参数，并返回一个新的组件。这个新的组件可以包装原来的组件，从而增强原来组件的功能。

渲染劫持是指在 React 中，通过修改组件的渲染结果来实现某些特定的功能。渲染劫持通常使用高阶组件（HOC）来实现。

例如，我们可以定义一个名为 withUpperCase 的 HOC，它接受一个组件作为参数，并返回一个新的组件。新的组件会将传入的组件的渲染结果转换为大写字母。下面是一个使用 withUpperCase 的例子：
```javascript
import React from 'react';

function withUpperCase(Component) {
  return class extends React.Component {
    render() {
      const originalRenderResult = super.render();
      const modifiedRenderResult = React.cloneElement(originalRenderResult, {
        children: originalRenderResult.props.children.toUpperCase()
      });
      return modifiedRenderResult;
    }
  };
}

function MyComponent(props) {
  return <div>{props.text}</div>;
}

const MyComponentWithUpperCase = withUpperCase(MyComponent);

export default MyComponentWithUpperCase;
```
在这个例子中，我们定义了一个名为 withUpperCase 的 HOC。这个 HOC 接受一个组件作为参数，并返回一个新的组件。新的组件会将传入的组件的渲染结果转换为大写字母。我们可以使用这个 HOC 来增强任何需要将渲染结果转换为大写字母的组件。

需要注意的是，渲染劫持可能会影响组件的性能和可维护性。因此，在使用渲染劫持时，需要仔细考虑其影响，并确保其不会对应用的整体性能和可维护性造成负面影响。

## 什么是Redux？它的作用是什么？

Redux 是一个 JavaScript 应用程序状态管理工具，它可以帮助我们管理应用程序的状态。Redux 的核心思想是将应用程序的状态存储在一个单一的、不可变的对象中，这个对象被称为“store”。我们可以通过“action”来描述应用程序中的事件，比如用户点击了一个按钮，或者从服务器获取了一些数据。当一个 action 被触发时，Redux 会根据这个 action 和当前的 state 来计算出一个新的 state，并将这个新的 state 存储在 store 中。这个过程被称为“reducer”。

Redux 的作用是让我们更好地管理应用程序的状态。通过将应用程序的状态存储在一个单一的、不可变的对象中，我们可以更好地控制应用程序的状态，并且可以更容易地进行调试和测试。此外，Redux 还提供了一些工具来帮助我们处理异步操作、处理副作用等等。


## React的上下文（context）和redux有什么区别

React Context API 用于在 React 应用程序中在组件之间共享数据，而无需通过多个组件层次结构传递 props。它允许以更有效和灵活的方式管理组件之间的状态。

相反，Redux 是一个状态管理库，提供了一个集中的存储区来管理应用程序的状态。它允许以可预测和可扩展的方式管理状态，并可与 React 或其他框架一起使用。

虽然 React Context 和 Redux 都可用于状态管理，但它们具有不同的用例和权衡。React Context 最适合在几个紧密相关的组件之间共享数据，而 Redux 更适合在许多组件之间管理复杂状态。此外，Redux 提供了时间旅行调试和中间件等功能，这些功能在 React Context 中不可用。总之，React Context 和 Redux 都是在 React 应用程序中管理状态的有用工具，但它们具有不同的优势，应根据应用程序的具体需求进行选择。


## 什么是React Router？它的作用是什么？

React Router 是一个用于在 React 应用程序中实现客户端路由的库。它允许开发人员在应用程序中定义多个 URL，每个 URL 对应一个组件或一组组件。React Router 提供了一组组件，如 BrowserRouter、Route、Link 等，用于实现路由功能。其中，BrowserRouter 组件用于包装整个应用程序，Route 组件用于定义 URL 和组件之间的映射关系，Link 组件用于在应用程序中创建链接。

React Router 的作用是使应用程序的 URL 更加友好和可读，并提供一种更加灵活和可扩展的方式来管理应用程序的状态。通过使用 React Router，开发人员可以将应用程序的不同部分组织成多个页面或视图，并通过 URL 来访问它们。这样，用户可以通过浏览器的前进和后退按钮来导航应用程序，而无需刷新页面或重新加载整个应用程序。此外，React Router 还提供了一些高级功能，如嵌套路由、路由守卫、动态路由等，使开发人员能够更加灵活地控制应用程序的路由行为。

## 什么是React Native？它的作用是什么？

React Native 是一个用于构建原生移动应用程序的框架，
它使用 React 和 JavaScript 技术栈来实现跨平台开发。
React Native 允许开发人员使用相同的代码库来构建 iOS 和 Android 应用程序，
并提供了一组组件和 API，用于访问设备功能和原生 UI 组件。


## 什么是react函数组件和类组件？

React 组件是构建 React 应用程序的基本构建块。React 组件可以是函数组件或类组件。

函数组件是一种简单的组件类型，它是一个接受 props 作为输入并返回 React 元素的函数。
函数组件通常用于渲染静态内容或简单的 UI 元素。

类组件是一种更复杂的组件类型，它是一个继承自 React.Component 的 JavaScript 类。
类组件可以包含状态和生命周期方法。

无论是函数组件还是类组件，它们都可以接受 props 作为输入，并返回 React 元素作为输出。
在实际开发中，函数组件通常用于渲染静态内容或简单的 UI 元素，而类组件通常用于处理更复杂的逻辑和状态管理。







# 挑战性的 React 面试题：

## React 中受控组件和非受控组件有什么区别？

React 中受控组件和非受控组件的区别在于它们如何处理表单数据。
受控组件是指表单元素的值由 React 组件的 state 控制，而非受控组件是指表单元素的值由 DOM 自身控制。
在受控组件中，表单元素的值被 React 组件的 state 所控制。
当用户输入数据时，React 组件会更新自己的 state，并将新的 state 传递给表单元素。
这种方式使得 React 组件可以完全控制表单数据的流动，从而使得表单数据更加可控和可预测。

在非受控组件中，表单元素的值由 DOM 自身控制。当用户输入数据时，表单元素会自动更新自己的值，并且不会通知 React 组件。这种方式使得表单数据的流动更加自然和直接，但是也使得表单数据的控制变得更加困难。



## shouldComponentUpdate() 方法在 React 中的作用是什么？

shouldComponentUpdate() 方法在 React 中的作用是优化组件的性能。
当组件的 props 或 state 发生变化时，React 会重新渲染组件。
但是，在某些情况下，重新渲染组件可能是不必要的，因为组件的输出没有发生变化。
这时，可以使用 shouldComponentUpdate() 方法来告诉 React 是否应该重新渲染组件。

默认情况下，React 组件的 shouldComponentUpdate() 方法返回 true，
这意味着每次组件的 props 或 state 发生变化时，React 都会重新渲染组件。
但是，如果你知道组件的输出不会发生变化，你可以重写 shouldComponentUpdate() 方法，
使其返回 false，从而阻止 React 重新渲染组件。


## React 如何处理大型应用程序的状态管理？

Redux 是一个独立于 React 的状态管理库，它可以与任何 JavaScript 应用程序一起使用。Redux 的核心概念是 store、action 和 reducer。

Store：存储应用程序的状态。<br>
Action：描述应用程序中发生的事件。<br>
Reducer：根据 action 更新 store 中的状态。


## useEffect() hook 在 React 中的作用是什么？

useEffect() hook 在 React 中的作用是在函数组件中执行副作用操作。
副作用操作是指对组件外部环境产生影响的操作，例如访问网络、修改 DOM、订阅事件等。
useEffect() hook 接受两个参数：一个函数和一个可选的依赖数组。当组件渲染时，
React 会执行传递给 useEffect() 的函数。如果依赖数组中的任何一个值发生变化，
React 会再次执行该函数。如果依赖数组为空，则 useEffect() 只会在组件挂载和卸载时执行一次。


## useContext() hook 在 React 中的作用是什么？

useContext() hook 在 React 中的作用是消费使用 React.createContext() 方法创建的上下文。
上下文提供了一种在组件树中传递数据的方式，而无需手动在每个级别上手动传递 props。
使用 useContext() hook 可以消费上下文并获取传递给上层组件的值。
总的来说，useContext() hook 是在 React 应用程序中管理状态和在组件之间传递数据的强大工具。


## React 如何处理性能优化？

- 使用 shouldComponentUpdate() 方法：这个方法可以让组件在更新之前检查它的 props 和 state 是否发生了变化。如果没有变化，组件可以避免重新渲染，从而提高性能。
- 使用 React.memo() 函数：这个函数可以将组件包装在一个高阶组件中，并缓存组件的输出。如果组件的 props 没有变化，它将返回缓存的输出，从而避免重新渲染。
- 使用 React.lazy() 函数：这个函数可以让组件在需要时才加载，从而减少初始加载时间。它可以与 Suspense 组件一起使用，以便在加载组件时显示一个加载指示器。
- 使用 useCallback() 和 useMemo() 钩子：这些钩子可以帮助避免不必要的函数调用和计算。useCallback() 可以缓存函数，以便在 props 没有变化时避免重新创建它。useMemo() 可以缓存计算结果，以便在 props 没有变化时避免重新计算它。
- 使用虚拟化：虚拟化技术来减少渲染时间和内存占用。虚拟化可以将只有在屏幕上可见的部分渲染到 DOM 中，从而避免渲染不必要的内容。


## React 中 props 和 state 有什么区别？

在 React 中，组件可以接收两种类型的数据：props 和 state。它们之间的区别在于它们的来源和用途。

props 是从父组件传递给子组件的数据。它们是只读的，子组件不能修改它们。父组件可以通过更改它们来控制子组件的行为和外观。在组件内部，可以通过 this.props 访问它们。

state 是组件内部的数据。它们是可变的，组件可以通过调用 this.setState() 方法来更改它们。当 state 更改时，组件会重新渲染以反映新的状态。通常，state 用于存储组件的状态和用户交互的数据。


## React 如何处理错误边界？