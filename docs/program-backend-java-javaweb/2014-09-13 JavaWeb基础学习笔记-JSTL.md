# JavaWeb基础学习笔记-JSTL

---

### 概述

JSTL是Apache对EL表达式的扩展（也就是说JSTL依赖EL）。JSTL是标签语言，JSTL标签使用起来非常方便。它与JSP动作标签一样，只不过它不是JSP内置的标签，需要我们自己导包，以及指定标签库而已。

如果你使用MyEclipse开发JavaWeb，那么在把项目发布到Tomcat时，你会发现，MyEclipse会在lib目录下存放JSTL的jar包。如果你没有使用MyEclipse开发那么需要自己来导入这个JSTL的jar包：`jstl-1.2.jar`。

JSTL一共包含四大标签库：

* core：核心标签库；
* fmt：格式化标签库；
* sql：数据库标签库；
* xml：xml标签库。

### 标签库的使用

使用taglib指令导入标签库。除了JSP动作标签外，使用其他第三方的标签库都需要：

* 导包；
* 在使用标签的JSP页面中使用taglib指令导入标签库；

下面是导入JSTL的core标签库：

~~~xml
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
~~~

* prefix="c"：指定标签库的前缀，这个前缀可以随便设置值，但大家都会在使用core标签库时指定前缀为c；
* uri="http://java.sun.com/jstl/core" ： 指定标签库的uri，它不一定是真实存在的网址，但它可以让JSP找到标签库的描述文件；

### core标签库常用标签

1、out

~~~jsp
<!-- 输出aaa字符串常量 -->
<c:out value=”aaa”/>

<!-- 与${aaa}相同 -->
<c:out value=”${aaa}”/>

<!-- 当${aaa}不存在时，输出xxx字符串 -->
<c:out value=”${aaa}” default=”xxx”/>

<!-- 当escapeXml为false，不会转换“<”、“>”。这可能会受到JavaScript攻击。 -->
<%
	request.setAttribute("a","<script>alert('hello');</script>");
%>
<c:out value="${a}" default="xxx" escapeXml="false" />
~~~

2、set

~~~jsp
<!-- 在pageContext中添加name为a，value为hello的数据 -->
<c:set var=”a” value=”hello”/>

<!-- 在session中添加name为a，value为hello的数据 -->
<c:set var=”a” value=”hello” scope=”session”/>
~~~

3、remove

~~~jsp
<%
	pageContext.setAttribute("a", "pageContext");
	request.setAttribute("a", "request");
	session.setAttribute("a", "session");
	application.setAttribute("a", "application");
%>
<!-- 删除所有域中name为a的数据 -->
<c:remove var="a"/>
<c:out value="${a}" default="none"/>

<!-- 删除pageContext中name为a的数据 -->
<c:remove var="a" scope=”page”/>
~~~

4、url

~~~jsp
<!-- 输出上下文路径：/demo/ -->
<c:url value="/"/>

<!-- 把本该输出的结果赋给变量a。范围为request -->
<c:url value="/" var="a" scope="request"/>

<!-- 输出：/demo/AServlet -->
<c:url value="/AServlet"/>

<!-- 输出：/demo/AServlet?username=abc&password=123。如果参数中包含中文，那么会自动使用URL编码！ -->
<c:url value="/AServlet">
	<c:param name="username" value="abc"/>
	<c:param name="password" value="123"/>
</c:url>
~~~

> url标签会在需要URL重写时添加sessionId。

5、if

if标签的test属性必须是一个boolean类型的值，如果test的值为true，那么执行if标签的内容，否则不执行。

~~~jsp
<c:set var="a" value="hello"/> 
<c:if test="${not empty a}">
	<c:out value="${a}"/>
</c:if>
~~~

6、choose

choose标签对应Java中的if/else if/else结构。when标签的test为true时，会执行这个when的内容。当所有when标签的test都为false时，才会执行otherwise标签的内容。

~~~jsp
<c:set var="score" value="${param.score}"/>
<c:choose>
	<c:when test="${score > 100 || score < 0}">错误的分数：${score}</c:when> 
	<c:when test="${score >= 90 }">A级</c:when> 
	<c:when test="${score >= 80 }">B级</c:when>
	<c:when test="${score >= 70 }">C级</c:when>
	<c:when test="${score >= 60 }">D级</c:when>
	<c:otherwise>E级</c:otherwise> 
</c:choose>
~~~

7、forEach

forEach就是循环标签了，forEach标签有两种使用方式：

* 使用循环变量，指定开始和结束值，类似`for(int i = 1; i <= 10; i++) {}`；
* 循环遍历集合，类似`for(Object o : 集合)`；

1）循环变量方式：

~~~jsp
<c:set var="sum" value="0" /> 
<c:forEach var="i" begin="1" end="10"> 
	<c:set var="sum" value="${sum + i}" /> 
</c:forEach>
<c:out value="sum = ${sum}"/>
~~~

~~~jsp
<c:set var="sum" value="0" />
<c:forEach var="i" begin="1" end="10" step="2">
	<c:set var="sum" value="${sum + i}" />
