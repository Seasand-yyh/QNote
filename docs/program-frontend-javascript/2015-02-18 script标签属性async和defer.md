# script标签属性async和defer

---

### 情况一

index.html

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="main.js"></script>
</head>
<body>
	<h1>Hello HTML</h1>
</body>
</html>
~~~

main.js

~~~javascript
window.alert('hello world!');
~~~

由于HTML从上往下解析执行，所以会先弹框显示`hello world!`，再看到`<h1>`标签的内容。

### 情况二

index.html

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="main.js" async="async"></script>
</head>
<body>
	<h1>Hello HTML</h1>
</body>
</html>
~~~

main.js

~~~javascript
window.alert('hello world!');
~~~

添加上async属性后，main.js中的代码将会异步执行。（弹框和H1标签的显示顺序不确定）

### 情况三

index.html

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="main.js"></script>
</head>
<body>
	<script>alert('start1')</script>
	<h1>Hello HTML1</h1>
	<script>alert('end1')</script>

	<script>alert('start2')</script>
	<h1>Hello HTML2</h1>
	<script>alert('end2')</script>
</body>
</html>
~~~

main.js

~~~javascript
window.alert('hello world!');
~~~

执行结果：

~~~plaintext
弹框显示hello world！
弹框显示start1
弹框显示end1
显示标签Hello HTML1
弹框显示start2
弹框显示end2
显示标签Hello HTML2
~~~

### 情况四

index.html

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="main.js" async="async"></script>
</head>
<body>
	<script>alert('start1')</script>
	<h1>Hello HTML1</h1>
	<script>alert('end1')</script>

	<script>alert('start2')</script>
	<h1>Hello HTML2</h1>
	<script>alert('end2')</script>
</body>
</html>
~~~

main.js

~~~javascript
window.alert('hello world!');
~~~

执行结果：

~~~plaintext
弹框显示start1
弹框显示end1
弹框显示hello world！
显示标签Hello HTML1
弹框显示start2
弹框显示end2
显示标签Hello HTML2
~~~

### 情况五

index.html

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="main.js" defer="defer"></script>
</head>
<body>
	<script>alert('start1')</script>
	<h1>Hello HTML1</h1>
	<script>alert('end1')</script>

	<script>alert('start2')</script>
	<h1>Hello HTML2</h1>
	<script>alert('end2')</script>
</body>
</html>
~~~

main.js

~~~javascript
window.alert('hello world!');
~~~

执行结果：

~~~plaintext
弹框显示start1
弹框显示end1
显示标签Hello HTML1
弹框显示start2
弹框显示end2
显示标签Hello HTML2
弹框显示hello world！
~~~

总结：

* async：立即异步下载外部js，不影响页面其它的操作，js下载完毕立即执行；
* defer：脚本延迟到文档完全被解析和显示后再执行，只有外部脚本可以使用该属性。

即这两个属性都有异步加载js的能力，async是加载完js就立即执行，执行时机不可控，且执行期间页面解析会暂停；defer是在js加载完并且页面完全解析和显示后才执行。



<br/><br/><br/>

---

