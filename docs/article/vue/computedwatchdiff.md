# computed和watch的区别

- computed

计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。

可用于类似数值的总计，对数据的拼接，装饰等。利用 computed 的缓存特性，避免每次获取值时，都要重新计算。

- watch

类似监听，当监听的变量发生改变后会触发回调函数进行后续操作。

当我们需要在数据变化时执行异步或开销较大的操作时，使用 watch 选项允许我们执行异步操作，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

还可以监听路由的变化，处理特定的逻辑。