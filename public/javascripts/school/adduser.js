layui.use(['form', 'layedit', 'laydate'], function(){
    var $ = layui.$;
    var form = layui.form
        ,layer = layui.layer
        ,laydate = layui.laydate;
    form.verify({
        number: [/^[0-9]*[1-9][0-9]*$/, '大于0整数']
        ,tel: [/^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$|^((\+?86)|(\(\+86\)))?1\d{10}$|^$/, '填写正确的电话格式']
    });
    form.on('submit(demo1)', function(data){
        $.ajax({
            url: "add/saveBatch",
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