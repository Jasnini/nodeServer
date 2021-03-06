# JS

## Js基本数据类型

【数据类型】
switch: 强等于

转义成False：`undefined` `null` `false` `0` `NaN`（非数字 type：number）`''` `""`

转义成True：`{}`  `[]`

`+0===-0（True）`

`NaN==NaN (False)`

`isNaN` 只对数字有效

`isNaN()`等同于`isNaN(number())`

`isFinit():NaN undefined Infinity`为`False`

## object(2019年2月24日)

1. 对象键名是 字符串：`var obj ={1e2: true}  1e2——>'100'`
2. 访问属性、赋值属性：点运算符和 方括号运算符`arr.p/arr['p']`(要加引号)
3. 查看属性`arr.keys`
4. 删除`delete arr.p`只有当属性存在 且不得删除的时候，`delete`返回值才是`false`；继承的属性，删除成功后，仍然可以访问
5. 属性是否存在：`'p' in arr`
6. `for....in....` 可遍历属性的遍历`arr.hasOwnProperty(key)`判断是自己的属性，不是继承的
7. `with arr {}`  存在问题：内部作用域仍然是当前作用域

## array：

1. ? 
2. `arry.length`;
3. `arry.length=0` 快速清空数组
4. `in`     exa：`2 in arr`  //false
5. `for...in...` 会遍历非数字键 ; 建议使用for和while
6. `slice : var arr = Array.prototype.slice.call(arrayLike);` 将对象变为真正的数组
7. `Array.prototype.forEach.call(arrayLike, print);` 把数组的方法放在 对象上

## function：

1. 三种函数声明的方式

    - function
    - 赋值语句
    - 构造函数 `new Function（）`（类名首字母大写）

2. 重复声明 后面覆盖前面 ；如果同时存在 赋值语句和function ，**赋值语句生效**

3. 作用域：1 如果函数A调用函数B，却没考虑到函数B不会引用函数A的内部变量。局部（函数）、全局
4. 函数参数按值传递（数值、字符串、布尔） ；函数参数按地址传值（数组、对象、函数）;**注：函数内部修改的不是属性，是整个参数时，不影响原始值**
5. `arguments[0]`
6. 闭包：函数内的函数。通过闭包函数 实现 函数外部访问函数内的变量
7. IIFE立即调用函数表达式：1、不用为函数命名，避免污染全局变量  2、隐藏私有变量
8. `eval()`: `'use strict'`模式，`eval()`内定义的变量不会影响外部，但是仍然可以读写外部的变量，存在风险，**不推荐使用
**
9. eval使用别名执行，内部变量一律是全局作用域 **（ES5 ES6的eval有所改动）**

10. `callback()` 回调函数通常用于异步函数中

## 编程风格：

1. 缩进使用统一的缩进方式：Tab
2. 区块使用：`{}`
3. 非函数的圆括号（）左边写空格
4. 行尾要有分号  `do... while...` 和 函数表达式
5. 少使用全局变量
6. 现在头部声明 全局变量
7. 不适用 `'=='` 和 `with` 语句
8. 不要将 不同目的的语句写成一行
9. 尽量使用`+=`和`-=`，少使用`++` 和`--`
10. 不用 `switch...case...`，使用对象结构代替

```javascript

//对象结构代替switch ...case...
function doAction(action) {
  var actions = {
    'hack': function () {
      return 'hack';
    },
    'slash': function () {
      return 'slash';
    },
    'run': function () {
      return 'run';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }

  return actions[action]();
}
```

## String和Arry的方法总结
