# ES6快速入门

---

1、let

~~~javascript
for(let i=0; i<3; i++) {
    console.log(i)
}
console.log(i) //error
//let 在块级作用域有效
~~~

~~~javascript
let a=1;
let a=2; //error
//不能使用let重复声明变量
~~~

2、const

~~~javascript
const PI=3.1415926;
PI=3.14; //error
//const 声明的变量是只读的，值不能修改；
//也是块级作用域的；

const PI;
PI=3.1415926; //error
//必须声明的同时赋值；

const obj = {a: 1};
obj.a=2;
obj.b=3;
//引用类型里面的值可以修改
~~~

3、解构赋值(数组)

~~~javascript
//1
{
    let a, b;
    [a, b] = [1, 2];
    console.log(a, b);
}

//2
{
    let a, b, c;
    [a, b, c=3] = [1, 2];
    console.log(a, b, c);
}

//3、变量交换
{
    let a=1, b=2;
    [a, b] = [b, a];
    console.log(a, b);
}

//4
{
    function fn() {
        return [1, 2];
    }
    let a, b;
    [a, b] = fn();
    console.log(a, b);
}

//5
{
    function fn() {
        return [1, 2, 3, 4, 5];
    }
    let a, b;
    [a, , , b] = fn();
    console.log(a, b); //1, 4
}

//6
{
    let a, b, rest;
    [a, b, ...rest] = [1, 2, 3, 4, 5];
    console.log(a, b, rest); //1, 2, [3, 4, 5]
}

//7
{
    function fn() {
        return [1, 2, 3, 4, 5];
    }
    let a, rest;
    [a, ...rest] = fn();
    console.log(a, rest); //1, [2, 3, 4, 5]
}
~~~

4、解构赋值(对象)

~~~javascript
//1
{
    let a, b;
    ({a, b} = {a: 1, b: 2})
    console.log(a, b);
}

//2
{
    let obj = {a: 1, b: true};
    let {a, b} = obj;
    console.log(a, b);
}

//3
{
    let obj = {a: 10};
    let {a=1, b=true} = obj;
    console.log(a, b);
}

//4
{
    let obj = {
        name: 'abc',
        child: [{
            name: 'def',
            desc: 'description'
        }]
    };
    
    let {name: pName, child: [{name: cName}]} = obj;
    console.log(pName, cName);
}
~~~

5、正则的扩展

~~~javascript
//1、ES5中的写法
{
    let regexp1 = new RegExp('xyz', 'i');
    let regexp2 = new RegExp(/xyz/i);
    console.log(regexp1.test('xyz12345'));
    console.log(regexp2.test('xyz12345'));
}

//2、构造函数扩展
{
    let regexp = new RegExp(/xyz/ig, 'i');
    console.log(regexp.flags); //i
    //第二个参数中的修饰符i会覆盖第一个参数的修饰符ig
}

//3、y修饰符
{
    let str = 'bbb_bb_b';
    let reg1 = /b+/g;
    let reg2 = /b+/y;
    console.log('step1:', reg1.exec(str), reg2.exec(str));
    console.log('step2:', reg1.exec(str), reg2.exec(str));
    //step1: 都匹配到ppp
    //step2: reg1会忽略_，所以也能匹配到bb; 而reg2会紧跟bbb后面开始，_不匹配，所以为null.
    
    //粘连模式
    console.log(reg1.sticky, reg2.sticky); //false, true
}

//4、u修饰符
{
    console.log('u1', /^\uD83D/.test('\uD83D\uDC2A')); //true
    console.log('u2', /^\uD83D/u.test('\uD83D\uDC2A')); //fasle
    
    console.log(/\u{61}/.test('a')); //false
    console.log(/\u{61}/u.test('a')); //true
    
    let str = '𠮷'; //  \u20BB7
    console.log(/^.$/.test(str)); //false
    console.log(/^.$/u.test(str)); //true
    console.log(/𠮷{2}/.test('𠮷𠮷')); //false
    console.log(/𠮷{2}/u.test('𠮷𠮷')); //true
    //.能匹配任何字符，但是字符长度超过2个字节就匹配不到了，加上u修饰符即可.
}

//5、s修饰符(提案)
//.修饰符除了第4点的不能匹配超过2个字节长度的字符之外，还不能匹配回车、换行、行分隔符、段分隔符。用s修饰符可以解决该问题。
~~~

6、字符串的扩展

~~~javascript
//1、Unicode表示法
{
    console.log('a'); //a
    console.log('\u0061'); //a
    console.log('\u20BB7'); //超过了0xFFFF
    console.log('\u{20BB7}'); //𠮷
}

