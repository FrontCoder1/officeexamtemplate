

layui.use(['form', 'layedit', 'laydate'], function(){
    var $ = layui.$;
    var form = layui.form
        ,layer = layui.layer;

    form.verify({
         pass: [/(.+){6,15}$/, '密码必须6到15位']
    });
    form.on('submit(demo1)', function(data){
        var psw1 = $('#psw1').val();
        var psw2 = $('#psw2').val();
        if(psw1==psw2){
            $.ajax({
                url: "updatapsw",
                type: "post",
                data:data.field,
                dataType: "json",
                success: function(data){
                    if(data.state==1){
                        layer.msg(data.msg, {icon: 6});
                        top.location.href = '/classes/login'
                    }else{
                        layer.msg(data.msg, {icon: 5});
                    }
                }

            });
        }else{
            layer.msg("两次密码不一样", {icon: 5});
        }

        return false;
    });


});