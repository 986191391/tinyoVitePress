# 封装一个AJAX请求方法

通过XMLHttpRequest类手写一个AJAX请求方法，同时考虑浏览器的兼容问题。

```js
function createXMLHttpRequest() {
  if (window.XMLHttpRequest) {
    // 针对大多数现代浏览器
    return new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // 针对旧版 IE 浏览器
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      console.error("创建 XMLHttpRequest 对象失败：" + e.message);
    }
  }
  console.error("当前浏览器不支持 XMLHttpRequest 对象！");
  return null;
}

function sendHttpRequest(method, url, data, successCallback, errorCallback) {
  const xhr = createXMLHttpRequest();
  if (!xhr) {
    return;
  }

  xhr.open(method, url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        successCallback(xhr.responseText);
      } else {
        errorCallback(xhr.status, xhr.statusText);
      }
    }
  };

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify(data));
}
```

使用方法：
```js
// 发送 POST 请求
sendHttpRequest(
  "POST",
  "https://example.com/api",
  { key: "value" },
  function (response) {
    console.log("请求成功，服务器返回数据：", response);
    // 在这里处理请求成功的逻辑
  },
  function (status, statusText) {
    console.error("请求失败，状态码：" + status + "，错误信息：" + statusText);
    // 在这里处理请求失败的逻辑
  }
);
```