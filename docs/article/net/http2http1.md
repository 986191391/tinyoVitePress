# HTTP2 和 HTTP1 的区别

HTTP/2（又称为HTTP2）是HTTP协议的下一代版本，相对于之前的HTTP/1.1有一些显著的改进。

- 传输方式：HTTP/1.1使用文本格式进行通信，而HTTP/2使用二进制格式。HTTP/1.1的请求和响应数据是以纯文本形式传输的，而HTTP/2使用二进制帧进行传输，这使得数据传输更高效。

- 多路复用：HTTP/2支持多路复用，允许在同一个连接上同时发送多个请求和响应，而HTTP/1.1每次只能发送一个请求并接收一个响应。多路复用使得HTTP/2更加高效，可以减少连接建立和关闭的开销，提高网络利用率。

- 头部压缩：HTTP/2引入了头部压缩机制，使用一种称为HPACK的算法对请求和响应头部进行压缩，减少了数据传输的大小。这样可以减少带宽占用和网络延迟。

- 服务器推送：HTTP/2支持服务器主动推送，服务器可以在收到客户端请求之前主动推送相关的资源给客户端，减少了客户端请求的次数和等待时间，提高了性能。

- 流量控制：HTTP/2引入了流量控制机制，允许接收方控制数据的流动速率，避免了过载和网络拥塞。

HTTP/2是在应用层上的协议改进，底层的传输仍然使用TCP或TLS等协议。