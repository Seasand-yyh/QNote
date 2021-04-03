# JavaScript面向对象系列-继承

---

### 



### 借用构造函数

~~~javascript
function SuperType(name) {
	this.name = name;
}

function SubType(name, age) {
	SuperType.call(this, name);
	this.age = age;
}

var sub = new SubType('zhangsan', 23);
sub.name;
sub.age;
~~~

### 组合继承

~~~javascript
function SuperType(name) {
	this.name = name;
}
SuperType.prototype.sayName = function() {
	console.log('name: ' + this.name);
};

function SubType(name, age) {
	SuperType.call(this, name);
	this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
	console.log('age: ' + this.age);
};

var sub = new SubType('zhangsan', 23);
sub.sayName();
sub.sayAge();
~~~

### 原型式继承



### 寄生式继承



### 寄生组合式继承



<br/><br/><br/>

---