//2、
{
    let str = '𠮷'; //  \u20BB7
    console.log(str.length); //2
    console.log(str.charAt(0));
    console.log(str.charAt(1));
    console.log(str.charCodeAt(0));
    console.log(str.charCodeAt(1));
    
    let str1 = '𠮷a'; //  \u20BB7
    console.log(str1.length);
    console.log(str1.codePointAt(0));
    console.log(str1.codePointAt(1));
}

//3、
{
    let str = String.fromCharCode('0x20bb7');
    console.log(str);
    
    str = String.fromCodePoint('0x20bb7');
    console.log(str);
}

//4、
{
    let str = '\u{20BB7}abc';
    for(let i=0; i<str.length; i++) {
        console.log(str[i]);
    }
    
    for(let s of str) {
        console.log(s);
    }
}

//5、
{
    let str = 'String';
    console.log(str.startsWith('S'));
    console.log(str.endsWith('ng'));
    console.log(str.includes('i'));
    
    console.log(str.repeat(2)); //StringString
    
    console.log('1'.padStart(2, '0'));
    console.log('1'.padEnd(2, '0'));
}

//6、模板字符串
{
    let name = 'zhangsan';
    let info = 'hello world';
    let str = `I am ${name}, ${info}`;
    console.log(str);
}

//7、
{
    let user = {
        name: 'zhangsan',
        info: 'hello world'
    };
    console.log(abc`I am ${user.name}, ${user.info}`);
    function abc(s, v1, v2) {
        return s + v1 + v2;
    }
}

//8、
{
    console.log(`hello\nworld`);
    console.log(String.raw`hello\nworld`); //hello\nworld
}
~~~

7、数值的扩展

~~~javascript
//1
{
    //二进制
    console.log(0b111110111);
    console.log(0B111110111);
    
    //八进制
    console.log(0o767);
    console.log(0O767);
}

//2
{
    console.log(Number.isFinite(15/0));
    console.log(Number.isFinite(NaN));
    
    console.log(Number.isNaN(NaN));
    
    console.log(Number.isInteger(13)); //true
    console.log(Number.isInteger(13.0)); //true
    console.log(Number.isInteger(13.1)); //false
    
    console.log(Number.MAX_SAFE_INTEGER);
    console.log(Number.MIN_SAFE_INTEGER);
    console.log(Number.isSafeInteger(11));
}

//3
{
    //取整
    console.log(Math.trunc(4.1)); //4
    console.log(Math.trunc(4.9)); //4
    
    //取正负
    console.log(Math.sign(-3)); //-1
    console.log(Math.sign(0)); //0
    console.log(Math.sign(3)); //1
    console.log(Math.sign('3')); //NaN
    
    //立方根
    console.log(Math.cbrt(8));
    console.log(Math.cbrt(-1));
}
~~~

8、数组的扩展

~~~javascript
//1
{
    let arr = Array.of(2,4,8,32,44,68);
    console.log(arr);
    
    let empty = Array.of();
    console.log(empty);
}

//2
{
    let divs = document.querySelectorAll('div');
    let arr = Array.from(divs); //将伪数组转换为数组.
    arr.forEach(function(item) {
        console.log(item);
    });
    
    let array = Array.from([1,2,3], function(item) {
        return item * 2;
    });
    console.log(array);
}

//3
{
    let arr = [1, 'a', false, undefined];
    arr = arr.fill(6);
    console.log(arr);
    
    arr = [1, 'a', false, undefined];
    arr = arr.fill(6, 1, 3);
    console.log(arr);
}

//4
{
    let arr = [2,4,9,14,32,55];
    for(let index of arr.keys()) {
        console.log(index);
    }
    for(let val of arr.values()) {
        console.log(val);
    }
    for(let [index, val] of arr.entries()) {
        console.log(index, val);
    }
}

//5
{
    let arr = [2,4,9,14,32,55];
    console.log(arr.copyWithin(1, 3, 5)); //2,14,32,9,14,32,55 //用3到5位置的替换掉1位置
}

//6
{
    let arr = [1,2,3,4,5,6];
    console.log(arr.find(function(item) {
        return item > 3;
    })); //4
    console.log(arr.findIndex(function(item) {
        return item > 3;
    })); //3
}

//7
{
    let arr = [1,2,3,4,NaN,6];
    console.log(arr.includes(2)); //true
    console.log(arr.includes(NaN)); //true
}
~~~

9、函数的扩展

~~~javascript
//1、参数默认值
{
    function fn(x='hi', y='world') {
        console.log(x, y);
    }
    fn('hello');
}

//2
{
    let x = 'abc';
    function fn(x, y=x) {
        console.log(x, y);
    }
    fn('def'); //def,def
}

