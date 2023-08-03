# 实现一个简单的双向绑定

手写一个简单的Vue双向绑定！

 - **步骤**

 1. 数据劫持
 2. 数据代理
 3. 编译模版
 4. 发布订阅模式

 - **vue 不兼容低版本浏览器**

基于es5，Object.defineProperty方法

## **Object.defineProperty**
 
 通过该方法，可以实现对对象中的某一个值设置对应的配置，例如
 1. configurable: 是否可以删除，默认为false不可删除。设置为false时不可删除对象内的值
 2. writable: 是否可以修改
 3. enumable: 是否可以枚举(遍历)
 4. value: 对象中该属性的值
 5. set(): 当对对象中该值进行修改时触发该方法
 6. get(): 当获取对象中该值时触发该方法

```javascript
// ！！： get 和 set 方法和writable value属性不可同时存在
 Object.defineProperty(data, key, {
   enumerable: true,
   configurable: true,
   get() {
     return data[key]
   },
   set(newVal) {
     if (data[key] === newVal) return
   }
 })
```


## **数据劫持**

使用Object.defineProperty来定义所有的属性。

Vue是一个构造函数，它接受一个对象。在定义一个简单的vue时一般可以这么写：

```javascript
	let vue = new Vue({
		el: 'app',
		data: {
			a: 1
		}
	})
```
在接收到对象后，执行observe方法，在方法中给对象的data值循环调用Object.defineProperty方法，从而实现对data对象中所有数据的劫持。(即当数据发生改变或者被调用是可被监听)

当前遍历的属性值为对象时，同时也需要对该对象的值进行遍历，这里就需要进行递归了。

 - **第一阶段代码(完成对数据的劫持)**

```javascript

// 定义一个vue
let vue = new Vue({
  el: '#app',
  data: {
    a: {
	  a: 1
	},
	b: 2
  }
})

// vue构造函数
function Vue(options) {
  this.$options = options
  this.data = options.data

  observe(this.data)
}

// 观察(完成数据劫持)
function observe(data) {
  for (let key in data) {
    let val = data[key] // 涉及闭包的知识哦，该值不会被清除， get/set时修改的也是该值
    // 递归，如果遍历的过程中的当前项是对象，则也需要对该项的每一项进行数据劫持
    if (!!val && Object.prototype.toString.call(val) === '[object Object]') {
      observe(val)
    }
    
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        return val
      },
      set(newVal) {
        if (val === newVal) return
        val = newVal
        // 如果新值为对象，也需要对对象中的属性进行数据劫持
        if (Object.prototype.toString.call(val) === '[object Object]') {
          observe(val)
        }
      }
    })
  }
}
```

## **数据代理**
 
完成了以上步骤以后可以发现，当需要获取数据时，取值的方式是这样的`vue.data.a`，但实际在使用VUE时是这样的`vue.a`，所以需要将data的数据映射在vue对象上，进行一个所谓的***数据代理***

在set方法中，不需要再执行`if (val === newVal) return`，也不需要再判断新值是否为对象。

在触发get和set方法，实际也是取得了data数据中对应的值。而这些值在数据劫持时已经设置了对应的判断逻辑。所以在这一步，只需进行代理即可。

```javascript
// 将数据代理抽成方法
function Vue(options) {
  this.$options = options
  this.data = options.data

  observe(this.data) // 数据劫持
  dataProxy(this.data, this) // 数据代理
}

function dataProxy(data, vm) {
  for(let key in data) {
    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get() {
        return data[key]
      },
      set(newVal) {
        data[key] = newVal
      }
    })
  }
}
```

## **编译模版**
 
一个简单的例子，就是将html中vue对应的语法糖数据替换成我们data中的数据

简述一下具体步骤
1. 拿到对应的dom，即el所指的dom元素。
2. 创建fragment，将dom元素的所有子元素node放入到fragment中。
3. 遍历fragment，对每一个node进行操作，判断node的类型分别处理。
4. 如果是元素节点，则继续递归判断处理。如果是文本节点，替换文本中的{{}}语法糖对应data中的值。

