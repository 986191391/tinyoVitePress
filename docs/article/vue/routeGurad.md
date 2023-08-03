# 路由守卫

可以分为三种：全局守卫、独享守卫、组件内守卫

### 全局守卫

- router.beforeEach<br>

全局前置路由守卫，每次路由切换之前被调用。在这里可以做类似于路由白名单、权限拦截、token有效期检验等。

- router.afterEach<br>

全局后置路由守卫，每次路由切换之后调用, 可用于切换document.title

```ts
router.beforeEach((to, from, next) => {
  if (getToken()) {
    next()
  } else if (whiteList.indexOf(to.path) !== -1) {
    // 在免登录白名单，直接进入
    next() 
  } else {
    // 否则全部重定首页
    next('/')
  }
})

router.afterEach(() => {
})
```


### 独享守卫

- router.beforeEnter<br>

独享路由守卫，只有前置，没有后置，写在routes配置项里。

```ts
  {
    path: '/home',
    name: 'home',
    component: pcHome,
    beforeEnter: (to, from, next) => {  // 独享守卫
      next(); 
    },
  }
```

### 组件内守卫


- router.beforeRouteEnter<br>

组件内路由守卫, 写在组件中，路过路由规则进入该组件时被调用。<br>

- router.beforeRouteLeave<br>

组件内路由守卫, 写在组件中，路过路由规则离开该组件时被调用。<br>
可用于记录一些组件在离开时的状态。

keep-alive的替代方案之一，页面离开时可以记录滚动的位置，在进入后手动滚动到对应的位置。

```ts
beforeRouteEnter(to, from, next): void {
  next(); // 必须调用 next() 方法才能继续导航
}

beforeRouteLeave(to, from, next) {
  // 在离开当前路由时调用
  next(); // 必须调用 next() 方法才能继续导航
}
```