layui.use(['form', 'layedit', 'laydate'], function(){
    var $ = layui.$;
    var form = layui.form
        ,layer = layui.layer
        ,laydate = layui.laydate;

    laydate.render({
        elem: '#date'
        ,type: 'datetime'
    });
    laydate.render({
        elem: '#date1'
        ,type: 'datetime'
    });

    form.verify({
        content: function(value){
            if(value.length <= 0){
                return '请填写考试名称';
            }
        },
        time: function(value){
            if(value.length <= 0){
                return '请选择时间';
            }
        }
        ,number: [/^[0-9]*[1-9][0-9]*$/, '大于0整数']
    });
    //\S+
    form.on('submit(demo1)', function(data){

        var data = data.field;

        if(data.chooseType==0){
            $.ajax({
                url: "record",
                type: "post",
                data:data,
                dataType: "json",
                success: function(data){
                    if(data.state==1){
                        layer.msg(data.msg, {icon: 6},function () {
                            location.reload();
                        });
                    }else{
                        layer.msg(data.msg, {icon: 5});
                    }
                }

            });
        }else{
            $.ajax({
                url: "record",
                type: "post",
                data:data,
                dataType: "json",
                success: function(data){
                    if(data.state==1){
                        window.location.href = "/classes/exam/record/choice"
                    }else{
                        layer.msg(data.msg, {icon: 5});
                    }
                }

            });
        }



        return false;
    });

});