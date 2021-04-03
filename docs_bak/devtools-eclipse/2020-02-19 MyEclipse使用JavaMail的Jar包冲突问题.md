# MyEclipse使用JavaMail的Jar包冲突问题

---

MyEclipse中的JavaEE5中的mail包中只有接口，而没有实现。所以不能使用，否则会抛出：java.lang.NoClassDefFoundError: com/sun/mail/util/BEncoderStream 异常。

当导入mail.jar后，会抛出下面异常：java.lang.NoClassDefFoundError: com/sun/mail/util/LineInputStream。这是因为MyEclipse下有javamail的接口，并且mail.jar中也有javamail的接口，所以会出现冲突。

而MyEclipse中的JavaEE5是为了编译环境而存在的，真正发布到Tomcat环境后，就不需要MyEclipse的JavaEE5了。但是，如果你要在非WEB项目下，运行main()方法，这就会出现问题。mail.jar中的类与MyEclipseEE5中的类冲突。

如果你发布到Tomcat下，因为Tomcat自己有JavaEE的jar包，所以MyEclipse的JavaEE5不会发到Tomcat下，所以Tomcat运行不会抛出异常。

解决方法：

进入下面路径：D:\MyEclipse10\Common\plugins\com.genuitec.eclipse.j2eedt.core_10.0.0.me201110301321\data\libraryset\EE_5，找到javaee.jar，把这个jar包中与javax.mail相关的东西都删除。再把mail.jar和activation.jar导入到项目中，这就不会出错了。



<br/><br/><br/>

---

