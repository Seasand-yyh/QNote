# Java基础高频面试题汇总

---

### 1、 Java 语言有哪些特点？

* 简单易学、有丰富的类库；
* 面向对象（Java 最重要的特性，让程序耦合度更低，内聚性更高）；
* 与平台无关性（JVM 是 Java 跨平台使用的根本）；
* 可靠安全；
* 支持多线程；

### 2、面向对象和面向过程的区别？

面向过程：是分析解决问题的步骤，然后用函数把这些步骤一步一步地实现，然后在使用的时候一一调用即可。因性能较高，所以单片机、嵌入式开发等一般采用面向过程开发。

面向对象：是把构成问题的事物分解成各个对象，而建立对象的目的也不是为了完成一个个步骤，而是为了描述某个事物在解决整个问题的过程中所发生的行为。面向对象有封装、继承、多态的特性，所以易维护、易复用、易扩展，可以设计出低耦合的系统。 但是从性能上来说，比面向过程要低。

### 3 、八种基本数据类型的大小，以及他们的封装类型大小（字节） 和默认值？

int 是基本数据类型，Integer 是 int 的封装类，是引用类型。int 默认值是 0，而 Integer 默认值是 null，所以 Integer 能区分出 0 和 null 的情况。一旦 Java 看到 null，就知道这个引用还没有指向某个对象。

基本数据类型在声明时系统会自动给它分配空间，而引用类型声明时只是分配了引用空间，必须通过实例化开辟数据空间之后才可以赋值。数组对象也是一个引用对象，将一个数组赋值给另一个数组时只是复制了一个引用，所以通过某一个数组所做的修改在另一个数组中也看的见。

虽然定义了 boolean 这种数据类型，但是只对它提供了非常有限的支持。在 Java 虚拟机中没有任何供 boolean 值专用的字节码指令。Java 语言表达式所操作的 boolean 值，在编译之后都使用 Java 虚拟机中的 int 数据类型来代替，而 boolean 数组将会被编码成 Java 虚拟机的 byte 数组，每个元素 boolean 元素占 8 位。这样我们可以得出 boolean 类型占了单独使用是 4 个字节，在数组中又是 1 个字节。使用 int 的原因是，对于当下 32 位的处理器（CPU）来说，一次处理数据是 32 位（这里不是指的是 32/64 位系统，而是指 CPU 硬件层面），具有高效存取的特点。

### 4、标识符的命名规则

1）标识符的含义：

是指在程序中，我们自己定义的内容。譬如，类的名字，方法名称以及变量名称等等，都是标识符。

2）命名规则：（硬性要求）

* 标识符可以包含英文字母，0-9 的数字，`$`以及`_`；
* 标识符不能以数字开头；
* 标识符不是关键字；

3）命名规范：（非硬性要求）

* 类名规范：首字符大写，后面每个单词首字母大写（大驼峰式）；
* 变量名规范：首字母小写，后面每个单词首字母大写（小驼峰式）；
* 方法名规范：同变量名；

### 5、instanceof 关键字的作用

instanceof 严格来说是 Java 中的一个双目运算符，用来测试一个对象是否为一个类的实例，用法为：

~~~java
Boolean result = obj instanceof Class
~~~

其中 obj 为一个对象，Class 表示一个类或者一个接口，当 obj 为 Class 的对象，或者是其直接或间接子类，或者是其接口的实现类，结果 result 都返回 true，否则返回 false。

注意：编译器会检查 obj 是否能转换成右边的 class 类型，如果不能转换则直接报错，如果不能确定类型，则通过编译，具体看运行时定。

~~~java
int i = 0;
System.out.println(i instanceof Integer); //编译不通过，i必须是引用类型，不能是基本类型
System.out.println(i instanceof Object); //编译不通过

Integer integer = new Integer(1);
System.out.println(integer instanceof Integer); //true

Object obj = null;
System.out.println(obj instanceof Integer); //false,在 JavaSE 规范中对 instanceof 运算符的规定就是：如果 obj 为 null，那么将返回false。
~~~

### 6、Java 自动装箱与拆箱

