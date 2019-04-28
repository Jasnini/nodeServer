#promise
1. promise对象的优势：
- 可以处理，同时进行 的两个异步操作的情况；
- 代码易读性、通用性
- 不会有 回调地狱

2. 异步处理的实现三种方式：
- 监听事件：onload、onclick
- 回调函数：
- Promise

3. Promise 对象的3个状态{{PromiseState}}"pending"、"fulfilled"、”rejected“

4. 创建未完成的 Promise：
```javascript
let promise = new Promise(function(resoleve,reject){
    //异步操作
    if('...'){              //执行失败
        reject('...')；
    }else{
        resoleve('...');        //执行成功
    }
})
```

5. 创建”成功态“的Promise
```javascript
let promise=Promise.resolve(value); //create a successful state promise object
```
6. 创建”拒绝态“的Promise
```javascript
let promise= Promise.reject(value); //create a failed state promise object 
```

7. 
- 成功调用：promise.then()
- 拒绝调用：promise.catch()

8. Promise链的抛出的错误具有传递性

9. promise.then() 可以看做是回调函数，执行过程中，会放在“任务队列”的末尾
- 执行顺序：主线程同步>异步>回调函数


