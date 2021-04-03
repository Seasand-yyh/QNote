# 单例设计模式的5种实现方式（Java）

---

### 第一种：饿汉式

~~~java
public class Singleton {

	private static final Singleton INSTANCE = new Singleton();

	private Singleton() {

	}

	public static Singleton getInstance() {
		return INSTANCE;
	}

}
~~~

### 第二种：懒汉式

~~~java
public class Singleton {

	private static Singleton singleton = null;

	private Singleton() {

	}

	public /* synchronized */ static Singleton getInstance() {
		synchronized (Singleton.class) {
			if (singleton == null) {
				singleton = new Singleton();
			}
		}
		return singleton;
	}

}
~~~

### 第三种：双重检测

~~~java
public class Singleton {

	private volatile static Singleton singleton = null;

	private Singleton() {

	}

	public static Singleton getInstance() {
		if (singleton == null) {
			synchronized (Singleton.class) {
				if (singleton == null) {
					singleton = new Singleton();
				}
			}
		}
		return singleton;
	}

}
~~~

### 第四种：基于静态内部类

~~~java
public class Singleton {

	private Singleton() {

	}

	private static class SingletonHolder {
		private static Singleton singleton = new Singleton();
	}

	public static Singleton getInstance() {
		return SingletonHolder.singleton;
	}

}
~~~

### 第五种：基于枚举

~~~java
public enum Singleton {

	INSTANCE {
		@Override
		protected void work() {
			System.out.println("singleton work...");
		}
	};

	protected abstract void work();

}

public class Test {

	public static void main(String[] args) {
		Singleton s1 = Singleton.INSTANCE;
		Singleton s2 = Singleton.INSTANCE;

		s1.work();
		s2.work();

		System.out.println("s1==s2: " + (s1 == s2));
	}

}
~~~

> 此种方法能够防止反射攻击和反序列化攻击。



<br/><br/><br/>

---

