# MySQL案例练习笔记

---

### 建表

~~~sql
/*创建部门表*/
CREATE TABLE dept(
	deptno		INT 	PRIMARY KEY,
	dname		VARCHAR(50),
	loc 		VARCHAR(50)
);

/*创建雇员表*/
CREATE TABLE emp(
	empno	 INT 	PRIMARY KEY,
	ename	 VARCHAR(50),
	job		 VARCHAR(50),
	mgr		 INT,
	hiredate DATE,
	sal		 DECIMAL(7,2),
	comm 	 DECIMAL(7,2),
	deptno	 INT,
	CONSTRAINT fk_emp FOREIGN KEY(mgr) REFERENCES emp(empno)
);

/*创建工资等级表*/
CREATE TABLE salgrade(
	grade		INT 	PRIMARY KEY,
	losal		INT,
	hisal		INT
);
~~~

### 插入数据

~~~sql
/*插入dept表数据*/
INSERT INTO dept VALUES (10, '教研部', '北京');
INSERT INTO dept VALUES (20, '学工部', '上海');
INSERT INTO dept VALUES (30, '销售部', '广州');
INSERT INTO dept VALUES (40, '财务部', '武汉');

/*插入emp表数据*/
INSERT INTO emp VALUES (1009, '曾阿牛', '董事长', NULL, '2001-11-17', 50000, NULL, 10);
INSERT INTO emp VALUES (1004, '刘备', '经理', 1009, '2001-04-02', 29750, NULL, 20);
INSERT INTO emp VALUES (1006, '关羽', '经理', 1009, '2001-05-01', 28500, NULL, 30);
INSERT INTO emp VALUES (1007, '张飞', '经理', 1009, '2001-09-01', 24500, NULL, 10);
INSERT INTO emp VALUES (1008, '诸葛亮', '分析师', 1004, '2007-04-19', 30000, NULL, 20);
INSERT INTO emp VALUES (1013, '庞统', '分析师', 1004, '2001-12-03', 30000, NULL, 20);
INSERT INTO emp VALUES (1002, '黛绮丝', '销售员', 1006, '2001-02-20', 16000, 3000, 30);
INSERT INTO emp VALUES (1003, '殷天正', '销售员', 1006, '2001-02-22', 12500, 5000, 30);
INSERT INTO emp VALUES (1005, '谢逊', '销售员', 1006, '2001-09-28', 12500, 14000, 30);
INSERT INTO emp VALUES (1010, '韦一笑', '销售员', 1006, '2001-09-08', 15000, 0, 30);
INSERT INTO emp VALUES (1012, '程普', '文员', 1006, '2001-12-03', 9500, NULL, 30);
INSERT INTO emp VALUES (1014, '黄盖', '文员', 1007, '2002-01-23', 13000, NULL, 10);
INSERT INTO emp VALUES (1011, '周泰', '文员', 1008, '2007-05-23', 11000, NULL, 20);
INSERT INTO emp VALUES (1001, '甘宁', '文员', 1013, '2000-12-17', 8000, NULL, 20);

/*插入salgrade表数据*/
INSERT INTO salgrade VALUES (1, 7000, 12000);
INSERT INTO salgrade VALUES (2, 12010, 14000);
INSERT INTO salgrade VALUES (3, 14010, 20000);
INSERT INTO salgrade VALUES (4, 20010, 30000);
INSERT INTO salgrade VALUES (5, 30010, 99990);
~~~

### 查询

1、查询出部门编号为30的所有员工。

~~~sql
分析：
列：没有说明要查询的列，所以查询所有列
表：只一张表，emp
条件：部门编号为30，即deptno=30

SELECT * FROM emp WHERE deptno=30;
~~~

2、所有销售员的姓名、编号和部门编号。

~~~sql
分析：
列：姓名ename、编号empno、部门编号deptno
表：emp
条件：所有销售员，即job='销售员'

SELECT ename,empno,deptno FROM emp WHERE job='销售员';
~~~

3、找出奖金高于工资的员工。

~~~sql
分析：
列：所有列
表：emp
条件：奖金>工资，即comm>sal

SELECT * FROM emp WHERE comm>sal;
~~~

4、找出奖金高于工资60%的员工。

~~~sql
分析：
列：所有列
表：emp
条件：奖金>工资*0.6，即comm>sal*0.6

SELECT * FROM emp WHERE comm>sal*0.6;
~~~

5、找出部门编号为10中所有经理，和部门编号为20中所有销售员的详细资料。

~~~sql
分析：
列：所有列
表：emp
条件：部门编号=10并且job为经理，和部门编号=20并且job为销售员

SELECT * FROM emp WHERE (deptno=10 AND job='经理') OR (deptno=20 AND job='销售员');
~~~

6、找出部门编号为10中所有经理，部门编号为20中所有销售员，还有即不是经理又不是销售员但其工资大或等于20000的所有员工详细资料。

