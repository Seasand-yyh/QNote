# JavaScript面向对象系列-创建对象

---

### new Object()

创建一个Object的实例，然后再为它添加属性和方法。

~~~javascript
var person = new Object();
person.name = 'zhangsan';
person.age = 21;
person.say = function() {
	console.log('Hello, this is ' + this.name);
};
~~~

### 对象字面量

~~~javascript
var person = {
	name: 'zhangsan',
	age: 21,
	say: function() {
		console.log('Hello, this is ' + this.name);
	}
};
~~~

### 工厂模式

~~~javascript
function createPerson(name, age) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.say = function() {
		console.log('Hello, this is ' + this.name);
	};
	return o;
}
~~~

工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题，即怎样知道对象的类型。

### 构造函数模式

~~~javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
	this.say = function() {
		console.log('Hello, this is ' + this.name);
	};
}
~~~

必须使用`new`操作符创建`Person`的新实例，以这种方式调用构造函数实际上会经历以下步骤：

* 创建一个新对象；
* 将构造函数的作用域赋值给新对象（因此this就指向了这个新对象）；
* 执行构造函数中的代码（为这个新对象添加属性）；
* 返回新对象；

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型，这正是构造函数模式胜过工厂模式的地方。

使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。因此，可以把函数定义转移到构造函数外部：

~~~javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
	this.say = say;
}

function say() {
	console.log('Hello, this is ' + this.name);
}
~~~

### 原型模式

~~~javascript
function Person() {
	
}

Person.prototype.name = 'zhangsan';
Person.prototype.age = 21;
Person.prototype.say = function() {
	console.log('Hello, this is ' + this.name);
};
~~~

~~~javascript
function Person() {
	
}

Person.prototype = {
	constructor: Person,
	name: 'zhangsan',
	age: 21,
	say: function() {
		console.log('Hello, this is ' + this.name);
	}
};
~~~

注意，以这种方式重设`constructor`属性会导致它的[[Enumerable]]特性被设置为true。默认情况下，原生的`constructor`属性是不可枚举的，因此需要重设构造函数。

~~~javascript
function Person() {
	
}

Person.prototype = {
	name: 'zhangsan',
	age: 21,
	say: function() {
		console.log('Hello, this is ' + this.name);
	}
};

Object.defineProperty(Person.prototype, 'constructor', {
	enumerable: false,
	value: Person
});
~~~

### 组合使用构造函数模式和原型模式

~~~javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype = {
	constructor: Person,
	say: function() {
		console.log('Hello, this is ' + this.name);
	}
};
~~~

### 动态原型模式

~~~javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
	if(typeof this.say != 'function') {
		Person.prototype.say = function() {
			console.log('Hello, this is ' + this.name);
		};
	}
}
~~~

### 寄生构造函数模式

~~~javascript
function Person(name, age) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.say = function() {
		console.log('Hello, this is ' + this.name);
	};
	return o;
}

var p = new Person('zhangsan', 23);
p.say();
~~~

### 稳妥构造函数模式

~~~javascript
function Person(name, age) {
	var o = new Object();
	o.say = function() {
		console.log('Hello, this is ' + name);
	};
	return o;
}

var p = Person('zhangsan', 23);
p.say();
~~~



<br/><br/><br/>

---

