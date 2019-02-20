# JavaScript函数不存在重载

---



~~~javascript
function f1(a, b){
    console.log(a+b);
}

function f1(a, b, c){
    console.log(a+b+c);
}

f1(1, 2); //NaN
~~~

带3个参数的f1会覆盖掉2个参数的f1，所以调用f1函数会执行a+b+c，即1+2+undefined，所以为NaN。



---

