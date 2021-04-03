# JavaWeb基础学习笔记-Listener

---

### 监听器概述

在JavaWeb被监听的事件源为：ServletContext、HttpSession、ServletRequest，即三大域对象。

* 监听域对象“创建”与“销毁”的监听器；
* 监听域对象“操作域属性”的监听器；
* 监听HttpSession的监听器；

### 域对象创建与销毁的监听器

1、域对象创建与销毁的监听器一共有三个：

1）ServletContextListener：Tomcat启动和关闭时调用下面两个方法：

* public void contextInitialized(ServletContextEvent evt)：ServletContext对象被创建后调用；
* public void contextDestroyed(ServletContextEvent evt)：ServletContext对象被销毁前调用；

2）HttpSessionListener：开始会话和结束会话时调用下面两个方法：

* public void sessionCreated(HttpSessionEvent evt)：HttpSession对象被创建后调用；
* public void sessionDestroyed(HttpSessionEvent evt)：HttpSession对象被销毁前调用；

3）ServletRequestListener：开始请求和结束请求时调用下面两个方法：

* public void requestInitiallized(ServletRequestEvent evt)：ServletRequest对象被创建后调用；
* public void requestDestroyed(ServletRequestEvent evt)：ServletRequest对象被销毁前调用；

2、事件对象

* ServletContextEvent：ServletContext getServletContext()；
* HttpSessionEvent：HttpSession getSession()；
* ServletRequestEvent：ServletRequest getServletRequest()、ServletContext getServletContext()；

3、示例

1）编写MyServletContextListener类，实现ServletContextListener接口（下同）：

~~~java
public class MyServletContextListener implements ServletContextListener {
	public void contextDestroyed(ServletContextEvent evt) {
		System.out.println("销毁ServletContext对象");
	}
	public void contextInitialized(ServletContextEvent evt) {
		System.out.println("创建ServletContext对象");
	}
}
~~~

~~~java
public class MyHttpSessionListener implements HttpSessionListener {
	public void sessionCreated(HttpSessionEvent evt) {
		System.out.println("创建session对象");
	}
	public void sessionDestroyed(HttpSessionEvent evt) {
		System.out.println("销毁session对象");
	}
}
~~~

~~~java
public class MyServletRequestListener implements ServletRequestListener {
	public void requestDestroyed(ServletRequestEvent evt) {
		System.out.println("销毁request对象");
	}
	public void requestInitialized(ServletRequestEvent evt) {
		System.out.println("创建request对象");
	}
}
~~~

2）在web.xml文件中部署监听器：

~~~xml
<listener>
	<listener-class>cn.demo.listener.MyServletContextListener</listener-class>
</listener>
<listener>
	<listener-class>cn.demo.listener.MyHttpSessionListener</listener-class>
</listener>
<listener>
	<listener-class>cn.demo.listener.MyServletRequestListener</listener-class>
</listener>
<session-config>
	<session-timeout>1</session-timeout>
</session-config>
~~~

> 为了看到session销毁的效果，在web.xml文件中设置session失效时间为1分钟。

### 操作域属性的监听器

1、当对域属性进行增、删、改时，执行的监听器一共有三个：

1）ServletContextAttributeListener：在ServletContext域进行增、删、改属性时调用下面方法：

* public void attributeAdded(ServletContextAttributeEvent evt)
* public void attributeRemoved(ServletContextAttributeEvent evt)
* public void attributeReplaced(ServletContextAttributeEvent evt)

2）HttpSessionAttributeListener：在HttpSession域进行增、删、改属性时调用下面方法：

* public void attributeAdded(HttpSessionBindingEvent evt)
* public void attributeRemoved (HttpSessionBindingEvent evt)
* public void attributeReplaced (HttpSessionBindingEvent evt) 

3）ServletRequestAttributeListener：在ServletRequest域进行增、删、改属性时调用下面方法：

* public void attributeAdded(ServletRequestAttributeEvent evt)
* public void attributeRemoved (ServletRequestAttributeEvent evt)
* public void attributeReplaced (ServletRequestAttributeEvent evt)

2、事件对象

1）ServletContextAttributeEvent

* String getName()：获取当前操作的属性名；
* Object getValue()：获取当前操作的属性值；
* ServletContext getServletContext()：获取ServletContext对象；

2）HttpSessionBindingEvent

* String getName()：获取当前操作的属性名；
* Object getValue()：获取当前操作的属性值；
* HttpSession getSession()：获取当前操作的session对象；

3）ServletRequestAttributeEvent

* String getName()：获取当前操作的属性名；
* Object getValue()：获取当前操作的属性值；
* ServletContext getServletContext()：获取ServletContext对象；
* ServletRequest getServletRequest()：获取当前操作的ServletRequest对象；

3、示例