//3
{
    let x = 'abc';
    function fn(a, y=x) {
        console.log(a, y);
    }
    fn('def'); //def,abc
}

//4、rest参数
{
    function fn(...args) {
        for(let v of args) {
            console.log(v);
        }
    }
    fn(1,2,3,'a',false);
}

//5、扩展运算符
{
    let arr = [1,2,3,4,5];
    console.log(...arr); //1 2 3 4 5 //将数组转换为一个个离散的值
}

//6、箭头函数
{
    let arrow = v => v*2;
    console.log(arrow(2));
    
    arrow = () => 'hello world';
    console.log(arrow());
}

//7、尾调用(能提升性能)
{
    function tail(x) {
        console.log(x);
    }
    function fn(x) {
        return tail(x);
    }
}
~~~

10、对象的扩展

~~~javascript
//1、简洁表示法
{
    let a = 1;
    let b = 'abc';
    let obj = {a, b};
    
    obj = {
        a,
        b,
        say() {
            console.log('hi');
        }
    };
}

//2、属性表达式
{
    let key = 'property';
    let o1 = {
        key: 'value'
    };
    let o2 = {
        [key]: 'value'
    };
}

//3
{
    console.log(Object.is('abc', 'abc')); //true //'abc'==='abc'
}

//4、扩展运算符
{
    let {a, b, ...c} = {a: 1, b: 2, c: 3, d:4};
    console.log(c); //{c: 3, d:4}
}
~~~

11、Symbol

~~~javascript
//1
{
    let s1 = Symbol();
    let s2 = Symbol();
    console.log(s1===s2); //false
}

//2
{
    let s1 = Symbol.for('s1');
    let s2 = Symbol.for('s2');
    console.log(s1===s2); //true
}

//3
{
    let pro = 'abc';
    let obj = {
        [pro]: 123,
        abc: 456
    };
    
    pro = Symbol.for('abc');
    let obj = {
        [pro]: 123,
        abc: 456
    };
}

//4
{
    let pro = Symbol.for('abc');
    let obj = {
        [pro]: 123,
        abc: 456
    };
    for(let [key, value] of Object.entries(obj)) {
        console.log(key, value); //无法获取Symbol类型的属性
    }
    
    Object.getOwnPropertySymbols(obj).forEach(function(item) {
        console.log(obj[item]); //只获取Symbol类型的属性
    });
    
    Reflect.ownKeys(obj).forEach(function(item) {
        console.log(obj[item]); //都能获取
    });
}
~~~

12、Set和WeakSet

~~~javascript
//1
{
    let set = new Set();
    set.add(3);
    set.add(7);
    let size = set.size;
    
    set = new Set([1, 2, 3, 4]);
}

//2
{
    let set = new Set();
    set.add(3);
    set.add(7);
    set.add(3); //不能重复添加，但不会报错
}

//3
{
    let set = new Set([1,2,3,4,5]);
    set.add(6);
    set.delete(5);
    set.has(5);
    set.clear();
}

//4
{
    let set = new Set([1,2,3,4,5]);
    for(let key of set.keys()) {
        console.log(key);
    }
    for(let value of set.values()) {
        console.log(value);
    }
    for(let value of set) {
        console.log(value);
    }
    for(let [key, value] of set.entries()) {
        console.log(key, value);
    }
    set.forEach(function(item) {
        console.log(item);
    });
}

//5
{
    //WeakSet只能存储对象，没有size属性、clear()方法，不能遍历
    let set = new WeakSet();
    set.add({});
}
~~~

13、Map和WeakMap

~~~javascript
//1
{
    let map = new Map();
    let key = ['123'];
    
    map.set(key, '456');
    map.get(key);
}

//2
{
    let map = new Map([['k1', 'v1'], ['k2', 'v2']]);
    let size = map.size;
    map.delete('k1');
    map.clear();
}

//3
{
    let map = new Map([['k1', 'v1'], ['k2', 'v2']]);
    for(let key of map.keys()) {
        console.log(key);
    }
    for(let value of map.values()) {
        console.log(value);
    }
    for(let [key, value] of map.entries()) {
        console.log(key, value);
    }
}

//4
{
    //WeakMap的key只能是对象，没有size属性、clear()方法，不能遍历
    let map = new WeakMap();
    map.set({}， 123);
}
~~~

14、Proxy

