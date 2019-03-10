#原型对象
1、创建了一个函数之后，会自动为该函数创建一个prototype属性，指向原型对象。所有的原型对象会自动创建一个constructor(构造器)属性，它是指向前面函数的指针。

2、一个实例的原型指针指向构造函数的原型对象；new出的实例本身
没有constructor，但是他继承了原型的constructor

```javascript
function A(){};
let b= new A();
console.log(b.constructor) // success，间接访问b的原型的constructor

```

3、只有构造函数才有prototype（原型对象）

4、构造原型链方法
```javascript
function SuperType(name){
    this.name=name;
    this.colors=['red','blue','green'];
}
SuperType.prototype.sayname=function(){
    console.log(this.name);
};
function SubType(name,age){
     SuperType.call(this, name);
     this.age=age;
 }
SubType.prototype= new SuperType();
instance1=new SubType('nidexiaoxiao',19);
instance1.sayname();
```