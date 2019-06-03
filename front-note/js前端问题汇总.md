
1. 如何在浏览器画一条 0.5px的线

    - 有的浏览器支持这个功能、但是chrome会四舍五入画成1px的线；

    - 使用 transform

    ```css
    .hr.scale-half {
        height: 1px;
        transform: scaleY(0.5);
        transform-origin: 50% 100%;
    }
    ```

    - 使用boxshowdow，但是safari不支持，画出来没有颜色

    ```css
    .hr.boxshadow {
        height: 1px;
        background: none;
        box-shadow: 0 0.5px 0 #000;
    }
    ```

    - 渐变色linear-gradient
    - 视口viwport

    ```javascript
    <meta name="viewport" content=
    "width=device-width,initial-sacle=0.5">
    ```

    - svg：

2. 物理像素和逻辑像素

    - 通俗说就是：设备像素 和 css像素
    - dpr：设备像素比 指 设备像素/css像素

3. 事件流

4. viewport 和 移动端布局
    - layout-viewport 宽度大于浏览器的可见区域，避免网页的元素都挤在一块  document.documentElement.clientWidth
    - visual-viewport  移动设备的屏幕可见区域

5. 闭包的理解

6. Object.prototype.tostring()方法可以得到对象的类型。比typeof 和 instancenof 更准确。
    - 用法：Object.prototype.tostring.call(mmm)

7. "use strict"有什么好处：
    - 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    - 消除代码运行的一些不安全之处，保证代码运行的安全；
    - 提高编译器效率，增加运行速度；
    - 为未来新版本的Javascript做好铺垫。

    不同的地方：

    - 严格模式下，不允许不创建变量，直接赋值的行为
    - 严格模式下  this 在apply(null)、call(null)会按照指定的来，非严格模式下会将null转化成 全局对象
    - 严格模式下，不能使用保留字 作为变量名，如：impliments、interface、let、package、private、protected、public、static、yield
    - 严格模式要求 函数参数命名唯一，但是非严格模式下，会取第二个参数
    - 严格模式下eval()函数不再创建变量或函数
    - 禁止使用 eval和arguments 作为标识符，且不允许修改他们的值

8. 解释器 会自动在return 、break、continue一行结束后加';' 所以当该段没有结束的时候，一定将'{'放在前面
9. 判断是不是NaN：isNaN()。使用‘===’是没有用的
10. 浮点数占 64位；isInteger()判断是不是整数
11. 将匹配的字符转化成小写

    ```javascript
    str.replace(/\W/g,'').toLowerCase()//toLowerCase函数转化成小写
    ```

12. arr.reverse() 改变并反转arr，并返回arr的引用

13. 
    - +、- 符号会将字符转化成数字
    - '1'+2 结果是12 1+2+'2'结果是32
14. 递归会导致堆栈溢出，有些情况下，使用定时器转化成异步程序，防止堆栈
15. 逻辑与返回第一个是 false 的操作数 或者 最后一个是 true的操作数

    ```javascript
    console.log(1 && 2 && 0 )//output: 0
    console.log(1 && 2 && 3 )//output: 3
    ```

16. 逻辑或返回第一个是true 的操作数，或者最后一个是false的操作数

    ```javascript
    console.log(0 || 2 || 1)//output:2
    console.log(0||0||0)//output: 0
    ```

17. ？

    ```javascript
    []==true//right   
    {}==true//right
    ```

18. 创建一个访问一个DOM元素的所有子元素，并将子元素传递给回调函数_的函数

    ```javascript
    function trival(ele,callback){
        let c=ele.children;
        for (let i=1;i<c.length;i++){
            callback(c[i]);
            trival(c[i],callback);
        }
    }
    ```

19. 函数内的[[scope]]属性可以看到 let声明的变量