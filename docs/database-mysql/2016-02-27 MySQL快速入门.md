# MySQL快速入门

---

### 概述

1、什么是DBMS：数据的仓库

* 方便查询
* 可存储的数据量大
* 保证数据的完整、一致
* 安全可靠

2、DBMS的发展：今天主流数据库为关系型数据库管理系统（RDBMS 使用表格存储数据）。

* 常见DBMS：Orcale、MySQL、SQL Server、DB2、Sybase
* DBMS = 管理程序 + 多个数据库(DB)
* DB = 多个table(不只是table，但这里先不介绍其他组成部分)
* table的结构(即表结构)和table的记录(即表记录)的区别！
* 应用程序与DBMS：应用程序使得DBMS来存储数据！

### 安装MySQL

1、MySQL安装成功后会在两个目录中存储文件

* D:\Program Files\MySQL\MySQL Server 5.1：DBMS管理程序；
* C:\ProgramData\MySQL\MySQL Server 5.1\data：DBMS数据库文件(卸载MySQL时不会删除这个目录，需要自己手动删除)；

2、MySQL重要文件

* D:\Program Files\MySQL\MySQL Server 5.1\bin\mysql.exe：客户端程序，用来操作服务器。但必须保证服务器已开启才能连接上！
* D:\Program Files\MySQL\MySQL Server 5.1\bin\mysqld.exe：服务器程序，必须先启动它，客户端才能连接上服务器；
* D:\Program Files\MySQL\MySQL Server 5.1\bin\my.ini：服务器配置文件；

3、C:\ProgramData\MySQL\MySQL Server 5.1\data

* 该目录下的每个目录表示一个数据库，例如该目录下有一个mysql目录，那么说明你的DBMS中有一个名为mysql的database。
* 在某个数据库目录下会有0~N个扩展名为frm的文件，每个frm文件表示一个table。你不要用文本编辑器打开它，它是由DBMS来读写的！

4、my.ini，MySQL最为重要的配置文件

* 配置MySQL的端口：默认为3306，没有必要去修改它；
* 配置字符编码： [client]下配置客户端编码：default-character-set=gbk；[mysqld]下配置服务器编码：character-set-server=utf8；
* 配置二进制数据大小上限：在[mysqld]下配置：max_allowed_packet=8M；

C:\ProgramData\MySQL\MySQL Server 5.5\data目录下：有一个目录就有一个数据库！每个数据库目录下，有一个frm文件，就说明有一张表！

### 服务器和客户端操作

1、服务器操作

* 开启服务器(必须保证mysql为windows服务)：net start mysql
* 查看进程表中是否存在：mysqld.exe进程(存在)
* 关闭服务器(必须保证mysql为windows服务)：net stop mysql
* 查看进程表中是否存在：mysqld.exe进程(不存在)

2、客户登操作（cmd）

1）登录服务器：mysql -uroot -p123 -hlocalhost

* -u：后面跟随用户名
* -p：后面跟随密码
* -h：后面跟随IP

2）退出服务器：exit或quit

### SQL概述

1、什么是SQL：结构化查询语言(Structured Query Language)。

2、SQL的作用：客户端使用SQL来操作服务器。

* 启动mysql.exe，连接服务器后，就可以使用sql来操作服务器了。
* 将来会使用Java程序连接服务器，然后使用sql来操作服务器。

3、SQL标准(例如SQL99，即1999年制定的标准)：

* 由国际标准化组织(ISO)制定的，对DBMS的统一操作方式(例如相同的语句可以操作：mysql、oracle等)。

4、SQL方言

* 某种DBMS不只会支持SQL标准，而且还会有一些自己独有的语法，这就称之为方言！例如limit语句只在MySQL中可以使用。

5、SQL语法

* SQL语句可以在单行或多行书写，以分号结尾
* 可使用空格和缩进来增强语句的可读性
* MySQL不区别大小写，建议使用大写

6、SQL语句分类

