# Spring系列学习-AOP

---

### 什么是AOP

AOP（Aspect-Oriented-Programming，面向方面编程），它利用一种称为“横切”的技术，剖解开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，并将其名为“Aspect”，即方面。所谓“方面”，简单地说，就是将那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可操作性和可维护性。

### AOP使用场景

AOP用来封装横切关注点，具体可以在下面的场景中使用：

* Authentication 权限
* Caching 缓存
* Context passing 内容传递
* Error handling 错误处理
* Lazy loading 懒加载
* Debugging 调试
* logging， tracing， profiling and monitoring 记录，跟踪，优化，校准
* Performance optimization 性能优化
* Persistence 持久化
* Resource pooling 资源池
* Synchronization 同步
* Transactions 事务

### Spring AOP底层技术

Spring提供了两种方式来生成代理对象：JDKProxy和Cglib，具体使用哪种方式生成由AopProxyFactory根据AdvisedSupport对象的配置来决定。默认的策略是如果目标类是接口，则使用JDK动态代理技术，否则使用Cglib来生成代理。

动态代理利用反射的原理，给对象动态的生产代理对象，在执行的方法前后来执行相关内容：

~~~java
/**
 * 动态代理类。
 * @author yanbin
 */
public class DynamicProxy implements InvocationHandler {
	/** 需要代理的目标类 */
	private Object target;

	/**
	 * 写法固定，aop专用:绑定委托对象并返回一个代理类。
	 * @param delegate
	 * @return
	 */
	public Object bind(Object target) {
		this.target = target;
		return Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), this);
	}

	/**
	 * @param Object
	 *            target：指被代理的对象。
	 * @param Method
	 *            method：要调用的方法。
	 * @param Object
	 *            []args：方法调用时所需要的参数。
	 */
	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		Object result = null;
		// 切面之前执行
		System.out.println("切面之前执行");
		// 执行业务
		result = method.invoke(target, args);
		// 切面之后执行
		System.out.println("切面之后执行");
		return result;
	}
}
~~~

CGLIB是针对类来实现代理的，他的原理是对指定的目标类生成一个子类，并覆盖其中方法实现增强。采用的是继承的方式。

~~~java
/**
 * 使用cglib动态代理。
 * @author yanbin
 */
public class CglibProxy implements MethodInterceptor {
	private Object target; 

	/**
	 * 创建代理对象。
	 * @param target
	 * @return
	 */
	public Object getInstance(Object target) {
		this.target = target;
		Enhancer enhancer = new Enhancer();
		enhancer.setSuperclass(this.target.getClass());
		// 回调方法
		enhancer.setCallback(this);
		// 创建代理对象
		return enhancer.create();
	}

	@Override
	public Object intercept(Object proxy, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
		Object result = null;
		System.out.println("事务开始");
		result = methodProxy.invokeSuper(proxy, args);
		System.out.println("事务结束");
		return result;
	} 
}
~~~

### AOP相关概念

* 方面（Aspect）：一个关注点的模块化，这个关注点实现可能另外横切多个对象。事务管理是J2EE应用中一个很好的横切关注点例子。方面用Spring的Advisor或拦截器实现。
* 连接点（Joinpoint）: 程序执行过程中明确的点，如方法的调用或特定的异常被抛出。
* 通知（Advice）: 在特定的连接点，AOP框架执行的动作。各种类型的通知包括“around”、“before”和“throws”通知等。许多AOP框架包括Spring都是以拦截器做通知模型，维护一个“围绕”连接点的拦截器链。Spring中定义了四个Advice：BeforeAdvice、 AfterAdvice、ThrowAdvice和DynamicIntroductionAdvice。
* 切入点（Pointcut）: 指定一个通知将被引发的一系列连接点的集合。AOP框架必须允许开发者指定切入点，例如，使用正则表达式。 Spring定义了Pointcut接口，用来组合MethodMatcher和ClassFilter，可以通过名字很清楚的理解， MethodMatcher是用来检查目标类的方法是否可以被应用此通知，而ClassFilter是用来检查Pointcut是否应该应用到目标类上。
* 引入（Introduction）: 添加方法或字段到被通知的类。 Spring允许引入新的接口到任何被通知的对象。例如，你可以使用一个引入使任何对象实现 IsModified接口，来简化缓存。Spring中要使用Introduction, 可有通过DelegatingIntroductionInterceptor来实现通知，通过DefaultIntroductionAdvisor来配置Advice和代理类要实现的接口。
* 目标对象（Target Object）: 包含连接点的对象，也被称作被通知或被代理对象。
* AOP代理（AOP Proxy）: AOP框架创建的对象，包含通知。 在Spring中，AOP代理可以是JDK动态代理或者CGLIB代理。
* 织入（Weaving）: 组装方面来创建一个被通知对象。这可以在编译时完成（例如使用AspectJ编译器），也可以在运行时完成。Spring和其他纯Java AOP框架一样，在运行时完成织入。

