//Demo
layui.use('form', function(){
    var form = layui.form;
    var $ = layui.$;

    //监听提交
    form.on('submit(formDemo)', function(data){
        $.ajax({
            url: "add/save",
            type: "POST",
            data:data.field,
            dataType: "json",
            success: function(data){

                if(data.state==1){
                    //关闭弹框
                    layer.msg(data.msg, {icon: 6});
                }else{
                    layer.msg(data.msg, {icon: 5});
                }
            }

        });
        return false;
    });
});