* DDL（Data Definition Language）：数据定义语言，用来定义数据库对象：库、表、列等；创建、删除、修改：库、表结构！
* DML（Data Manipulation Language）：数据操作语言，用来定义数据库记录（数据）；增、删、改：表记录。
* DCL（Data Control Language）：数据控制语言，用来定义访问权限和安全级别。
* DQL（Data Query Language）：数据查询语言，用来查询记录（数据）。

7、注意

* ddl：数据库或表的结构操作
* dml：对表的记录进行更新（增、删、改）
* dql：对表的记录的查询
* dcl：对用户的创建，及授权！

### DDL

1、数据库

* 查看所有数据库：SHOW DATABASES
* 切换（选择要操作的）数据库：USE 数据库名
* 创建数据库：CREATE DATABASE [IF NOT EXISTS] mydb1 [CHARSET=utf8]
* 删除数据库：DROP DATABASE [IF EXISTS] mydb1
* 修改数据库编码：ALTER DATABASE mydb1 CHARACTER SET utf8

2、数据类型(列类型)

* int：整型
* double：浮点型，例如double(5,2)表示最多5位，其中必须有2位小数，即最大值为999.99；
* decimal：浮点型，在表单钱方面使用该类型，因为不会出现精度缺失问题；
* char：固定长度字符串类型； char(255)，数据的长度不足指定长度，补足到指定长度！
* varchar：可变长度字符串类型； varchar(65535), zhangSan
* text(clob)：字符串类型；
* blob：字节类型；
* date：日期类型，格式为：yyyy-MM-dd；
* time：时间类型，格式为：hh:mm:ss
* timestamp：时间戳类型；

3、表

* 创建表：CREATE TABLE [IF NOT EXISTS] 表名(列名 列类型,列名 列类型,...列名 列类型);
* 查看当前数据库中所有表名称：SHOW TABLES;
* 查看指定表的创建语句：SHOW CREATE TABLE 表名;
* 查看表结构：DESC 表名;
* 删除表：DROP TABLE 表名;
* 修改表：前缀：ALTER TABLE 表名
* 修改之添加列：ALTER TABLE 表名 ADD (列名 列类型,列名 列类型,...);
* 修改之修改列类型(如果被修改的列已存在数据，那么新的类型可能会影响到已存在数据)：ALTER TABLE 表名 MODIFY 列名 列类型;
* 修改之修改列名：ALTER TABLE 表名 CHANGE 原列名 新列名 列类型;
* 修改之删除列：ALTER TABLE 表名 DROP 列名;
* 修改表名称：ALTER TABLE 原表名 RENAME TO 新表名;

### DML

数据操作语言，它是对表记录的操作(增、删、改)！

1、插入数据

1）INTERT INTO 表名(列名1,列名2, ...) VALUES(列值1, 列值2, ...);

* 在表名后给出要插入的列名，其他没有指定的列等同与插入null值。所以插入记录总是插入一行，不可能是半行。
* 在VALUES后给出列值，值的顺序和个数必须与前面指定的列对应

2）INTERT INTO 表名 VALUES(列值1, 列值2);

* 没有给出要插入的列，那么表示插入所有列。
* 值的个数必须是该表列的个数。
* 值的顺序，必须与表创建时给出的列的顺序相同。

2、修改数据

* UPDATE 表名 SET 列名1=列值1, 列名2=列值2, ... [WHERE 条件]
* 条件(条件可选的)：
* 条件必须是一个boolean类型的值或表达式：UPDATE t_person SET gender='男', age=age+1 WHERE sid='1';
* 运算符：=、!=、<>、>、<、>=、<=、BETWEEN...AND、IN(...)、IS NULL、NOT、OR、AND

3、删除数据

* DELETE FROM 表名 [WHERE 条件];
* TRUNCATE TABLE 表名：TRUNCATE是DDL语句，它是先删除drop该表，再create该表。而且无法回滚！！！

> 在数据库中所有的字符串类型，必须使用单引，不能使用双引！日期类型也要使用单引！

