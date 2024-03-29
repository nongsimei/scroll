/**
*滚到底部执行某个函数
*author:@nsm 2015-7-30
*/


(function(){

	function ScrollLoad(configs){

		$('html,body').animate({scrollTop: 0}, 100);

		var defaults={
			scrollDom : window,
			listId : '#listWrap',
			cbFunc : null,
			needTips : true,
			delay : 500,
			bottomHeight: $('.duya-footer')[0].scrollHeight||0//距离底部多高时就可以触发事件
		};
		this.config=$.extend(defaults,configs);

		this.isScrolling = false;//判断是否在Scrolling的锁

		if(this.config.needTips){
			this.addMoreTips();//容器尾部添加tips
		}
	}

ScrollLoad.prototype={

	constructor:ScrollLoad,

	listen:function(){

		$(this.config.scrollDom).on('scroll.'+this.config.listId,_.bind(this.scrollHandler,this));//绑定scroll事件
		/*$(window).on('scroll',function(){//法2：用传参法
		 	_this.scrollHandler(_this);
		  });

		$(window).on('scroll',_this.scrollHandler.bind(_this));//法3：用jq的bind，如果需要支持IE需加上兼容代码
		*/
	},
	removeListen : function(){

		$(this.config.scrollDom).off('scroll.'+this.config.listId);//移除scroll事件

	},
	scrollHandler:function(e){

		if(this.isScrolling)return;

		this.isScrolling=true;
		
		var scrollTop=$(window).scrollTop();
		var scrollHeight=document.body.scrollHeight;
		var windowHeight=$(window).height();
		var footerHeight=this.config.bottomHeight;

		var scrollPos=scrollTop+windowHeight;//滚动条位置
		var footerPos=scrollHeight-footerHeight;//列表底部位置

		var _ts=this;


		if(footerPos<=scrollPos){//滚到列表尾部
			//加载更多
			this.loading();
			this.config.cbFunc.apply(this);
			setTimeout(function(){
				_ts.endScroll();
			},this.config.delay);
		}else{
			
			setTimeout(function(){
				_ts.endScroll();
			},20);
		}
	},
	endScroll : function(){
		this.isScrolling=false;
		this.loadTips.find('.more-loading').hide();
	},
	hideLoading : function(){
		this.setMoreStatus('hide');
	},
	loading : function(){
		this.setMoreStatus('loading');
	},
	empty : function(txt){
		this.setMoreStatus('empty',txt);//列表为空
	},
	done : function(txt){
		this.setMoreStatus('allLoaded',txt);//全部load完了，不能再load了
		this.removeListen();//解绑
	},
	addMoreTips:function(){
		this.loadTips=$('<div/>').attr('class','mod-list-more').html('\
			 <div class="more-loading">\
                <i class="icon-loading"></i>\
                <em>加载中...</em>\
            </div>\
            <div class="more-end">全部加载完成</div>\
            <div class="more-empty">\
                <i class="icon-empty"></i>\
                <span>暂时没有相关的游戏直播</span>\
            </div>');
		if(this.config.listId){
			$(this.config.listId).after(this.loadTips);
		}
	},

	setMoreStatus:function(status,txt){
		if(this.config.needTips){
			this.loadTips.children().hide();
			switch(status){
				case 'allLoaded':
					this.loadTips.find('.more-end').fadeIn('slow');
					txt?this.loadTips.find('.more-end').html(txt):'';
					break;
				case 'loading':
					this.loadTips.find('.more-loading').show();
					break;
				case 'empty':
					this.loadTips.find('.more-empty').show('slow');
					txt?this.loadTips.find('.more-end').find('span').html(txt):'';
					break;
				default:
					this.loadTips.find('.more-loading').hide();
					break;	
			}
		}
	}
}

if ( typeof dwfis !== "undefined" && typeof dwfis.define === "function") {
    // AMD. Register as an anonymous module.
    module.exports = ScrollLoad;
} else {
    window.ScrollLoad = ScrollLoad;
}

}())


