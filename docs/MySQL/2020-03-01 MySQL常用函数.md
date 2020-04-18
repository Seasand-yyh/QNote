# MySQL常用函数

---

### 字符串相关函数

1、ASCII(String)

返回字符串第一个字母的ASCII码；

~~~sql
SELECT ASCII('A');
SELECT ASCII('AB');
-- 这两条语句都是输出65！
~~~

2、BIN(long)

返回整数的二进制形式的字符串；

~~~sql
SELECT BIN(15);
-- 输出1111
~~~

3、CHAR(int…)

将每个整型转换成对应的字符；

~~~sql
SELECT CHAR(65,66,67,68,69); -- 输出ABCDE
SELECT CHAR('65','66','67','68','69');
-- 参数为字符串时，会被转换成整型，然后再转换成对应字符。
~~~

4、CHAR_LENGTH(String)

返回字符串的长度！’中国’这个字符串长度为2。’ab’长度为2！不分中英文！

~~~sql
SELECT CHAR_LENGTH('a中b国c'); -- 输出5
~~~

5、CHARACTER_LENGTH(String)

与CHAR_LENGTH()完全相同；

6、CONCAT(String…)

将多个字符串连接成一个字符串；

~~~sql
SELECT CONCAT('My', 'SQL'); -- 输出MySQL
~~~

7、CONCAT_WS(separator, String…)

使用第一个参数字符串，把其他参数字符串连接；

~~~sql
SELECT CONCAT_WS('-', 'A','B','C'); -- 输出A-B-C
~~~

8、CONV(int n, int radix1, int radix2)

把n从radix1进制转换成radix2进制；

~~~sql
SELECT CONV('F', 16, 10);
-- 第一个参数F是一个数值，第二个参数16说明F是16进制数值，第三个参数10说明要把F转换成10进制，所以输出15。
~~~

9、ELT(N, str1, str2, str3…)

N是一个整数，若N为1，则返回str1，若N为2，则返回str2，以此类推；

~~~sql
SELECT ELT(3, 'a', 'b', 'c', 'd', 'e'); -- 输出c
~~~

10、EXPORT_SET(int bits, String on, String off, Strring separator, int length)

bits是一个整数，把bits转换成二进制，其中1用on替换，0用off转换，使用separator来连接每个二进制位，length是指定从左到右显示几位。如果没有指定length，那么会在右边补足到64位。

~~~sql
SELECT EXPORT_SET(13, 'a', 'b', '-', 4);
-- 输出a-b-a-a，因为13的二进制是1011，其中1用a替换，而0用b替换。

SELECT EXPORT_SET(13, 'a', 'b', '-', 3);
-- 输出a-b-a

SELECT EXPORT_SET(13, 'a', 'b', '-', 10);
-- 输出a-b-a-a-b-b-b-b-b-b，因为13只有4位，而length为10，那么会在右边补足到10位，都是用0补，所以才会多出来6个b。
~~~

11、UCASE('hello')：输出HELLO；

12、LCASE('HELLO')：输出hello；

13、LEFT('helloworld',5)：输出hello，输出左边5个字符；

14、LENGTH('helloworld中')：输出13，返回字符串所占字节数。当然，如果client的字符集是gbk，那么就输出12了；

15、STRCMP('zhan', 'zhao')：输出-1，比较两个字符串的大小，如果前者大返回1，后者大返回-1，相等返回0；

16、TRIM('   hello   ')：输出hello，去除左右边空白；

### 流程控制函数

1、CASE value　WHEN v1 THEN expr1 WHEN v2 THEN expr2 …. END

这种CASE WHEN THEN语句与Java中的switch语句基本相同；

~~~sql
SELECT CASE 3
	WHEN 1 THEN 'a'
	WHEN 2 THEN 'b'
	WHEN 3 THEN 'c'
	WHEN 4 THEN 'd'
END;
~~~

2、CASE WHEN condition THEN expr1 WHEN condition THEN expr2 … END

这种CASE WHEN THEN语句与Java中的多分支if/else if比较相似；

~~~sql
SELECT CASE
	WHEN 1>2 THEN '1>2'
	WHEN 1<2 THEN '1<2'
END;
~~~

3、IF(condition, expr1, expr1)

~~~sql
SELECT IF(1 > 0, '1>0', '1<0');
~~~

4、IFNULL(expr1, expr2)

当expr1为NULL时，那么函数返回expr2，否则返回expr1；

~~~sql
SELECT IFNULL(NULL, 'hello');

SELECT
IFNULL('hello', 'world');
~~~

### 时间日期相关函数

1、CURRENT_DATE()：输出当前日期；

2、CURRENT_TIME()：输出当前时间；

3、CURRENT_TIMESTAMP()：输出当前日期和时间，即输出当前时间戳；

4、NOW()：输出当前日期和时间，与CURRENT_TIMESTAMP相同；

### 数学运算相关函数

1、ABS(-100)：输出100，求绝对值；

2、BIN(15)：输出1111，即15的二进制字符串；

3、FORMAT(1.23456, 3)：输出1.235，保留3位小数（四舍五入），如果整数部分大于3位会有逗号出现；

4、HEX(15)：输出F，即出来16进制表示形式；

5、MOD(10, 3)：输出1，即取余运算；

6、RAND()：输出0~1之间的随机小数；



<br/><br/><br/>

---