装箱就是自动将基本数据类型转换为包装器类型（int-->Integer）；调用方法：Integer 的 valueOf(int) 方法；拆箱就是自动将包装器类型转换为基本数据类型（Integer-->int）。调用方法：Integer 的 intValue 方法；

在 Java SE5 之前，如果要生成一个数值为 10 的 Integer 对象，必须这样进行：

~~~java
Integer i = new Integer(10);
~~~

而在从 Java SE5 开始就提供了自动装箱的特性，如果要生成一个数值为 10 的 Integer 对象，只需要这样就可以了：

~~~java
Integer i = 10;
~~~

### 7、 重载和重写的区别

1）重写(Override)

从字面上看，重写就是重新写一遍的意思，其实就是在子类中把父类本身有的方法重新写一遍。子类继承了父类原有的方法，但有时子类并不想原封不动的继承父类中的某个方法，所以在方法名、参数列表、返回类型(除过子类中方法的返回值是父类中方法返回值的子类时)都相同的情况下， 对方法体进行修改或重写，这就是重写。但要注意子类函数的访问修饰权限不能小于父类的。

~~~java
public class Father {
	public static void main(String[] args) {
		 // TODO Auto-generated method stub
		Son s = new Son();
		s.sayHello();
	}
	public void sayHello() {
		System.out.println("Hello");
	}
}
class Son extends Father{
	@Override
	public void sayHello() {
		// TODO Auto-generated method stub
		System.out.println("hello by ");
	}
}
~~~

总结：

* 发生在父类与子类之间；
* 方法名、参数列表、返回类型（除过子类中方法的返回类型是父类中返回类型的子类）必须相同；
* 访问修饰符的限制一定要大于被重写方法的访问修饰符（public>protected>default>private)；
* 重写方法一定不能抛出新的检查异常或者比被重写方法声明更加宽泛的检查型异常；

2）重载（Overload）

在一个类中，同名的方法如果有不同的参数列表（参数类型不同、参数个数不同甚至是参数顺序不同）则视为重载。同时，重载对返回类型没有要求，可以相同也可以不同，但不能通过返回类型是否相同来判断重载。

~~~java
public static void main(String[] args) {
	// TODO Auto-generated method stub
	Father s = new Father();
	s.sayHello();
	s.sayHello("wintershii");
}
public void sayHello() {
	System.out.println("Hello");
}
public void sayHello(String name) {
	System.out.println("Hello" + " " + name);
}
~~~

总结：

* 重载 Overload 是一个类中多态性的一种表现；
* 重载要求同名方法的参数列表不同(参数类型，参数个数甚至是参数顺序)；
* 重载的时候，返回值类型可以相同也可以不相同。无法以返回型别作为重载函数的区分标准；

### 8、 equals 与 == 的区别

1）== ：

== 比较的是变量(栈)内存中存放的对象的(堆)内存地址，用来判断两个对象的地址是否相同，即是否是指相同一个对象，比较的是真正意义上的指针操作。

* 比较的是操作符两端的操作数是否是同一个对象。
* 两边的操作数必须是同一类型的（可以是父子类之间）才能编译通过。
* 比较的是地址，如果是具体的阿拉伯数字的比较，值相等则为 true，如：

int a=10 与 long b=10L 与 double c=10.0 都是相同的（为 true），因为他们都指向地址为 10 的堆。

2）equals：

equals 用来比较的是两个对象的内容是否相等，由于所有的类都是继承自 java.lang.Object 类的，所以适用于所有对象，如果没有对该方法进行覆盖的话，调用的仍然是 Object 类中的方法，而 Object 中的 equals 方法返回的却是==的判断。

总结：

所有比较是否相等时，都是用 equals 。并且在对常量相比较时，把常量写在前面，因为使用 object 的 equals方法中， object 可能为 null 。在阿里的代码规范中只使用 equals ，阿里插件默认会识别，并可以快速修改，推荐安装阿里插件来排查老代码使用“==”，替换成 equals。

### 9、 Hashcode 的作用

Java 的集合有两类，一类是 List，还有一类是 Set。前者有序可重复，后者无序不重复。当我们在 set 中插入的时候怎么判断是否已经存在该元素呢，可以通过 equals 方法。但是如果元素太多，用这样的方法就会比较满。

