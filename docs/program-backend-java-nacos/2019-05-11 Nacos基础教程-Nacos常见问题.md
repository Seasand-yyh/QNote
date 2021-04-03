# Nacos基础教程-Nacos常见问题

---

### 如何修改初始密码

1、添加依赖

~~~xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-security</artifactId>
</dependency>
~~~

2、用代码加密

~~~java
package com.alibaba.nacos.console.utils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
public class PasswordEncoderUtil {
	public static void main(String[] args) {
		System.out.println(new BCryptPasswordEncoder().encode("admin"));
	}
}
~~~

3、运行代码，得到密文

~~~plaintext
$2a$10$SEqhvpJua3r5WBm7ylL.DOiHxvBkvNyiJFGz5xTSa4v/NKIWUHiR.
~~~

注意：值是随机的，所以生成密码每次可能不一样

也可以通过下载nacos源码，并导入nacos-console子模块即可。源码下载地址：https://github.com/alibaba/nacos/archive/0.8.0.tar.gz 。

4、修改数据库

~~~sql
UPDATE users SET PASSWORD='$2a$10$SEqhvpJua3r5WBm7ylL.DOiHxvBkvNyiJFGz5xTSa4v/NKIWUHiR.' WHERE username = 'nacos';
~~~



<br/><br/><br/>

---

