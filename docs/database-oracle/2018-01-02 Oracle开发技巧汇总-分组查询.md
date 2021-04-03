# Oracle开发技巧汇总-分组查询

---

### 显示组号

~~~sql
WITH temp AS ( 
	SELECT '2013-10-1' TIME, 'aa' NAME FROM dual 
	UNION ALL 
	SELECT '2013-10-1' TIME, 'bb' NAME FROM dual 
	UNION ALL 
	SELECT '2013-10-1' TIME, 'cc' NAME FROM dual 
	UNION ALL 
	SELECT '2013-10-15' TIME, 'dd' NAME FROM dual 
	UNION ALL 
	SELECT '2013-10-15' TIME, 'ee' NAME FROM dual 
	UNION ALL 
	SELECT '2013-10-20' TIME, 'ff' NAME FROM dual 
) 
SELECT DENSE_RANK() over(ORDER BY time) AS group_no, TIME, NAME FROM temp; 
~~~

### 分组取每组最值

1、基于子查询：

~~~sql
WITH temp AS ( 
	SELECT 1 NO, 'A' NAME, 20 score FROM dual 
	UNION ALL 
	SELECT 2 NO, 'A' NAME, 10 score FROM dual 
	UNION ALL 
	SELECT 1 NO, 'B' NAME, 20 score FROM dual 
	UNION ALL 
	SELECT 2 NO, 'B' NAME, 40 score FROM dual 
	UNION ALL 
	SELECT 3 NO, 'B' NAME, 10 score FROM dual 
	UNION ALL 
	SELECT 1 NO, 'C' NAME, 20 score FROM dual 
	UNION ALL 
	SELECT 2 NO, 'C' NAME, 40 score FROM dual 
) 
SELECT * FROM temp WHERE (NAME, score) IN(SELECT NAME, max(score) FROM temp GROUP BY NAME); 
~~~

2、基于分组函数：

~~~sql
WITH temp AS ( 
	SELECT 1 NO, 'A' NAME, 20 score FROM dual 
	UNION ALL 
	SELECT 2 NO, 'A' NAME, 10 score FROM dual 
	UNION ALL 
	SELECT 1 NO, 'B' NAME, 20 score FROM dual 
	UNION ALL 
	SELECT 2 NO, 'B' NAME, 40 score FROM dual 
	UNION ALL 
	SELECT 3 NO, 'B' NAME, 10 score FROM dual 
	UNION ALL 
	SELECT 1 NO, 'C' NAME, 20 score FROM dual 
	UNION ALL 
	SELECT 2 NO, 'C' NAME, 40 score FROM dual 
) 
SELECT NO, NAME, score FROM (SELECT NO, NAME, score, row_number() over(PARTITION BY NAME ORDER BY score DESC) rn FROM temp) WHERE rn=1; 
~~~

或：

~~~sql
WITH temp AS ( 
	SELECT 1 NO, 'A' NAME, 20 score FROM dual 
	UNION ALL 
	SELECT 2 NO, 'A' NAME, 10 score FROM dual 
	UNION ALL 
	SELECT 1 NO, 'B' NAME, 20 score FROM dual 
	UNION ALL 
	SELECT 2 NO, 'B' NAME, 40 score FROM dual 
	UNION ALL 
	SELECT 3 NO, 'B' NAME, 10 score FROM dual 
	UNION ALL 
	SELECT 1 NO, 'C' NAME, 20 score FROM dual 
	UNION ALL 
	SELECT 2 NO, 'C' NAME, 40 score FROM dual 
) 
SELECT NO, NAME, score FROM (SELECT NO, NAME, score, max(score) over(PARTITION BY NAME) rn FROM temp) WHERE rn=score; 
~~~

注：max的字段只能是`number`类型字段，如果是`date`类型的，会提示错误。`date`类型用上面的`row_number()`来做就可以了。



<br/><br/><br/>

---

