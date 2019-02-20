# Windows下Git SSH创建Key步骤

---

1、打开Git客户端工具，进入.ssh文件夹：

![1550632319240](images/1550632319240.png)

~~~
cd ~/.ssh/
~~~

![1550632631749](images/1550632631749.png)

如果提示 `“ No such file or directory”`，可以手动创建一个 .ssh文件夹：

~~~
mkdir ~/.ssh
~~~

![1550632534841](images/1550632534841.png)



2、配置全局的name和email，即github的name和email

~~~
git config --global user.name "your name here"

git config --global user.email "your email here"
~~~



3、生成ssh key

~~~
ssh-keygen -t rsa -C "your email here"
~~~

输入以上命令，会提示输入key保存路径及key密码。按回车确认，保持默认即可。最后得到了两个文件：id_rsa和id_rsa.pub。



4、打开Admin目录进入.ssh文件夹，用记事本打开id_rsa.pub，复制里面的内容添加到github的ssh设置里即可

![1550633940419](images/1550633940419.png)

![1550633770826](images/1550633770826.png)



5、测试是否添加成功

~~~
ssh git@github.com
~~~

出现提示：“Hi xxxxx! You've successfully authenticated, but GitHub does not provide shel l access.”说明添加成功。

![1550633465659](images/1550633465659.png)



---

