# VueRouter

## 使用方法

1. 路由映射
路由映射就是创建一个对对象，展示组件component和路径的对应关系

    ```javascript
    const routes=[
        {path:'/index',component:Index},
        {path:'/js',component:Js}
    ]
    ```

2. 创建路由实例

    ```javascript

    var vueRouter=new VueRouter({
        routes
        })

    ```

3. 路由注册

    ```javascript
    const app=new Vue({
        vueRouter
    })
    ```

4. 前端渲染
    `<router-view></router-view>`

5. 路由导航
  `<router-link to="/index">to index.html</router-link>`
  `<router-link to="/js">to js.html</router-link>`

## VueRouter的原理和两种模式

<div class="cache-img-container"><img src="./images/VueRouter.png" class="cache-img" /></div>

1. 选择方法
    `mode:'history'`或者`mode:'hash'`

    ```javascript
    var router=new VueRouter({
        mode:'history',
        //判断当前的开发环境是不是生产环境
        base: process.env.NODE_ENV === 'production' ? process.env.PROXY_PATH : ''
        router,
    })
    ```

2. HashHistory模式

    - this.$router.push()操作实质上是，history对象的相关操作，不同的模式产生不同的history对象。hash模式下生成的是HashHistory类型的对象。
    - 路径后的hash值(#后的值)不能通过http传递给服务器，它只是用来指导浏览器进行路由的切换
    - HashHistory.push()使得当前路由改变，并将hash路由值添加到浏览器访问的历史记录中
    - 视图的更新：beforeCreate钩子中通过Vue.util.defineReactive()定义了响应式的_route属性，当_route改变时，自动调用render()函数，对视图更新
    - HashHistory.replace()不直接替换window.location.hash，而是调用window.location.replace方法将路由进行替换。

    - HashHistory监听浏览器地址栏
    浏览器地址栏监听是通过HashHistory 的setupListeners()函数实现对hashchange的监听事件（对浏览器的地址进行监听）

3. HTML5History
    - HTML5中引入了history.pushState()和history.replaceState()方法
    - 当调用pushState()和replaceState()修改浏览器历史栈后，虽然当前url改变了，但浏览器不会立即发送请求该url，这就为单页应用前端路由，更新视图但不重新请求页面提供了基础。
    - HTML5History 中添加对浏览器地址栏的监听popstate是直接在构造函数中执行的

4. HTML5History的优势：
    > - pushState设置的新url可以是与当前url同源的任意url,而hash只可修改#后面的部分，故只可设置与当前同文档的url
    > - pushState设置的新url可以与当前url一模一样，这样也会把记录添加到栈中，而hash设置的新值必须与原来不一样才会触发记录添加到栈中
    > - pushState通过stateObject可以添加任意类型的数据记录中，而hash只可添加短字符串
    > - pushState可额外设置title属性供后续使用

5. AbstractHistory使用数组代替浏览器的历史浏览记录栈

## 参考文献

[1] https://juejin.im/post/5b08c9ccf265da0dd527d98d#heading-2