### DCL

一个项目创建一个用户！一个项目对应的数据库只有一个！ 这个用户只能对这个数据库有权限，其他数据库你就操作不了了！

1、创建用户

* CREATE USER 用户名@IP地址 IDENTIFIED BY '密码';用户只能在指定的IP地址上登录。
* CREATE USER 用户名@'%' IDENTIFIED BY '密码';用户可以在任意IP地址上登录。

2、给用户授权

1）GRANT 权限1, … , 权限n ON 数据库.* TO 用户名@IP地址

~~~sql
-- 给user1用户分派在mydb1数据库上的create、alter、drop、insert、update、delete、select权限
GRANT CREATE,ALTER,DROP,INSERT,UPDATE,DELETE,SELECT ON mydb1.* TO user1@localhost;
~~~

2）给用户分派指定数据库上的所有权限：GRANT ALL ON 数据库.* TO 用户名@IP地址;

3、撤销授权

撤消指定用户在指定数据库上的指定权限：REVOKE 权限1, … , 权限n ON 数据库.* FROM 用户名@IP地址;

~~~sql
-- 撤消user1用户在mydb1数据库上的create、alter、drop权限
REVOKE CREATE,ALTER,DROP ON mydb1.* FROM user1@localhost;
~~~

4、查看权限

查看指定用户的权限：SHOW GRANTS FOR 用户名@IP地址

5、删除用户

DROP USER 用户名@IP地址

### DQL

数据查询语言：查询不会修改数据库表记录！

一、 基本查询

1、字段(列)控制

1） 查询所有列

~~~sql
SELECT * FROM 表名;
SELECT * FROM emp;
-- 其中“*”表示查询所有列
~~~

2）查询指定列

~~~sql
SELECT 列1 [, 列2, ... 列N] FROM 表名;
SELECT empno, ename, sal, comm FROM 表名;
~~~

3）完全重复的记录只一次

当查询结果中的多行记录一模一样时，只显示一行。一般查询所有列时很少会有这种情况，但只查询一列（或几列）时，这总可能就大了！

~~~sql
SELECT DISTINCT * | 列1 [, 列2, ... 列N] FROM 表名;
SELECT DISTINCT sal FROM emp;
-- 保查询员工表的工资，如果存在相同的工资只显示一次！
~~~

4）列运算

~~~sql
1、数量类型的列可以做加、减、乘、除运算
SELECT sal*1.5 FROM emp;
SELECT sal+comm FROM emp;

2、字符串类型可以做连接运算
SELECT CONCAT('$', sal) FROM emp;

3、转换NULL值
有时需要把NULL转换成其它值，例如com+1000时，如果com列存在NULL值，那么NULL+1000还是NULL，而我们这时希望把NULL当前0来运算。
SELECT IFNULL(comm, 0)+1000 FROM emp;
-- IFNULL(comm, 0)：如果comm中存在NULL值，那么当成0来运算。

4、给列起别名
你也许已经注意到了，当使用列运算后，查询出的结果集中的列名称很不好看，这时我们需要给列名起个别名，这样在结果集中列名就显示别名了
SELECT IFNULL(comm, 0)+1000 AS 奖金 FROM emp;
-- 其中AS可以省略
~~~

2、条件控制

1）条件查询

与前面介绍的UPDATE和DELETE语句一样，SELECT语句也可以使用WHERE子句来控制记录。

~~~sql
SELECT empno,ename,sal,comm FROM emp WHERE sal > 10000 AND comm IS NOT NULL;
SELECT empno,ename,sal FROM emp WHERE sal BETWEEN 20000 AND 30000;
SELECT empno,ename,job FROM emp WHERE job IN ('经理', '董事长');
~~~

2) 模糊查询

当你想查询姓张，并且姓名一共两个字的员工时，这时就可以使用模糊查询

