layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,$ = layui.$;


    form.on('checkbox(owner_all)', function(data){
        var a = data.elem.checked;
        if(a == true){
            $(".ownerCost").prop("checked", true);
            form.render('checkbox');
        }else{
            $(".ownerCost").prop("checked", false);
            form.render('checkbox');
        }

    });
    //有一个未选中全选取消选中
    form.on('checkbox(owner_one)', function(data){
        var item = $(".ownerCost");
        for(var i=0;i<item.length;i++){
            if(item[i].checked == false){
                $("#owner_all").prop("checked", false);
                form.render('checkbox');
            }
        }
    });


    //监听提交
    form.on('submit(demo1)', function(data){
        var standards=[];
        $("input:checkbox[name='select']:checked").each(function() { // 遍历name=standard的多选框
           standards.push($(this).val());
        });
        var senddata = JSON.stringify(standards);
        sendajax(senddata,'POST','permisdetail/save')
        return false;
    });


});


function  sendajax(data,method,url) {
    var $ = layui.$;
    $.ajax({
        url: url,
        type: method,
        data: {data:data},
        dataType: "json",
        success: function(data){

            if(data.state==1){
                //关闭弹框
                layer.msg(data.msg, {icon: 6}),function () {
                    form.render('checkbox');
                };
            }else{
                layer.msg(data.msg, {icon: 5});
            }
        }

    });
}
