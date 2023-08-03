# WebPack

Webpack是一个现代化的JavaScript应用程序的静态模块打包器。它可以将多个模块打包成一个或多个bundle，从而减少页面加载时间，提高性能。

## webpack5 新特性

1. 模块联邦 (Module Federation) : 模块联邦是 Webpack 5 的一个重要特性，它允许将多个独立的 Webpack 构建拆分成更小的、可独立部署的模块。这样可以实现跨应用程序共享模块的能力，从而改善了代码复用和团队协作。
2. 改进的 Tree Shaking: Webpack 5 对 Tree Shaking 进行了优化，可以更好地消除未使用的代码，减小打包体积。
3. 持久化缓存(Persistent Caching) : Webpack 5引入了持久化缓存机制，通过默认启用的持久化缓存，可以加快二次构建的速度，提高开发者的开发效率。
4. 支持WebAssembly: Webpack 5 对 WebAssembly 的支持更加完善，可以将 WebAssembly模块打包到项目中，实现高性能的运行时。
5. 改进的性能: Webpack 5 在构建速度和打包体积上进行了一些优化，提高了整体的性能表5现。
6. 内置的模块类型识别 (Built-in Module Type Recognition) : Webpack 5 可以自动识别出常见的模块类型，例如 ES Modules 和 CommonJS，不再需要手动配置模块类型
改进的错误处理和调试: Webpack 5 提供了更好的错误处理和调试支持，可以生成更友好的错误提示和源代码映射
7. 默认使用ES6模块：Webpack 5默认使用ES6模块语法，而不是CommonJS模块语法。这使得Webpack可以更好地与现代的JavaScript生态系统集成，并提供更好的性能和开发体验。

## 基本配置

- entry：入口文件，Webpack从这个文件开始打包。

- output：输出文件，Webpack将打包后的文件输出到这个文件中。

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```
在上面的配置文件中，entry选项指定了入口文件为./src/index.js，output选项指定了输出文件为./dist/bundle.js。

- mode：指定Webpack的打包模式，有development、production和none三种模式可选。

- module：配置模块的处理规则，可以使用Loader来处理不同类型的文件。

常见的loader:

babel-loader：用于将ES6代码转换为ES5代码，以便在不支持ES6的浏览器中运行。<br>
css-loader：用于处理CSS文件，可以将CSS文件转换为JavaScript模块，以便在应用程序中使用。<br>
style-loader：用于将CSS模块注入到HTML文件中，以便在浏览器中渲染样式。<br>
file-loader：用于处理文件，可以将文件复制到输出目录中，并返回文件的URL。<br>
url-loader：与file-loader类似，但可以将小文件转换为DataURL，以减少HTTP请求的数量。<br>
sass-loader：用于处理Sass文件，可以将Sass文件转换为CSS文件。<br>
less-loader：用于处理Less文件，可以将Less文件转换为CSS文件。<br>
postcss-loader：用于处理CSS文件，可以自动添加浏览器前缀、压缩CSS等。<br>
ts-loader：用于处理TypeScript文件，可以将TypeScript文件转换为JavaScript文件。
```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'less-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          'file-loader',
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于 8KB 的文件将被转换为 DataURL
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      },
    ],
  },
};
```
在上面的配置文件中，module选项中的rules数组指定了一个规则，用于处理所有以.js结尾的文件。这个规则使用了Babel Loader来将ES6代码转换为ES5代码，以便在不支持ES6的浏览器中运行。

- resolve：配置Webpack如何解析模块的路径。

- plugins：配置Webpack的插件，可以用于执行各种任务，例如压缩代码、生成HTML文件等。

HtmlWebpackPlugin：自动生成HTML文件，并将打包后的JS文件自动引入到HTML文件中。
CleanWebpackPlugin：在每次打包前清空输出目录，避免旧文件对新文件的影响。
CopyWebpackPlugin：将静态文件复制到输出目录中，例如图片、字体等。
```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
      ],
    }),
  ],
};

```
MiniCssExtractPlugin：将CSS文件从JS文件中分离出来，以便进行单独的缓存和加载。
```javascript
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
```


- devtool：配置Source Map，用于调试打包后的代码。

- optimization：配置Webpack的优化选项，例如使用Tree Shaking、Code Splitting等技术来优化打包后的文件。


UglifyJsPlugin：压缩打包后的JS代码，减小文件体积，提高加载速度。
```javascript
// webpack.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // ...
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
```


## 优化

使用Tree Shaking：Tree Shaking是一种通过静态分析来删除未使用代码的技术。通过使用Tree Shaking，可以减少打包后的文件大小，从而提高性能。

使用Code Splitting：Code Splitting是一种将代码分割成多个小块的技术。通过使用Code Splitting，可以将应用程序分割成多个小块，从而减少页面加载时间，提高性能。

使用Webpack Dev Server：Webpack Dev Server是一个用于开发环境的服务器。它可以自动重新加载页面，并提供实时的编译和打包功能，从而提高开发效率。

使用缓存：Webpack可以使用缓存来提高性能。通过使用缓存，可以避免重复的编译和打包过程，从而提高性能。

使用Loader和Plugin：Webpack提供了许多Loader和Plugin，可以用于优化项目。例如，使用babel-loader可以将ES6代码转换为ES5代码，使用UglifyJSPlugin可以压缩代码，从而减少文件大小，提高性能。