/**
 * app.js
 * @author  Seasand-yyh
 * @date  2019-02-18
 */
var app = {

  //文档路径.
  docs_base: './docs',

  //文档首页.
  doc_index: 'index.md',

  //侧边栏数据文件.
  sidebar_file: 'summary.json',

  //内容区域id.
  content_id: '#page-content',

  /**
   * 初始化.
   */
  init: function() {
    //初始化侧边栏.
    app.initSidebar();

    //打开/关闭侧边栏.
    app.toggleSidebar();

    //路由.
    app.router();
    $(window).on('hashchange', app.router);
  },

  /**
   * 初始化侧边栏.
   */
  initSidebar: function() {
    var sidebar_filename = app.docs_base + '/' + app.sidebar_file;
    //加载侧边栏数据.
    $.get(sidebar_filename, function(data) {
      if(data) {
        //构建侧边栏.
        app.buildSidebar(JSON.parse(data));
      }
    }, "text").fail(function() {
      alert("Opps! can't find the sidebar file to display!");
    });
  },

  /**
   * 构建侧边栏.
   */
  buildSidebar: function(datas) {
    if(!datas) return;

    var menuStrs = [];
    for(var i=0; i<datas.length; i++) {
      var menu = datas[i];
      var submenus = menu.childs || [];

      //二级菜单.
      var submenuStrs = [];
      for(var j=0; j<submenus.length; j++) {
        var submenu = submenus[j];
        submenuStrs.push('<li><a href="#docs/'+submenu.url+'/index">'+submenu.name+'</a></li>');
      }

      //一级菜单.
      menuStrs.push('<li>');
      menuStrs.push('<a href="#'+menu.name+'" class="collapsed" data-toggle="collapse">'+menu.name+'</a>');
      menuStrs.push('<ul id="'+menu.name+'" class="collapse sub-menu">');
      menuStrs.push(submenuStrs.join(''));
      menuStrs.push('</ul>');
      menuStrs.push('</li>');
    }
    $('#sidebar-wrapper .sidebar-nav').html(menuStrs.join(''));

    //侧边栏高亮当前项.
    app.highLightCurrentMenu();
  },

  /**
   * 侧边栏高亮当前项.
   */
  highLightCurrentMenu: function(){
    $('ul.sub-menu a').bind('click', function(e) {
      $('ul.sub-menu li').removeClass('highlight');
      $(this).parent('li').addClass('highlight');
    });
  },

  /**
   * 打开/关闭侧边栏.
   */
  toggleSidebar: function() {
    var trigger = $('.hamburger');
    var isClosed = false;

    trigger.click(function() {
      if(isClosed == true) {
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    });

    $('#trigger').click(function() {
      $('#wrapper').toggleClass('toggled');
    });
  },

  /**
   * 路由.
   */
  router: function() {
    var path = location.hash.replace(/#([^#]*)(#.*)?/, './$1');
    // default page if hash is empty.
    if (path === "") {
      path = app.docs_base + '/' + app.doc_index;
    } else {
      path = path + '.md';
    }
    //加载文档数据.
    app.getDocData(path);
    //页面滚动回到顶部.
    $('#page-content-top')[0].scrollIntoView();
  },

  /**
   * 加载文档数据.
   */
  getDocData: function(path) {
    $.get(path, function(data) {
      //marked解析文档数据并显示.
      $(app.content_id).html(marked(data));
      //修正路径.
      app.normalizePaths();
      //代码高亮.
      $(app.content_id + ' pre code').map(function() {
        hljs.highlightBlock(this);
      });
    }, "text").fail(function() {
      alert("Opps! can't find this file to display!");
    });
  },

  /**
   * 修正路径.
   */
  normalizePaths: function() {
    // images.
    $(app.content_id + " img").map(function() {
      var src = $(this).attr("src").replace("./", "");
      if ($(this).attr("src").slice(0, 4) !== "http") {
        var pathname = location.pathname.replace('/index.html', '');
        var url = location.hash.replace("#", "");
        var base_dir = url.substring(0, url.lastIndexOf('/'));
        // normalize the path. (i.e. make it absolute)
        $(this).attr("src", pathname + '/' + base_dir + "/" + src);
      }
    });
  }

};
