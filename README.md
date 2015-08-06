# scroll
> when scroll to the bottom, execute a function
> 
> 适用场景：
> 
> 列表滚动底部之后执行某函数，最常见业务是 下拉加载更多


##使用方法
css

	@import scrollTips.css;

js

	var Scroll=require('scroll');

	/**调用**/
	var listScroll=new ScrollLoad({
    		listId : '#listId',//滚动时要往里面添加数据的domID，默认为"#listWrap"
			scrollDom : '#scrollId',//要监听的滚动对象,默认为window
			bottomHeight: 100,//距离底部多高就可以触发事件,默认0
			delay: 500,//两次触发的间隔，默认500ms
			needTips: false,//需要提示条，默认为true
			cbFunc : yourFunc//必需，要触发的事件
		});

	listScroll.listen();//开始监听
	listScroll.removeListen();//结束监听

	/**needTips=true时会在listId后面添加一个tips提示条,
	  *主要用于列表,
	  *可以使用以下方法
    **/
	listScroll.empty('sorry，noData');//数据为空，参数为提示文案
	listScroll.done('done');//结束监听并显示完成提示
	



