# scroll
> when scroll to the bottom, execute a function
> 
> 适用场景：
> 
> 1. 列表滚动到底部之后加载更多
> 2. 列表滚动底部之后执行某函数


##使用方法

	var Scroll=require('scroll');

	var listScroll=new ScrollLoad({
    		listId : '#listId',//滚动时要往里面添加数据的domID
			scrollDom : '#scrollId',//要监听的滚动对象,默认为window
			cbFunc : yourFunc//滚到一定位置要触发的事件
		});


