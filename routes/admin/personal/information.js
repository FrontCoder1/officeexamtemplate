var express = require('express');
const url = require('url');
var request_mothed = require('../../public/request_mothedn');
var router = express.Router();


//加载修改信息页面
router.get('/',function(req,res){
    var updatadata = req.session['admin'];
    res.render('admin/personal/seeperson',{updatadata:updatadata});
})

//加载修改密码页面
router.get('/updatapsw',function(req,res){
    var updatadata = req.session['admin'];
    res.render('admin/personal/updatapsw',{updatadata:updatadata});
})


//提交密码修改
router.post('/updatapsw',function(req,res){
    var query = req.body;
    request_mothed('/admin/user','put',query,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            req.session['admin'] = null;
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





//提交更新管理员信息

router.post('/save',function(req,res){
    var query = req.body;
    request_mothed('/admin/user','put',query,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            req.session['admin']=data['data'];
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


module.exports = router;