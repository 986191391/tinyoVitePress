# Vue-router原理

主要介绍vue-router实现原理及两种模式分析, hash模式与history模式。

- hash（HashHistory）

hash（“#”）符号的本来作用是加在URL中指示网页中的位置，hash虽然出现在URL中，但不会被包括在HTTP请求中。它是用来指导浏览器动作的，对服务器端完全无用，因此，改变hash不会重新加载页面，每一次改变hash（window.location.hash），都会在浏览器的访问历史中增加一个记录。
```javascript
window.addEventListener("hashchange", funcRef, false)
```
利用hash的以上特点，就可以来实现前端路由“更新视图但不重新请求页面”的功能了。

1. 当应用程序加载时，Vue Router会初始化，并通过监听hashchange事件来响应URL的变化。
2. 当用户点击链接或执行编程式导航时，Vue Router会更新URL的hash部分，并触发hashchange事件。
3. Vue Router监听到hashchange事件后，会解析新的hash值，提取路由信息。
4. 根据提取到的路由信息，Vue Router会找到对应的组件，并进行渲染。
5. 用户在应用程序中进行路由切换时，会不断重复上述过程。

hash模式的优点是它的兼容性非常好，因为它不需要对服务器进行特殊配置。但它的缺点是URL中包含了#符号，看起来不太美观。而且在SEO（搜索引擎优化）方面可能会受到一些限制，因为搜索引擎爬虫可能不会处理URL中的hash部分。



- history（HTML5History）

History接口 是浏览器历史记录栈提供的接口，通过back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作。在控制台中输入window.history即可看到对应的属性。

从HTML5开始，History interface提供了两个新的方法：pushState(), replaceState()使得我们可以对浏览器历史记录栈进行修改：
```javascript
window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)

window.addEventListener("popstate", () => {})
```
当浏览器跳转到新的状态时，将触发popState事件，该事件将携带stateObject参数的副本, title: 所添加记录的标题, URL: 所添加记录的URL。与hash模式一样，可以通过监听popState来实现前端路由“更新视图但不重新请求页面”的功能了。

1. 在 history 模式下，URL 中的路由信息不再包含特殊字符（如 hash 模式的 # 符号）。

2. 当用户在应用程序中导航到不同的路由时，Vue Router 会使用 History API 修改浏览器的历史记录，而不会发送新的请求。

3. 当用户点击链接或执行编程式导航时，Vue Router 会使用 pushState() 或 replaceState() 方法更新浏览器的历史记录，并将新的路由路径添加到浏览器的地址栏中。

4. 当用户通过前进或后退按钮导航时，浏览器会触发 popstate 事件。Vue Router 监听到这个事件后，会根据新的路由路径解析出路由信息，并渲染对应的组件。

5. Vue Router 会根据新的路由信息找到对应的组件，并进行渲染。

6. 用户在应用程序中进行路由切换时，会不断重复上述过程。



- 共同点

当调用他们修改浏览器历史记录栈后，虽然当前URL改变了，但浏览器不会刷新页面，这就为单页应用前端路由“更新视图但不重新请求页面”提供了基础。 浏览器历史记录可以看作一个「栈」。栈是一种后进先出的结构，可以把它想象成一摞盘子，用户每点开一个新网页，都会在上面加一个新盘子，叫「入栈」。用户每次点击「后退」按钮都会取走最上面的那个盘子，叫做「出栈」。而每次浏览器显示的自然是最顶端的盘子的内容。

- SPA单页面的优缺点分别是什么?

SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

· 优点:
1. 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；<br>
2. 基于上面一点，SPA 相对对服务器压力小；<br>
3. 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；<br>

· 缺点:
1. 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
2. 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
3. SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

```javascript
let _Vue = null

class VueRouter {
    static install(Vue) {
        //1.判断插件是否已经被加载
        if (VueRouter.install._installed) return
        VueRouter.install._installed = true

        //2.将Vue注册到全局
        _Vue = Vue

        //3.当Vue加载的时候，把router对象挂载到Vue实例上
        Vue.mixin({
            beforeCreate() {
                //判断router是否已经挂载到Vue实例上
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                }
            }
        })
    }

    constructor(options) {
        this.options = options
        // 记录路由配置中路径和组件 键值对
        this.routeMap = {}
        // 通过Vue的observable将当前路由地址变为响应式
        this.data = _Vue.observable({
            current: '/'
        })
        // 初始化
        this.init()
    }

    init() {
        // 初始化routeMap
        this.initRouteMap()
        // 初始化组件router-link router-view
        this.initComponent()
        // 初始化popstate
        this.initEvent()
    }

    initRouteMap() {
        if (this.options.routes) {
            this.options.routes.forEach(route => {
                this.routeMap[route.path] = route.component
            })
        }
    }

    initComponent() {
        // router-link
        _Vue.component('router-link', {
            props: {
                to: String
            },
            // template: "<a :href='to'><slot></slot></a>"

            render(h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandle
                    }
                }, [this.$slots.default])
            },
            methods: {
                clickHandle(e) {
                    history.pushState({}, "", this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()

                }
            }
        })

        // router-view
        const self = this
        _Vue.component('router-view', {
            render(h) {
                const comp = self.routeMap[self.data.current]
                return h(comp)
            }
        })
    }

    initEvent() {
        window.addEventListener("popstate", () => {
            this.data.current = location.pathname
        })
    }
}

export default VueRouter

```
