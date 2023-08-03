# React Hooks

React Hooks 是 React 16.8.0 版本引入的新特性，它是一种可以让你在不编写 Class 组件的情况下，在函数组件中复用状态逻辑以及其他的 React 特性的方法。

React Hooks 的作用主要有两个方面：

- 更加灵活的状态管理：在不使用 Redux 等状态管理工具的情况下，Hooks 可以让我们更加方便地实现组件之间的状态共享和传递，避免了一些嵌套和回调的结构问题。

- 替代生命周期函数：在函数式组件中，过去的生命周期函数并不容易管理及满足全部需求，因此 Hooks 则提供了 useEffect 和 useLayoutEffect 来解决这些问题，并可以帮助用户优化组件渲染等行为。此外，useCallback、useMemo 等 Hooks 可以帮助我们避免重复执行无意义的计算或函数定义，减少不必要的组件刷新。


## hooks的优缺点

### 优点

1. 更好的逻辑复用

通过自定义hooks来复用状态，从而解决了类组件有些时候难以复用逻辑的问题。函数每次调用都会开辟一份独立的内存空间。

2. 无副作用，代码的可读性强

3. 组件层级变得更浅

在使用hooks之前通常使用高阶组件HOC的方法来复用多个组件公共的状态，增强组件的功能，这样肯定是加大了组件渲染的开销，损失了性能。但是在hooks中可以通过自定义组件useXxx()的方法将多个组件之间的共享逻辑放在自定义hook中，就可以轻松的进行数据互通。


4. 不再需要考虑class组件中this指向的问题

5. 可维护性及扩展性强


### 缺点

1. 生命周期不全

hooks的useEffect只包括了componentDidMount、componentDidUpdate和componentWillUnmount这三个生命周期，对于getSnapshotBeforeUpdate和componentDidCatch等其他的生命周期没有支持。

2. 重复执行性能问题

在hooks中注册了很多的函数，假如该组件需要频繁更新，更新时函数则会重新的创建，消耗性能。

## useState

useState 是最基本、最常用的 Hook 之一，它的作用是在函数型组件中添加状态（state）。通常用一个数组来存储 state 和 setState，如下所示：
```javascript
const [count, setCount] = useState(0);
```
其中 count 是当前状态的值，setCount 是更新状态的函数；0 是 count 的初始值。


## useEffect

useEffect 是另一个常用的 Hook，它可以让你在函数组件中执行副作用操作，比如添加或删除 DOM 节点、向服务器请求数据等等。它的语法和 componentDidMount / componentDidUpdate 类似，但是可以减少代码重复和处理副作用的逻辑冗余，如下所示:

```javascript
// 实现对count变量的监听，类似watch
// 也可以模拟 componentDidUpdate 生命周期 
useEffect(() => {
}, [count]);


// 模拟 componentDidMount 生命周期
useEffect(() => {
}, []);

// 模拟 componentWillUnmount 生命周期
// 需要在内部返回一个函数
useEffect(() => {
  const timeoutId = setTimeout(() => {
    console.log('Hello');
  }, 1000);

  return () => {
    clearTimeout(timeoutId);
  }
}, []);

```

## useCallback useMemo

