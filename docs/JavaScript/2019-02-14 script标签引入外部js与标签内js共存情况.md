# script标签引入外部js与标签内js共存情况

---

当`<script>`标签引入外部js的同时，在标签内书写的js代码将不会被执行。如：

index.html

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="main.js">
		console.log('code in script tag')
	</script>
</head>
<body>
	
</body>
</html>
~~~

main.js

~~~javascript
//main.js
var a = 1;
var b = 2;
console.log('a + b = ', a + b);
~~~

执行结果：a + b = 3



---