于是有人发明了哈希算法来提高集合中查找元素的效率。 这种方式将集合分成若干个存储区域，每个对象可以计算出一个哈希码，可以将哈希码分组，每组分别对应某个存储区域，根据一个对象的哈希码就可以确定该对象应该存储的那个区域。

hashCode 方法可以这样理解：它返回的就是根据对象的内存地址换算出的一个值。这样一来，当集合要添加新的元素时，先调用这个元素的 hashCode 方法，就一下子能定位到它应该放置的物理位置上。如果这个位置上没有元素，它就可以直接存储在这个位置上，不用再进行任何比较了；如果这个位置上已经有元素了，就调用它的 equals 方法与新元素进行比较，相同的话就不存了，不相同就散列其它的地址。这样一来实际调用 equals 方法的次数就大大降低了，几乎只需要一两次。

### 10、String、StringBuﬀer 和 StringBuilder 的区别是什么?

String 是只读字符串，它并不是基本数据类型，而是一个对象。从底层源码来看是一个ﬁnal 类型的字符数组，所引用的字符串不能被改变，一经定义，无法再增删改。每次对 String 的操作都会生成新的 String 对象。

~~~java
private final char value[];
~~~

每次+操作 ： 隐式在堆上 new 了一个跟原字符串相同的 StringBuilder 对象，再调用 append 方法 拼接+后面的字符。

StringBuﬀer 和 StringBuilder 他们两都继承了 AbstractStringBuilder 抽象类，从 AbstractStringBuilder 抽象类中我们可以看到：

~~~java
/**
 * The value is used for character storage.
 */
char[] value;
~~~

他们的底层都是可变的字符数组，所以在进行频繁的字符串操作时，建议使用 StringBuﬀer 和 StringBuilder 来进行操作。 另外 StringBuﬀer 对方法加了同步锁或者对调用的方法加了同步锁，所以是线程安全的。StringBuilder 并没有对方法进行加同步锁，所以是非线程安全的。

### 11、ArrayList 和 linkedList 的区别？

Array（数组）是基于索引(index)的数据结构，它使用索引在数组中搜索和读取数据是很快的。Array 获取数据的时间复杂度是 O(1)，但是要删除数据却是开销很大，因为这需要重排数组中的所有数据,(因为删除数据以后，需要把后面所有的数据前移)。

缺点：数组初始化必须指定初始化的长度，否则报错。

例如：

~~~java
int[] a = new int[4];
//推介使用 int[] 这种方式初始化
int c[] = {23,43,56,78};
//长度：4，索引范围：[0,3]
~~~

List—是一个有序的集合，可以包含重复的元素，提供了按索引访问的方式，它继承 Collection。List 有两个重要的实现类：ArrayList 和 LinkedList。

ArrayList：可以看作是能够自动增长容量的数组

* ArrayList 的 toArray 方法返回一个数组
* ArrayList 的 asList 方法返回一个列表
* ArrayList 底层的实现是 Array，数组扩容实现

LinkList 是一个双向链表，在添加和删除元素时具有比 ArrayList 更好的性能，但在 get 与 set 方面弱于ArrayList。当然，这些对比都是指数据量很大或者操作很频繁。

### 12、 HashMap 和 Hashtable 的区别

1）两者父类不同

HashMap 是继承自 AbstractMap 类，而 Hashtable 是继承自 Dictionary 类。不过它们都实现了 Map、Cloneable（可复制）、Serializable（可序列化）这三个接口。

2）对外提供的接口不同

Hashtable 比 HashMap 多提供了 elments() 和 contains() 两个方法：

* elments() 方法继承自 Hashtable 的父类 Dictionnary，elements() 方法用于返回此 Hashtable 中的 value 的枚举。
* contains()方法判断该 Hashtable 是否包含传入的 value，它的作用与 containsValue()一致。事实上，contansValue() 就只是调用了一下 contains() 方法。

3）对 null 的支持不同

* Hashtable：key 和 value 都不能为 null。
* HashMap：key 可以为 null，但是这样的 key 只能有一个，因为必须保证 key 的唯一性；可以有多个 key 值对应的 value 为 null。

4）安全性不同

