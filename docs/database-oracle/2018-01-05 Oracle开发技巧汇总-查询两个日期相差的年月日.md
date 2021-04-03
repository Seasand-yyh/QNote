# Oracle开发技巧汇总-查询两个日期相差的年月日

---

以Oracle的emp表为例，求员工入职到当前历经的年月日。

~~~sql
select 
	ename, 
	hiredate, 
	TRUNC(MONTHS_BETWEEN(SYSDATE, hiredate)/12) year, 
	TRUNC(MOD(MONTHS_BETWEEN(SYSDATE, hiredate),12)) month, 
	TRUNC(SYSDATE - ADD_MONTHS(hiredate, MONTHS_BETWEEN(SYSDATE, hiredate))) day 
from emp;
~~~

注：因为闰年的关系，以天数求年份不可靠；可以先求两个日期相差的月份，再除以12。



<br/><br/><br/>

---

