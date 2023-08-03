# 源码阅读日记

vue3源码阅读心得，工程下载下来以后，可以发现目录结构如下：
```shell
├──packages
  ├── compiler-core       
  ├── compiler-dom        
  ├── compiler-sfc       
  ├── compiler-ssr     
  ├── reactivity         
  ├── runtime-core       
  ├── runtime-dom         
  ├── vue
  ├── shared
  ├── ...     
```
毫无头绪，只能上网上看人家一些简单的讲解分析来慢慢深入。


https://juejin.cn/post/6909698939696447496

在 Vue3 中每个应用都是通过用 createApp 函数创建一个新的应用实例开始的。所以就从 createApp 函数开始找起。

在 runtime-dom/src/index.tx 中的65行中可以找到` export const createApp`, 在这个方法中，做了三件事情。第一，通过`ensureRenderer`创建了app，第二，改写了app的mount方法，第三，return了app。

找到第一步`ensureRenderer`的方法，在同文件下
```ts
function ensureRenderer() {
  return (
    renderer ||
    (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
  )
}
```
还是使用到了一个createRenderer方法，这个方法来自`@vue/runtime-core`，试着找到该文件。


在runtime-core/src/renderer.ts文件中，找到了它
```ts
export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options)
}
```
该方法接受一个参数，调用该方法返回了`baseCreateRenderer`函数执行的返回值，在同文件的325行中找到了`baseCreateRenderer`方法。

从代码来看，这个方法里面做了很多事情，最后返回了
```ts
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  }
```

createAppAPI才是关键，通过这里找到了我们在实际开发中真正调用的方法。通过它找到了在目录runtime-core/src/apiCreateApp.ts

从199行的createAppAPI方法开始看，很多熟悉的字眼开始出现了。

createAppAPI方法返回了createApp方法，createApp接收两个参数，第一个参数为rootComponent，第二个参数为rootProps。