* HashMap 是线程不安全的，在多线程并发的环境下，可能会产生死锁等问题，因此需要开发人员自己处理多线程的安全问题。
* Hashtable 是线程安全的，它的每个方法上都有 synchronized 关键字，因此可直接用于多线程中。

虽然 HashMap 是线程不安全的，但是它的效率远远高于 Hashtable，这样设计是合理的，因为大部分的使用场景都是单线程。当需要多线程操作的时候可以使用线程安全的 ConcurrentHashMap。ConcurrentHashMap 虽然也是线程安全的，但是它的效率比 Hashtable 要高好多倍。因为ConcurrentHashMap 使用了分段锁，并不对整个数据进行锁定。

5）计算 hash 值的方法不同

### 13、 Collection 包结构，以及与 Collections 的区别？

* Collection 是集合类的上级接口，子接口有 Set、List、LinkedList、ArrayList、Vector、Stack、Set；
* Collections 是集合类的一个帮助类， 它包含有各种有关集合操作的静态多态方法，用于实现对各种集合的搜索、排序、线程安全化等操作。此类不能实例化，就像一个工具类，服务于 Java 的 Collection 框架。

### 14、 Java 的四种引用类型？

1）强引用

强引用是平常中使用最多的引用，强引用在程序内存不足（OOM）的时候也不会被回收，使用方式：

~~~java
String str = new String("str");
~~~

2）软引用

软引用在程序内存不足时，会被回收，使用方式：

~~~java
// 注意：wrf 这个引用也是强引用，它是指向 SoftReference 这个对象的，
// 这里的软引用指的是指向 new String("str")的引用，也就是 SoftReference 类中 T
SoftReference<String> wrf = new SoftReference<String>(new String("str"));
~~~

可用场景： 创建缓存的时候，创建的对象放进缓存中，当内存不足时，JVM 就会回收早先创建的对象。

3）弱引用

弱引用就是只要 JVM 垃圾回收器发现了它，就会将之回收，使用方式：

~~~java
WeakReference<String> wrf = new WeakReference<String>(str);
~~~

可用场景： Java 源码中的 java.util.WeakHashMap 中的 key 就是使用弱引用。我的理解就是，一旦我不需要某个引用，JVM 会自动帮我处理它，这样我就不需要做其它操作。

4）虚引用

虚引用的回收机制跟弱引用差不多，但是它被回收之前，会被放入 ReferenceQueue 中。注意哦，其它引用是被 JVM 回收后才被传入 ReferenceQueue 中的，由于这个机制，所以虚引用大多被用于引用销毁前的处理工作。还有就是，虚引用创建的时候，必须带有 ReferenceQueue，使用例子：

~~~java
PhantomReference<String> prf = new PhantomReference<String>(new
String("str"), new ReferenceQueue<>());
~~~

可用场景： 对象销毁前的一些操作，比如说资源释放等。Object.finalize()虽然也可以做这类动作，但是这个方式即不安全又低效。

### 15、 泛型常用特点

泛型是 Java SE 1.5 之后的特性， 《Java 核心技术》中对泛型的定义是：

“泛型” 意味着编写的代码可以被不同类型的对象所重用。

“泛型”，顾名思义，“泛指的类型”。我们提供了泛指的概念，但具体执行的时候却可以有具体的规则来约束，比如我们用的非常多的 ArrayList 就是个泛型类，ArrayList 作为集合可以存放各种元素，如 Integer、String以及自定义的各种类型等，但在我们使用的时候通过具体的规则来约束，如我们可以约束集合中只存放 Integer 类型的元素，如

~~~java
List<Integer> iniData = new ArrayList<>();
~~~

使用泛型的好处？

以集合来举例，使用泛型的好处是我们不必因为添加元素类型的不同而定义不同类型的集合，如整型集合类，浮点型集合类，字符串集合类，我们可以定义一个集合来存放整型、浮点型，字符串型数据，而这并不是最重要的，因为我们只要把底层存储设置了 Object 即可，添加的数据全部都可向上转型为 Object。 更重要的是我们可以通过规则按照自己的想法控制存储的数据类型。

### 16、Java 创建对象有几种方式？

Java 中提供了以下四种创建对象的方式：

