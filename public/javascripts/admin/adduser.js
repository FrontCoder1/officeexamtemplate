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
                return '请填写学校简称';
            }
        },
        schoolContent: function(value){
            if(value.length <= 0){
                return '请填写学校名称';
            }
        },
        time: function(value){
            if(value.length <= 0){
                return '请选择时间';
            }
        },
        number: [/^[0-9]*[1-9][0-9]*$/, '大于0整数']
    });

    form.on('submit(demo1)', function(data){

        var reqdata = data.field;
        // var nowTime = new Date();
        var start = reqdata.startTime;
        var stop = reqdata.stopTime;

        // console.log(new Date(reqdata.startTime));
        //
        // console.log("开始时间"+reqdata.startTime);
        // console.log("结束时间"+stop);
        //判断时间是否设置合理

        if(compareDate(start)&&!compareDate(start,stop)){
            $.ajax({
                url: "add/saveBatch",
                type: "post",
                data:data.field,
                dataType: "json",
                success: function(data){
                    if(data.state==1){
                        layer.msg(data.msg, {icon: 6},function () {
                            window.location.href = "/admin/user/add";
                        });

                    }else{
                        layer.msg(data.msg, {icon: 5});
                    }
                }

            });
        }else{

            layer.msg("时间设置不合理", {icon: 5});
        }

        function compareDate(d1,d2) {
            var secondTime;
            if(d2){
                secondTime =  new Date(d2.replace(/-/g,"\/"));
            }else{
                secondTime = new Date();
            }
            return ((new Date(d1.replace(/-/g,"\/"))) >= secondTime);
        }


        return false;
    });

});