[彻底理解 React hook useCallback和useMemo的区别](https://juejin.cn/post/6844904032113278990)

上文很好的讲解了他们的使用场景及区别。二者都是用于缓存，useCallback用于缓存函数，useMemo用于缓存变量，它们都可以根据监听值的改变来重新触发回调函数，以此来更新值。
## useContext

React 中的 useContext() Hook 是用于方便地共享组件树中数据的方法，它可以让我们在不必通过中间层组件传递 props 的情况下获取全局状态，提高了应用程序的整体效率和可读性。

useContext() 使用一个 React 上下文对象作为参数，并返回该上下文对象的当前值。当在某个组件中调用 useContext() 时，React 会自动向上查找最近的 Context Provider，并使用这个 Provider 所设置的值进行渲染。

假设我们需要跨多个组件展示一个课程列表，并且希望避免在每一个组件中都添加对同一数据的请求或者按需加载。在这种情况下，我们可以将 CourseContext 对象设置为所需交互的值：

```jsx
// 创建上下文对象
const CourseContext = React.createContext();

function App() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // 向服务器查询课程数据
    fetch('http://exampleapi.com/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
  }, []);

  return (
    <div className="App">
      <CourseContext.Provider value={courses}>
        <SectionList />
      </CourseContext.Provider>
    </div>
  );
}
```
它定义了一个有用的 Course Context 对象，该对象通过 Provider 的 value 设置存储读取到的所有课程。

接下来，在 SectionList 组件中使用 useContext 并从刚刚创建的上下文对象注入已获取的课程列表：
```javascript
function SectionList() {
  // 获取 course 全局状态
  const courses = useContext(CourseContext);
  //...
}
```
需要注意的是，CourseContext.Provider 的 value 可以是任意类型的，甚至可以是 object, function 等各种类型（类似于 props 传递方式）。对于需要共享单个值的上下文，我们可以直接将其设置为基本类型，如字符串或数字。如果需要在 Provider 块内实现某些功能（例如：更新数据），则可以使用回调函数或对象。

当 Context Provider 的 value 更改时 useEffect() Funcion 才会重新运行。如果 createContext() 函数传递的默认值永远不使用，就没有必要使用它。此外，当使用 createContxt() 创建一个上下文时，也可以通过 createContext(defaultValue) 设置默认值以防止出现 undefined 错误。


## useReducer

useReducer 是 useState 的一种替代方案，它更适合处理复杂的、需要多个状态变量以及状态之间相互影响的组件。从系统架构来看，使用 useReducer 将使得 React 组件更容易维护和扩展。

假设我们正在开发一个 “To-Do List” 应用，并需要使用 useReducer() 以方便地管理多个任务和其完成状态。这里我们定义一个 reducer 函数，然后将其传递给 useReducer() 来更新 ourTaskState 状态：

```jsx
const taskReducer = (state, action) => {
  switch(action.type) {
    case 'add':
      return [...state, {title: action.title, completed: false}];
    case 'toggleCompletion':
      return state.map((task, i) => (
        i === action.index ? {...task, completed: !task.completed} : {...task}
      ));
    default:
      throw new Error("Invalid action type");
  }
}

function TodoList() {
  const [taskState, dispatch] = useReducer(taskReducer, []);

  function addTask(title) {
    dispatch({type: 'add', title });
  }

  function toggleTaskCompletion(index) {
    dispatch({type: 'toggleCompletion', index });
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TaskForm onNewTask={addTask} />
      <ul>
        {taskState.map((task, i) => (
          <TaskItem 
            key={i} 
            task={task} 
            onCompleteToggle={() => toggleTaskCompletion(i)}
          />
        ))}
      </ul>
    </div>
  );
}
```
在上述示例中，taskReducer 接收两个参数：state 和 action。这个 reducer 将根据传入的 action 对 state 进行操作并返回更新的状态。在我们的应用程序中，action 可以是 add 或 toggleCompleted 之一，具体取决于何时使用 dispatch() 触发该事件。

我们使用 useReducer() 来初始化任务状态（即 Task State），并且在需要更改某个任务完成状态时向 dispatch() 提供一个 action 元素，以调用对应的 reducer 代码逻辑来完成对状态更新的操作。例如，我们触发 form 元素的提交时间添加一个新任务，或者在切换任务完成状态时，通过 Action 元素之一触发 code 逻辑来更新 ourTaskState。

## 自定义hooks

- useForm 

```jsx
import { Form, Input, Button } from 'antd';
import { useState } from 'react';

function useForm(initialState) {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return {
    values,
    handleChange,
    resetForm
  };
}

// 使用自定义 Hook 的组件
function MyForm() {
  const { values, handleChange, resetForm } = useForm({ name: '', email: '' });

  const handleSubmit = (values) => {
    // 处理表单提交逻辑
    // 使用 values.name 和 values.email 获取表单数据
    // ...
    resetForm();
  };

  return (
    <Form onFinish={handleSubmit} initialValues={values}>
      <Form.Item name="name" label="Name">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
```

- useLocalStorage

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// 使用自定义 Hook 的组件
function App() {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```


