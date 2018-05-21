var $,tab,skyconsWeather;
layui.config({
	base : "/javascripts/public/"
}).use(['bodyTab','form','element','layer','jquery'],function(){
	var layer = layui.layer,
		element = layui.element;
		$ = layui.jquery;
		tab = layui.bodyTab();

	// 添加新窗口
	$(".layui-nav .layui-nav-item a").on("click",function(){
		addTab($(this));
		$(this).parent("li").siblings().removeClass("layui-nav-itemed");
	})

})


//打开新窗口
function addTab(_this){
	console.log(_this)
	tab.tabAdd(_this);
}
