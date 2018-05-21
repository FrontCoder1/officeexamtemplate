var express = require('express');
var request_mothed = require('../../public/request_mothedn');
var router = express.Router();

//加载更新用户信息页面
router.get('/',function(req,res){
    var updatadata = req.session['classes'];
    res.render('classes/personal/seeperson',{updatadata:updatadata});
})
//加载修改密码页面
router.get('/updatapsw',function(req,res){
    var updatadata = req.session['classes'];
    res.render('classes/personal/updatapsw',{updatadata:updatadata});
})

//加载请求并发送表格数据

//
//修改密码
router.post('/updatapsw',function(req,res){
    var query = req.body;
    console.log("-----班级修改密码信息---------");
    console.log(query);
    request_mothed('/classes/student','put',query,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            req.session['classes'] = null;
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





//提交更新班级信息

router.post('/save',function(req,res){
    var query = req.body;
    console.log("-----班级修改信息---------");
    console.log(query);
    request_mothed('/classes/student','put',query,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            req.session['classes']=data['data'];
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