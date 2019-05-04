
#块级作用域

 ES5执行环境和作用域：

1、2种作用域

- 全局作用域。
- 函数作用域。

2、严格模式下，未声明直接使用变量，会报错；非严格模式下，未声明的变量会在运行时自动加入到**全局变量**

```javascript
function func(){
    a=1; //非严格模式不会报错，a是全局变量
}

asert(a); //非严格模式，a是全局变量

```

3、内部环境可以通过作用域链访问外部环境；可以向上搜索，但是不能向下搜索作用域链

4、2种方式延长作用域

- try...catch...可以通过抛出错误对象到作用域链的前端，达到延长作用域链的目的；
- with 语句通过指定对象添加到作用域，达到延长作用域的目的

```javascript
function buildUrl(){
    var qs='?debug=true';
    with(location){       //location是windows对象；建议不要用with。
        var url= href+qs;
    }
    return url;
}
```

ES6的作用域改动：

1、

- ES6新增：块级作用域
- 只有let、const变量才有块级作用域（函数 和 {}）

2、let和const变量不会提升

3、let、const禁止在同一个作用域中重复声明变量；不同作用域可以重复声明

4、块级作用域 内的let和const变量只在块级作用域有效，执行到块级作用域之外，会被立刻销毁。

5、const声明必须被初始化，不能被修改； 但是当const定义了一个对象后，对象的属性值可以修改，但是绑定的对象不能修改。

```javascript
const obj={
    name:'dadali';
}
obj.name='';//sucess
obj.age='18';//success
obj={
    name:'dadali';
}//fail,报错
```

6、循环中的函数

```javascript
//使用var不能实现 循环打印
var funcs = [];
for (var i=0; i<10; i++){
    funcs.push(function(){
        console.log(i);
    })
}

funcs.forEach(function(func){
    func()； //输出10次数字为10
});

//改为 使用立即函数实现
var funcs=[];
for (var i=0; i<10; i++){
    funcs.push(function(num){
        console.log(num);
    }(i));
}
//或者
var funcs=[];
for (var i=0; i<10; i++){
    funcs.push(
        function(num){
            return function(){
                console.log(num);
            };
        }(i)
    );
}
funcs.forEach(function(fun){fun()});

//改为 使用let声明循环变量
var funcs=[]
for (let i=0; i<10;i++){
    funcs.push(function(){
        console.log(i);
    });
}

funcs.forEach(function(fun){fun();});
```

7、const在循环中
    for 循环中的const声明会报错；但是for-in 和 for-of 循环中使用const和let一致

8、全局作用域下的let和const不会覆盖全局作用域的对象，只会遮蔽 全局作用域的对象

```javascript
let RegExp='hello';
console.log(window.RegExp===RegExp); //'false' 
```