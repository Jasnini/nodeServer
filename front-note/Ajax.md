#XMLHttpRequest
1、 xhr.readyState

- 0: 未初始化。无open()  
- 1: 启动。有open() 无send()
- 2: 发送。已调用send() 无响应
- 3：接收。已接收到响应数据
- 4：完成。已经接收到全部响应数据，而且可以在客户端使用

2、var xhr=new XMLHttpRequest(); 支持IE7+
3、响应数据：

- responseText 作为响应返回的文本
- responseXML  content type是XML时，包含着响应数据的XML DOM文档
- status  响应的HTTP状态
- statusText  HTTP状态的说明

4、HTTP请求头部：

- ACCEPT 浏览器能够处理的内容类型
- ACCEPT-Charset 浏览器能够显示的字符集
- ACCEPT-Encoding 浏览器能够处理的压缩编码
- ACCEPT-Language 浏览器当前设置的语言
- Connnection 浏览器与服务器之间的连接类型
- Cookie 当前页面设置的所有cookie
- Host 目的地页面所载的域
- Referer  目的地页面的URI
- User-Agent 浏览器的用户代理字符串

5、xhr.setRequesstHeader()自定义请求头部，必须在open()之后，send()之前
6、

- xhr.getResponseHeader('MyHeader');可以取得响应头部信息；
- xhr.getAllResponseHeaders();可以得到所有的响应头部信息

7、xhr get请求

```javascript
//encodeURIComponent()使编码格式符合URI
function addURLParam(url,name,value){
    url+=(url.indexOf("?") == -1 ? "?":"&");
    url+=encodeURIComponent(name)+ "=" +encodeURIComponent(value);
    return url;
}

 var url="examle.php";
 url=addURLParam(url, "name", "Nicholas");
 xhr= new XMLHttpRequest();
 xhr.open("get",url,false)//get方法
 xhr.send(null);
```

8、xhr post请求

```javascript
xhr = new XMLHttpRequest();
xhr.open("post","postexample.php",true);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//请求头部表示表单提交时的内容类型
var form = document.getElementById("user-info");
xhr.send(serialize(form));//serialize()序列化表单，创建发送出去的字符串
```

9、xhr 的异步请求

- 需要使用事件监听

```javascript
xhr = new XMLHttpRequest();
xhr.onload=function(){
    if ((xhr.status>=200 && xhr.status<=300) || xhr.status == 304 ){
            //正常执行语句
    }else{
        // 请求失败语句;
    }
};
xhr.open("post","postexample.php",true);

```

#XMLHttpRequest 2级
1、表单化数据使用构造函数FormData()，不需要设置头部信息，不需要使用序列化serialie()函数
```javascript
var xhr = new XMLHttpRequest();
xhr.open("post","postexample.php",true);
var form = document.getElementById('user-info');
xhr(new FormData(form)); //FormData()序列化表单数据，xhr自动识别FormData对象，并配置适当的头部
```

2、xhr的timeout属性 

```javascript

```
3、overrideMimeType()方法，实现重写XHR响应的MIME类型；服务器端会根据MIME类型确定响应头部的Content-type
4、process事件
5、load事件

#跨域资源共享 CORS

跨域的方法

1、浏览器实现CORS的方法
2、Preflight请求，使用OPTIONS
3、其他CORS的方法：
- 图象Ping；
- JSONP:
``` javascript
script.src = "http://freegeoip.net/json/?callback = handleResponse"
```

4、检查浏览器是否支持简单的CORS请求：首先判断是不是凭证（cookie、HTTP认证、SSL证明）发送；然后判断是不是XDomainRequest对象是否存在；最后

#跨域资源拦截 CORB