</c:forEach>
<c:out value="sum = ${sum}"/>
~~~

2）遍历集合或数组方式：

~~~jsp
<%
	String[] names = {"zhangSan", "liSi", "wangWu", "zhaoLiu"};
	pageContext.setAttribute("ns", names);
%>
<c:forEach var="item" items="${ns}">
	<c:out value="name: ${item}"/><br/>
</c:forEach>
~~~

3）遍历List：

~~~jsp
<%
	List<String> names = new ArrayList<String>();
	names.add("zhangSan");
	names.add("liSi");
	names.add("wangWu");
	names.add("zhaoLiu");
	pageContext.setAttribute("ns", names);
%>
<c:forEach var="item" items="${ns}"> 
	<c:out value="name: ${item}"/><br/>
</c:forEach>
~~~

4）遍历Map：

~~~jsp
<%
	Map<String,String> stu = new LinkedHashMap<String,String>();
	stu.put("number", "N_1001");
	stu.put("name", "zhangSan");
	stu.put("age", "23");
	stu.put("sex", "male");
	pageContext.setAttribute("stu", stu);
%>
<c:forEach var="item" items="${stu}">
	<c:out value="${item.key}: ${item.value}"/><br/>
</c:forEach>
~~~

forEach标签还有一个属性：varStatus，这个属性用来指定接收“循环状态”的变量名。例如：`<forEach varStatus=”vs” …/>`，这时就可以使用vs这个变量来获取循环的状态了。

* count：int类型，当前已遍历元素的个数；
* index：int类型，当前元素的下标；
* first：boolean类型，是否为第一个元素；
* last：boolean类型，是否为最后一个元素；
* current：Object类型，表示当前项。

~~~jsp
<c:forEach var="item" items="${ns}" varStatus="vs" >
	<c:if test="${vs.first}">第一行：</c:if>
	<c:if test="${vs.last}">最后一行：</c:if>
	<c:out value="第${vs.count}行: "/>
	<c:out value="[${vs.index}]: "/>
	<c:out value="name: ${vs.current}"/><br/>
</c:forEach>
~~~

### fmt标签库常用标签

fmt标签库是用来格式化输出的，通常需要格式化的有时间和数字。

1、格式化时间：

~~~jsp
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	Date date = new Date();
	pageContext.setAttribute("d", date);
%>
<fmt:formatDate value="${d}" pattern="yyyy-MM-dd HH:mm:ss" />
~~~

2、格式化数字：

~~~jsp
<%
	double d1 = 3.5;
	double d2 = 4.4; 
	pageContext.setAttribute("d1", d1);
	pageContext.setAttribute("d2", d2);
%>

<!-- 必须且仅能保留两位小数，如果大于两位，那么只保留两位，并四舍五入，如果小于两位，那么使用0补足两位。 -->
<fmt:formatNumber value="${d1}" pattern="0.00" /><br/>

<!-- 最多显示两位，如果小于两位，那么有几位保留几位，不会用0补足。大于两位，只保留两位，并四舍五入。 -->
<fmt:formatNumber value="${d2}" pattern="#.##" />
~~~

### 自定义标签

1、概述

1）自定义标签的步骤

其实我们在JSP页面中使用标签就等于调用某个对象的某个方法一样。例如：`<c:if test=””>`，这就是在调用对象的方法一样，自定义标签其实就是自定义类一样。

* 定义标签处理类：必须是Tag或SimpleTag的实现类；
* 编写标签库描述符文件（TLD）；

SimpleTag接口是JSP2.0中新给出的接口，用来简化自定义标签，所以现在我们基本上都是使用SimpleTag。Tag是旧版本的，传统的自定义标签时使用的接口，现在不建议使用它了。

2）SimpleTag接口介绍

SimpleTag接口内容如下：

* void doTag()：标签执行方法；
* JspTag getParent()：获取父标签；
* void setParent(JspTag parent)：设置父标签；
* void setJspContext(JspContext context)：设置PageContext；
* void setJspBody(JspFragment jspBody)：设置标签体对象；

请记住，万物皆对象，在JSP页面中的标签也是对象。你可以通过查看JSP的“真身”清楚的知道，所有标签都会变成对象的方法调用。标签对应的类我们称之为“标签处理类”。

标签的生命周期：

* 当容器（Tomcat）第一次执行到某个标签时，会创建标签处理类的实例；
* 然后调用setJspContext(JspContext)方法，把当前JSP页面的pageContext对象传递给这个方法；
* 如果当前标签有父标签，那么使用父标签的标签处理类对象调用setParent(JspTag)方法；
* 如果标签有标签体，那么把标签体转换成JspFragment对象，然后调用setJspBody()方法；
* 每次执行标签时，都调用doTag()方法，它是标签处理方法。

~~~java
public class HelloTag implements SimpleTag {
	private JspTag parent;
	private PageContext pageContext;
	private JspFragment jspBody;

