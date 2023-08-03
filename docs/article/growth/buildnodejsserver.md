# NodeJS服务器搭建

参考：[简易搭建nodejs服务器](https://zhuanlan.zhihu.com/p/76300383)

- 全局安装express命令安装工具 输入命令： npm install -g express-generator
- 再安装express框架 输入命令： npm install -g express

启动后这样显示, 直接去浏览器跑localhost:端口号, 就好了, 端口号是在bin》www文件下定义的, 默认是3000端口
```
> tinyoserver@0.0.0 start
> node ./bin/www
```

## nodejs服务的弊端

- 默认的工程, 在线编辑后无法实时更新工程服务, 需要重启。

## nodejs工程部署到宝塔服务器

参考：[宝塔部署nodejs项目的实战步骤](https://www.jb51.net/article/271162.htm)

1. 在public文件夹下新建一个index.html文件, 作为服务器默认进入的页面
2. 在浏览器中打开宝塔并登录
3. 宝塔 -> 软件商店 -> 安装pm2管理器 -> 安装完毕后打开 -> 选择Node版本 -> 切换至与本地开发一致的node版本
4. 宝塔 -> 文件 -> 新建server的文件夹, 将nodejs工程上传(注：不上传node_modules)
5. 在当前文件夹目录下打开终端, 执行npm i, 下载工程依赖
6. 宝塔 -> 安全 -> 添加端口规则 -> 把服务器启动后对应的端口加入
7. 打开服务器, 我的是腾讯云, 需要在腾讯云对应的防火墙处也将对应的端口号打开
8. 回到pm2管理器, 添加项目, 把对应nodejs目录引入即可

---

服务部署起来拉, 下一步准备数据库了!