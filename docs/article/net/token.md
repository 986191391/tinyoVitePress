# Token

Token是一个表示用户身份和权限的令牌，通常由服务器生成并返回给客户端。在计算机安全和身份验证领域，Token是一种用于证明用户身份和授权的凭证。

Token的优势在于它是无状态的，服务器不需要维护用户的登录状态。每次请求都包含了足够的信息（Token）来验证用户身份和授权，这样可以减轻服务器的负担。

## Token 鉴权

Token鉴权是一种常见的身份验证（Authentication）和授权（Authorization）机制，用于确保用户或客户端在访问受限资源时具有相应的权限。在Token鉴权中，用户在登录成功后会获得一个特定的令牌（Token），然后将该令牌携带在每个请求的请求头或其他方式中发送给服务器。


Token鉴权的工作流程如下：

1. 用户登录：用户在成功通过用户名和密码等凭证进行验证后，服务器会生成一个特定的Token，并返回给客户端。

2. Token传递：客户端收到Token后，通常会将Token保存在本地（如浏览器的本地存储或内存中），并在后续的请求中将Token携带在请求头（通常是"Authorization"头）中或作为请求参数。

3. Token验证：服务器在收到请求时，会从请求中提取Token，并对Token进行验证。这包括检查Token是否有效、是否过期、是否被篡改等。

4. 授权和访问资源：在Token验证通过后，服务器会根据Token中携带的用户信息或权限信息进行授权，决定用户是否有权访问请求的资源。

## Token 存放


服务器返回的Token可以存放在多个地方，但在选择存放的位置时需要考虑安全性和应用需求。常见的存放位置包括：

1. HttpOnly Cookie：将Token存放在HttpOnly Cookie中是一种常见的做法。HttpOnly Cookie允许在客户端存储敏感信息（如Token），但不允许JavaScript代码访问(例如：document.cookie)，从而提高安全性，防止XSS攻击窃取Token。这样，Token在每次请求时会自动附加在请求头中，方便使用，并且相对较安全。
```js
// 在服务器端设置Cookie时，添加HttpOnly属性
response.setHeader('Set-Cookie', 'sessionId=123456; HttpOnly');
```

2. LocalStorage和SessionStorage：可以将Token存放在浏览器的LocalStorage或SessionStorage中。但需要注意，这些存储方式对JavaScript代码是可访问的，因此容易受到XSS攻击。因此，不建议直接将Token存放在LocalStorage中，尤其是敏感的Token信息。

3. Web Storage API和IndexedDB：类似LocalStorage和SessionStorage，Web Storage API和IndexedDB也是可被JavaScript代码访问的存储方式，因此不太适合存放敏感的Token信息。

4. 内存中的变量：在一些特殊场景中，可以将Token存放在前端应用内存中的变量中。这样Token不会持久化存储在客户端，但仍然存在被恶意代码访问的风险。


## Token 主动失效

服务端可以主动使Token失效，这是一种常见的安全机制，通常被称为"Token失效"或"Token注销"。

有多种方法可以实现Token失效：

1. 设置Token过期时间：在生成Token时，可以设置一个过期时间。在验证Token时，服务端会检查Token的过期时间，如果Token已经过期，则视为无效。

2. 黑名单/Token撤销列表：服务端可以维护一个黑名单或Token撤销列表，记录已经被注销或不再有效的Token。当客户端发送请求时，服务端可以检查Token是否在黑名单中，如果在，则拒绝请求。

3. 主动注销接口：服务端可以提供一个接口，允许客户端主动注销Token。客户端在注销时，向服务端发送注销请求，服务端将Token标记为失效或添加到黑名单。

4. 使用短期Token/刷新Token：服务端可以使用短期Token和长期刷新Token的方式。短期Token用于验证身份，有效期较短。当短期Token过期时，客户端可以使用刷新Token向服务端请求一个新的短期Token。






