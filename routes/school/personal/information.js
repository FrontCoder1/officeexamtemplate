var express = require('express');
const url = require('url');
var request_mothed = require('../../public/request_mothedn');
var router = express.Router()

router.get('/',function(req,res){
    var updatadata = req.session['school'];
    console.log(updatadata);
    res.render('school/personal/seeperson',{updatadata:updatadata});
})


//修改密码
router.get('/updatapsw',function(req,res){
    var updatadata = req.session['school'];
    res.render('school/personal/updatapsw',{updatadata:updatadata});
})

//加载请求并发送表格数据

//

router.post('/updatapsw',function(req,res){
    var query = req.body;
    request_mothed('/admin/user','put',query,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            req.session['school'] = null;
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
                msg:'服务器错误'
            };
            res.send(resdata);

        }
    })
})





//提交更新学校管理员信息

router.post('/save',function(req,res){
    var query = req.body;
    request_mothed('/admin/user','put',query,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            req.session['school']=data['data'];
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