* new 创建新对象
* 通过反射机制
* 采用 clone 机制
* 通过序列化机制

### 17、有没有可能两个不相等的对象有相同的 hashcode？

有可能。在产生 hash 冲突时，两个不相等的对象就会有相同的 hashcode 值。当 hash 冲突产生时，一般有以下几种方式来处理：

* 拉链法：每个哈希表节点都有一个 next 指针，多个哈希表节点可以用 next 指针构成一个单向链表，被分配到同一个索引上的多个节点可以用这个单向链表进行存储。
* 开放定址法：一旦发生了冲突，就去寻找下一个空的散列地址，只要散列表足够大，空的散列地址总能找到，并将记录存入。
* 再哈希：又叫双哈希法，有多个不同的 Hash 函数。当发生冲突时，使用第二个，第三个….等哈希函数计算地址，直到无冲突。

### 18、深拷贝和浅拷贝的区别是什么?

浅拷贝：被复制对象的所有变量都含有与原来的对象相同的值，而所有的对其他对象的引用仍然指向原来的对象。换言之，浅拷贝仅仅复制所考虑的对象，而不复制它所引用的对象。

深拷贝：被复制对象的所有变量都含有与原来的对象相同的值。而那些引用其他对象的变量将指向被复制过的新对象，而不再是原有的那些被引用的对象。换言之，深拷贝把要复制的对象所引用的对象都。

### 19、ﬁnal 有哪些用法?

ﬁnal 也是很多面试喜欢问的地方，但我觉得这个问题很无聊，通常能回答下以下 5 点就不错了：

* 被ﬁnal 修饰的类不可以被继承；
* 被ﬁnal 修饰的方法不可以被重写；
* 被ﬁnal 修饰的变量不可以被改变，如果修饰引用，那么表示引用不可变，引用指向的内容可变；
* 被ﬁnal 修饰的方法，JVM 会尝试将其内联，以提高运行效率；
* 被ﬁnal 修饰的常量，在编译阶段会存入常量池中；

除此之外，编译器对ﬁnal 域要遵守的两个重排序规则更好：

* 在构造函数内对一个ﬁnal 域的写入，与随后把这个被构造对象的引用赋值给一个引用变量，这两个操作之间不能重排序；
* 初次读一个包含ﬁnal 域的对象的引用，与随后初次读这个ﬁnal 域，这两个操作之间不能重排序；

### 20、static 都有哪些用法?

所有的人都知道 static 关键字这两个基本的用法：静态变量和静态方法，也就是被 static 所修饰的变量/方法都属于类的静态资源，类实例所共享。

除了静态变量和静态方法之外，static 也用于静态块，多用于初始化操作：

~~~java
public calss PreCache{
	static {
		//执行相关操作
	}
}
~~~

此外 static 也多用于修饰内部类，此时称之为静态内部类。

最后一种用法就是静态导包，即 import static。import static 是在 JDK 1.5 之后引入的新特性，可以用来指定导入某个类中的静态资源，并且不需要使用类名，可以直接使用资源名，比如：

~~~java
import static java.lang.Math.*;
public class Test{
	public static void main(String[] args) {
		//System.out.println(Math.sin(20)); //传统做法
		System.out.println(sin(20));
	}
}
~~~

### 21、`3*0.1 == 0.3` 返回值是什么？

false，因为有些浮点数不能完全精确的表示出来。

### 22、a=a+b 与 a+=b 有什么区别吗?

+操作符会进行隐式自动类型转换，此处 a+=b 隐式的将加操作的结果类型强制转换为持有结果的类型：

~~~java
byte a = 127;
byte b = 127;
b = a + b; //报编译错误: cannot convert from int to byte
b += a;
~~~

以下代码是否有错，有的话怎么改？

~~~java
short s1= 1;
s1 = s1 + 1;
~~~

有错误。short 类型在进行运算时会自动提升为 int 类型，也就是说 s1+1 的运算结果是 int 类型，而 s1 是 short 类型，此时编译器会报错。

正确写法：

~~~java
short s1= 1;
s1 += 1;
~~~

+=操作符会对右边的表达式结果强转匹配左边的数据类型，所以没错。