~~~javascript
//1
{
    let obj = {
        time: '2019-03-13',
        name: 'net',
        _r: 123
    };
    let monitor = new Proxy(obj, {
        get(target, key) {
            return target[key].replace('2019', '2018');
        },
        set(target, key, value) {
            if(key === 'name') {
               return target[key] = value;
            }else{
                return target[key];
            }
        },
        has(target, key) {
            if(key === 'name') {
               return target[key];
            }else{
                return false;
            }
        },
        deleteProperty(target, key) {
            if(key.startsWith('_')) {
			   delete target[key];
                return true;
            }else{
                return target[key];
            }
        },
        ownKeys(target) {
            return Object.keys(target).filter(item=>item!='time');
        }
    });
    monitor.time; //2018-03-13
    
    monitor.name = 'abc'; //abc
    monitor._r = 456; //123
    
    'name' in monitor; //true
    'time' in monitor; //false
    
    delete monitor._r;
    delete monitor.name;
    
    Object.keys(monitor);
}
~~~

15、Reflect

~~~javascript
//1
{
    let obj = {
        time: '2019-03-13',
        name: 'net',
        _r: 123
    };
    Reflect.get(obj, 'time'); //2019-03-13
    Reflect.set(obj, 'name', 'abc');
    Reflect.has(obj, 'name'); //true
    Reflect.deleteProperty(obj, '_r');
    Reflect.ownKeys(obj);
}

//2、Proxy与Reflect的一个使用场景（校验）
{
    //封装校验器
    function validator(target, validator) {
        return new Proxy(target, {
            _validator: validator,
            set(target, key, value, proxy) {
                if(target.hasOwnProperty(key)) {
                   let validate = this._validator[key];
                    if(!!validate(value)) {
                        Reflect.set(target, key, value, proxy);
                    } else {
                        throw Error(`不能设置${key}的值为${value}`);
                    }
                } else {
                    throw Error(`${key} 不存在`);
                }
            }
        });
    }
    
    //定义校验规则
    const validator4Persons = {
        name(val) {
            return typeof val === 'string';
        },
        age(val) {
            return typeof val === 'number' && val > 18;
        }
    };
    
    class Person{
        constructor(name, age) {
            this.name = name;
            this.age = age;
            return validator(this, validator4Persons);
        }
    }
    
    let p = new Person('zhangsan', 19);
    p.name = true; //error
    p.age = 12; //error
}
~~~

16、Class

~~~javascript
//1、类与继承
{
    class Parent {
        constructor(name='parent') {
            this.name = name;
        }
    }
    
    class Child extends Parent {
        constructor(name='child', age) {
            super(name);
            this.age = age;
        }
    }
    
    let p = new Parent('myParent');
    let c = new Child('myChild', 21);
}

//2、getter与setter
{
    class Parent {
        constructor(name='parent') {
            this.name = name;
        }
        
        get fullName() {
            return 'p:' + this.name;
        }
        
        set fullName(value) {
            this.name = value;
        }
    }
    
    let p = new Parent('myParent');
    p.fullName;
    p.fullName = 'abc';
}

//3、静态属性与静态方法
{
    class Parent {
        constructor(name='parent') {
            this.name = name;
        }
        
        static sayHi() {
            console.log('Hi');
        }
    }
    //静态方法
    Parent.sayHi();
    //静态属性
    Parent.type = 'Chinese';
}
~~~

17、Promise

~~~javascript
//1
{
    let ajax = function(callback) {
        console.log('start');
        setTimeout(function() {
            callback && callback.call();
        }, 1000);
    }
    
    ajax(function() {
        console.log('get data...');
    });
}

//2
{
    let ajax = function() {
        console.log('start');
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 1000);
        });
    }
    
    ajax().then(function() {
        console.log('get data...');
    });
}

//3
{
    let ajax = function() {
        console.log('start');
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 1000);
        });
    }
    
    ajax().then(function() {
        console.log('t1');
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 2000);
        });
    }).then(function() {
        console.log('t2');
    });
}

//4
{
    let ajax = function(num) {
        console.log('start');
        return new Promise(function(resolve, reject) {
            if(num>5) {
                resolve();
            } else {
                throw new Error('error');
            }
        });
    }
    
    ajax(6).then(function(){
        console.log('t1');
    }).catch(function(err){
        console.log(err);
    });
    
    ajax(3).then(function(){
        console.log('t1');
    }).catch(function(err){
        console.log(err);
    });
}

//5
{
    function loadImg(src) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = src;
            img.onload = function() {
                resolve(img);
            }
            img.onerror = function(err) {
                reject(err);
            }
        });
    }
    
    function showImg(imgs) {
        imgs.forEach(img => document.body.appendChild(img));
    }
    
    //三张图片都加载完才一次性显示
    Promise.all([
        loadImg('1.png'),
        loadImg('2.png'),
        loadImg('3.png')
    ]).then(showImg);
    
    //三张图片若有任意一张加载完就立即显示该张图片
    Promise.race([
        loadImg('1.png'),
        loadImg('2.png'),
        loadImg('3.png')
    ]).then(showImg);
}
~~~