以下为简单的demo代码，只处理文本节点的语法糖替换
```javascript
function compile(el, vm) {
	vm.$el = document.querySelector(el) // 拿到el指定的dom区域
	let fragment = document.createDocumentFragment() // 创建fragment
	// 将所有的子元素取出放入到fragment中
	while(child = vm.$el.childNodes[0]) {
		fragment.appendChild(child) // appendChild会改变原数组
	}
	elReplace(fragment.childNodes, vm) // 替换
	// 将替换后的节点放回到dom区域中
	Array.from(fragment.childNodes).forEach((node) => {
      	vm.$el.appendChild(node)
	})
}

function elReplace(fragmentNodes, vm) {
	Array.from(fragmentNodes).forEach((node) => {
		// nodeType === 1 元素节点
		// 元素节点内还会有内容, 递归
		if (node.nodeType === 1) elReplace(node.childNodes, vm)
		// nodeType === 3 文本节点
		else if (node.nodeType === 3) {
			const text = node.textContent
			const reg = /\{\{(.*)\}\}/
			const regExp = reg.test(text)
			if (!regExp) return
			// RegExp.$1 正则匹配到的元素
			const dotArr = RegExp.$1.split('.')
			let newVal = vm
			dotArr.forEach((dotItm) => {
				newVal = newVal[dotItm]
			})
			node.textContent = newVal // 替换
		}
	})
}
```


## **发布订阅**
 
发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

通过以上的简述，映射到vue中。当数据发生改变或在视图中对数据进行修改时，与之有依赖关系的对象变量都将被通知。

简述步骤：
1. 先有订阅，才有发布
2. 所有的订阅放在数组中，发布的方法既是循环所有的订阅(该数组)，分别调用数组中的更新方法，更新对应位置的数据。
3. 在订阅的更新方法中，重新获取对应node位置对应的数据，重新更新替换模版。
4. 当触发set方法时，代表数据发生了改变，触发发布方法。
5. 下一步就是要把订阅放入都数组中。
6. 在所有符合正则表达式的文本节点中(代表该节点存在{{}}语法糖需要替换数据的区域)，在第一次渲染时同时创建Watcher的实例，在创建的过程中将当前实例放入到订阅的数组中。
```javascript
function Dep() {
	this.subs = [] // 所有订阅存放的数组
}
// 将订阅放入到数组中
Dep.prototype.addDeps = function(watcher) {
	this.subs.push(watcher)
}
// 发布
Dep.prototype.notify = function() {
	this.subs.forEach(sub => sub.update() // 循环调用订阅的update方法
}
// 订阅, 即监听者的构造函数
function Watcher(fun) {
	this.fun = fun
}
// 订阅的更新方法
Watcher.prototype.update = function(newVal) {
	this.fun()
}
```
这就是简单的发布订阅代码模式，现在要将其应用到前面编写的代码中。
按照步骤来：
1. 在所有符合正则表达式的文本节点中，创建Wathcer的实例。一是通过闭包将当前作用域的环境变量存储了下来。二是为了在创建实例的过程中，将所有存在vue语法糖的节点订阅起来。
2. 在创建实例的过程中进行了`Dep.target = this; 重新获取变量; Dep.tartget = null;`的操作，重新获取变量的代码操作是因为在获取变量时会触发get方法, 在get方法中判断Dep.target是否为空，不为空时则把当前实例push到数组中。这样就完成了订阅的操作。
3. 当修改data中的值时，会出发set的方法，在set方法中执行发布方法。
4. 全部具体代码如下：

```javascript
  // Vue构造函数
  function Vue(options) {
    this.$vm = this
    this.$options = options
    this.$data = options.data

    observe(this.$data)
    proxyData(this.$data, this)
    compile(options.el, this)
  }
  
  // 数据劫持
  function observe(data) {
    const dep = new Dep() // 创建Dep实例
    for (let key in data) {
      let val = data[key]
      if (!!val && typeof val === 'object') observe(val)

      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
          // 当获取变量时触发该方法
          // 如果是在创建Watcher实例时触发，则将Watcher实例push到数组中
          if (Dep.target) dep.addSubs(Dep.target)
          return val
        },
        set(newVal) {
          if (newVal === val) return
          val = newVal
          if (!!val && typeof val === 'object') observe(val)
          // 数据发送改变时触发set方法，执行发布方法更新试图中的数据
          dep.notify()
        }
      })
    }
  }
  
  // 数据代理
  function proxyData(data, vm) {
    for(let key in data) {
      Object.defineProperty(vm, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal 
        }
      })
    }
  }
  
  // 编译模版
  function compile(el, vm) {
    vm.$el = document.querySelector(el)
    let fragment = document.createDocumentFragment()
    while(child = vm.$el.childNodes[0]) {
      fragment.appendChild(child)
    }
    elReplace(fragment.childNodes, vm)
    Array.from(fragment.childNodes).forEach((node) => {
      vm.$el.appendChild(node)
    })
  }
  function elReplace(fragmentNodes, vm) {
    Array.from(fragmentNodes).forEach((node, nodeIndex, arr) => {
      if (node.nodeType === 1) {
        // 元素节点
        elReplace(node.childNodes, vm)
      } else if (node.nodeType === 3) {
        // 文本节点
        const text = node.textContent
        let reg = /\{\{(.*)\}\}/
        const regExp = reg.test(text)
        if (!regExp) return
        const dotArr = RegExp.$1.split('.')
        let newVal = vm
        dotArr.forEach((itm, idx) => {
          newVal = newVal[itm]
        })
        // 将节点订阅，在文本节点渲染的过程中创建Watcher的实例
        new Watcher(vm, RegExp.$1, function(newVal) {
          node.textContent = text.replace(reg, newVal)
        })
        node.textContent = text.replace(reg, newVal)
      }
    })
  }
```
发布订阅代码如下
```javascript
  function Dep() {
    this.subs = []
  }
  // 将订阅添加到数组中
  Dep.prototype.addSubs = function(watcher) {
    this.subs.push(watcher)
  }
  // 发布，遍历数组执行订阅的更新方法
  Dep.prototype.notify = function() {
    this.subs.forEach(sub => sub.update())
  }

  function Watcher(vm, exp, fn) {
    this.vm = vm // 订阅的环境
    this.exp = exp // 订阅的正则匹配值
    this.fn = fn
    Dep.target = this
    // 获取对应的数据，为了触发get方法，从而订阅
    let newVal = vm
    const dotArr = exp.split('.')
    dotArr.forEach((itm, idx) => {
      newVal = newVal[itm]
    })
    // 订阅结束后清空target
    Dep.target = null
  }
  // 订阅的更新方法
  Watcher.prototype.update = function() {
    let newVal = this.vm
    const dotArr = this.exp.split('.')
    dotArr.forEach((itm) => {
      newVal = newVal[itm]
    })
    // 执行方法
    this.fn(newVal)
  }
```


