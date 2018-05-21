layui.use('table', function(){
    var table = layui.table,
        layer = layui.layer,
        $ = layui.$,
        form = layui.form;

    var mytbl;
    //.存储当前页数据集
    var pageData = [];
    //.存储已选择数据集，用普通变量存储也行
    layui.data('checked', null);
    var selectqrry = [];
    var myurl = location.search;
    //console.log(myurl);
    if(myurl){
        var theRequest = new Object();
        if ( myurl.indexOf( "?" ) != -1 ) {
            var str = myurl.substr(1); //substr()方法返回从参数值开始到结束的字符串；
            var strs = str.split( "&" );
            for ( var i = 0; i < strs.length; i++ ) {
                theRequest[ strs[ i ].split( "=" )[ 0 ] ] = ( strs[ i ].split( "=" )[ 1 ] );
            }
            //console.log( theRequest ); //此时的theRequest就是我们需要的参数；
        }
        //把参数里面的字符串转化成对应的数组
        if(theRequest.operationids.indexOf(",")>-1){
            var searcharr = theRequest.operationids.split(',');
            //console.log(searcharr);
        }else{
            var searcharr = [];
            searcharr.push(theRequest.operationids);
        }
        //把字符串数组转化成整数数组
        for(var i=0;i<searcharr.length;i++){
            selectqrry.push(+searcharr[i]);
        }
    }
    //console.log(selectqrry);
    //.渲染完成回调
    var myDone = function(res) {
        //.假设你的表格指定的 id="demo"，找到框架渲染的表格
        var tbl = $('#demo').next('.layui-table-view');


        for(var i=0;i<selectqrry.length;i++){
            layui.data('checked', {
                key: selectqrry[i], value: {id:selectqrry[i]}
            });
        }

        //.记下当前页数据，Ajax 请求的数据集，对应你后端返回的数据字段
        pageData = res.data;
        var len = pageData.length;
        //console.log(pageData);

        //.遍历当前页数据，对比已选中项中的 id
        for (var i = 0; i < len; i++) {
            if (layui.data('checked', pageData[i]['id'])) {
                //.选中它，目前版本没有任何与数据或表格 id 相关的标识，不太好搞，土办法选择它吧
                tbl.find('.layui-table-body>table>tbody>tr').eq(i).find('td').eq(0).find('input[type=checkbox]').prop('checked', true);
            }
        }

        //.PS：table 中点击选择后会记录到 table.cache，没暴露出来，也不能 mytbl.renderForm('checkbox');
        //.暂时只能这样渲染表单
        form.render('checkbox');
    };


    mytbl=table.render({
        elem: '#demo'
        ,cellMinWidth: 80
        ,url: '/classes/exam/record/operation/table?time='+new Date().getTime() //数据接口
        ,done: myDone
        ,cols: [[ //表头
            {type: 'checkbox'}
            ,{field: 'id', title: '编号',width:100,align:'center'}
            ,{field: 'grade', title: '试题等级',width:100,align:'center'}
            ,{field: 'type', title: '类型',width:100,align:'center'}
            ,{field: 'title', title: '题目',align:'center'}
            ,{field:'right', title: '操作',toolbar:"#barDemo",width:100,align:'center'}
        ]]
        ,id: 'testReload'
    });
    // 编号:id;试题等级:grade;类型:type;题目:title;分值:score
    table.on('checkbox(useruv)', function(obj){

        var data = obj.type == 'one' ? [obj.data] : pageData;

        //.遍历数据
        $.each(data, function(k, v) {
            //.假设你数据中 id 是唯一关键字
            if (obj.checked) {
                //.增加已选中项
                layui.data('checked', {
                    key: v.id, value: v
                });
            } else {
                //.删除
                layui.data('checked', {
                    key: v.id, remove: true
                });
            }
        });
    });

    var $ = layui.$, active = {
        reload: function(){
            var demoReload = $('#demoReload');

            table.reload('testReload', {
                where: {
                    keyWord: demoReload.val()
                }
            });
        },
        sendData: function(){ //发送批量的id



            // var data = [];
            // $.each(layui.data('checked'), function(k, v) {
            //     data.push(v);
            // });
            // var sendids = [];
            // var sendtypes = [];
            // for(var i=0;i<data.length;i++){
            //     sendids.push(data[i].id);
            //     sendtypes.push(data[i].type);
            // }
            // var senddata = JSON.stringify(sendids);
            var data = Object.getOwnPropertyNames(layui.data('checked'));
            var senddata = JSON.stringify(data);
            // sendajax(senddata,'POST','choice/save')

            sendajax(senddata,'POST','operation/save');

        },
        getCheckData: function(){ //获取选中数据
            //.看看已选中的所有数据
            var mySelected = Object.getOwnPropertyNames(layui.data('checked'));
            // $.each(layui.data('checked'), function(k, v) {
            //     mySelected.push(v);
            // });

            //把返回的数据改成去掉“,”
            var arrstr = '';
            for(var i=0;i<mySelected.length;i++){
                if(i==mySelected.length-1){
                    arrstr+=mySelected[i];
                }else{
                    arrstr+=mySelected[i]+',';

                }
            }
            //console.log(arrstr);

            layer.alert(arrstr);

            //.看 myDone 的注释得知，下面的方法就不可用了
            //var checkStatus = table.checkStatus('maintb')
            //    ,data = checkStatus.data;
            //layer.alert(JSON.stringify(data));
        }
        ,getCheckLength: function(){ //获取选中数目
            layer.msg('选中了：'+ Object.getOwnPropertyNames(layui.data('checked')).length + ' 个');

            //var checkStatus = table.checkStatus('maintb')
            //    ,data = checkStatus.data;
            //layer.msg('选中了：'+ data.length + ' 个');
        }
    };

    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    table.on('tool(useruv)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            $.ajax({
                url: "operation/detail/detailrouter/choicedetail",
                type: "post",
                data:data,
                dataType: "json",
                success: function(data){
                    if(data.state==1){
                        layer.open({
                            type: 2,
                            title: '操作题详情',
                            id: 'LAY_layuipro',
                            shadeClose: true,
                            shade: false,
                            area: ['100%', '100%'],
                            offset: 'rb', //右下角弹出
                            anim: 2,
                            move:false,
                            scrollbar: false,
                            content:'/classes/exam/record/operation/operationdetail' //iframe的url，no代表不显示滚动条
                            ,btn: '返回'
                            ,btnAlign: 'l' //按钮居中
                            ,yes: function(){
                                layer.closeAll();
                            }
                        });
                        //window.location.href = "/classes/exam/record/choice/choicedetail";
                    }else{
                        layer.msg(data.msg, {icon: 5});
                    }
                }

            });
        }
    });

    function  sendajax(data,method,url) {
        $.ajax({
            url: url,
            type: method,
            data: {data:data},
            dataType: "json",
            success: function(data){

                if(data.state==1){
                    //关闭弹框
                    layer.msg('组织考试成功', {icon: 6}, function(){
                        if(myurl){
                            window.location.href = "/classes/exam/see";
                        }else{
                            window.location.href = "/classes/exam/record";
                        }

                    });
                    //window.location.href = "/classes/exam/record/operation";
                }else{
                    layer.msg(data.msg, {icon: 5});
                }
            }

        });
    }

});