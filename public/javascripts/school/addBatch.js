
layui.use('upload', function(){
    var $ = layui.jquery
        ,upload = layui.upload;


    upload.render({
        elem: '#test8'
        ,url: '/school/question/add/batch'
        ,auto: false
        ,bindAction: '#test9'
        ,accept: 'file'
        ,exts: 'xlsx'
        ,done: function(res){
            var data = res;
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

})