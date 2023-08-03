# DOCTYPE 和 meta 标签

`<!DOCTYPE>`标签是HTML文档中的一个标记，用于指示浏览器所使用的HTML版本和文档类型。它通常作为HTML文档的第一行，并位于`<html>`标签之前。

---

`<meta>`标签是HTML中用于定义页面元数据（metadata）的标签。它提供了描述文档的信息，供浏览器、搜索引擎和其他应用程序使用。

- charset 指定文档的字符编码方式。例如，`<meta charset="UTF-8">`表示文档使用UTF-8编码。

- name

1. name="viewport"：用于控制页面在移动设备上的视口（viewport）行为。通过设置不同的属性值，可以实现响应式布局、缩放和适应不同屏幕尺寸等效果。指定页面的宽度与设备宽度相等，并初始缩放比例为1.0。
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. name="description"：用于提供网页的简短描述。搜索引擎通常会使用该描述作为搜索结果中的网页摘要显示。
```html
<meta name="description" content="这是一个示例网页描述。">
```

3. name="keywords"：定义网页的关键词，用逗号分隔。尽管大多数搜索引擎不再主要依赖关键词来确定网页的相关性，但仍然可以用作参考。例如，
```html
<meta name="keywords" content="关键词1, 关键词2, 关键词3">
```

4. name="author"：用于指定网页的作者。例如，`<meta name="author" content="John Doe">`

5. name="robots"：控制搜索引擎爬虫的行为。常见的值有"index"（允许搜索引擎索引页面）、"noindex"（不允许搜索引擎索引页面）、"follow"（允许搜索引擎跟踪页面上的链接）、"nofollow"（不允许搜索引擎跟踪页面上的链接）等。

6. name="theme-color"：定义网页的主题颜色，用于移动设备的浏览器和操作系统。例如，`<meta name="theme-color" content="#abcdef">`指定主题颜色为"#abcdef"。


- http-equiv：提供与HTTP协议相关的元数据。
```html
<meta http-equiv="refresh" content="5;url=https://example.com/">
```
表示在5秒后自动跳转到"https://example.com/"。
```html
<meta http-equiv="content-language" content="en">
```
表示网页内容为英语
```html
<meta http-equiv="expires" content="Fri, 01 Jan 2023 00:00:00 GMT">
```
表示网页将在指定的日期之后过期。
```html
<meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
```
表示禁用缓存。







