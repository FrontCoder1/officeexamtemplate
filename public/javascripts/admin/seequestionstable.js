layui.use('table', function(){
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#demo'
        ,cellMinWidth: 80
        ,url: '/admin/question/see/table?time='+new Date().getTime() //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
             {type: 'checkbox'}
            ,{field: 'grade', title: '试题等级'}
            ,{field: 'type', title: '类型'}
            ,{field: 'school', title: '学校'}
            ,{field: 'title', title: '题目'}
            ,{field: 'score', title: '分值'}
            ,{field:'right', title: '操作',toolbar:"#barDemo",width:200}
        ]]
        ,limit:10
        ,limits:[5,10,20,30,40,50]
        ,curr:3
        ,id: 'testReload'
    });

    table.on('checkbox(useruv)', function(obj){
        console.log(obj)
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
        },
        sendData: function(){ //发送批量删除的id
            var checkStatus = table.checkStatus('testReload')
                ,data = checkStatus.data;
            console.log(data);
            var sendids = [];
            for(var i=0;i<data.length;i++){
                sendids.push(data[i].id);
            }
            var senddata = JSON.stringify(sendids);
            sendajax(senddata,'POST','see/deleteBatch')
        }
    };

    $('.demoTable .layui-btn1').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    $('.layui-btn2').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    table.on('tool(useruv)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            if(data.typeId==6){
                $.ajax({
                    url: "see/detail/detailrouter/choose",
                    type: "post",
                    data:data,
                    dataType: "json",
                    success: function(data){
                        if(data.state==1){
                            layer.open({
                                type: 2,
                                title: '选择题详情',
                                id: 'LAY_layuipro',
                                shadeClose: true,
                                shade: false,
                                move:false,
                                area: ['100%', '100%'],
                                offset: 'rb', //右下角弹出
                                anim: 2,
                                scrollbar:false,
                                content:'/admin/question/see/choosedetail'//iframe的url，no代表不显示滚动条
                                ,btn: '返回'
                                ,btnAlign: 'l' //按钮居中
                                ,yes: function(){
                                    layer.closeAll();
                                }
                            });
                            //window.location.href = "/admin/question/see/choosedetail";
                        }else{
                            layer.msg(data.msg, {icon: 5});
                        }
                    }

                });
            }else{
                $.ajax({
                    url: "see/detail/detailrouter/option",
                    type: "post",
                    data:data,
                    dataType: "json",
                    success: function(data){
                        if(data.state==1){
                            layer.open({
                                type: 2,
                                title: '选择题详情',
                                id: 'LAY_layuipro',
                                shadeClose: true,
                                shade: false,
                                move:false,
                                area: ['100%', '100%'],
                                offset: 'rb', //右下角弹出
                                anim: 2,
                                scrollbar:false,
                                content:'/admin/question/see/optiondetail'//iframe的url，no代表不显示滚动条
                                ,btn: '返回'
                                ,btnAlign: 'l' //按钮居中
                                ,yes: function(){
                                    layer.closeAll();
                                }
                            });
                           // window.location.href = "/admin/question/see/optiondetail";
                        }else{
                            layer.msg(data.msg, {icon: 5});
                        }
                    }

                });
            }

        } else if(obj.event === 'del'){
            var data = obj.data;
            if(obj.event === 'del') {
                layer.confirm('真的删除吗？', function (index) {
                    $.ajax({
                        url: "see/delete",
                        type: "post",
                        data: {"id": data.id},
                        dataType: "json",
                        success: function (data) {
                            if (data.state == 1) {
                                //关闭弹框
                                layer.close(index);
                                layer.msg(data.msg, {icon: 6});
                                table.reload('testReload', {
                                    where: { //设定异步数据接口的额外参数，任意设

                                    }
                                    , page: {
                                        curr: 1 //重新从第 1 页开始
                                    }
                                });
                            } else {
                                layer.msg(data.msg, {icon: 5});
                            }
                        }

                    });
                });
            }
        } else if(obj.event === 'edit'){

            if(data.submit_files=="picture"){
                layer.msg('该题不可修改');
            }else {
                if(data.typeId==6){
                    $.ajax({
                        url: "see/detail/detailrouter/updatachoose",
                        type: "post",
                        data:data,
                        dataType: "json",
                        success: function(data){
                            if(data.state==1){
                                layer.open({
                                    type: 2,
                                    title: '选择题修改',
                                    id: 'LAY_layuipro',
                                    shadeClose: true,
                                    shade: false,
                                    move:false,
                                    area: ['100%', '100%'],
                                    offset: 'rb', //右下角弹出
                                    anim: 2,
                                    scrollbar:false,
                                    content:'/admin/question/see/updatachoose'//iframe的url，no代表不显示滚动条
                                    ,btn: '返回'
                                    ,btnAlign: 'l' //按钮居中
                                    ,yes: function(){
                                        layer.closeAll();
                                    }
                                });
                                //window.location.href = "/admin/question/see/updatachoose";
                            }else{
                                layer.msg(data.msg, {icon: 5});
                            }
                        }

                    });
                }else{
                    layer.msg('操作题不提供该操作');
                }
            }


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