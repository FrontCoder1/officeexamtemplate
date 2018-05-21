layui.use('table', function(){
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#demo'
        ,width:1000
        ,cellMinWidth: 80
        ,url: '/admin/type/see/table?time='+new Date().getTime() //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
            {field: 'id', title: '编号',width:200,sort: true, fixed: 'left',align: 'center'}
            ,{field: 'name', title: '类别名称',width:400,align: 'center'}
            ,{field:'right', title: '操作',toolbar:"#barDemo",align: 'center'}
        ]]
        ,limit:10
        ,limits:[5,10,20,30,40,50]
        ,id: 'testReload'
    });
    /* 类型: 编号:id;父类别:pId;类别名称:name
    */

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

    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    table.on('tool(useruv)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.confirm('真的删除吗？', function(index){
                $.ajax({
                    url: "see/delete",
                    type: "post",
                    data:{"id":data.id},
                    dataType: "json",
                    success: function(data){
                        if(data.state==1){
                            //关闭弹框
                            layer.close(index);
                            layer.msg(data.msg, {icon: 6});
                            table.reload('testReload', {
                                where: { //设定异步数据接口的额外参数，任意设

                                }
                                ,page: {
                                    curr: 1 //重新从第 1 页开始
                                }
                            });
                        }else{
                            layer.msg(data.msg, {icon: 5});
                        }
                    }

                });
            });
        } else if(obj.event === 'edit'){

            layer.prompt({
                formType: 2
                ,title: '修改类别名称为'
                ,value: data.name
            }, function(value, index){
                //这里一般是发送修改的Ajax请求
                EidtUv(data,value,index,obj);

            });


        }
    });

    //编辑的方法
    function  EidtUv(data,value,index,obj) {
        $.ajax({
            url: "see/update",
            type: "POST",
            data:{"id":data.id,"name":value},
            dataType: "json",
            success: function(data){

                if(data.state==1){
                    //关闭弹框
                    layer.close(index);
                    //同步更新表格和缓存对应的值
                    obj.update({
                        name: value
                    });
                    layer.msg(data.msg, {icon: 6});
                }else{
                    layer.msg(data.msg, {icon: 5});
                }
            }

        });
    }

});