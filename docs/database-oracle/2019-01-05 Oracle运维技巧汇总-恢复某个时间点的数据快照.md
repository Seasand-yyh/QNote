# Oracle运维技巧汇总-恢复某个时间点的数据快照

---

通过 Oracle 的热备还原到指定的某一个时间点：

~~~sql
select * from [表名] as of timestamp to_timestamp('2019-05-13 15:35:22', 'yyyy-mm-dd hh24:mi:ss');
~~~

* as of：截至，就是到某一个事件。
* to_timestamp()：时间转换函数，转换更加精确，和to_date()作用一样。
* AS OF TIMESTAMP查询这个表到某一时刻。

但是在某些情况下，我们建议使用AS OF SCN的方式执行Flashback Query。如需要对多个相互有主外键约束的表进行恢复时，如果使用AS OF TIMESTAMP的方式，可能会由于时间点不统一的缘故造成数据选择或插入失败，通过AS OF SCN方式则能够确保记录处理的时间点一致。



<br/><br/><br/>

---