~~~sql
-- 模糊查询需要使用运算符：LIKE，其中_匹配一个任意字符。注意，只匹配一个字符而不是多个。下面语句查询的是姓张，名字由两个字组成的员工。
SELECT * FROM emp WHERE ename LIKE '张_';

-- 姓名由3个字组成的员工。
SELECT * FROM emp WHERE ename LIKE '___';

-- 如果我们想查询姓张，名字几个字可以的员工时就要使用“%”了。其中%匹配0~N个任意字符，所以下面语句查询的是姓张的所有员工。
SELECT * FROM emp WHERE ename LIKE '张%';

-- 千万不要认为下面语句是在查询姓名中间带有阿字的员工，因为%匹配0~N个字符，所以姓名以阿开头和结尾的员工也都会查询到。
SELECT * FROM emp WHERE ename LIKE '%阿%';

-- 这个条件等同与不存在，但如果姓名为NULL的查询不出来！
SELECT * FROM emp WHERE ename LIKE '%';
~~~

二、排序

1、升序

~~~sql
-- 按sal排序，升序！其中ASC是可以省略的。
SELECT * FROM WHERE emp ORDER BY sal ASC;
~~~

2、降序

~~~sql
-- 按comm排序，降序！其中DESC不能省略。
SELECT * FROM WHERE emp ORDER BY comm DESC;
~~~

3、使用多列作为排序条件

~~~sql
-- 使用sal升序排，如果sal相同时，使用comm的降序排。
SELECT * FROM WHERE emp ORDER BY sal ASC, comm DESC;
~~~

三、聚合函数

聚合函数用来做某列的纵向运算。

1、COUNT

~~~sql
-- 计算emp表中所有列都不为NULL的记录的行数
SELECT COUNT(*) FROM emp;

-- 计算emp表中comm列不为NULL的记录的行数
SELECT COUNT(comm) FROM emp;
~~~

2、MAX

~~~sql
-- 查询最高工资
SELECT MAX(sal) FROM emp;
~~~

3、MIN

~~~sql
-- 查询最低工资
SELECT MIN(sal) FROM emp;
~~~

4、SUM

~~~sql
-- 查询工资合计
SELECT SUM(sal) FROM emp;
~~~

5、AVG

~~~sql
-- 查询平均工资
SELECT AVG(sal) FROM emp;
~~~

四、分组查询

分组查询是把记录使用某一列进行分组，然后查询组信息。

~~~sql
-- 使用deptno分组，查询部门编号和每个部门的记录数
SELECT deptno, COUNT(*) FROM emp GROUP BY deptno;

-- 使用job分组，查询每种工作的最高工资
SELECT job, MAX(SAL) FROM emp GROUP BY job;
~~~

组条件：having

~~~sql
-- 以部门分组，查询每组记录数。条件为记录数大于3
SELECT deptno, COUNT(*) FROM emp GROUP BY deptno HAVING COUNT(*) > 3;
~~~

五、limit子句(方言)

LIMIT用来限定查询结果的起始行，以及总行数。

~~~sql
-- 其中4表示从第5行开始，其中3表示一共查询3行。即第5、6、7行记录。
SELECT * FROM emp LIMIT 4, 3;

select * from emp limit 0, 5;

-- 一页的记录数：10行，查询第3页
select * from emp limit 20, 10;
~~~

### 约束

约束是添加在列上的，用来约束列的！

1、主键约束（非空、唯一）

* 当表的某一列被指定为主键后，该列就不能为空，不能有重复值出现。
* 创建表时指定主键的两种方式：

~~~sql
CREATE TABLE stu(
	sid	    CHAR(6) PRIMARY KEY,
	sname	VARCHAR(20),
	age		INT,
	gender	VARCHAR(10) 
);

CREATE TABLE stu(
	sid	    CHAR(6),
	sname	VARCHAR(20),
	age		INT,
	gender	VARCHAR(10),
	PRIMARY KEY(sid)
);
~~~

* 修改表时指定主键：ALTER TABLE stu ADD PRIMARY KEY(sid);
* 删除主键：ALTER TABLE stu DROP PRIMARY KEY;

