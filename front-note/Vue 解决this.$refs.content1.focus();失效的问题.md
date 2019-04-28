1. 产生原因

    - this.\$refs.content1.focus(); 渲染依赖prop属性的 ‘on’ 状态。content1渲染工作没有结束。 引用this.$refs.content1 会出现undefined。

2. 解决方法

- 方法1:

```javascript
this.$nextTick(()=>{this.$refs.content1.focus();});
```

- 方法2:使用v-focus指令

```javascript
//指令注册
directives: {
        focus: {
            update: function (el, {value}) {
                if (value) {
                el.focus()
                }
            },
        },
    },
//模板
<div v-focus="focusState"> </div>
<button v-on:click="focus()"> </button>
//通过控制focusState达到focus的目的
focus(){
    this.focusState=true;
}
```