用class的方式写一下，其实原理都一样
```javascript
  class Vue {
    constructor(options) {
      this.$vm = this
      this.$options = options
      this.$data = options.data
      observe(this.$data)
      proxyData(this.$data, this)
      compile(options.el, this)
    }
  }

  class Dep {
    constructor() {
      this.subs = []
    }
    addSubs (watcher) {
      this.subs.push(watcher)
    }
    notify () {
      this.subs.forEach(sub => sub.update())
    }
  }

  class Watcher {
    constructor(vm, exp, fn) {
      this.vm = vm
      this.exp = exp
      this.fn = fn
      Dep.target = this
      // 这里获取一下值是为了出发get方法
      let newVal = vm
      const dotArr = exp.split('.')
      dotArr.forEach((itm, idx) => {
        newVal = newVal[itm]
      })
      Dep.target = null
    }
    update () {
      let newVal = this.vm
      const dotArr = this.exp.split('.')
      dotArr.forEach((itm) => {
        newVal = newVal[itm]
      })
      this.fn(newVal)
    }
  }

  function observe(data) {
    const dep = new Dep()
    for (let key in data) {
      let val = data[key]
      if (!!val && typeof val === 'object') observe(val)

      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
          console.log('depdep', dep)
          if (Dep.target) dep.addSubs(Dep.target)
          return val
        },
        set(newVal) {
          if (newVal === val) return
          val = newVal
          if (!!val && typeof val === 'object') observe(val)
          dep.notify()
        }
      })
    }
  }

  function proxyData(data, vm) {
    for(let key in data) {
      Object.defineProperty(vm, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal 
        }
      })
    }
  }

  function compile(el, vm) {
    vm.$el = document.querySelector(el)
    let fragment = document.createDocumentFragment()
    while(child = vm.$el.childNodes[0]) {
      fragment.appendChild(child)
    }
    elReplace(fragment.childNodes, vm)
    Array.from(fragment.childNodes).forEach((node) => {
      vm.$el.appendChild(node)
    })
  }

  function elReplace(fragmentNodes, vm) {
    Array.from(fragmentNodes).forEach((node, nodeIndex, arr) => {
      if (node.nodeType === 1) {
        elReplace(node.childNodes, vm)
        // 元素节点
      } else if (node.nodeType === 3) {
        // 文本节点
        const text = node.textContent
        let reg = /\{\{(.*)\}\}/
        const regExp = reg.test(text)
        if (!regExp) return
        // RegExp.$1 第一个匹配的xxx
        const dotArr = RegExp.$1.split('.')
        let newVal = vm
        dotArr.forEach((itm, idx) => {
          newVal = newVal[itm]
        })
        new Watcher(vm, RegExp.$1, function(newVal) {
          node.textContent = text.replace(reg, newVal)
        })
        node.textContent = text.replace(reg, newVal)
      }

    })
  }

  let vue = new Vue({
    el: '#app',
    data: {
      a: '我是a。',
      b: {
        b1: '====bbbbb11111====',
        b2: 'b2'
      }
    }
  })
```