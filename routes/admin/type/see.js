var express = require('express');
const url = require('url');
var request_mothed = require('../../public/request_mothed');
var router = express.Router();

router.get('/',function(req,res){
    res.render('admin/type/seetype');
})

router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    request_mothed('/admin/type','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data']['content'];
            var resdata = {"code":0,"msg":"","count":data['data']['totalElements'],"data":resdataarry};
            res.send(resdata);
        }else{
            console.log('管理员类型表格'+data.msg);
            res.send('查询数据失败');
        }
    })
})

router.post('/delete',function(req,res){
    var query = req.body.id;
    request_mothed('/admin/type','DELETE',query,(data)=>{
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
        }else {
            let resdata = {
                state:0,
                msg:'未知错误'
            };
            res.send(resdata);
        }
    })
})


router.post('/update',function(req,res){
    var query = req.body;
    request_mothed('/admin/type','put',query,(data)=>{
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


module.exports = router;