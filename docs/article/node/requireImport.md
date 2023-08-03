# require 和 import 的区别

[require和import的区别](https://zhuanlan.zhihu.com/p/121770261)

CommonJS 模块化方案 require/exports 是为`服务器端`开发设计的。
服务器模块系统同步读取模块文件内容，编译执行后得到模块接口。（Node.js 是 CommonJS 规范的实现）。

ES6 规范出现，浏览器拥有了自己的模块化方案 import/export。


**1. require/exports 是运行时动态加载，import/export 是静态编译**

CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

**2. require/exports 输出的是一个值的拷贝，import/export 模块输出的是值的引用**

[ES6 模块与 CommonJS 模块的差异](https://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)


CommonJS 模块与ES6 模块完全不同。它们有三个重大差异。

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。

详细例子点击参考文章。


**3. 使用方式不同**

3.1 import/export 不能对引入模块重新赋值/定义。

3.2 CommonJS 则需要先引用后使用，ES6 模块可以在 import 引用语句前使用模块。

3.3 import/export 只能在模块顶层使用，不能在函数、判断语句等代码块之中引用；require/exports 可以。

```js
import fs from  './webUtils.js';

function a(){
  import {e1} from './webUtils.js'; // 错误写法，会报错。
  console.log(e1)
}
```

3.4 是否采用严格模式

import/export 导出的模块默认调用严格模式。
require/exports 默认不使用严格模式，可以自定义是否使用严格模式。