layui.use(['form', 'layedit', 'laydate'], function(){
    var $ = layui.$;
    var form = layui.form
        ,layer = layui.layer;

    form.on('submit(demo1)', function(data){
        $.ajax({
            url: "updatapermission",
            type: "post",
            data:data.field,
            dataType: "json",
            success: function(data){
                if(data.state==1){
                    layer.msg(data.msg, {icon: 6});
                }else{
                    layer.msg(data.msg, {icon: 5});
                }
            }

        });
        return false;
    });

});