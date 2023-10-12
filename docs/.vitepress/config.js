import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Tinyo Docs',
  lang: 'zh-CN',
  description: 'tinyo docs',
  base: '/',
  head: [
    [
      'link', { rel: 'icon', href: '/favicon.ico' }
    ]
  ],
  themeConfig: {
    logo: '../assets/logo.png',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            displayDetails: '展示部分详情',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/article/' },
      { text: '关于', link: '/author/' },
    ],
		sidebar: {
      '/author/': [
        {
          items: [ 
            { text: '关于我', link: '/author/' },
            { text: '生活足迹', link: '/author/life' },
            { text: '工作成长', link: '/author/job' },
          ]
        }
      ],
      '/article/': [
        {
          text: 'HTMl',
          items: [
            { text: 'HTML5 新特性', link: '/article/html/html5' },
            { text: 'DOCTYPE 和 meta 标签', link: '/article/html/docmeta' },
          ]
        },
        {
          text: 'CSS',
          items: [
            { text: 'CSS基本知识', link: '/article/css/cssBase' },
            { text: 'CSS3 新特性', link: '/article/css/css3' },
            { text: '坑爹的CSS', link: '/article/css/cssFun' },
          ]
        },
        {
          text: 'JavaScript',
          items: [
            { text: 'JS 基本知识', link: '/article/javascript/jsBase' },
            { text: 'JS 隐式转换与类型比较', link: '/article/javascript/implicitConversion' },
            { text: 'JS 设计模式', link: '/article/javascript/jsdesignmode' },
            { text: 'JS 模块', link: '/article/javascript/jsmodule' },
            { text: 'this', link: '/article/javascript/this' },
            { text: 'call/apply/bind', link: '/article/javascript/callapplybind' },
            { text: 'JS 闭包', link: '/article/javascript/closure' },
            { text: '原型和原型链', link: '/article/javascript/prototype' },
            { text: 'JS 继承', link: '/article/javascript/inherit' },
            { text: 'JS 异步和事件循环', link: '/article/javascript/jsAsyncEventloop' },
            { text: '深拷贝', link: '/article/javascript/deepclone' },
            { text: 'JS 定时器可以精准计时吗', link: '/article/javascript/jsTimeout' },
            { text: 'ES6 Map 和 Object 的区别', link: '/article/javascript/mapObject' },
            { text: 'ES7 新增', link: '/article/javascript/es7' },
            { text: 'e.target 和 e.currentTarget 的区别', link: '/article/javascript/etarget' },
            { text: '正则表达式', link: '/article/javascript/regExp' },
            { text: '普通函数与箭头函数的区别', link: '/article/javascript/function' },
            { text: '为什么普通 for 循环的性能远远高于 forEach 的性能', link: '/article/javascript/forLoop' },
            { text: 'JS 笔试题', link: '/article/javascript/jstopic' }
          ]
        },
        {
          text: 'Vue',
          items: [
            { text: 'Vue3 更新内容', link: '/article/vue/vue3upd' },
            { text: 'Vue3 渲染性能优化', link: '/article/vue/vue3performance' },
            { text: '组合式API', link: '/article/vue/compositionapi' },
            { text: '生命周期', link: '/article/vue/lifeCycle' },
            { text: 'Vue 双向数据绑定', link: '/article/vue/dataBinding' },
            { text: '组件通信', link: '/article/vue/communication' },
            { text: 'v-if 和 v-show 的区别', link: '/article/vue/vifvshowdiff' },
            { text: 'computed 和 watch 的区别', link: '/article/vue/computedwatchdiff' },
            { text: 'v-for 中的 key', link: '/article/vue/vforkey' },
            { text: '路由守卫', link: '/article/vue/routeGurad' },
            { text: 'Vue 项目优化', link: '/article/vue/optimize' },
            { text: 'Vue 路由', link: '/article/vue/router' },
            { text: 'Vue data为什么是函数', link: '/article/vue/vuedataFunction' },
            { text: 'Vue 指令', link: '/article/vue/directive' },
            { text: 'KeepAlive', link: '/article/vue/keepalive' },
            { text: 'Vue.$set', link: '/article/vue/set' },
            { text: 'Vue.$nextTick', link: '/article/vue/nextTick' },
            { text: 'Vuex', link: '/article/vue/vuex' },
            { text: 'Vue Diff', link: '/article/vue/diff' },
            { text: 'Vue 编译过程', link: '/article/vue/vuecompile' },
            { text: 'Vue MVVM', link: '/article/vue/mvvm' },
            { text: 'Vue 和 React 的区别', link: '/article/vue/vueReactDiff' },
            { text: '为什么需要虚拟DOM', link: '/article/vue/whyVdom' },
          ]
        },
        {
          text: 'React',
          items: [
            { text: '生命周期', link: '/article/react/lifeCycle' },
            { text: 'React 组件通信', link: '/article/react/communication' },
            { text: 'React hooks', link: '/article/react/hooks' },
            { text: '为什么需要hooks', link: '/article/react/whyHooks' },
            { text: '函数式组件和类组件的区别', link: '/article/react/diffclass' },
            { text: 'GPT 面试题', link: '/article/react/interview' },
          ]
        },
        {
          text: '网络',
          items: [
            { text: 'TCP/IP', link: '/article/net/tcpip' },
            { text: 'TCP 和 UDP 的区别', link: '/article/net/tcpudp' },
            { text: 'HTTP 及常见状态码', link: '/article/net/http' },
            { text: 'HTTP 和 HTTPS 的区别', link: '/article/net/httphttps' },
            { text: 'HTTP1 和 HTTP2 的区别', link: '/article/net/http2http1' },
            { text: 'TOKEN', link: '/article/net/token' },
            { text: 'GET 和 POST 的区别', link: '/article/net/getpost' },
            { text: '网络攻击', link: '/article/net/attack' },
            { text: '原生AJAX的实现', link: '/article/net/ajax' },
          ]
        },
        {
          text: '浏览器',
          items: [
            { text: 'http 缓存', link: '/article/browser/httpcache' },
            { text: '浏览器缓存', link: '/article/browser/cache' },
            { text: '浏览器内核', link: '/article/browser/kernel' },
            { text: '进程与线程', link: '/article/browser/processthread' },
            { text: '浏览器引擎', link: '/article/browser/engine' },
            { text: '输入域名到网页渲染过程', link: '/article/browser/inputurl' },
            { text: '浏览器兼容问题', link: '/article/browser/compatible' },
          ]
        },
        {
          text: '前端',
          items: [
            { text: '如何理解前端组件化、模块化、工程化', link: '/article/front/gather' },
            { text: '性能优化', link: '/article/front/webOptimize' },
            { text: '图片优化', link: '/article/front/optimizeImage' },
            { text: '管理后台权限控制', link: '/article/front/permission' },
            { text: '懒加载', link: '/article/front/lazyload' },
            { text: '响应式布局', link: '/article/front/reactive' },
            { text: 'TS中 interface和type的区别', link: '/article/front/interfacetype' },
            { text: 'WebPack', link: '/article/front/webpack' }
          ]
        },
        {
          text: 'NodeJS',
          items: [
            { text: '什么是Node, 与浏览器JavaScript的区别', link: '/article/node/base' },
            { text: 'require 和 import 的区别', link: '/article/node/requireImport' },
            { text: '异步和事件循环机制', link: '/article/node/eventloop' },
            { text: 'Node中未捕获的异常', link: '/article/node/error' },
            { text: 'Node相比于多线程的优势', link: '/article/node/advantage' },
          ]
        },
        {
          text: '其他',
          items: [
            { text: '手写 bind 函数', link: '/article/utils/mybind' },
            { text: '超时功能 Fetch', link: '/article/utils/delayFetch' },
            { text: '手写 instanceof 函数', link: '/article/utils/instanceof' },
            { text: '防抖与节流', link: '/article/utils/debounceThrottle' },
            { text: '判断元素是否出现在视口', link: '/article/utils/isInViewPort' },
            { text: '简易 Promise 实现', link: '/article/utils/mypromise' },
            { text: '手写 JS深拷贝函数', link: '/article/javascript/deepclone' },
            { text: '实现链式调用函数', link: '/article/utils/chain' },
          ]
        },
        {
          text: '学习',
          items: [
            { text: '递归', link: '/article/algorithm/recursion' },
            { text: '二叉树', link: '/article/algorithm/binaryTree' },
            { text: '排序', link: '/article/algorithm/sort' },
            { text: '代码题', link: '/article/algorithm/code' },
            { text: 'JS题', link: '/article/algorithm/js' },
          ]
        },
        {
          text: '小工具',
          items: [
            { text: '添加书签脚本，点击修改网页内容！', link: '/article/flower/bookmarks' },
            { text: '文档下载要花钱？教你一招！', link: '/article/flower/printWeb' },
            { text: '取色器', link: '/article/flower/getColor' },
          ]
        },
        {
          text: '心得日记',
          items: [
            { text: 'React 转 Vue 日记', link: '/article/growth/reacttovue' },
            { text: '轻量级服务器部署过程', link: '/article/growth/server' },
            { text: 'fabric库使用记录', link: '/article/growth/fabric' },
            { text: 'NodeJS服务器搭建', link: '/article/growth/buildnodejsserver' },
            { text: '本地接入宝塔部署的MySQL', link: '/article/growth/nodejsmysql' },
            { text: '笔面经', link: '/article/growth/realExamination' },
          ]
        }
      ],
    }
  }
})