### AOP的几种实现方式

* 基于代理的AOP
* 纯简单Java对象切面
* @Aspect注解形式的
* 注入形式的Aspcet切面

~~~java
public interface Sleepable {
	void sleep();
}

public class Sleep implements Sleepable {
	@Override
	public void sleep() {
		System.out.println("乖,该睡觉了！");
	}
}

public class SleepHelper implements MethodBeforeAdvice, AfterReturningAdvice {
	@Override
	public void afterReturning(Object returnValue, Method method,Object[] args, Object target) throws Throwable {
		System.out.println("睡觉前要敷面膜");
	}

	@Override
	public void before(Method method, Object[] args, Object target)throws Throwable {
		System.out.println("睡觉后要做美梦");
	}
}
~~~

1、基于代理的AOP

~~~xml
<bean id="sleep" class="com.tgb.springaop.service.impl.Sleep"/>

<!-- 创建一个增强 advice -->
<bean id="sleepHelper" class="com.tgb.springaop.aspect.SleepHelper"/>

<!-- 定义切点，匹配所有的sleep方法-->
<bean id="sleepPointcut" class="org.springframework.aop.support.JdkRegexpMethodPointcut">
	<property name="pattern" value=".*sleep"></property>
</bean>

<!-- 切面：增强+切点结合 -->
<bean id="sleepHelperAdvisor" class="org.springframework.aop.support.DefaultPointcutAdvisor">
	<property name="advice" ref="sleepHelper"/>
	<property name="pointcut" ref="sleepPointcut"/>
</bean>

<!-- 定义代理对象 -->
<bean id="sleepProxy" class="org.springframework.aop.framework.ProxyFactoryBean">
	<property name="target" ref="sleep"/>
	<property name="interceptorNames" value="sleepHelperAdvisor"/>
</bean>
~~~

在配置文件中，pattern属性指定了正则表达式，匹配所有的sleep方法。使用org.springframework.aop.support.DefaultPointcutAdvisor的目的是为了使切点和增强结合起来形成一个完整的切面，最后配置完后通过org.springframework.aop.framework.ProxyFactoryBean产生一个最终的代理对象。

2、纯简单Java对象切面

纯简单Java对象切面这话怎么说呢，在我看来就是相对于第一种配置，不需要使用代理，而是通过Spring的内部机制去自动扫描，这时候我们的配置文件就该如下修改：

~~~xml
<!-- 目标类 -->
<bean id="sleep" class="com.tgb.springaop.service.impl.Sleep"/>

<!-- 创建一个增强 advice -->
<bean id="sleepHelper" class="com.tgb.springaop.aspect.SleepHelper"/>

<!-- 配置切点和通知 -->
<bean id="sleepAdvisor" class="org.springframework.aop.support.RegexpMethodPointcutAdvisor">
	<property name="advice" ref="sleepHelper"></property>
	<property name="pattern" value=".*sleep"/>
</bean>

<!-- 自动代理配置 -->
<bean class="org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator"/>
~~~

相对于第一种简单了许多，不用再去配置代理了。

3、@Aspect注解形式

根据我们的经验也知道，注解的形式相对于配置文件是简单一些的，这时候需要在已有的方法或类上加注解：

~~~java
@Aspect
@Component
public class SleepHelper {
	/*@Pointcut("execution(* com.tgb.springaop.service.impl..*(..))")*/
	@Pointcut("execution(* *.sleep(..))")
	public void sleeppoint(){
		
	}

	@Before("sleeppoint()")
	public void beforeSleep(){
		System.out.println("睡觉前要敷面膜");
	}

	@AfterReturning("sleeppoint()")
	public void afterSleep(){
		System.out.println("睡觉后要做美梦");
	}
~~~

~~~xml
<!-- 扫描包 -->
<context:component-scan base-package="com.tgb" annotation-config="true"/>

<!-- ASPECTJ注解 -->
<aop:aspectj-autoproxy proxy-target-class="true" />

<!-- 目标类 -->
<bean id="sleep" class="com.tgb.springaop.service.impl.Sleep"/>
~~~

4、注入形式的Aspcet切面

个人感觉这个是最简单的也是最常用的，也是最灵活的。配置文件如下：

~~~xml
<!-- 目标类 -->
<bean id="sleep" class="com.tgb.springaop.service.impl.Sleep"/>
<bean id="sleepHelper" class="com.tgb.springaop.aspect.SleepHelper"/>

<aop:config>
	<aop:aspect ref="sleepHelper">
		<aop:before method="beforeSleep" pointcut="execution(* *.sleep(..))"/>
		<aop:after method="afterSleep" pointcut="execution(* *.sleep(..))"/>
	</aop:aspect>
</aop:config>
~~~

~~~java
public class SleepHelper {
	public void beforeSleep(){
		System.out.println("睡觉前要敷面膜");
	}

	public void afterSleep(){
		System.out.println("睡觉后要做美梦");
	}
}
~~~



<br/><br/><br/>

---