~~~sql
分析：
列：所有列
表：emp
条件：deptno=10 and job='经理', depnto=20 and job='销售员', job not in ('销售员','经理') and sal>=20000

SELECT * FROM emp 
WHERE 
  (deptno=10 AND job='经理') 
  OR (deptno=20 AND job='销售员') 
  OR job NOT IN ('经理','销售员') AND sal>=20000;
~~~

7、有奖金的工种。

~~~sql
分析：
列：工作(不能重复出现)
表：emp
条件：comm is not null

SELECT DISTINCT job FROM emp WHERE comm IS NOT NULL;
~~~

8、无奖金或奖金低于1000的员工。

~~~sql
分析：
列：所有列
表：emp
条件：comm is null 或者 comm < 1000

SELECT * FROM emp WHERE comm IS NULL OR comm < 1000;
~~~

9、查询名字由三个字组成的员工。

~~~sql
分析：
列：所有
表：emp
条件：ename like '___'

SELECT * FROM emp WHERE ename LIKE '___';
~~~

10、查询2000年入职的员工。

~~~sql
分析：
列：所有
表：emp
条件：hiredate like '2000%'

SELECT * FROM emp WHERE hiredate LIKE '2000%';
~~~

11、查询所有员工详细信息，用编号升序排序。

~~~sql
分析；
列：所有
表：emp
条件：无
排序：empno asc

SELECT * FROM emp ORDER BY empno ASC;
~~~

12、查询所有员工详细信息，用工资降序排序，如果工资相同使用入职日期升序排序。

~~~sql
分析：
列：所有
表：emp
条件：无
排序：sal desc, hiredate asc

SELECT * FROM emp ORDER BY sal DESC, hiredate ASC;
~~~

13、查询每个部门的平均工资。

~~~sql
分析：
列：部门编号、平均工资(平均工资就是分组信息)
表：emp
条件：无
分组：每个部门，即使用部门分组，平均工资，使用avg()函数

SELECT deptno, AVG(sal) FROM emp GROUP BY deptno;
~~~

14、求出每个部门的雇员数量。

~~~sql
分析：
列：部门编号、人员数量（人员数量即记录数，这是分组信息）
表：emp
条件：无
分组：每个部门是分组信息，人员数量，使用count()函数

SELECT deptno, COUNT(1) FROM emp GROUP BY deptno;
~~~

15、查询每种工作的最高工资、最低工资、人数。

~~~sql
分析：
列：部门、最高工资、最低工资、人数（其中最高工资、最低工资、人数，都是分组信息）
表：emp
条件：无
分组：每种工资是分组信息，最高工资使用max(sal)，最低工资使用min(sal)，人数使用count(*)

SELECT job, MAX(sal), MIN(sal), COUNT(1) FROM emp GROUP BY job;
~~~

16、显示非销售人员工作名称以及从事同一工作雇员的月工资的总和，并且要满足从事同一工作的雇员的月工资合计大于50000，输出结果按月工资的合计升序排列。

~~~sql
分析：
列：工作名称、工资和(分组信息)
表：emp
条件：无
分组：从事同一工作的工资和，即使用job分组
分组条件：工资合计>50000，这是分组条件，而不是where条件
排序：工资合计排序，即sum(sal) asc

SELECT job,SUM(sal) FROM emp GROUP BY job HAVING SUM(sal)>50000 ORDER BY SUM(sal) ASC;
~~~

### 子查询

1、查出至少有一个员工的部门，显示部门编号、部门名称、部门位置、部门人数。

~~~sql
分析：
列：部门编号、部门名称、部门位置、部门人数(分组)
列：dept、emp(部门人数没有员工表不行)
条件：没有
分组条件：人数>1

部门编号、部门名称、部门位置在dept表中都有，只有部门人数需要使用emp表，使用deptno来分组得到。我们让dept和（emp的分组查询），这两张表进行连接查询。

SELECT
	z.*, d.dname, d.loc
FROM dept d, (SELECT deptno, COUNT(*) cnt FROM emp GROUP BY deptno) z
WHERE z.deptno=d.deptno;
~~~

2、列出薪金比关羽高的所有员工。

~~~sql
分析：
列：所有
表：emp
条件：sal>关羽的sal，其中关羽的sal需要子查询

SELECT *
FROM emp e
WHERE e.sal > (SELECT sal FROM emp WHERE ename='关羽');
~~~

3、列出所有员工的姓名及其直接上级的姓名。

~~~sql
分析：
列：员工名、领导名
表：emp、emp
条件：领导.empno=员工.mgr

emp表中存在自身关联，即empno和mgr的关系。我们需要让emp和emp表连接查询。因为要求是查询所有员工的姓名，所以不能用内连接，因为曾阿牛是BOSS，没有上级，内连接是查询不到它的。

