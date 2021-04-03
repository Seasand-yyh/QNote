# Oracle运维技巧汇总-查看表空间使用率

---

Oracle 查看表空间使用率（包括临时表空间）SQL语句：

~~~sql
SELECT * FROM ( 
  SELECT 
    a.tablespace_name, 
    to_char(a.bytes/1024/1024, '99,999.999') total_bytes, 
    to_char(b.bytes/1024/1024, '99,999.999') free_bytes, 
    to_char(a.bytes/1024/1024 - b.bytes/1024/1024, '99,999.999') use_bytes, 
    to_char((1 - b.bytes/a.bytes)*100, '99.99') || '%' use 
  FROM 
    (SELECT tablespace_name, SUM(bytes) bytes FROM dba_data_files GROUP BY tablespace_name) a, 
    (SELECT tablespace_name, SUM(bytes) bytes FROM dba_free_space GROUP BY tablespace_name) b 
    WHERE a.tablespace_name = b.tablespace_name 
  
  UNION ALL 
  
  SELECT 
    c.tablespace_name, 
    to_char(c.bytes/1024/1024, '99,999.999') total_bytes, 
    to_char( (c.bytes-d.bytes_used)/1024/1024, '99,999.999') free_bytes, 
    to_char(d.bytes_used/1024/1024, '99,999.999') use_bytes, 
    to_char(d.bytes_used*100/c.bytes, '99.99') || '%' use 
  FROM 
    (SELECT tablespace_name, SUM(bytes) bytes FROM dba_temp_files GROUP BY tablespace_name) c, 
    (SELECT tablespace_name, SUM(bytes_cached) bytes_used FROM v$temp_extent_pool GROUP BY tablespace_name) d 
    WHERE c.tablespace_name = d.tablespace_name 
) 
~~~



<br/><br/><br/>

---

