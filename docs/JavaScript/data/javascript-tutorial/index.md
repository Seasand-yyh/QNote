# JavaScript 语言入门教程

作者：[阮一峰](http://www.ruanyifeng.com)

## 目录

[前言](#docs/JavaScript/data/javascript-tutorial/README)
1. 入门篇
	1. [导论](#docs/JavaScript/data/javascript-tutorial/docs/basic/introduction)
	1. [历史](#docs/JavaScript/data/javascript-tutorial/docs/basic/history)
	1. [基本语法](#docs/JavaScript/data/javascript-tutorial/docs/basic/grammar)
1. 数据类型
	1. [概述](#docs/JavaScript/data/javascript-tutorial/docs/types/general)
	1. [null，undefined 和布尔值](#docs/JavaScript/data/javascript-tutorial/docs/types/null-undefined-boolean)
	1. [数值](#docs/JavaScript/data/javascript-tutorial/docs/types/number)
	1. [字符串](#docs/JavaScript/data/javascript-tutorial/docs/types/string)
	1. [对象](#docs/JavaScript/data/javascript-tutorial/docs/types/object)
	1. [函数](#docs/JavaScript/data/javascript-tutorial/docs/types/function)
	1. [数组](#docs/JavaScript/data/javascript-tutorial/docs/types/array)
1. 运算符
	1. [算术运算符](#docs/JavaScript/data/javascript-tutorial/docs/operators/arithmetic)
	1. [比较运算符](#docs/JavaScript/data/javascript-tutorial/docs/operators/comparison)
	1. [布尔运算符](#docs/JavaScript/data/javascript-tutorial/docs/operators/boolean)
	1. [二进制位运算符](#docs/JavaScript/data/javascript-tutorial/docs/operators/bit)
	1. [其他运算符，运算顺序](#docs/JavaScript/data/javascript-tutorial/docs/operators/priority)
1. 语法专题
	1. [数据类型的转换](#docs/JavaScript/data/javascript-tutorial/docs/features/conversion)
	1. [错误处理机制](#docs/JavaScript/data/javascript-tutorial/docs/features/error)
	1. [编程风格](#docs/JavaScript/data/javascript-tutorial/docs/features/style)
	1. [console对象与控制台](#docs/JavaScript/data/javascript-tutorial/docs/features/console)
1. 标准库
	1. [Object 对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/object)
	1. [属性描述对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/attributes)
	1. [Array 对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/array)
	1. [包装对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/wrapper)
	1. [Boolean 对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/boolean)
	1. [Number 对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/number)
	1. [String 对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/string)
	1. [Math 对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/math)
	1. [Date 对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/date)
	1. [RegExp 对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/regexp)
	1. [JSON 对象](#docs/JavaScript/data/javascript-tutorial/docs/stdlib/json)
1. 面向对象编程
	1. [实例对象与 new 命令](#docs/JavaScript/data/javascript-tutorial/docs/oop/new)
	1. [this 关键字](#docs/JavaScript/data/javascript-tutorial/docs/oop/this)
	1. [对象的继承](#docs/JavaScript/data/javascript-tutorial/docs/oop/prototype)
	1. [Object 对象的相关方法](#docs/JavaScript/data/javascript-tutorial/docs/oop/object)
	1. [严格模式](#docs/JavaScript/data/javascript-tutorial/docs/oop/strict)
1. 异步操作
	1. [概述](#docs/JavaScript/data/javascript-tutorial/docs/async/general)
	1. [定时器](#docs/JavaScript/data/javascript-tutorial/docs/async/timer)
	1. [Promise 对象](#docs/JavaScript/data/javascript-tutorial/docs/async/promise)
1. DOM
	1. [概述](#docs/JavaScript/data/javascript-tutorial/docs/dom/general)
	1. [Node 接口](#docs/JavaScript/data/javascript-tutorial/docs/dom/node)
	1. [NodeList 接口，HTMLCollection 接口](#docs/JavaScript/data/javascript-tutorial/docs/dom/nodelist)
	1. [ParentNode 接口，ChildNode 接口](#docs/JavaScript/data/javascript-tutorial/docs/dom/parentnode)
	1. [Document 节点](#docs/JavaScript/data/javascript-tutorial/docs/dom/document)
	1. [Element 节点](#docs/JavaScript/data/javascript-tutorial/docs/dom/element)
	1. [属性的操作](#docs/JavaScript/data/javascript-tutorial/docs/dom/attributes)
	1. [Text 节点和 DocumentFragment 节点](#docs/JavaScript/data/javascript-tutorial/docs/dom/text)
	1. [CSS 操作](#docs/JavaScript/data/javascript-tutorial/docs/dom/css)
	1. [Mutation Observer API](#docs/JavaScript/data/javascript-tutorial/docs/dom/mutationobserver)
1. 事件
	1. [EventTarget 接口](#docs/JavaScript/data/javascript-tutorial/docs/events/eventtarget)
	1. [事件模型](#docs/JavaScript/data/javascript-tutorial/docs/events/model)
	1. [Event 对象](#docs/JavaScript/data/javascript-tutorial/docs/events/event)
	1. [鼠标事件](#docs/JavaScript/data/javascript-tutorial/docs/events/mouse)
	1. [键盘事件](#docs/JavaScript/data/javascript-tutorial/docs/events/keyboard)
	1. [进度事件](#docs/JavaScript/data/javascript-tutorial/docs/events/progress)
	1. [表单事件](#docs/JavaScript/data/javascript-tutorial/docs/events/form)
	1. [触摸事件](#docs/JavaScript/data/javascript-tutorial/docs/events/touch)
	1. [拖拉事件](#docs/JavaScript/data/javascript-tutorial/docs/events/drag)
	1. [其他常见事件](#docs/JavaScript/data/javascript-tutorial/docs/events/common)
	1. [GlobalEventHandlers 接口](#docs/JavaScript/data/javascript-tutorial/docs/events/globaleventhandlers)
1. 浏览器模型
	1. [浏览器模型概述](#docs/JavaScript/data/javascript-tutorial/docs/bom/engine)
	1. [window 对象](#docs/JavaScript/data/javascript-tutorial/docs/bom/window)
	1. [Navigator 对象，Screen 对象](#docs/JavaScript/data/javascript-tutorial/docs/bom/navigator)
	1. [Cookie](#docs/JavaScript/data/javascript-tutorial/docs/bom/cookie)
	1. [XMLHttpRequest 对象](#docs/JavaScript/data/javascript-tutorial/docs/bom/xmlhttprequest)
	1. [同源限制](#docs/JavaScript/data/javascript-tutorial/docs/bom/same-origin)
	1. [CORS 通信](#docs/JavaScript/data/javascript-tutorial/docs/bom/cors)
	1. [Storage 接口](#docs/JavaScript/data/javascript-tutorial/docs/bom/storage)
	1. [History 对象](#docs/JavaScript/data/javascript-tutorial/docs/bom/history)
	1. [Location 对象，URL 对象，URLSearchParams 对象](#docs/JavaScript/data/javascript-tutorial/docs/bom/location)
	1. [ArrayBuffer 对象，Blob 对象](#docs/JavaScript/data/javascript-tutorial/docs/bom/arraybuffer)
	1. [File 对象，FileList 对象，FileReader 对象](#docs/JavaScript/data/javascript-tutorial/docs/bom/file)
	1. [表单，FormData 对象](#docs/JavaScript/data/javascript-tutorial/docs/bom/form)
	1. [IndexedDB API](#docs/JavaScript/data/javascript-tutorial/docs/bom/indexeddb)
	1. [Web Worker](#docs/JavaScript/data/javascript-tutorial/docs/bom/webworker)
1. 附录：网页元素接口
	1. [a](#docs/JavaScript/data/javascript-tutorial/docs/elements/a)
	1. [img](#docs/JavaScript/data/javascript-tutorial/docs/elements/image)
	1. [form](#docs/JavaScript/data/javascript-tutorial/docs/elements/form)
	1. [input](#docs/JavaScript/data/javascript-tutorial/docs/elements/input)
	1. [button](#docs/JavaScript/data/javascript-tutorial/docs/elements/button)
	1. [option](#docs/JavaScript/data/javascript-tutorial/docs/elements/option)
	1. [video，audio](#docs/JavaScript/data/javascript-tutorial/docs/elements/video)



<br/><br/><br/>

---