2、主键自增长

* 因为主键列的特性是：必须唯一、不能为空，所以我们通常会指定主键类为整型，然后设置其自动增长，这样可以保证在插入数据时主键列的唯一和非空特性。
* 创建表时指定主键自增长：

~~~sql
CREATE TABLE stu(
	sid INT PRIMARY KEY AUTO_INCREMENT,
	sname	VARCHAR(20),
	age		INT,
	gender	VARCHAR(10)
);
~~~

* 修改表时设置主键自增长：ALTER TABLE stu CHANGE sid sid INT AUTO_INCREMENT;
* 修改表时删除主键自增长：ALTER TABLE stu CHANGE sid sid INT;
* 测试主键自增长：

3、非空约束

因为某些列不能设置为NULL值，所以可以对列添加非空约束。

~~~sql
CREATE TABLE stu(
	sid INT PRIMARY KEY AUTO_INCREMENT,
	sname	VARCHAR(20) NOT NULL,
	age		INT,
	gender	VARCHAR(10)
);
-- 对sname列设置了非空约束
~~~

4、唯一约束

数据库某些列不能设置重复的值，所以可以对列添加唯一约束。

~~~sql
CREATE TABLE stu(
	sid INT PRIMARY KEY AUTO_INCREMENT,
	sname	VARCHAR(20) NOT NULL UNIQUE,
	age		INT,
	gender	VARCHAR(10)
);
-- 对sname列设置了非空约束
~~~

5、概念模型

* 对象模型：可以双向关联，而且引用的是对象，而不是一个主键！
* 关系模型：只能多方引用一方，而且引用的只是主键，而不是一整行记录。

关系模型：

当我们要完成一个软件系统时，需要把系统中的实体抽取出来，形成概念模型。例如部门、员工都是系统中的实体。概念模型中的实体最终会成为Java中的类、数据库中表。实体之间还存在着关系，关系有三种：

* 1对多：例如每个员工都从属一个部门，而一个部门可以有多个员工，其中员工是多方，而部门是一方。
* 1对1：例如老公和老婆就是一对一的关系，一个老公只能有一个老婆，而一个老婆只能有一个老公。
* 多对多：老师与学生的关系就是多对多，一个老师可以有多个学生，一个学生可以有多个老师。

6、外键约束

* 外键必须是另一表的主键的值(外键要引用主键！)
* 外键可以重复
* 外键可以为空
* 一张表中可以有多个外键！

语法：CONSTRAINT 约束名称 FOREIGN KEY(外键列名) REFERENCES 关联表(关联表的主键) 

1）创建表时指定外键约束：

~~~sql
create talbe emp (
    empno int primary key,
    ...
    deptno int,
    CONSTRAINT fk_emp FOREIGN KEY(mgr) REFERENCES emp(empno)  
);
~~~

2）修改表时添加外键约束：

~~~sql
ALERT TABLE emp ADD CONSTRAINT fk_emp_deptno FOREIGN KEY(deptno) REFERENCES dept(deptno);
~~~

3）修改表时删除外键约束：

~~~sql
ALTER TABLE emp DROP FOREIGN KEY fk_emp_deptno;/*约束名称*/
~~~

7、数据库一对一关系

在表中建立一对一关系比较特殊，需要让其中一张表的主键，即是主键又是外键。

~~~sql
create table husband(
    hid int PRIMARY KEY,
    ...
);
create table wife(
    wid int PRIMARY KEY,
    ...
    ADD CONSTRAINT fk_wife_wid FOREIGN KEY(wid) REFERENCES husband(hid)
);
~~~

其中wife表的wid即是主键，又是相对husband表的外键！husband.hid是主键，不能重复！wife.wid是主键，不能重复，又是外键，必须来自husband.hid。所以如果在wife表中有一条记录的wid为1，那么wife表中的其他记录的wid就不能再是1了，因为它是主键。同时在husband.hid中必须存在1这个值，因为wid是外键。这就完成了一对一关系。