```ts
// 在下面有使用到
export function createAppContext(): AppContext {
  return {
    app: null as any,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let uid = 0

// 传入参数，调用createAppAPI方法，返回createApp函数
export function createAppAPI<HostElement>(
  render: RootRenderFunction<HostElement>,
  hydrate?: RootHydrateFunction
): CreateAppFunction<HostElement> {
  // 传入参数，调用createApp函数，返回app对象
  return function createApp(rootComponent, rootProps = null) {
    // 判断传入的rootComponent是不是方法，如果不是的话则给rootComponent包装一层
    // extend = Object.assign
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent)
    }

    // 判断：传入的rootProps不为空，而且rootProps不是对象，则warn提示，并将rootProps设置为null
    if (rootProps != null && !isObject(rootProps)) {
      __DEV__ && warn(`root props passed to app.mount() must be an object.`)
      rootProps = null
    }

    // 创建context上下文
    // 它被用于管理应用程序的全局状态和提供一些共享的功能和方法给组件使用。上下文对象允许在组件之间共享数据、状态和函数，而不需要显式地通过组件之间的层层传递来实现。
    const context = createAppContext()

    // TODO remove in 3.4
    if (__DEV__) {
      Object.defineProperty(context.config, 'unwrapInjectedRef', {
        get() {
          return true
        },
        set() {
          warn(
            `app.config.unwrapInjectedRef has been deprecated. ` +
              `3.3 now alawys unwraps injected refs in Options API.`
          )
        }
      })
    }

    // 在调用app.use时，用于判断当前插件是否已经挂载在app中
    const installedPlugins = new Set()

    // 判断是否已经挂载的锁
    let isMounted = false

    // 创建app对象，同时赋值给context.app
    // 最后将该对象导出
    const app: App = (context.app = {
      _uid: uid++,
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,

      version,

      // 对app中的config进行劫持处理
      get config() {
        return context.config
      },
      // 修改不了config对象
      set config(v) {
        if (__DEV__) {
          warn(
            `app.config cannot be replaced. Modify individual options instead.`
          )
        }
      },
      // 实际项目中这样使用 
      // app.use(store).use(router).use(ElementUI).use(AntDesignVue).mount('#app')
      // 挂载插件，接收2个参数
      // 第一个参数即为插件
      // 第二个参数为插件的参数选项
      use(plugin: Plugin, ...options: any[]) {
        // 如果已经挂载则提示
        if (installedPlugins.has(plugin)) {
          __DEV__ && warn(`Plugin has already been applied to target app.`)
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin)
          plugin.install(app, ...options)
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin)
          plugin(app, ...options)
        } else if (__DEV__) {
          warn(
            `A plugin must either be a function or an object with an "install" ` +
              `function.`
          )
        }
        // 最后将app对象return出去，所以可以执行.的操作，实例中可以.use().use()
        return app
      },
      // 混入方法， 
      mixin(mixin: ComponentOptions) {
        if (__FEATURE_OPTIONS_API__) {
          // 判断当前混入数据是否已存在
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin)
          } else if (__DEV__) {
            warn(
              'Mixin has already been applied to target app' +
                (mixin.name ? `: ${mixin.name}` : '')
            )
          }
        } else if (__DEV__) {
          warn('Mixins are only available in builds supporting Options API')
        }
        return app
      },

      component(name: string, component?: Component): any {
        if (__DEV__) {
          validateComponentName(name, context.config)
        }
        if (!component) {
          return context.components[name]
        }
        if (__DEV__ && context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`)
        }
        context.components[name] = component
        return app
      },
      // 指令
      directive(name: string, directive?: Directive) {
        if (__DEV__) {
          validateDirectiveName(name)
        }

        if (!directive) {
          return context.directives[name] as any
        }
        if (__DEV__ && context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`)
        }
        context.directives[name] = directive
        return app
      },
      // 挂载
      mount(
        rootContainer: HostElement, // root节点
        isHydrate?: boolean,
        isSVG?: boolean
      ): any {
        // 判断是否已经挂载, isMounted lock
        if (!isMounted) {
          // #5571
          if (__DEV__ && (rootContainer as any).__vue_app__) {
            warn(
              `There is already an app instance mounted on the host container.\n` +
                ` If you want to mount another app on the same host container,` +
                ` you need to unmount the previous app by calling \`app.unmount()\` first.`
            )
          }
          // 创建虚拟dom
          // 传入根节点组件和props参数
          const vnode = createVNode(rootComponent, rootProps)
          // 将上下问对象赋值到vnode的appContext中
          vnode.appContext = context

          // HMR root reload
          if (__DEV__) {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG)
            }
          }
          // 判断是否为服务端渲染
          if (isHydrate && hydrate) {
            hydrate(vnode as VNode<Node, Element>, rootContainer as any)
          } else {
            render(vnode, rootContainer, isSVG)
          }
          // 执行了该方法后锁定
          isMounted = true
          // 将rootContainer挂载到app上
          app._container = rootContainer
          // for devtools and telemetry
          ;(rootContainer as any).__vue_app__ = app

          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            app._instance = vnode.component
            devtoolsInitApp(app, version)
          }

          return getExposeProxy(vnode.component!) || vnode.component!.proxy
        } else if (__DEV__) {
          warn(
            `App has already been mounted.\n` +
              `If you want to remount the same app, move your app creation logic ` +
              `into a factory function and create fresh app instances for each ` +
              `mount - e.g. \`const createMyApp = () => createApp(App)\``
          )
        }
      },

      unmount() {
        if (isMounted) {
          render(null, app._container)
          if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
            app._instance = null
            devtoolsUnmountApp(app)
          }
          delete app._container.__vue_app__
        } else if (__DEV__) {
          warn(`Cannot unmount an app that is not mounted.`)
        }
      },

      provide(key, value) {
        if (__DEV__ && (key as string | symbol) in context.provides) {
          warn(
            `App already provides property with key "${String(key)}". ` +
              `It will be overwritten with the new value.`
          )
        }

        context.provides[key as string | symbol] = value

        return app
      },

      runWithContext(fn) {
        currentApp = app
        try {
          return fn()
        } finally {
          currentApp = null
        }
      }
    })

    // 
    if (__COMPAT__) {
      installAppCompatProperties(app, context, render)
    }

    return app
  }
}
```




