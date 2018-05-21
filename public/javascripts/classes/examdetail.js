layui.use('table', function(){
    var table = layui.table;

    //第一个实例
    table.render({
        elem: '#demo'
        ,cellMinWidth: 80
        ,url: '/classes/exam/see/examdetail/table?time='+new Date().getTime() //数据接口
        ,page: true //开启分页
        ,cols: [[ //表头
             {field: 'userName', title: '用户名'}
            ,{field: 'name', title: '姓名'}
            ,{field: 'classes', title: '班级'}
            ,{field: 'exam', title: '名称'}
            ,{field: 'score', title: '分数'}
            ,{field: 'down', title: '操作', width: 150,templet:'<div><a href="examdetail/persondown?userId={{ d.userId}}&examId={{d.examId}}" class="downs">下载答卷</a></div>'}
        ]]
        ,limit:10
        ,limits:[5,10,20,30,40,50]
        ,id: 'testReload'
    });
    // 学生考试记录:用户名:username;班级:classes;名称:exam;分数:score
    table.on('checkbox(useruv)', function(obj){
    });


    var $ = layui.$, active = {
        reload: function(){
            var demoReload = $('#demoReload');

            table.reload('testReload', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    keyWord: demoReload.val()
                }
            });
        }
    };

    $('.demoTable .layui-btn1').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    $('.layui-btn3').on('click', function(){
       sendajax('GET','examdetail/downclassscore/isSure','examdetail/downclassscore')//成绩请求
    });
    $('.layui-btn4').on('click', function(){
        sendajax('GET','examdetail/downclassanswer/isSure','examdetail/downclassanswer')//班级答卷请求
    });
    table.on('tool(useruv)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            $.ajax({
                url: "see/detail/detailrouter/examdetail",
                type: "post",
                data:data,
                dataType: "json",
                success: function(data){
                    if(data.state==1){
                        window.location.href = "/classes/exam/see/examdetail";
                    }else{
                        layer.msg(data.msg, {icon: 5});
                    }
                }

            });
        }
    });

    function  sendajax(method,url,downUrl) {
        $.ajax({
            url: url,
            type: method,
            dataType: "json",
            success: function(data){

                if(data.state==1){
                    download(downUrl,method);

                }else{
                    layer.msg(data.msg, {icon: 5});
                }
            }

        });
    };
    // 文件下载
   function download(url, method, filedir, filename){
        $('<form action="'+url+'" method="'+(method||'post')+'">' +  // action请求路径及推送方法
            // '<input type="text" name="filedir" value="'+filedir+'"/>' + // 文件路径
            // '<input type="text" name="filename" value="'+filename+'"/>' + // 文件名称
            '</form>')
            .appendTo('body').submit().remove();
    };

});