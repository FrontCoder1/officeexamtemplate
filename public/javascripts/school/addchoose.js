layui.use(['form','upload','layedit'], function(){
    var $ = layui.$;
    var form = layui.form
        ,layer = layui.layer
        ,upload = layui.upload
        ,layedit = layui.layedit;


    var toolconfig = {
        height: 180 //设置编辑器高度
        ,uploadImage: {
            url: 'add/questionImg' //接口url
            ,type: 'post' //默认post
        }
        , tool: ['strong' //加粗
            ,'italic' //斜体
            ,'underline' //下划线
            ,'del' //删除线

            ,'|' //分割线

            ,'left' //左对齐
            ,'center' //居中对齐
            ,'right' //右对齐
            ,'link' //超链接
            ,'unlink' //清除链接
            ,'image' //插入图片
        ]
    };

    var title = layedit.build('title', toolconfig);

    var option_a = layedit.build('option_a', toolconfig);
    var option_b = layedit.build('option_b', toolconfig);
    var option_c = layedit.build('option_c', toolconfig);
    var option_d = layedit.build('option_d', toolconfig);
    var analysis = layedit.build('analysis', toolconfig);


    form.verify({
        answer: [/^[A-D]$/, '请选择正确选项']
    });

    $('.btns').on('click',function () {
        location.reload();
    });

    form.on('submit(demo1)', function(data){
        var reqdata = data.field;
        reqdata.title = layedit.getContent(title);
        reqdata.option_a = layedit.getContent(option_a);
        reqdata.option_b = layedit.getContent(option_b);
        reqdata.option_c = layedit.getContent(option_c);
        reqdata.option_d = layedit.getContent(option_d);
        reqdata.analysis = layedit.getContent(analysis);
        reqdata.submit_files = "picture";

        $.ajax({
            url: "add/save",
            type: "post",
            data: reqdata,                    // 上传formdata封装的数据
            dataType: 'JSON',
            cache: false,                      // 不缓存
            success: function(data){
                if(data.state==1){
                    layer.msg(data.msg, {icon: 6},function () {
                        location.reload();
                    });
                }else{
                    layer.msg(data.msg, {icon: 5},function () {
                        location.reload();
                    });
                }
            }

        });


        return false;
    });

});