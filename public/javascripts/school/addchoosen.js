layui.use(['form','upload','layedit'], function(){
    var $ = layui.$;
    var form = layui.form
        ,layer = layui.layer
        ,upload = layui.upload
        ,layedit = layui.layedit;


    var title = layedit.build('title', {
        height: 180 //设置编辑器高度
        ,uploadImage: {
            url: 'add/questionImg' //接口url
            ,type: 'post' //默认post
        }
    })

    var option_a = layedit.build('option_a', {
        height: 180 //设置编辑器高度
        ,uploadImage: {
            url: 'add/questionImg' //接口url
            ,type: 'post' //默认post
        }
    })
    var option_b = layedit.build('option_b', {
        height: 180 //设置编辑器高度
        ,uploadImage: {
            url: 'add/questionImg' //接口url
            ,type: 'post' //默认post
        }
    })
    var option_c = layedit.build('option_c', {
        height: 180 //设置编辑器高度
        ,uploadImage: {
            url: 'add/questionImg' //接口url
            ,type: 'post' //默认post
        }
    });
    var option_d = layedit.build('option_d', {
        height: 180 //设置编辑器高度
        ,uploadImage: {
            url: 'add/questionImg' //接口url
            ,type: 'post' //默认post
        }
    });
    var analysis = layedit.build('analysis', {
        height: 180 //设置编辑器高度
        ,uploadImage: {
            url: 'add/questionImg' //接口url
            ,type: 'post' //默认post
        }
    })
//注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。

    form.verify({
        answer: [/^[A-D]$/, '请选择正确选项']
    });
    
    $('.btns').on('click',function () {
        location.reload();
    })

    form.on('submit(demo1)', function(data){

        console.log(layedit.getContent(title));
        var reqdata = data.field;
        reqdata.title = layedit.getContent(title);
        reqdata.option_a = layedit.getContent(option_a);
        reqdata.option_b = layedit.getContent(option_b);
        reqdata.option_c = layedit.getContent(option_c);
        reqdata.option_d = layedit.getContent(option_d);
        reqdata.analysis = layedit.getContent(analysis);

        console.log(reqdata);




        // var formData = new FormData();
        // var reqdata = data.field;
        //
        // var content = ["title1","option_a1","option_b1","option_c1","option_d1"];
        //
        // var inArray = function(item) {
        //     var arr = content;
        //     for(var i = 0; i < arr.length; i++) {
        //         if(arr[i] == item) {
        //             return true;
        //         }
        //     }
        //     return false;
        // };
        //
        // for(var i in reqdata){
        //
        //     if(inArray(i)){
        //         delete reqdata[i];
        //     }
        // }
        //
        // for(var i in reqdata){
        //     if(reqdata[i]){
        //         formData.append(i,reqdata[i]);
        //     }
        //
        // }
        //
        //
        //
        // function photoCheck(obj){
        //     var ff = obj.value;
        //     ff = ff.toLowerCase();
        //     if(!/.(gif|jpg|jpeg|png|gif|jpg|png|bmp)$/.test(ff)){
        //         return false;
        //     }
        //     return true;
        // }
        //
        // var flag = true;
        //
        // //把存在的文件名和文件提交到服务器
        // var filedata = $(".imagefile");
        // for(var i=0;i<filedata.length;i++){
        //     var item = filedata[i];
        //         if(item.value){
        //             if(photoCheck(item)){
        //                 var itemName = item.getAttribute("name");
        //                 itemName = itemName.substr(0,itemName.length-1);
        //                 var itemValue = item.files[0];
        //                 formData.append(itemName,itemValue);
        //             }else{
        //                 flag = false;
        //             }
        //
        //         }
        //
        //
        // }
        //

            $.ajax({
                url: "add/save",
                type: "post",
                data: reqdata,                    // 上传formdata封装的数据
                dataType: 'JSON',
                cache: false,                      // 不缓存
                success: function(data){
                    if(data.state==1){
                        layer.msg(data.msg, {icon: 6});
                    }else{
                        layer.msg(data.msg, {icon: 5});
                    }
                }

            });
        // else{
        //     layer.msg("请选择正确的图片格式", {icon: 5});
        // }


        return false;
    });

});