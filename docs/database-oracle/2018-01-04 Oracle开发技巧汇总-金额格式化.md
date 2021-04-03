# Oracle开发技巧汇总-金额格式化

---

### 使用to_char()函数进行财务格式化

~~~sql
SELECT to_char(12222.55, 'FM999,999,999,999,999.00') FROM dual;
--12,222.55
~~~

### 金额中文大写格式

~~~sql
SELECT TO_UPPER_NUM(1234567.89) FROM dual;
--壹佰贰拾叁万肆仟伍佰陆拾柒元捌角玖分
~~~



<br/><br/><br/>

---