从表的主键即是外键！

8、数据库多对多关系

在表中建立多对多关系需要使用中间表，即需要三张表，在中间表中使用两个外键，分别引用其他两个表的主键。

~~~sql
create table student(
    sid int PRIMARY KEY,
    ...
);

create table teacher(
    tid int PRIMARY KEY,
    ...
);

create table stu_tea(
    sid int,
    tid int,
    ADD CONSTRAINT fk_stu_tea_sid FOREIGN KEY(sid) REFERENCES student(sid),
    ADD CONSTRAINT fk_stu_tea_tid FOREIGN KEY(tid) REFERENCES teacher(tid)
);
~~~

这时在stu_tea这个中间表中的每条记录都是来说明student和teacher表的关系。例如在stu_tea表中的记录：sid为1001，tid为2001，这说明编号为1001的学生有一个编号为2001的老师。

### 编码

1、查看MySQL数据库编码

~~~sql
SHOW VARIABLES LIKE 'char%';
~~~

2、编码解释

* character_set_client：MySQL使用该编码来解读客户端发送过来的数据，例如该编码为UTF8，那么如果客户端发送过来的数据不是UTF8，那么就会出现乱码；
* character_set_results：MySQL会把数据转换成该编码后，再发送给客户端，例如该编码为UTF8，那么如果客户端不使用UTF8来解读，那么就会出现乱码；
* 其它编码只要支持中文即可，也就是说不能使用latin1；

3、控制台乱码问题

1）插入或修改时出现乱码：

* 这时因为cmd下默认使用GBK，而character_set_client不是GBK的原因。我们只需让这两个编码相同即可。
* 因为修改cmd的编码不方便，所以我们去设置character_set_client为GBK即可。

2）查询出的数据为乱码：

* 这是因为character_set_results不是GBK，而cmd默认使用GBK的原因。我们只需让这两个编码相同即可。
* 因为修改cmd的编码不方便，所以我们去设置character_set_results为GBK即可。

3）设置变量的语句：

* set character_set_client=gbk;
* set character_set_results=gbk;
  

注意，设置变量只对当前连接有效，当退出窗口后，再次登录mysql，还需要再次设置变量。为了一劳永逸，可以在my.ini中设置：设置default-character-set=gbk即可。
　
4、指定默认编码

我们在安装MySQL时已经指定了默认编码为UTF8，所以我们在创建数据库、创建表时，都无需再次指定编码。为了一劳永逸，可以在my.ini中设置：设置character-set-server=utf8即可。

~~~plaintext
character_set_client     | utf8 --> mysql把我们客户端传递的数据都当成是utf8！一是给它传递utf8，二是如果我们传递的是gbk，那么需要修改这个变量为gbk；
character_set_connection | utf8
character_set_database   | utf8
character_set_results    | utf8 --> mysql发送给客户端的数据都是utf8的。一是客户端用utf8编码，二是如果客户端使用gbk来编码，那么需要修改这个变量为gbk的；
character_set_server     | utf8
character_set_system     | utf8
~~~

1）character_set_client=utf8，无论客户端发送的是什么编码的数据，mysql都当成是utf8的数据！

* 若客户端发送的是GBK
* 服务器会当成utf8对待
* 总结：必然乱码！

处理问题的手段有两种；

* 让客户端发送utf8的数据(行不通)
* 把character_set_client修改为gbk
* set character_set_client=gbk; --> 只在当前窗口内有效，也就是说，关闭窗口后，再打开，又回到utf8了。

2）character_set_results=utf8，把数据用什么编码发送给客户端！

* 若服务器发送给客户端的是utf8的数据
* 客户端会把它当成gbk，因为我们的小黑屏，只能显示gbk
* 总结：必然乱码！

处理问题的手段有两种：

* 让服务器发送gbk的数据：set character_set_results=gbk
* 让小黑屏使用utf8来解读（行不通）

