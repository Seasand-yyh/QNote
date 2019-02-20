# gitbook笔记汇总

---

gitbook使用方法

1、gitbook是基于Nodejs的，应先搭建好Nodejs环境，然后再进行安装：
npm install -g gitbook-cli

2、gitbook常用命令

1）gitbook -h
查看帮助

2）gitbook init
执行gitbook init命令，gitbook会查找SUMMARY.md文件中描述的目录和文件，如果没有则会将其创建。

3）gitbook build
默认将生成的静态网站输出到 _book 目录，也可以手动指定：
gitbook build 书籍路径 输出路径

4）gitbook serve
通过nodejs启动服务来预览当前书籍，默认端口4000，即打开浏览器访问 http://localhost:4000即可预览。也可以手动指定端口：
gitbook serve --port 8888

3、导出其它格式（可能需要安装插件）
生成 PDF 格式的电子书：
gitbook pdf ./ ./mybook.pdf

生成 epub 格式的电子书：
gitbook epub ./ ./mybook.epub

生成 mobi 格式的电子书：
gitbook mobi ./ ./mybook.mobi



---

