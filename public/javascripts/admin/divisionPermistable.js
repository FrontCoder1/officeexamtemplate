layui.use('table', function(){
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#demo'
        ,cellMinWidth: 80
        ,url: '/admin/role/divisionPermis/table?time='+new Date().getTime() //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
            {type: 'checkbox'}
            ,{field: 'id', title: '编号',align:'center'}
            ,{field: 'cname', title: '名称',align:'center'}
            ,{field:'right', title: '操作',toolbar:"#barDemo",width:200,align:'center'}
        ]]
        ,limit:10
        ,limits:[10,20,30,40,50]
        ,id: 'testReload'
    });
    //编号:id;名称:name;权限路径:path;中文名称:cname
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
        if(obj.event === 'edit') {
            $.ajax({
                url: "divisionPermis/detail/detailrouter/permisdetail",
                type: "post",
                data: data,
                dataType: "json",
                success: function (data) {
                    if (data.state == 1) {
                        parent.layer.open({
                            type: 2,
                            id: 'LAY_layuipro',
                            title: '选择权限：',
                            shade: 0.5,
                            area: ['300px', '90%'],
                            content:'/admin/role/divisionPermis/permisdetail'//iframe的url，no代表不显示滚动条
                            ,btn: '返回'
                            ,btnAlign: 'l' //按钮居中
                            ,yes: function(){
                                parent.layer.closeAll()
                            }
                        });
                        //window.location.href = "/admin/role/divisionPermis/permisdetail";
                    } else {
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