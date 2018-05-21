var express = require('express');
const url = require('url');
const path = require('path');
var fs = require('fs');
var archiver = require('archiver');
var detailrouter = require('./detailrouter');
var updatarouter = require('./updatarouter');
var request_mothed = require('../../public/request_mothed');
var router = express.Router();
var getResource = require('../../public/getResource');



router.get('/',function(req,res){
    res.render('admin/questions/seequestions',{});
})

//加载请求并发送表格数据

router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    request_mothed('/admin/question','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data']['content'];
            for(var i=0;i<resdataarry.length;i++){
                var title =resdataarry[i].title;
                if(/^(Picture:)/.test(title)){
                    resdataarry[i]["url"] = title;
                    resdataarry[i]['title'] = "该题为图片试题，请在详情中查看";

                }
            }
            var resdata = {"code":0,"msg":"","count":data['data']['totalElements'],"data":resdataarry};
            res.send(resdata);
        }else{
            console.log('管理员试题表格'+data.msg);
            res.send('查询数据失败');
        }
    })

})

//单个删除
router.post('/delete',function(req,res){
    var query = req.body.id;
    request_mothed('/admin/question','DELETE',query,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            res.send(resdata);
        }else{
            let resdata = {
                state:0,
                msg:data.msg
            };
            res.send(resdata);
        }
    })
})

//查看选择题详情

router.get('/choosedetail',function(req,res){
    var resdata = detailrouter.data;
    res.render('admin/questions/choosedetail',{choosedata:resdata})
})

//查看操作题详情

router.get('/optiondetail',function(req,res){
    var resdata = detailrouter.data;
    res.render('admin/questions/optiondetail',{optiondata:resdata})
})

//到达更新选择题

router.get('/updatachoose',function(req,res){
    var resdata = detailrouter.data;
    var updatadata = resdata;
    res.render('admin/questions/updatachoose',{updatadata})
})


//提交更新选择题

router.post('/updatachoose',function(req,res){
    var query = req.body;
    request_mothed('/admin/question','put',query,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            res.send(resdata);
        }else if(data.code==-1){
            let resdata = {
                state:0,
                msg:data.msg
            };
            res.send(resdata);
        }else{
            let resdata = {
                state:0,
                msg:'未知错误'
            };
            res.send(resdata);
        }
    })
})

//批量删除

router.post('/deleteBatch',function(req,res) {
    var query = req.body.data;
    var reqdata = JSON.parse(query);
    var str = "";
    for (var i = 0; i < reqdata.length; i++) {
        if (i < reqdata.length - 1) {
            str += `${reqdata[i]},`
        } else {
            str += `${reqdata[i]}`
        }
    }
    var resobj = {ids: str};

    request_mothed('/admin/question/deleteBatch','put',resobj,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            res.send(resdata);
        }else if(data.code==-1){
            let resdata = {
                state:0,
                msg:data.msg
            };
            res.send(resdata);
        }else{
            let resdata = {
                state:0,
                msg:'未知错误'
            };
            res.send(resdata);
        }
    })
})

router.use('/detail/detailrouter',detailrouter);


module.exports = router;