3）my.ini：在总配置文件中进行配置，可以一劳永逸

~~~plaintext
[client]
port=3306

[mysql]
default-character-set=gbk /*它可以一劳永逸！它可以修改三个变量：client、results、connection*/
~~~

### 备份与恢复

1、数据库导出SQL脚本(备份数据库内容，并不是备份数据库！)

* mysqldump –u用户名 –p密码 数据库名>生成的脚本文件路径
* 例如：mysqldump -uroot -p123 mydb1>C:\mydb1.sql  (与mysql.exe和mysqld.exe一样, 都在bin目录下)
* 注意，不要打分号，不要登录mysql，直接在cmd下运行
* 注意，生成的脚本文件中不包含create database语句

2、执行SQL脚本

1）第一种方式

* mysql -u用户名 -p密码 数据库<脚本文件路径
* 例如：先删除mydb1库，再重新创建mydb1库；mysql -uroot -p123 mydb1<C:\mydb1.sql
* 注意，不要打分号，不要登录mysql，直接在cmd下运行

2）第二种方式

* 登录mysql
* source SQL脚本路径
* 例如：先删除mydb1库，再重新创建mydb1库；切换到mydb1库；source c:\mydb1.sql

3、示例

~~~sql
-- 备份
mysqldump -uroot -p123 mydb3>c:/a.sql

-- 恢复
mysql -uroot -p123 mydb3<c:/a.sql

-- 恢复
mysql -uroot -p123
use mydb3;
source c:/a.sql;
~~~

### 多表查询

1、合并结果集

* 要求被合并的表中，列的类型和列数相同
* UNION，去除重复行
* UNION ALL，不去除重复行

~~~sql
SELECT * FROM cd
UNION ALL
SELECT * FROM ab;
~~~

2、连接查询

1）内连接

* 方言：SELECT * FROM 表1 别名1, 表2 别名2 WHERE 别名1.xx=别名2.xx
* 标准：SELECT * FROM 表1 别名1 INNER JOIN 表2 别名2 ON 别名1.xx=别名2.xx
* 自然：SELECT * FROM 表1 别名1 NATURAL JOIN 表2 别名2
* 内连接查询出的所有记录都满足条件。

2）外连接

* 左外：SELECT * FROM 表1 别名1 LEFT OUTER JOIN 表2 别名2 ON 别名1.xx=别名2.xx；左表记录无论是否满足条件都会查询出来，而右表只有满足条件才能出来。左表中不满足条件的记录，右表部分都为NULL。
* 左外自然：SELECT * FROM 表1 别名1 NATURAL LEFT OUTER JOIN 表2 别名2 ON 别名1.xx=别名2.xx。
* 右外：SELECT * FROM 表1 别名1 RIGHT OUTER JOIN 表2 别名2 ON 别名1.xx=别名2.xx；右表记录无论是否满足条件都会查询出来，而左表只有满足条件才能出来。右表不满足条件的记录，其左表部分都为NULL。
* 右外自然：SELECT * FROM 表1 别名1 NATURAL RIGHT OUTER JOIN 表2 别名2 ON 别名1.xx=别名2.xx。
* 全连接：可以使用UNION来完成全链接。

3、子查询

1）出现的位置：

* where后作为条件存在
* from后作为表存在(多行多列)

2）条件

* 单行单列：SELECT * FROM 表1 别名1 WHERE 列1 [=、>、<、>=、<=、!=] (SELECT 列 FROM 表2 别名2 WHERE 条件)；
* 多行单列：SELECT * FROM 表1 别名1 WHERE 列1 [IN, ALL, ANY] (SELECT 列 FROM 表2 别名2 WHERE 条件)；
* 单行多列：SELECT * FROM 表1 别名1 WHERE (列1,列2) IN (SELECT 列1, 列2 FROM 表2 别名2 WHERE 条件)；
* 多行多列：SELECT * FROM 表1 别名1 , (SELECT ....) 别名2 WHERE 条件；



<br/><br/><br/>

---

