# Temp

---

1、v-cloak

~~~html
<p>{{msg}}</p>
~~~

上面代码，在网络延迟比较严重时，页面上会直接显示`{{msg}}`，用户体验不好。

~~~html
<style>
[v-cloak] {display: none;}
</style>

<p v-cloak>{{msg}}</p>
~~~

加上`v-cloak`指令，在数据加载完成前，p标签中会有`v-cloak`属性，此时样式为不显示；加载完成后去掉了`v-cloak`属性，p标签显示出来。



2、v-cloak与v-text

v-text也能起到v-cloak的作用。

~~~html
<p v-cloak>====={{msg}}=====</p>
<p v-text="msg">==========</p>
~~~

v-text会覆盖p标签原有的内容。



3、











<br/><br/><br/>

---

