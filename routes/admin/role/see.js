var express = require('express');
const url = require('url');
var request_mothed = require('../../public/request_mothedn');
var router = express.Router();

router.get('/',function(req,res){
    res.render('admin/role/seerole');
})

router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    request_mothed('/admin/role','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data']['content'];
            for(var i=0;i<resdataarry.length;i++){
                if(resdataarry[i].name=='admin'){
                    resdataarry[i].cname='管理员'
                }else if(resdataarry[i].name=='school'){
                    resdataarry[i].cname='学校'
                }else if(resdataarry[i].name=='classes'){
                    resdataarry[i].cname='班级'
                }else if(resdataarry[i].name=='student'){
                    resdataarry[i].cname='学生'
                }
                else{
                    resdataarry[i].cname='未知用户'
                }
            }
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
    request_mothed('/admin/role','DELETE',query,(data)=>{
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


router.post('/updata',function(req,res){
    var query = req.body;
    request_mothed('/admin/role','put',query,(data)=>{
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