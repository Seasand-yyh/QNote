# Java架构师系列-MyBatis

---

### 一、简介

MyBatis是支持普通SQL查询，存储过程和高级映射的优秀持久层框架。MyBatis消除了几乎所有的JDBC代码和参数的手工设置以及对结果集的检索封装。MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO（Plain Old Java Objects，普通的Java对象）映射成数库中的记录。

### 二、环境搭建

1、添加maven依赖

~~~xml
<dependencies>
	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis</artifactId>
		<version>3.4.4</version>
	</dependency>
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>5.1.21</version>
	</dependency>
</dependencies>
~~~

2、建表

~~~sql
CREATE TABLE users(id INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(20), age INT);
INSERT INTO users(NAME, age) VALUES('Tom', 12);
INSERT INTO users(NAME, age) VALUES('Jack', 11);
~~~

3、Mybatis配置文件

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<environments default="development">
		<environment id="development">
			<transactionManager type="JDBC" />
			<dataSource type="POOLED">
				<property name="driver" value="com.mysql.jdbc.Driver" />
				<property name="url" value="jdbc:mysql://localhost:3306/test" />
				<property name="username" value="root" />
				<property name="password" value="root" />
			</dataSource>
		</environment>
	</environments>
</configuration>
~~~

4、定义实体类

~~~java
package cn.seasand.code.entity;
public class User {
	private int id;
	private String name;
	private int age;
    //get,set方法
}
~~~

5、定义mapper接口

~~~java
package cn.seasand.code.mapper;
public interface UserMapper {
	public User getUser(int id);
}
~~~

6、定义mapper.xml

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.seasand.code.mapper.UserMapper">
	<select id="getUser" parameterType="int" resultType="cn.seasand.code.entity.User">
		SELECT * FROM users where id =#{id}
	</select>
</mapper>
~~~

7、加载mapper.xml

~~~xml
<mappers>
	<mapper resource="mapper/userMapper.xml" />
</mappers>
~~~

8、查询测试

~~~java
public class TestMybatis {
	public static void main(String[] args) throws IOException {
		String resource = "mybatis.xml";
		// 读取配置文件
		Reader reader = Resources.getResourceAsReader(resource);
		// 获取会话工厂
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
		SqlSession openSession = sqlSessionFactory.openSession();
		// 查询
		String sql = "cn.seasand.code.mapper.UserMapper.getUser";
		// 调用api查询
		User user = openSession.selectOne(sql, 1);
		System.out.println(user.toString());
	}
}
~~~

9、新增测试

~~~xml
<insert id="addUser" parameterType="cn.seasand.code.entity.User" >
	INSERT INTO users(NAME, age) VALUES(#{name}, #{age});
</insert>
~~~

~~~java
public void add() throws IOException {
	String resource = "mybatis.xml";
	// 读取配置文件
	Reader reader = Resources.getResourceAsReader(resource);
	// 获取会话工厂
	SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
	SqlSession openSession = sqlSessionFactory.openSession();
	// 查询
	String sql = "cn.seasand.code.mapper.UserMapper.addUser";
	// 调用api查询
	User userPa = new User();
	userPa.setAge(19);
	userPa.setName("张三");
	int reuslt = openSession.insert(sql, userPa);
	System.out.println(reuslt);
}
~~~

10、删除测试

~~~xml
<delete id="delUser" parameterType="int" >
	delete from users where id=#{id}
</delete>
~~~

~~~java
public void delUser() throws IOException{
	String resource = "mybatis.xml";
	// 读取配置文件
	Reader reader = Resources.getResourceAsReader(resource);
	// 获取会话工厂
	SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
	SqlSession openSession = sqlSessionFactory.openSession();
	// 查询
	String sql = "cn.seasand.code.mapper.UserMapper.delUser";
	int reuslt = openSession.delete(sql,1);
	System.out.println(reuslt);
}
~~~

### 三、SQL注入案例

1、建表

~~~sql
create table user_table(
    id      int Primary key,  
    username    varchar(30),  
    password    varchar(30)  
);  
insert into user_table values(1, 'zhangsan','12345');  
insert into user_table values(2, 'lisi','12345'); 
~~~

2、查询

~~~java
String username = "zhangsan";
String password = "12345";
String sql = "SELECT id, username FROM user_table WHERE username='" + username + "' AND password='" + password + "'";
Class.forName("com.mysql.jdbc.Driver");
Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "root");
PreparedStatement stat = con.prepareStatement(sql);
System.out.println(stat.toString());
ResultSet rs = stat.executeQuery();
~~~

