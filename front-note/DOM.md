# DOM

## DOM

1、document, element, text, artt, documentfregment, documentype，comment 7种节点类型
2、DOM 没有加载完，script执行了会发生错误。这种情况又两种解决方法：

- a 将js引用发在body 的最后面
- b 使用监听

```javascript
//使用load
<script>
  window.addEventListener("load", function(event) {
    console.log("All resources finished loading!");
  });
</script>

//使用DOMContentLoaded 要考虑浏览器兼容性
<script>
  document.addEventListener("DOMContentLoaded", function(event){console.
  log("DOM fully loaded and parsed");
  },false);
</script>
```

3、判断一个节点有没有子节点的方法：

- node.hasChildNodes()
- node.firstChild !== null
- node.childNodes && node.childNodes.length > 0

4、判断当前节点的 所有后代节点

```javascript
function DOMchildTra(parent, callback){
    if(parent.firstChild!=null){
        for(var node=parent.firstChild; node !=null; node=node.nextSibling){
        DOMchildTra(node, callback);
    }
    }
    callback(parent);
}
```

##HTML

1、空格：

- \&emsp; 1个字符
- \&ensp; 半个字符