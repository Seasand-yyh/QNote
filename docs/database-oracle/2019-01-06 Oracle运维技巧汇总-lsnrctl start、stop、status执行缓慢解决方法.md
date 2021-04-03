# Oracle运维技巧汇总-lsnrctl start、stop、status执行缓慢解决方法

---

在执行lsnrctl start/stop/status 命令时，有时会出现命令执行缓慢，甚至卡死的情形，以及使用PLSQL Developer 连接出现超时。引起该问题的可能原因是监听日志的问题，此时可以选择关闭监听日志。

~~~plaintext
#进入lsnrctl命令行
lsnrctl

#查看监听日志状态
show log_status

#关闭
set log_status off

#保存配置
save_config
~~~



<br/><br/><br/>

---

