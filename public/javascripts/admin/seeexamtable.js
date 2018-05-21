layui.use('table', function(){
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#demo'
        ,cellMinWidth: 80
        ,url: '/admin/exam/record/table?time='+new Date().getTime() //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
             {type: 'checkbox'}
            ,{field: 'name', title: '名称'}
            ,{field: 'classes', title: '班级'}
            ,{field: 'startTime', title: '开始时间'}
            ,{field: 'endTime', title: '结束时间'}
            ,{field:'right', title: '操作',toolbar:"#barDemo",width:130}
        ]]
        ,limit:10
        ,limits:[5,10,20,30,40,50]
        ,id: 'testReload'
    });
    //名称:name;班级:classes;开始时间:stratTime;结束时间:endTime;
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
            sendajax(senddata,'POST','record/deleteBatch')
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

    table.on('tool(useruv)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除吗？', function (index) {
                console.log(data);
                $.ajax({
                    url: "record/delete",
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
    })
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