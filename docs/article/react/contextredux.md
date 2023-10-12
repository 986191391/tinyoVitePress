# 了解 useContext 和 redux 的区别

在实际开发中，两者都是用于状态管理。而他们的使用方式和设计理念不同。曾经有个面试官问过我，它们的区别是什么？

Context API 是在 react 16.3 版本所引入的。主要是为了解决静态数据的跨组件层级传递的效率问题。<a href="/article/react/hooks.html#usecontext">useContext使用</a>

redux则是状态管理的库。一般用于中大型项目、复杂的数据状态管理，有助于更好的管理分配不同的状态，让代码结构更加清晰，易于分类维护等。框架的核心概念有“store”，“state”，“view”，“dispatch”，“action”，“reducer”等。

## 状态管理

使用redux时，数据通常定义在state中，而想要修改state中的值，需要通过dispatch触发action才能对state的数据进行修改。

而context定义的数据，可以直接被修改，没有限制，这是它们之间最主要的区别，在数据安全性层面看不及redux。

## 打包体积

如果项目需要使用redux，需要引入对应的库。而context直接通过React.createContext()即可创建，从打包后的体积也可看出。使用context的体积会更小。

## 使用场景

context： 一般只考虑偏静态数据的跨组件层级传递和共享，不考虑状态更新。

redux： 中大型的状态管理场景，意味着状态规模很大，更新状态的逻辑代码比较复杂，存在多人协作