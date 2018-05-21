var express = require('express');
const url = require('url');
const path = require('path');
var fs = require('fs');
var archiver = require('archiver');
var detailrouter = require('./detailrouter');
var examdetail = require('./examdetail');
var request_mothed = require('../../public/request_mothed');
var router = express.Router();
var getResource = require('../../public/getResource');

router.get('/',function(req,res){
    res.render('classes/exam/seeexam');
})

//加载请求并发送表格数据

router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    query.classesId = req.session['classes']['id'];
    request_mothed('/classes/exam','get',query,(data)=>{
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
        }else if(data.code==0){
            console.log('班级考试记录表格'+data.msg);
            res.send('查询数据失败');
        }else{
            res.send('查询数据失败');
        }
    })

})
//修改测试
router.post('/updataexam',function(req,res){
    var query = {examId:req.body.id};
    req.session['examId'] = req.body.id;//此处不知道干啥
    request_mothed('/classes/exam/updateExam','get',query,(data)=>{
        console.log("-------测试信息-------");
        console.log(data);
        if(data.code==1){
            if(data.data){
                var sn = data.data;

                if(sn.indexOf("/")>-1){
                    sn=sn.substring(0,sn.length-1);
                    var sna = sn.split('/');
                    var resdatas = `chooseids=${sna[0]}&operationids=${sna[1]}`;
                }else{
                    var resdatas = `chooseids=${sn}`;
                }
                let resdata = {
                    state:1,
                    msg:data.msg,
                    data:resdatas
                };
                res.send(resdata);
            }else{
                var resdatas = null;
                let resdata = {
                    state:1,
                    msg:data.msg,
                    data:resdatas
                };
                res.send(resdata);
            }

        }else if(data.code==-1){
            let resdata = {
                state:0,
                msg:data.msg
            };
            res.send(resdata);
        }else {
            let resdata = {
                state:0,
                msg:'未知错误'
            };
            res.send(resdata);
        }
    })
})


//查看详情

router.use('/examdetail',examdetail);


router.use('/detail/detailrouter',detailrouter);




module.exports = router;