~~~java
public class MyListener implements ServletContextAttributeListener, ServletRequestAttributeListener, HttpSessionAttributeListener {
	public void attributeAdded(HttpSessionBindingEvent evt) {
		System.out.println("向session中添加属性：" + evt.getName() + "=" + evt.getValue());
	}
	public void attributeRemoved(HttpSessionBindingEvent evt) {
		System.out.println("从session中移除属性：" + evt.getName() + "=" + evt.getValue());
	}
	public void attributeReplaced(HttpSessionBindingEvent evt) {
		System.out.println("修改session中的属性：" + evt.getName() + "=" + evt.getValue());
	}

	public void attributeAdded(ServletRequestAttributeEvent evt) {
		System.out.println("向request中添加属性：" + evt.getName() + "=" + evt.getValue());
	}
	public void attributeRemoved(ServletRequestAttributeEvent evt) {
		System.out.println("从request中移除属性：" + evt.getName() + "=" + evt.getValue());
	}
	public void attributeReplaced(ServletRequestAttributeEvent evt) {
		System.out.println("修改request中的属性：" + evt.getName() + "=" + evt.getValue());
	}

	public void attributeAdded(ServletContextAttributeEvent evt) {
		System.out.println("向context中添加属性：" + evt.getName() + "=" + evt.getValue());
	}
	public void attributeRemoved(ServletContextAttributeEvent evt) {
		System.out.println("从context中移除属性：" + evt.getName() + "=" + evt.getValue());
	}
	public void attributeReplaced(ServletContextAttributeEvent evt) {
		System.out.println("修改context中的属性：" + evt.getName() + "=" + evt.getValue());
	}
}
~~~

~~~java
public class ListenerServlet extends BaseServlet {
	public String contextOperation(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ServletContext context = this.getServletContext();
		context.setAttribute("a", "a");
		context.setAttribute("a", "A");
		context.removeAttribute("a");
		return "/index.jsp";
	}

	public String sessionOperation(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		session.setAttribute("a", "a");
		session.setAttribute("a", "A");
		session.removeAttribute("a");
		return "/index.jsp";
	}

	public String requestOperation(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("a", "a");
		request.setAttribute("a", "A");
		request.removeAttribute("a");
		return "/index.jsp";
	}
}
~~~

~~~jsp
<body>
	<a href="<c:url value='/ListenerServlet?method=contextOperation'/>">SevletContext操作属性</a>
	<br/>
	<a href="<c:url value='/ListenerServlet?method=sessionOperation'/>">HttpSession操作属性</a>
	<br/>
	<a href="<c:url value='/ListenerServlet?method=requestOperation'/>">ServletRequest操作属性</a> | 
</body>
~~~

### HttpSession的监听器

还有两个与HttpSession相关的特殊的监听器，这两个监听器的特点如下：

* 不用在web.xml文件中部署；
* 这两个监听器不是给session添加，而是给Bean添加。即让Bean类实现监听器接口，然后再把Bean对象添加到session域中；

1、HttpSessionBindingListener

当某个类实现了该接口后，可以感知本类对象添加到session中，以及感知从session中移除。例如让Person类实现HttpSessionBindingListener接口，那么当把Person对象添加到session中，或者把Person对象从session中移除时会调用下面两个方法：

* public void valueBound(HttpSessionBindingEvent event)：当把监听器对象添加到session中会调用监听器对象的本方法；
* public void valueUnbound(HttpSessionBindingEvent event)：当把监听器对象从session中移除时会调用监听器对象的本方法；

这里要注意，HttpSessionBindingListener监听器的使用与前面介绍的都不相同，当该监听器对象添加到session中，或把该监听器对象从session移除时会调用监听器中的方法。并且无需在web.xml文件中部署这个监听器。

示例：

1）编写Person类，让其实现HttpSessionBindingListener监听器接口

~~~java
public class Person implements HttpSessionBindingListener {
	private String name;
	private int age;
	private String sex;
	public Person(String name, int age, String sex) {
		super();
		this.name = name;
		this.age = age;
		this.sex = sex;
	}
	public Person() {
		super();
	}
	public String toString() {
		return "Person [name=" + name + ", age=" + age + ", sex=" + sex + "]";
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}

	public void valueBound(HttpSessionBindingEvent evt) {
		System.out.println("把Person对象存放到session中：" + evt.getValue());
	}
	public void valueUnbound(HttpSessionBindingEvent evt) {
		System.out.println("从session中移除Pseron对象：" + evt.getValue());
	}
}
~~~

2）编写Servlet类，一个方法向session中添加Person对象，另一个从session中移除Person对象。

~~~java
public class ListenerServlet extends BaseServlet {
	public String addPerson(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Person p = new Person("zhangSan", 23, "male");
		request.getSession().setAttribute("person", p);
		return "/index.jsp";
	}

