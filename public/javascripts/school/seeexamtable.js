layui.use('table', function(){
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#demo'
        ,cellMinWidth: 80
        ,url: '/school/exam/see/table?time='+new Date().getTime() //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
            {type: 'checkbox'}
            ,{field: 'name', title: '名称'}
            ,{field: 'classes', title: '班级'}
            ,{field: 'startTime', title: '开始时间'}
            ,{field: 'endTime', title: '结束时间'}
            ,{field:'right', title: '操作',toolbar:"#barDemo",width:100}
        ]]
        ,limit:10
        ,limits:[10,20,30,40,50]
        ,id: 'testReload'
    });
    // 班级考试记录:名称:name;班级:school;开始时间:stratTime;结束时间:endTime;
    table.on('checkbox(useruv)', function(obj){
    });


    var $ = layui.$, active = {
        reload: function(){
            var demoReload = $('#demoReload');

            table.reload('testReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    keyWord: demoReload.val()
                }
            });
        }
    };

    $('.demoTable .layui-btn1').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    table.on('tool(useruv)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            $.ajax({
                url: "see/detail/detailrouter/examdetail",
                type: "post",
                data:data,
                dataType: "json",
                success: function(data){
                    if(data.state==1){
                        layer.open({
                            type: 2,
                            id: 'LAY_layuipro',
                            title: '测试信息如下：',
                            shade: 0.5,
                            area: ['100%', '100%'],
                            scrollbar: false,
                            move: false,
                            content:'/school/exam/see/examdetail'//iframe的url，no代表不显示滚动条
                            ,btn: '返回'
                            ,btnAlign: 'l' //按钮居中
                            ,yes: function(){
                                layer.closeAll()
                            }
                        });
                        //window.location.href = "/school/exam/see/examdetail";
                    }else{
                        layer.msg(data.msg, {icon: 5});
                    }
                }

            });
        }
    });

    function  sendajax(data,method,url) {
        $.ajax({
            url: url,
            type: method,
            data: {data:data},
            dataType: "json",
            success: function(data){

                if(data.state==1){
                    //关闭弹框
                    layer.msg(data.msg, {icon: 6});
                    table.reload('testReload', {
                        where: { //设定异步数据接口的额外参数，任意设

                        }
                        , page: {
                            curr: 1 //重新从第 1 页开始
                        }
                    });
                }else{
                    layer.msg(data.msg, {icon: 5});
                }
            }

        });
    }

});