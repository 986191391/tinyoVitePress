# React 函数式组件和类组件的区别


## 编写方式

在组件的编写过程中，可以分别通过两种方式来实现组件的编写。


类组件，顾名思义，也就是通过使用ES6类的编写形式去编写组件，该类必须继承React.Component。想要访问父组件传递过来的参数，可通过this.props的方式去访问。在组件中必须实现render方法，在return中返回React对象。
```jsx
class customComponent extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return <h2>Hello, { this.props.name }</h2>
	}
}
```

函数组件，是通过函数编写的形式去实现一个React组件，是React中定义组件最简单的方式。
```jsx
function customComponent(props) {   
  return <h2>Hello, { props.name }</h2>; 
}
```

## 状态管理

在类组件中可以对状态进行管理，调用setState方法可以对组件的状态进行修改。

对于函数组件，在没有hooks之前，函数组件就是无状态的组件，不能保存组件的状态。如果想要对组件状态进行管理，需要使用到useState。

```jsx
const customComponent = () => {
	const [num, setNum]= React.useState(0);

	return (
    <div> 
      <p>number: {num}</p> 
      <button onClick= {()=> setNum(num + 1)}>点我加一</button> 
    </div>
  );
};
```

## 生命周期

类组件的生命周期在不同版本有些差异，具体可以查看 <a href="/article/react/lifeCycle.html">React生命周期</a> 文章。


而在函数组件中，并没有生命周期的概念。但是可以通过使用useEffect来代替生命周期的作用。

```jsx


const App = (props) => {
	const [num, setNum]= React.useState(0);
  // 模拟 componentDidMount
  useEffect(() => {
    console.log("模拟componentDidMount，即只运行一次该函数");
  }, []);
  // 模拟 componentDidUpdate
  useEffect(() => {
    console.log("模拟 componentDidUpdate，state变化了，无论是什么");
  });
  // 模拟 componentWillUnMount
  useEffect(() => {
    return () => {
      console.log('componentWillUnMount 写在这');
    }
  });
  // 模拟watch
  useEffect(() => {
    console.log("num变量发生改变时调用");
  }, [num]);
  return (
    <div>
      <p>number: {num}</p> 
      <button onClick= {()=> setNum(num + 1)}>n+1</button>
    </div>
  );
};
```


## 其他

以上三个例子是主要的区别，其他的还有调用方式、值的渲染等的区别。了解即可。