	public String removePerson(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getSession().removeAttribute("person");
		return "/index.jsp";
	}
}
~~~

3）在index.jsp中给出两个超链接，分别访问Servlet中的两个方法

~~~jsp
<body>
	<a href="<c:url value='/ListenerServlet?method=addPerson'/>">addPerson</a>
	<br/>
	<a href="<c:url value='/ListenerServlet?method=removePerson'/>">removePerson</a>
	<br/>
</body>
~~~

2、HttpSessionActivationListener

Tomcat会在session长时间不被使用时钝化session对象。所谓钝化session，就是把session通过序列化的方式保存到硬盘文件中。当用户再使用session时，Tomcat还会把钝化的对象再活化session。所谓活化就是把硬盘文件中的session在反序列化回内存。当session被Tomcat钝化时，session中存储的对象也被钝化；当session被活化时，也会把session中存储的对象活化。如果某个类实现了HttpSessionActiveationListener接口后，当对象随着session被钝化和活化时，下面两个方法就会被调用：

* public void sessionWillPassivate(HttpSessionEvent se)：当对象感知被活化时调用本方法；
* public void sessionDidActivate(HttpSessionEvent se)：当对象感知被钝化时调用本方法；

HttpSessionActivationListener监听器与HttpSessionBindingListener监听器相似，都是感知型的监听器。例如让Person类实现了HttpSessionActivationListener监听器接口，并把Person对象添加到了session中后，当Tomcat钝化session时，同时也会钝化session中的Person对象。这时Person对象就会感知到自己被钝化了，其实就是调用Person对象的sessionWillPassivate()方法。当用户再次使用session时，Tomcat会活化session，这时Person会感知到自己被活化，其实就是调用Person对象的sessionDidActivate()方法。

注意，因为钝化和活化session，其实就是使用序列化和反序列化技术把session从内存保存到硬盘，和把session从硬盘加载到内存。这说明如果Person类没有实现Serializable接口，那么当session钝化时就不会钝化Person，而是把Person从session中移除再钝化。这也说明session活化后，session中就不在有Person对象了。

示例：

1）先不管HttpSessionActivationListener监听器接口，先来配置Tomcat钝化session的参数，把下面配置文件放到tomcat\conf\catalina\localhost目录下，文件名称为项目名称。

~~~xml
<Context>
	<Manager className="org.apache.catalina.session.PersistentManager" maxIdleSwap="1">
		<Store className="org.apache.catalina.session.FileStore" directory="mysession"/>
	</Manager>
</Context>
~~~

访问项目的index.jsp页面，这会使Tomcat创建Session对象。然后等待一分钟后，查看Tomcat\work\Catalina\localhost\listener\mysession目录下是否会产生文件，如果产生了，说明钝化session的配置成功了，可以开始下一步了。

2）创建Person类，让Person类实现HttpSessionActivationListener和Serializable接口。

~~~java
public class Person implements HttpSessionActivationListener, Serializable {
	private String name;
	private int age;
	private String sex;
	public Person(String name, int age, String sex) {
		super();
		this.name = name;
		this.age = age;
		this.sex = sex;
	}
	public Person() {
		super();
	}
	public String toString() {
		return "Person [name=" + name + ", age=" + age + ", sex=" + sex + "]";
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}

	public void sessionDidActivate(HttpSessionEvent evt) {
		System.out.println("session已经活化");
	}
	public void sessionWillPassivate(HttpSessionEvent evt) {
		System.out.println("session被钝化了！");
	}
}
~~~

3）编写Servlet，提供两个方法：一个向session中添加Person对象，另一个从session中移除Person对象。

~~~java
public class ListenerServlet extends BaseServlet {
	public String addPerson(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Person p = new Person("zhangSan", 23, "male");
		request.getSession().setAttribute("person", p);
		return "/index.jsp";
	}

	public String removePerson(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getSession().removeAttribute("person");
		return "/index.jsp";
	}
}
~~~

4）在index.jsp页面中给出访问addPerson()和removePerson()的方法。

~~~jsp
<body>
	<a href="<c:url value='/ListenerServlet?method=addPerson'/>">addPerson</a>
	<br/>
	<a href="<c:url value='/ListenerServlet?method=removePerson'/>">removePerson</a>
	<br/>
</body>
~~~

5）操作结果

* 打开index.jsp页面，这时Tomcat会创建session。必须在1分钟之前点击addPerson链接，这能保证在session被钝化之前把Person对象添加到session中；
* 等待一分钟，这时session会被钝化，也就会调用Person的sessionWillPassivate()；
* 刷新一下index.jsp页面，这会使session活化，会调用Person的sessionDidActivate()方法；



<br/><br/><br/>

---

