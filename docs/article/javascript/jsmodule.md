# JS模块

## CommonJS

CommonJS是一种用于组织JavaScript代码的模块规范。它定义了一种模块加载机制，使得JavaScript代码可以在不同的环境中运行，例如浏览器和服务器。在CommonJS模块中，每个模块都是一个单独的文件，文件中的代码可以通过module.exports导出，也可以通过require函数导入其他模块的代码。例如，在Node.js中，可以使用CommonJS模块来导入和导出模块的代码：
```javascript
// 导出模块的代码
module.exports = {
  foo: 'bar'
};

// 导入模块的代码
const myModule = require('./my-module');
console.log(myModule.foo); // 输出 'bar'
```

## AMD

AMD是Asynchronous Module Definition的缩写，是一种异步加载模块的规范。它允许在浏览器中异步加载模块，从而提高性能。在AMD模块中，每个模块都是一个单独的文件，文件中的代码可以通过define函数定义模块，也可以通过require函数导入其他模块的代码。例如
```javascript
// 定义模块的代码
define(['./my-module'], function(myModule) {
  return {
    foo: myModule.foo
  };
});

// 导入模块的代码
require(['./my-module'], function(myModule) {
  console.log(myModule.foo); // 输出 'bar'
});
```


## ES6

ES6模块是ECMAScript 6标准中定义的一种模块规范。与CommonJS和AMD不同，ES6模块使用export和import关键字来导出和导入模块的代码。例如，在一个名为my-module.js的文件中，可以使用export关键字导出一个变量：
```javascript
// my-module.js
export const foo = 'bar';
```
然后，在另一个文件中，可以使用import关键字导入这个变量：
```javascript
// another-module.js
import { foo } from './my-module.js';
console.log(foo); // 输出 'bar'
```
需要注意的是，ES6模块是静态的，即在编译时就确定了模块的依赖关系和导出内容，而不是在运行时动态加载。这种静态的特性使得ES6模块可以进行静态分析和优化，从而提高性能。另外，ES6模块支持循环依赖，即两个模块可以互相导入对方的代码，但需要注意避免死循环。
