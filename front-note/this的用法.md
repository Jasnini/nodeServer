# this  的用法

1、对象的方法调用 this，指向对象

2、方法的 this，指全局作用域

3、构造函数调用，指实例对象

4、apply() 和 函数call()

```javascript

var x = 0;
function test() {
    　console.log(this.x);
    }
    var obj = {};
    obj.x = 1;
    obj.m = test;
    obj.m.apply(obj);//1，this指对象
    obj.m.apply(); //0，this默认指全局
    obj.m ();//1，对象的函数调用，this指对象
```

```javascript

//call()用法和 apply一样，但是第二个参数不是数组的形式
//call()实现调用其他构造函数的方法，实现继承
var Person1  = function () {
    this.name = 'linxin';
}
var Person2 = function () {
    this.getname = function () {
        console.log(this.name);
    }
    Person1.call(this);//this 指Person2的对象实例
}
var person = new Person2();
person.getname();       // linxin
```