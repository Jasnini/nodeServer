# cookie

1、只要域名和端口号相同，就可以共享 cookie
如: htts://www.example.com 与 http://www.example.com 可以共享cookie

2、cookie对本域名和该域名下的路径有效

3、cookie属性值：

- Expires;
- Max-Age; 优先Expires
- Domain: 可以设置子域名附带该cookie; 
- Path: 如果Path是当前请求路径的开头一部分，那么会带该cookie
- Secure:
表示只有https协议才可以用该cookie；
当前协议如果是http的话，浏览器自动忽略这个属性；
https协议会自动打开 
- HttpOnly：防止js脚本访问到，包括： document.cookie、XMLHttpRequest、Request API

4、服务端：set-cookie

- 可以添加set-cookie，但是要覆盖之前的cookie，4个属性相同：必须同时满足四个条件：key、domain、path和secure都匹配。
- 一行语句插入一条 set-cookie

5、浏览器端向服务端发送：cookie

- document.cookie 读取所有的cookie（）
- document.cookie 每条语句设置一条，
- 属性设置完成，将无法读取属性值。
- 读取一串，设置一条。
- 删除cookie：将value设置成空，Expires 设置成过期的时间

6、读取cookie方法：

```javascript
let cookies= document.cookie.split(';');
for (var i=0 ;i<cookie.length;i++){
    console.log( cookies[i] );
}
```

7、子域和父域共享cookie方法:

    -  set-cookie: domain=.example.com;
    -  将两个网页的域名设置相同: document.domain='example.com'；

# session

1、服务器端生成session，存储、操作session的内容。默认客户端cookie会存储sessionId
2、cookie禁用之后，sessionId不能存储在cookie里面，但是可以存储在别的地方，PHP中客户端可以使用 url 来将sessionId传到服务器。