### 23、try catch ﬁnally，try 里有 return，ﬁnally 还执行么？

执行，并且ﬁnally 的执行早于 try 里面的 return。

结论：

* 不管有没有出现异常，ﬁnally 块中代码都会执行；
* 当 try 和 catch 中有 return 时，ﬁnally 仍然会执行；
* ﬁnally 是在 return 后面的表达式运算后执行的（此时并没有返回运算后的值，而是先把要返回的值保存起来，管ﬁnally 中的代码怎么样，返回的值都不会改变，任然是之前保存的值），所以函数返回值是在ﬁnally 执行前确定的；
* ﬁnally 中最好不要包含 return，否则程序会提前退出，返回值不是 try 或 catch 中保存的返回值。

### 24、 Exception 与 Error 包结构？

Java 可抛出(Throwable)的结构分为三种类型：被检查的异常(CheckedException)，运行时异常(RuntimeException)，错误(Error)。

1）运行时异常

定义：RuntimeException 及其子类都被称为运行时异常。

特点：Java 编译器不会检查它。也就是说，当程序中可能出现这类异常时，倘若既"没有通过 throws 声明抛出它"，也"没有用 try-catch 语句捕获它"，还是会编译通过。例如，除数为零时产生的 ArithmeticException 异常，数组越界时产生的 IndexOutOfBoundsException 异常，fail-fast 机制产生的 ConcurrentModiﬁcationException 异常（java.util 包下面的所有的集合类都是快速失败的，“快速失败”也就是 fail-fast，它是 Java 集合的一种错误检测机制。当多个线程对集合进行结构上的改变的操作时，有可能会产生 fail-fast 机制。记住是有可能，而不是一定。例如：假设存在两个线程（线程 1、线程 2），线程 1 通过 Iterator 在遍历集合 A 中的元素，在某个时候线程 2 修改了集合 A 的结构（是结构上面的 ConcurrentModiﬁcationException 异常，从而产生 fail-fast 机制，这个错叫并发修改异常。Fail-safe，java.util.concurrent 包下面的所有的类都是安全失败的，在遍历过程中，如果已经遍历的数组上的内容变化了，迭代器不会抛出 ConcurrentModiﬁcationException 异常。如果未遍历的数组上的内容发生了变化，则有可能反映到迭代过程中。这就是 ConcurrentHashMap 迭代器弱一致的表现。ConcurrentHashMap 的弱一致性主要是为了提升效率，是一致性与效率之间的一种权衡。要成为强一致性，就得到处使用锁，甚至是全局锁，这就与 Hashtable 和同步的 HashMap 一样了。）等，都属于运行时异常。

常见的五种运行时异常：

* ClassCastException（类转换异常）
* IndexOutOfBoundsException（数组越界）
* NullPointerException（空指针异常）
* ArrayStoreException（数据存储异常，操作数组是类型不一致）
* BuﬀerOverﬂowException

2）被检查异常

定义:：Exception 类本身，以及 Exception 的子类中除了"运行时异常"之外的其它子类都属于被检查异常。

特点：Java 编译器会检查它。 此类异常，要么通过 throws 进行声明抛出，要么通过 try-catch 进行捕获处理，否则不能通过编译。例如，CloneNotSupportedException 就属于被检查异常。当通过 clone()接口去克隆一个对象，而该对象对应的类没有实现 Cloneable 接口，就会抛出 CloneNotSupportedException 异常。被检查异常通常都是可以恢复的。

如：

* IOException
* FileNotFoundException
* SQLException

被检查的异常适用于那些不是因程序引起的错误情况，比如：读取文件时文件不存在引发的FileNotFoundException 。然而，不被检查的异常通常都是由于糟糕的编程引起的，比如：在对象引用时没有确保对象非空而引起的 NullPointerException 。

3）错误

定义：Error 类及其子类。

特点：和运行时异常一样，编译器也不会对错误进行检查。

当资源不足、约束失败、或是其它程序无法继续运行的条件发生时，就产生错误。程序本身无法修复这些错误的。例如，VirtualMachineError 就属于错误。出现这种错误会导致程序终止运行。OutOfMemoryError、ThreadDeath。

