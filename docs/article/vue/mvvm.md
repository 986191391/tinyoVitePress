# Vue MVVM

MVVM 是 Model-View-ViewModel 的缩写，是一种软件架构模式。

在 MVVM 中，Model 和 View 不能直接进行通信，需要通过 ViewModel 层才能实现通信。ViewModel 在 MVVM 中充当一个观察者的模式，它需要监听 Model 和 View 中数据的变化。

每当 Model 的数据更新时，ViewModel 需要通知响应的 View 进行 UI 更新。当用户操作 View 进行数据修改时，ViewModel 也需要获取到数据的变化，从而通知 Model 更新对应的值。通过这种方式来实现数据的双向绑定。





- Model（模型）： 表示数据和业务逻辑。在 Vue 中，数据通常被定义在 Vue 实例的 data 选项中，也可以来自后端服务器或其他数据源。Model 是应用程序的数据来源。

- View（视图）： 表示用户界面。在 Vue 中，View 是由模板（Template）表示的，模板是一个基于 HTML 的标记语言，用于描述应用程序的界面结构和外观。

- ViewModel（视图模型）： 它是 View 和 Model 之间的桥梁，负责将 Model 的数据绑定到 View 上，同时也监听 View 中的用户交互，将用户输入的数据同步到 Model 中。在 Vue 中，ViewModel 就是 Vue 实例。Vue 通过数据绑定和响应式系统实现了 ViewModel 的功能。



实现 MVVM 的核心是数据绑定和响应式系统。Vue 的响应式系统会追踪依赖关系，当 Model（数据）发生变化时，ViewModel（Vue 实例）会自动更新相应的 View（界面）。同时，Vue 的数据绑定机制允许将 Model 中的数据直接绑定到 View 的特定属性上，这样当 Model 变化时，View 会自动更新，无需手动操作 DOM。