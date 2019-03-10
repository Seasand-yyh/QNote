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
	sidebar_file: 'summary.md',

	//侧边栏id.
	sidebar_id: '#side_bar',

	//内容区域id.
	content_id: '#content',

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

		//返回顶部.
		app.back2Top();
	},

	/**
	 * 初始化侧边栏.
	 */
	initSidebar: function() {
		var sidebar_filename = app.docs_base + '/' + app.sidebar_file;
		//加载侧边栏数据.
		$.get(sidebar_filename, function (data) {
			//marked解析文档数据并显示.
			$(app.sidebar_id).html(marked(data));
			//侧边栏列表展开收起操作.
			app.expandSidebarMenu();
			//侧边栏高亮当前项.
			app.highLightCurrentMenu();
		}, "text").fail(function() {
			alert("Opps! can't find the sidebar file to display!");
		});
	},

	/**
	 * 侧边栏列表展开收起操作.
	 */
	expandSidebarMenu: function() {
		//默认收起一级以下菜单.
		$('ul', $(app.sidebar_id).children('ul').children('li')).hide();
		$(app.sidebar_id + ' ul li').bind('click', function(e){
			e = e || window.event;
			e.stopPropagation();
			$(this).children('ul').slideToggle();
		});
	},

	/**
	 * 侧边栏高亮当前项.
	 */
	highLightCurrentMenu: function(){
		$(app.sidebar_id + ' ul a').bind('click', function(e){
			$(app.sidebar_id + ' ul li').removeClass('highlight');
			$(this).parent('li').addClass('highlight');
		});
	},

	/**
	 * 打开/关闭侧边栏.
	 */
	toggleSidebar: function() {
		$('#nav_category').bind('click', function() {
			var targetLeft;
			var left = $(app.sidebar_id).offset().left;
			if(left === -272) {
				targetLeft = 0;
				$(app.sidebar_id).addClass('isSlideOpen');
			}else if(left === 0) {
				targetLeft = -272;
				$(app.sidebar_id).removeClass('isSlideOpen');
			}
			$(app.sidebar_id).animate({
				left: targetLeft
			}, 500);
		});

		//点击内容区域收起侧边栏.
		$(app.content_id).bind('click', function() {
			if($(app.sidebar_id).hasClass('isSlideOpen')) {
				$('#nav_category').click();
			}
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
			path = path + ".md";
		}
		//加载文档数据.
		app.getDocData(path);
		//页面滚动回到顶部.
		$('#back_to_top').click();
	},

	/**
	 * 加载文档数据.
	 */
	getDocData: function(path) {
		$.get(path, function (data) {
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
	},

	/**
	 * 返回顶部.
	 */
	back2Top: function() {
		$('#back_to_top').bind('click', function() {
			$(app.content_id).animate({
				scrollTop: 0
			}, 500);
		});
	}

};