Java 虚拟机规范规定 JVM 的内存分为了好几块，比如堆，栈，程序计数器，方法区等

### 25、OOM 你遇到过哪些情况，SOF 你遇到过哪些情况？

1）OOM：OutOfMemoryError

* Java Heap 溢出

一般的异常信息：java.lang.OutOfMemoryError:Java heap spacess。

Java 堆用于存储对象实例，我们只要不断的创建对象，并且保证 GC Roots 到对象之间有可达路径来避免垃圾回收机制清除这些对象，就会在对象数量达到最大堆容量限制后产生内存溢出异常。

出现这种异常，一般手段是先通过内存映像分析工具(如 Eclipse Memory Analyzer)对 dump 出来的堆转存快照进行分析，重点是确认内存中的对象是否是必要的，先分清是因为内存泄漏(Memory Leak)还是内存溢出(Memory Overﬂow)。

如果是内存泄漏，可进一步通过工具查看泄漏对象到 GCRoots 的引用链，于是就能找到泄漏对象是通过怎样的路径与 GC Roots 相关联并导致垃圾收集器无法自动回收。如果不存在泄漏，那就应该检查虚拟机的参数(-Xmx 与-Xms)的设置是否适当。

* 虚拟机栈和本地方法栈溢出

如果线程请求的栈深度大于虚拟机所允许的最大深度，将抛出 StackOverﬂowError 异常。如果虚拟机在扩展栈时无法申请到足够的内存空间，则抛出 OutOfMemoryError 异常。这里需要注意当栈的大小越大可分配的线程数就越少。

* 运行时常量池溢出

异常信息：java.lang.OutOfMemoryError:PermGenspace

如果要向运行时常量池中添加内容，最简单的做法就是使用 String.intern()这个 Native 方法。该方法的作用是：如果池中已经包含一个等于此 String 的字符串，则返回代表池中这个字符串的 String 对象；否则，将此 String 对象包含的字符串添加到常量池中，并且返回此 String 对象的引用。由于常量池分配在方法区内，我们可以通过-XX:PermSize 和-XX:MaxPermSize 限制方法区的大小，从而间接限制其中常量池的容量。

* 方法区溢出

方法区用于存放 Class 的相关信息，如类名、访问修饰符、常量池、字段描述、方法描述等。也有可能是方法区中保存的 class 对象没有被及时回收掉或者 class 信息占用的内存超过了我们配置。

异常信息：java.lang.OutOfMemoryError:PermGenspace

方法区溢出也是一种常见的内存溢出异常，一个类如果要被垃圾收集器回收，判定条件是很苛刻的。在经常动态生成大量 Class 的应用中，要特别注意这点。

2）SOF（堆栈溢出 StackOverﬂow）

StackOverﬂowError 的定义：当应用程序递归太深而发生堆栈溢出时，抛出该错误。

因为栈一般默认为 1-2m，一旦出现死循环或者是大量的递归调用，在不断的压栈过程中，造成栈容量超过 1m 而导致溢出。

栈溢出的原因：递归调用，大量循环或死循环，全局变量是否过多，数组、List、map 数据过大。

### 26、 简述线程、程序、进程的基本概念，以及他们之间关系是什么?

线程与进程相似，但线程是一个比进程更小的执行单位。一个进程在其执行的过程中可以产生多个线程。与进程不同的是同类的多个线程共享同一块内存空间和一组系统资源，所以系统在产生一个线程，或是在各个线程之间作切换工作时，负担要比进程小得多，也正因为如此，线程也被称为轻量级进程。程序是含有指令和数据的文件，被存储在磁盘或其他的数据存储设备中，也就是说程序是静态的代码。

进程是程序的一次执行过程，是系统运行程序的基本单位，因此进程是动态的。系统运行一个程序即是一个进程从创建，运行到消亡的过程。简单来说，一个进程就是一个执行中的程序，它在计算机中一个指令接着一个指令地执行着，同时，每个进程还占有某些系统资源如 CPU 时间，内存空间，文件，输入输出设备的使用权等等。换句话说，当程序在执行时，将会被操作系统载入内存中。 线程是进程划分成的更小的运行单位。线程和进程最大的不同在于基本上各进程是独立的，而各线程则不一定，因为同一进程中的线程极有可能会相互影响。从另一角度来说，进程属于操作系统的范畴，主要是同一段时间内，可以同时执行一个以上的程序，而线程则是在同一程序内几乎同时执行一个以上的程序段。

