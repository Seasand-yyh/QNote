# Oracle开发技巧汇总-列转行函数listagg

---

### 基础用法

~~~sql
LISTAGG(XXX,XXX) WITHIN GROUP(ORDER BY XXX)
~~~

### 示例

~~~sql
WITH temp AS ( 
	SELECT 'China' nation, 'Guangzhou' city FROM dual 
	UNION ALL 
	SELECT 'China' nation, 'Shanghai' city FROM dual 
	UNION ALL 
	SELECT 'China' nation, 'Beijing' city FROM dual 
	UNION ALL 
	SELECT 'USA' nation, 'New York' city FROM dual 
	UNION ALL 
	SELECT 'USA' nation, 'Bostom' city FROM dual 
	UNION ALL 
	SELECT 'Japan' nation, 'Tokyo' city FROM dual 
) 
SELECT nation, listagg(city, ',') within GROUP (ORDER BY city) FROM temp GROUP BY nation;
~~~

注：LISTAGG()函数本身并不提供去重的功能，可以使用嵌套一层子查询的方法实现去重。

### 参考文档

* [Oracle 列转行函数 Listagg()](https://dacoolbaby.iteye.com/blog/1698957)



<br/><br/><br/>

---