	public void doTag() throws JspException, IOException {
		pageContext.getOut().print("Hello Tag!!!"); 
	}
	public void setParent(JspTag parent) {
		this.parent = parent;
	}
	public JspTag getParent() {
		return this.parent;
	}
	public void setJspContext(JspContext pc) {
		this.pageContext = (PageContext) pc;
	}
	public void setJspBody(JspFragment jspBody) {
		this.jspBody = jspBody;
	}
}
~~~

3）标签库描述文件（TLD）

标签库描述文件是用来描述当前标签库中的标签的。标签库描述文件的扩展名为tld，你可以把它放到WEB-INF下，这样就不会被客户端直接访问到了。

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<taglib version="2.0" xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-jsptaglibrary_2_0.xsd ">
	<tlib-version>1.0</tlib-version> 
	<short-name>demo</short-name> 
	<uri>http://www.demo.cn/tags</uri> 
	<tag> 
		<name>hello</name> 
		<tag-class>cn.demo.tag.HelloTag</tag-class> 
		<body-content>empty</body-content> 
	</tag>
</taglib>
~~~

4）使用标签

在页面中使用标签分为两步：

* 使用taglib导入标签库；
* 使用标签；

~~~jsp
<%@ taglib prefix="it"  uri="/WEB-INF/hello.tld"  %>
<it:hello/>
~~~

2、自定义标签进阶

1）继承SimpleTagSupport

继承SimpleTagSuppport要比实现SimpleTag接口方便太多了，现在你只需要重写doTag()方法，其他方法都已经被SimpleTagSuppport完成了。

~~~java
public class HelloTag extends SimpleTagSupport {
	public void doTag() throws JspException, IOException {
		this.getJspContext().getOut().write("<p>Hello SimpleTag!</p>") ;
	}
}
~~~

2）有标签体的标签

我们先来看看标签体内容的可选值。`<body-content>`元素的可选值有：

* empty：无标签体；
* JSP：传统标签支持它，SimpleTag已经不再支持使用`<body-content>JSP</body-content>`。标签体内容可以是任何东西：EL、JSTL、`<%=%>`、`<%%>`，以及HTML； 
* scriptless：标签体内容不能是Java脚本，但可以是EL、JSTL等。在SimpleTag中，如果需要有标签体，那么就使用该选项；
* tagdependent：标签体内容不做运算，由标签处理类自行处理，无论标签体内容是EL、JSP、JSTL，都不会做运算。

自定义有标签体的标签需要：

* 获取标签体对象：`JspFragment jspBody = getJspBody();`；
* 把标签体内容输出到页面：`jspBody.invoke(null);`；
* tld中指定标签内容类型：scriptless。

~~~java
public class HelloTag extends SimpleTagSupport {
	public void doTag() throws JspException, IOException {
		PageContext pc = (PageContext) this.getJspContext();
		HttpServletRequest req = (HttpServletRequest) pc.getRequest();
		String s = req.getParameter("exec");
		if(s != null && s.endsWith("true")) {
			JspFragment body = this.getJspBody() ;
			body.invoke (null);
		}
	}
}
~~~

~~~xml
<tag>
	<name>hello</name>
	<tag-class>cn.demo.tags.HelloTag</tag-class>
	<body-content>scriptless</body-content> 
</tag>
~~~

~~~jsp
<demo:hello>
	<h1>哈哈哈~</h1>
</demo:hello>
~~~

3）不执行标签下面的页面内容

如果希望在执行了自定义标签后，不再执行JSP页面下面的东西，那么就需要在doTag()方法中使用SkipPageException。

~~~java
public class SkipTag extends SimpleTagSupport {
	public void doTag() throws JspException, IOException {
		this.getJspContext().getOut().print("<h1>只能看到我！</h1>");
		throw new SkipPageException();
	}
}
~~~

~~~xml
<tag>
	<name>skip</name>
	<tag-class>cn.demo.tags.SkipTag</tag-class>
	<body-content>empty</body-content>
</tag>
~~~

~~~jsp
<demo:skip/>
<h1>看不见我！</h1>
~~~

4）带有属性的标签

一般标签都会带有属性，例如`<c:if test=””>`，其中test就是一个boolean类型的属性。完成带有属性的标签需要：

* 在处理类中给出JavaBean属性（提供get/set方法）；
* 在TLD中部属相关属性。

~~~java
public class IfTag extends SimpleTagSupport {
	private boolean test;
	public boolean isTest() {
		return test;
	}
	public void setTest (boolean test) {
		this.test = test;
	}
	@Override
	public void doTag() throws JspException, IOException {
		if(test) {
			this.getJspBody().invoke(null);
		} 
	}
}
~~~

~~~xml
<tag> 
	<name>if</name> 
	<tag-class>cn.demo.tag.IfTag</tag-class> 
	<body-content>scriptless</body-content>
	<attribute> 
		<name>test</name> 
		<required>true</required> 
		<rtexprvalue>true</rtexprvalue> 
	</attribute> 
</tag>
~~~

~~~jsp
<%
	pageContext.setAttribute("one", true);
	pageContext.setAttribute("two", false);
%>
<it:if test="${one}">xixi</it:if> 
<it:if test="${two}">haha</it:if> 
<it:if test="true">hehe</it:if> 
~~~



<br/><br/><br/>

---

