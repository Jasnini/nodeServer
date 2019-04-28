# Web缓存

### Web缓存的作用

- 减少网络带宽消耗
- 降低服务器压力
- 减少网络延迟，加快页面打开速度

### Web缓存的分类

#### 数据库缓存

- Web应用，特别是SNS类型的应用，往往关系比较复杂，数据库表繁多，如果频繁进行数据库查询，很容易导致数据库不堪重荷。为了提供查询的性能，会将查询后的数据放到内存中进行缓存，下次查询时，直接从内存缓存直接返回，提供响应效率。比如常用的缓存方案有memcached等。

#### 浏览器端缓存

- 浏览器缓存（Browser Caching）是浏览器端保存数据用于快速读取或避免重复资源请求的优化机制，有效的缓存使用可以避免重复的网络请求和浏览器快速地读取本地数据，整体上加速网页展示给用户。

#### 服务器端缓存

- 代理服务器缓存
代理服务器是浏览器和源服务器之间的中间服务器，浏览器先向这个中间服务器发起Web请求，经过处理后（比如权限验证，缓存匹配等），再将请求转发到源服务器。代理服务器缓存的运作原理跟浏览器的运作原理差不多，只是规模更大。可以把它理解为一个共享缓存，不只为一个用户服务，一般为大量用户提供服务，因此在减少相应时间和带宽使用方面很有效，同一个副本会被重用多次。常见代理服务器缓存解决方案有Squid等，这里不再详述。
- CDN缓存
CDN（Content delivery networks）缓存，也叫网关缓存、反向代理缓存。CDN缓存一般是由网站管理员自己部署，为了让他们的网站更容易扩展并获得更好的性能。浏览器先向CDN网关发起Web请求，网关服务器后面对应着一台或多台负载均衡源服务器，会根据它们的负载请求，动态将请求转发到合适的源服务器上。虽然这种架构负载均衡源服务器之间的缓存没法共享，但却拥有更好的处扩展性。从浏览器角度来看，整个CDN就是一个源服务器。

#### Web应用层缓存

通过代码逻辑，将数据、图片、资源存储在文件系统或者内存中，减少数据库查询和读写的瓶颈，提高响应效率。

### 与缓存相关的Http头部字段

#### Cache-Control请求头部

|头部|取值|作用|
|:----:|:-----:|:-----|
||only-if-cached|表明客户端只接受已缓存的响应，并且不要向原始服务器检查是否有更新的拷贝|
||max-stale\[=< seconds>]|表明客户端愿意接收一个已经过期的资源。 可选的设置一个时间(单位秒)，表示响应不能超过的过时时间。|
||min-fresh=< seconds>|表示客户端希望在指定的时间内获取最新的响应。|
||stale-while-revalidate=< seconds>|表明客户端愿意接受陈旧的响应，同时在后台异步检查新的响应。秒值指示客户愿意接受陈旧响应的时间长度。|
||stale-if-error|表示如果新的检查失败，则客户愿意接受陈旧的响应。秒数值表示客户在初始到期后愿意接受陈旧响应的时间。|

#### Cache-Control响应头部：

头部|取值|作用|
|:----:|:-----:|:-----|
|Cache-Control|public|表明响应可以被任何对象（包括：发送请求的客户端、代理服务器、等等）缓存。|
|Cache-Control|private|表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）,可以缓存响应内容。|
||no-cache|在释放缓存副本之前，强制高速缓存将请求提交给原始服务器进行验证。|
|Cache-Control|max-age=< seconds>|设置缓存的最大存储周期，相对于发送请求的时间|
||s-maxage=< seconds>|覆盖max-age 或者 Expires 头，但是仅适用于共享缓存(比如各个代理)，并且私有缓存中它被忽略。|
|Cache-Control|must-revalidate|缓存必须在使用之前验证旧资源的状态，并且不可使用过期资源|
|Cache-Control|no-store|缓存不应存储有关客户端请求或服务器响应的任何内容。|
||no-transform|不得对资源进行转换或转变|

#### Example：

```html
//关闭缓存指令
Cache-Control: no-cache, no-store, must-revalidate
//添加缓存
Cache-Control: public, max-age
```

#### last-modified/If-Modified-Since

- 当浏览器资源过期时（或者当Cache-Control设置成no-cache时）,浏览器发现缓存中的http资源带有last-modified头部，那么浏览器将会发送包含If-Modified-Since的请求让服务器端校验

#### ETag/If-None-Match

- ETag是服务器响应请求的响应头部，由服务器生成具有唯一性的标识，ETag值是对文件的索引节、大小和最后修改时间进行Hash算法后取得的
- 当浏览器资源过期时（Cache-Control的max-age过期或者当Cache-Control设置成no-cache时），浏览器发现缓存的资源具有ETag的声明，则会发送带有If-None-Match的请求给服务器进行校验

<div class="cache-img-container"> <img src="./images/HttpCache.png" class="cache-img" /> </div>

从图中可以看出Etag的优先级是高于Last-Modified的优先级的。

#### 缓存的具体过程

1. 首先判断是否缓存可用
2. 缓存可用，再判断是否强制要求进行服务器的校验(Pragma, Cache-Control:no-cache、must-revadidate、only-if-cached) 还是存在缓存过期校验(expires, Cache-Control:max-age)
3. 若不存在强制进行服务器端的校验 和过期的缓存校验，那么就直接使用缓存，称为强缓存
4. 若存在强制进行服务器端的校验 或者缓存过期了，然后会判断缓存内容是否有ETag标识，存在Etag标识的话，浏览器发送给服务器的请求中会包含If-None-Match进行校验
5. 没有ETag标识，就会判断有没有last-modified标识，有标识的话，浏览器发送给服务器的请求中会包含If-Modified-Since让浏览器校验
6. 服务器校验后，请求的资源没有发生变化，就会发送status为304的响应，告诉浏览器使用缓存，称为协商缓存。如果请求的资源已经发生了变化，那么服务器就返回包含新的资源且status=200的响应给浏览器，而不使用缓存。

|步骤| 相关http头部|
|:----:|:-----:|
|缓存是否可用| cache-control:no-store|
|强缓存| Pragma无no-cache； Cache-Control无no-cach、must-revadidate, max-age没有过期 Expires没有过期
|协商缓存|Pragma: no-cache; Cache-Control: no-cache; max-age或者Expires过期|
|不使用缓存|Etag值发生了改变，或者last-modified的值发生了改变| 

#### HTTP1.0如何控制浏览器缓存

##### Pragma

优先级高于Expires、高于Cache-control

```html
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">

```

##### Expires

```html
<META HTTP-EQUIV="Expires" CONTENT="0">
```