### 27、线程有哪些基本状态?

Java 线程在运行的生命周期中的指定时刻只可能处于下面 6 种不同状态的其中一个状态（图源《Java 并发编程艺术》4.1.4 节）。

### 28、Java 序列化中如果有些字段不想进行序列化，怎么办？

对于不想进行序列化的变量，使用 transient 关键字修饰。

transient 关键字的作用是：阻止实例中那些用此关键字修饰的的变量序列化；当对象被反序列化时，被 transient 修饰的变量值不会被持久化和恢复。transient 只能修饰变量，不能修饰类和方法。

### 29、Java 中 IO 流分为几种?

* 按照流的流向分，可以分为输入流和输出流；
* 按照操作单元划分，可以划分为字节流和字符流；
* 按照流的角色划分为节点流和处理流。

Java IO 流共涉及 40 多个类，这些类看上去很杂乱，但实际上很有规则，而且彼此之间存在非常紧密的联系， Java IO 流的 40 多个类都是从如下 4 个抽象类基类中派生出来的：

* InputStream/Reader：所有的输入流的基类，前者是字节输入流，后者是字符输入流。
* OutputStream/Writer：所有输出流的基类，前者是字节输出流，后者是字符输出流。

### 30、 Java IO 与 NIO 的区别？

NIO 即 New IO，这个库是在 JDK1.4 中才引入的。NIO 和 IO 有相同的作用和目的，但实现方式不同，NIO 主要用到的是块，所以 NIO 的效率要比 IO 高很多。在 Java API 中提供了两套 NIO，一套是针对标准输入输出 NIO，另一套就是网络编程 NIO。

### 31、Java 反射的作用与原理？

1）定义

反射机制是在运行时，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意个对象，都能够调用它的任意一个方法。在 Java 中，只要给定类的名字，就可以通过反射机制来获得类的所有信息。这种动态获取的信息以及动态调用对象的方法的功能称为 Java 语言的反射机制。

2）哪里会用到反射机制？

JDBC 就是典型的反射：

~~~java
Class.forName('com.mysql.jdbc.Driver.class');
//加载 MySQL 的驱动类
~~~

这就是反射，如 Hibernate，Struts 等框架使用反射实现的。获取 Class 对象，有 4 中方法：

* Class.forName(“类的路径”)；
* 类名.class
* 对象名.getClass()
* 基本类型的包装类，可以调用包装类的 Type 属性来获得该包装类的 Class 对象

3）实现 Java 反射的类：

* Class：表示正在运行的 Java 应用程序中的类和接口。注意： 所有获取对象的信息都需要 Class 类来实现。
* Field：提供有关类和接口的属性信息，以及对它的动态访问权限。
* Constructor：提供关于类的单个构造方法的信息以及它的访问权限。
* Method：提供类或接口中某个方法的信息。

4）反射机制的优缺点：

优点：

* 能够运行时动态获取类的实例，提高灵活性；
* 与动态编译结合；

缺点：

* 使用反射性能较低，需要解析字节码，将内存中的对象进行解析。

解决方案：

* 通过 setAccessible(true)关闭 JDK 的安全检查来提升反射速度；
* 多次创建一个类的实例时，有缓存会快很多；
* ReﬂectASM 工具类，通过字节码生成的方式加快反射速度；
* 相对不安全，破坏了封装性（因为通过反射可以获得私有方法和属性）；

### 32、说说 List、Set、Map 三者的区别？

* List(对付顺序的好帮手)： List 接口存储一组不唯一，可以有多个元素引用相同的对象，有序的对象。
* Set(注重独一无二的性质)：不允许重复的集合，不会有多个元素引用相同的对象。
* Map(用 Key 来搜索的专家)：使用键值对存储，Map 会维护与 Key 有关联的值，两个 Key 可以引用相同的对象，但 Key 不能重复，典型的 Key 是 String 类型，但也可以是任何对象。



<br/><br/><br/>

---