18、Iterator

~~~javascript
//1
{
    let arr = ['x', 'y', 'z'];
    let map = arr[Symbol.iterator]();
    map.next();
    map.next();
    map.next();
    map.next();
}

//2
{
    let obj = {
        start: [1, 2, 3],
        end: [7, 8, 9],
        [Symbol.iterator]() {
            let self = this;
            let index = 0;
            let arr = self.start.concat(self.end);
            let len = arr.length;
            return {
                next() {
                    if(index<len) {
                        return {
                            value: arr[index++],
                            done: false
                        }
                    } else {
                        return {
                            value: arr[index++],
                            done: true
                        }
                    }
                }
            }
        }
    };
    
    for(let key of obj) {
        console.log(key);
    }
}
~~~

19、Generator

~~~javascript
//1
{
    let tell = function* () {
        yield 'a';
        yield 'b';
        return 'c';
    }
    
    let k = tell();
    k.next();
    k.next();
    k.next();
    k.next();
}

//2
{
    let obj = {};
    obj[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    }
    for(let key of obj) {
        console.log(key);
    }
}

//3
{
    let state = function* () {
        while(true) {
            yield 'A';
            yield 'B';
            yield 'C';
        }
    }
    
    let status = state();
    status.next();
    status.next();
    status.next();
    status.next();
    status.next();
}

//4
{
    let state = async function() {
        while(true) {
            await 'A';
            await 'B';
            await 'C';
        }
    }
    
    let status = state();
    status.next();
    status.next();
    status.next();
    status.next();
    status.next();
}

//5、应用场景：抽奖
{
    let draw = function(count) {
        console.log(`剩余${count}次机会`);
    }
    
    let residue = function* (count) {
        while(count>0) {
            count--;
            yield draw(count);
        }
    }
    
    let star = residue(5);
    btn.addEventListener('click', (e)=>{
        star.next();
    }, false);
}

//6、应用场景：长轮询
{
    let ajax = function* () {
        yield new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve({code: 0})
            }, 200);
        });
    }
    
    let pull = function() {
        let generator = ajax();
        let step = generator.next();
        step.value.then((data) => {
            if(data.code != 0) {
                setTimeout(()=>{
                    console.log('加载中...');
                    pull();
                }, 1000);
            } else {
                console.log(data);
            }
        });
    }
    
    pull();
}
~~~

20、Decorators

~~~javascript
//1
{
    let readonly = function(target, name, descriptor) {
        descriptor.writable = false;
        return descriptor;
    }
    
    class Test{
        @readonly
        time() {
            return '2019-03-13';
        }
    };
    
    let test = new Test();
    test.time = function() {
        return 'xxxxxx';
    };
    console.log(test.time());
}

//2
{
    let typename = function(target, name, descriptor) {
        target.myName = 'abc';
    }
    
    @typename
    class Test{
        
    }
    
    console.log(Test.myName); //类的静态属性
}

//3、应用场景：日志统计
{
    let log = (type) => {
        return function(target, name, descriptor) {
            let src_method = descriptor.value;
            descriptor.value = (...args) => {
                src_method.apply(target, args);
                console.info(`log ${type}`);
            }
        }
    }
    
    class Ad{
        @log('show')
        show() {
            console.log('ad show');
        }
        
        @log('click')
        click() {
            console.log('ad click');
        }
    }
    
    let ad = new Ad();
    ad.show();
    ad.click();
}
~~~

21、Module模块化

~~~javascript
//1
{
    export let A = 123;
    
    export function test() {
        console.log('test');
    }
    
    export class Demo {
        test() {
            console.log('demo');
        }
    }
    
    import {A, test, Demo} from './demo.js';
    import {A, test} from './demo.js';
    import {A} from './demo.js';
    console.log(A, test, Demo);
    
    import * as obj from './demo.js';
    console.log(obj.A, obj.test, obj.Demo);
}

//2
{
    let A = 123;
    function test() {
        console.log('test');
    }
    class Demo {
        test() {
            console.log('demo');
        }
    }
    export default {
        A,
        test,
        Demo
    }
    
    import {A, test, Demo} from './demo.js';
    import {A, test} from './demo.js';
    import {A} from './demo.js';
    console.log(A, test, Demo);
    
    import * as obj from './demo.js';
    console.log(obj.A, obj.test, obj.Demo);
}
~~~



<br/><br/><br/>

---

