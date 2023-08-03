# React组件通信

## props

```jsx
function Parent() {
  const [text, setText] = useState('默认文本');

  const handleButtonClick = () => {
    setText('新文本');
  }

  return (
    <div>
      <ChildA onButtonClick={handleButtonClick} />
      <ChildB text={text} />
    </div>
  );
}

function ChildA({ onButtonClick }) {
  return (
    <button onClick={onButtonClick}>点击我</button>
  );
}

function ChildB({ text }) {
  return (
    <p>{text}</p>
  );
}
```
在这种情况下，我们将 handleButtonClick 作为 onButtonClick 属性从父组件传递到 ChildA，然后当按钮被点击时调用它。另外，我们也使用了 text 属性将状态从父组件传递到了 ChildB 中。

## 通过状态提升进行组件间通信

现在想要让 ChildA 获取 ChildB 中的表单新值，可以引入状态提升来进行组件之间的通信。

```jsx
function Parent() {
  const [text, setText] = useState('默认文本');
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setText('新文本');
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <ChildA onButtonClick={handleButtonClick} inputValue={inputValue} onInputChange={handleInputChange} />
      <ChildB text={text} inputValue={inputValue} onInputChange={handleInputChange} />
    </div>
  );
}

function ChildA({ onButtonClick, inputValue, onInputChange }) {
  return (
    <>
      <button onClick={onButtonClick}>点击我</button>
      <input type="text" value={inputValue} onChange={onInputChange} />
    </>
  );
}

function ChildB({ text, inputValue, onInputChange }) {
  return (
    <>
      <p>{text}</p>
      <input type="text" value={inputValue} onChange={onInputChange} />
    </>
  );
}
```

我们将 inputValue 状态从 ChildB 中移到了父组件中，并将其通过 props 传递给了 ChildA 和 ChildB 组件。现在当表单参数改变时，它们会同步更新到两个子组件中。


## Context API

假设有一个应用程序，其中有多个组件需要访问用户信息，可以使用 Context API 将用户信息共享给子孙组件：

```jsx 
const UserContext = React.createContext();

function App() {
  const user = { name: "Tom", age: 20 };
  return (
    <UserContext.Provider value={user}>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

function Header() {
  // 从 Context 中获取用户信息
  const user = useContext(UserContext);
}

function Main() {
  // 从 Context 中获取用户信息
  const user = useContext(UserContext);
}

function Footer() {
  // 从 Context 中获取用户信息
  const user = useContext(UserContext);
}
```

## 发布订阅模式

通过发布订阅模式实现组件之间的通信时需要借助第三方库（如 events 或 mitt）或自己封装事件库。以下是使用 mitt 库实现一个简单的事件管理器:

```jsx
import mitt from "mitt";

const events = new mitt();

function Button() {
  function handleClick() {
    events.emit("buttonClicked");
  }

  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

function Alert() {
  useEffect(() => {
    events.on("buttonClicked", () => {
      alert("The button was clicked!");
    });
  }, []);

  return null;
}
```

## Redux状态管理
Redux是一种用于JavaScript应用程序的状态管理库。它用于管理应用程序的状态（数据），并以可预测的方式跟踪和更新该状态。Redux通常与React一起使用，但它也可以与其他JavaScript库或框架一起使用。

Redux的核心思想是将应用程序的状态存储在一个单一的JavaScript对象中，称为"store"。该状态是只读的，意味着不能直接修改它。要更改状态，你需要分发一个特殊的JavaScript对象，称为"action"，它描述了要执行的操作。然后，通过使用一个纯函数，称为"reducer"，Redux将先前的状态和操作合并起来，生成新的状态。这确保了状态变更的可预测性和可追踪性。

假设要实现一个简单的计数器应用程序，其中有两个组件：Counter 和 Display。Counter 显示计数器和增加、减少和重置按钮，Display 显示当前计数器的值。这时可以使用 Redux 来存储和管理计数器的状态。

```jsx
// actions.js
export const increment = () => {
  return { type: "INCREMENT" };
};

export const decrement = () => {
  return { type: "DECREMENT" };
};

export const reset = () => {
  return { type: "RESET" };
};

// reducers.js
const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

export default counterReducer;

// store.js
import { createStore } from "redux";
import counterReducer from "./reducers";

const store = createStore(counterReducer);

export default store;

// Counter 组件
function Counter() {
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

  function handleReset() {
    dispatch(reset());
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

// Display 组件
function Display() {
  const count = useSelector((state) => state.count);

  return <p>The current count is: {count}</p>;
}
```

## 缓存

假设需要从 API 获取用户列表，并在不同的页面中展示。为了减少对 API 的请求次数，可以在浏览器中使用 sessionStorage 来缓存这些数据。

```jsx 
// UserList 组件
function UserList() {
  useEffect(() => {
    const cachedUsers = sessionStorage.getItem("users");

    if (cachedUsers) {
      // 从缓存中获取用户列表数据
      setUsers(JSON.parse(cachedUsers));
    } else {
      // 请求用户列表数据并保存到缓存中
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          sessionStorage.setItem("users", JSON.stringify(data));
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}

// User 组件
function User({ user }) {
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}
```