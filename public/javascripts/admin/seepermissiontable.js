layui.use('table', function(){
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#demo'
        ,cellMinWidth: 80
        ,url: '/admin/permission/see/table?time='+new Date().getTime() //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
            {type: 'checkbox'}
            ,{field: 'id', title: '编号'}
            ,{field: 'name', title: '权限名称'}
            ,{field:'right', title: '操作',toolbar:"#barDemo",width:180}
        ]]
        ,limit:10
        ,limits:[5,10,20,30,40,50]
        ,id: 'testReload'
    });
    //编号:id;权限名称:name;权限路径:path;
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
        },
        sendData: function(){ //发送批量删除的id
            var checkStatus = table.checkStatus('testReload')
                ,data = checkStatus.data;
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
        if(obj.event === 'del'){
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
                $.ajax({
                    url: "see/detail/detailrouter/updatapermission",
                    type: "post",
                    data:data,
                    dataType: "json",
                    success: function(data){
                        if(data.state==1){
                            parent.layer.open({
                                type: 2,
                                id: 'LAY_layuipro',
                                title: '权限信息如下：',
                                shade: 0.5,
                                area: ['50%', '70%'],
                                content:'/admin/permission/see/updatapermission'//iframe的url，no代表不显示滚动条
                                ,btn: '返回'
                                ,btnAlign: 'l' //按钮居中
                                ,yes: function(){
                                    parent.layer.closeAll()
                                }
                            });
                            //window.location.href = "/admin/permission/see/updatapermission";
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