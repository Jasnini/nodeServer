# Vue数据与方法

1. Vue实例的属性和方法，在访问的时候加上$

    ```javascript
    var data={a:1};
    var vm= new Vue({
        el: '#idexa',
        data: data
    });
    vm.$el===document.getElementById('idexa');//true
    vm.$data === data;//true
    ```

2. 生命钩子函数包括 created、mounted、updated、destroyed

    ```javascript
    new Vue({
        data: {
            a: 1,
        }
        created: function(){
            console.log(this.a);
        }
    })
    ```

3. 不要在 属性或者回调函数上使用箭头函数。箭头函数作用域的上下文和父级相同，this指定的不是Vue的实例
4. 初始化实例的 data 属性后不想让data变化，则初始化一个 通过Object.freeze()后的对象
5. 绑定HTML数据，不要用 {{ }}，不会解析HTML的内容，使用’ v-html="rawHtml" ‘指令。
6. 动态属性

7. computed属性

    ```html
    <div >
        {{ text.split('').reverse().join('') }}
    </div>
    <!-- 转换成computed属性 -->
    <div>
        {{ textAfterCompute }}
    </div>
    ```

    ```javascript
    data: {
        text: 'originWords'
    }
    computed: {
        textAfterCompute: function(){
            return this.text.split('').reverse().join('');
        }
    }
    ```

    - computed函数 和 普通的 method函数区别在于： computed函数的执行 与依赖的数据是否变化相关，依赖没有变化时，computed函数是不会执行的

    ```javascript
    computed: {
        date: function(){return Date.now()}
    }
    //date的取值不会变，会一直读取缓存的取值。除非重新渲染
    ```

8. watch属性

    ```javascript
    let vm= new Vue({
        data: {
            content: ""
        }
        watch: {
            content: function(){
                fun1(); //调用methods的方法
            }
        }
        methods: {
            fun1: function(){
                //被调方法
            }
        }
        })
    ```

9. v-bind用于class特性的绑定

    - 使用对象绑定

    ```javascript
    <div v-bind:class="{avtive:isActive ,'text-danger':hasError}"></div>

    data: {
        isActive: true,
        hasError: false
    }
    ```

    ```javascript
    <div v-bind:class="activeClass">
    </div>

    data:{
        activeClass: {
            active:true,
            'text-danger':false}
    }
    ```

    - 使用数组绑定

    ```javascript
    <div v-bind:class="[activeClass, errorClass]"></div>

    data:{
        ativeClass: 'active',
        erreClass:'text-danger'
    }
    ```

    - 数组中包含对象

    ```javascript
    <div v-bind:class="[{active:isActive}, errorClass]"></div>
    ```

    - 三元运算符

        ```javascript
        <div v-bind:class="[isActive? activeClass:'', errorClass]">
        ```

10. 组件绑定class不会被覆盖

11. 内联样式

    - 绑定对象

    ```javascript
    <div v-bind:style="{color:color, fontSize: fontSize+'px'}"></div>

    data={
        color:red,
        fontSize:20
    }
    ```

    - 绑定数组

    ```javascript
    <div v-bind:style="[baseStyle,otherStyle]"></div>

    data:{
        baseStyle:{
            color:red
        },
        otherSyle:{
            fontSize:20px
        }
        }
    ```

12. v-show和v-if

    - v-show只是简单的切换元素的display属性，元素还是存在DOM页面
    - v-if不满足条件时，元素不存在DOM页面中
    - 频繁的切换使用v-show，初始渲染开销。不频繁的切换使用v-if，开销很大

13. 优先级

    - v-for比v-if优先级高。同时使用时，每个循环里面都会有v-for的判断

14. 数组更新 的变异方法和非变异方法

    - 变异方法：
    - 非变异方法使用替换数组的方法：
    - Vue.set(vm.items, indexOfItem, newValue)
    - vm.items.splice(indexOfItem, 1, newValue)
    - vm.items.splice(newLength)

15. 对象的属性 修改和删除不能被 检测到

    - Vue.set()
    - Object.assign()
    - _.extend()

16. 数组data的改变

    - 改变数组元素：Vue.set( vm.items,indexOfItem, newValue )
    - 删除、新增元素：vm.items.splice( indexOfItem, 1, newValue)
    - 改变数组的长度：vm.items.splice( newLength )
    - 对象的属性的添加：Vue.set(obj,'age',25)
    - 对象的添加属性：vm.obj=Object.assign({},obj,'age',25)

17. setter、getter

    - setter函数：数据修改时，会调用setter函数，会通知数据的依赖(观察者)进行更新操作
    - getter函数：初始化时，观察者获取数据的值，会调用getter函数，会实现自动绑定数据和观察者，让观察者成为数据的依赖。

18. v-on事件修饰器
19. 使用 v-model 命令的几个html标签
20. 组件：父组件可通过监听 子组件抛出的事件 获得子组件数据；子组件通过props属性，来绑定父组件的数据。

    - 绑定的数据可以是字符串，也可以是对象

    ```javascript
    //通过props传递数据
    Vue.component('div-comp',{
        props:['title','content'],
        template:'<div v-bind:title="title">{{ content }}</div>',
    })
    //html，将父级组件的数据绑定到组件中 
    <div-component v-bind:title="title" v-bind:content="content"></div-component>
    ```

    ```javascript
    //通过组件的内建方法 $emit() 抛出事件
    ````

21. Vue组件的两种构造方式：通过html模板调用；通过构造函数显示调用
22. v-model用于组件

```javascript
<input v-model="text">
//相当于
<input v-bind:value="text" v-on:input="text=$event.target.value" >//v-bind用于初始化，v-on用于监听input事件
//v-model用于组件
<v-component v-model='text'> </v-component>
//component
Vue.component('v-component',{
    props:['value'],
    template:<input v-bind:value='value' v-on:input='$emit('input',$event.target.value)'></input>
})
```