3、SQL注入

将username的值设置为：

~~~java
username='  OR 1=1 -- 
~~~

因为--表示SQL注释，因此后面语句忽略；因为1=1恒成立，因此 username='' OR 1=1  恒成立，因此SQL语句等同于：

~~~sql
SELECT id, username FROM user_table WHERE username=''  OR 1=1 --' AND password='12345'；
~~~

4、解决方法

~~~java
String username = "username='  OR 1=1 -- ";
String password = "12345";
String sql = "SELECT id, username FROM user_table WHERE username=? AND password=?";
Class.forName("com.mysql.jdbc.Driver");
Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "root");
PreparedStatement stat = con.prepareStatement(sql);
stat.setString(1, username);
stat.setString(2, password);
System.out.println(stat.toString());
ResultSet rs = stat.executeQuery();
~~~

### 四、Mybatis中#与$区别

动态 sql 是 mybatis 的主要特性之一，在 mapper 中定义的参数传到 xml 中之后，在查询之前 mybatis 会对其进行动态解析。mybatis 为我们提供了两种支持动态 sql 的语法：`#{}` 以及`${}`。

在下面的语句中，如果 username 的值为 zhangsan，则两种方式无任何区别：

~~~sql
select * from user where name = #{name};
select * from user where name = ${name};
~~~

其解析之后的结果均为：

~~~sql
select * from user where name = 'zhangsan';
~~~

但是` #{}` 和 `${}` 在预编译中的处理是不一样的。`#{}` 在预处理时，会把参数部分用一个占位符 ? 代替，变成如下的 sql 语句：

~~~sql
select * from user where name = ?;
~~~

而 `${}` 则只是简单的字符串替换，在动态解析阶段，该 sql 语句会被解析成：

~~~sql
select * from user where name = 'zhangsan';
~~~

以上，`#{}` 的参数替换是发生在 DBMS 中，而 `${}` 则发生在动态解析过程中。那么，在使用过程中我们应该使用哪种方式呢？答案是，优先使用 `#{}`。因为 `${}` 会导致 sql 注入的问题。看下面的例子：

~~~sql
select * from ${tableName} where name = #{name}
~~~

在这个例子中，如果表名为 user; delete user; -- ，则动态解析之后 sql 如下：

~~~sql
select * from user; delete user; -- where name = ?;
~~~

--之后的语句被注释掉，而原本查询用户的语句变成了查询所有用户信息+删除用户表的语句，会对数据库造成重大损伤，极大可能导致服务器宕机。

但是表名用参数传递进来的时候，只能使用 `${}` ，具体原因可以自己做个猜测，去验证。这也提醒我们在这种用法中要小心sql注入的问题。

### 五、Mybatis 注解使用

Mybatis提供了增删改查注解：@select、@delete、@update；

1、建立注解Mapper

~~~java
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import cn.seasand.code.entity.User;
public interface UserTestMapper {
	@Select("select * from users where id = ${id};")
	public User getUser(@Param("id") String id);
}
~~~

2、加入mybatis.xml

~~~xml
<mapper class="cn.seasand.code.mapper.UserTestMapper" />
~~~

3、测试示例

~~~java
public class TestMybatis {
	public static void main(String[] args) throws IOException {
		String resource = "mybatis.xml";
		// 读取配置文件
		Reader reader = Resources.getResourceAsReader(resource);
		// 获取会话工厂
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
		SqlSession openSession = sqlSessionFactory.openSession();
		// 调用api查询
		UserTestMapper userTestMapper=openSession.getMapper(UserTestMapper.class);
		System.out.println(userTestMapper.getUser("2"));
	}
}
~~~



<br/><br/><br/>

---