SELECT e.ename, IFNULL(m.ename, 'BOSS') AS lead
FROM emp e LEFT JOIN emp m
ON e.mgr=m.empno;
~~~

4、列出受雇日期早于直接上级的所有员工的编号、姓名、部门名称。

~~~sql
分析：
列：编号、姓名、部门名称
表：emp、dept
条件：hiredate < 领导.hiredate

emp表需要查。部门名称在dept表中，所以也需要查。领导的hiredate需要查，这说明需要两个emp和一个dept连接查询,即三个表连接查询。

SELECT e.empno, e.ename, d.dname
FROM emp e 
LEFT JOIN emp m ON e.mgr=m.empno 
LEFT JOIN dept d ON e.deptno=d.deptno
WHERE e.hiredate<m.hiredate;
~~~

5、列出部门名称和这些部门的员工信息，同时列出那些没有员工的部门。

~~~sql
分析：
列：员工表所有列、部门名称
表：emp, dept
要求列出没有员工的部门，这说明需要以部门表为主表使用外连接

SELECT e.*, d.dname
FROM emp e RIGHT JOIN dept d
ON e.deptno=d.deptno;
~~~

6、列出所有文员的姓名及其部门名称，部门的人数。

~~~sql
分析：
列：姓名、部门名称、部门人数
表：emp emp dept
条件：job=文员
分组：emp以deptno得到部门人数
连接：emp连接emp分组，再连接dept

SELECT e.ename, d.dname, z.cnt
FROM emp e, (SELECT deptno, COUNT(*) cnt FROM emp GROUP BY deptno) z, dept d
WHERE e.deptno=d.deptno AND z.deptno=d.deptno;
~~~

7、列出最低薪金大于15000的各种工作及从事此工作的员工人数。

~~~sql
分析：
列：工作，该工作人数
表：emp
分组：使用job分组
分组条件：min(sal)>15000

SELECT job, COUNT(*)
FROM emp e
GROUP BY job
HAVING MIN(sal) > 15000;
~~~

8、列出在销售部工作的员工的姓名，假定不知道销售部的部门编号。

~~~sql
分析：
列：姓名
表：emp, dept
条件：所在部门名称为销售部，这需要通过部门名称查询为部门编号，作为条件

SELECT e.ename
FROM emp e
WHERE e.deptno = (SELECT deptno FROM dept WHERE dname='销售部');
~~~

9、列出薪金高于公司平均薪金的所有员工信息，所在部门名称，上级领导，工资等级。

~~~sql
分析：
列：员工所有信息(员工表)，部门名称(部门表)，上级领导(员工表)，工资等级(等级表)
表：emp, dept, emp, salgrade
条件：sal>平均工资，子查询
所有员工，说明需要左外

SELECT e.*, d.dname, m.ename, s.grade
FROM emp e 
NATURAL LEFT JOIN dept d
LEFT JOIN emp m ON m.empno=e.mgr
LEFT JOIN salgrade s ON e.sal BETWEEN s.losal AND s.hisal
WHERE e.sal > (SELECT AVG(sal) FROM emp);
~~~

10、列出与庞统从事相同工作的所有员工及部门名称。

~~~sql
分析：
列：员工表所有列，部门表名称
表：emp, dept
条件：job=庞统的工作，需要子查询，与部门表连接得到部门名称

SELECT e.*, d.dname
FROM emp e, dept d
WHERE e.deptno=d.deptno AND e.job=(SELECT job FROM emp WHERE ename='庞统');
~~~

11、列出薪金高于在部门30工作的所有员工的薪金的员工姓名和薪金、部门名称。

~~~sql
分析：
列：姓名、薪金、部门名称(需要连接查询)
表：emp, dept
条件：sal > all(30部门薪金)，需要子查询

SELECT e.ename, e.sal, d.dname
FROM emp e, dept d
WHERE e.deptno=d.deptno AND sal > ALL(SELECT sal FROM emp WHERE deptno=30);
~~~

12、列出在每个部门工作的员工数量、平均工资。

~~~sql
分析：
列：部门名称, 部门员工数，部门平均工资
表：emp, dept
分组：deptno

SELECT d.dname, e.cnt, e.avgsal
FROM (SELECT deptno, COUNT(*) cnt, AVG(sal) avgsal FROM emp GROUP BY deptno) e, dept d
WHERE e.deptno=d.deptno;
~~~

13、查出年份、利润、年度增长比。

~~~sql
CREATE TABLE income(
	year	 INT 	PRIMARY KEY,
	money 	 DECIMAL(7,2)
);

insert into income values(2010, 111.22);
insert into income values(2011, 222.54);
insert into income values(2012, 333.72);
insert into income values(2013, 444.91);
insert into income values(2014, 555.48);

select 
	t1.year, t1.money, (t1.money-t2.money)/t2.money
from income t1 left join income t2 on t1.year = t2.year+1;
~~~



<br/><br/><br/>

---

