var express = require('express');
const url = require('url');
var detailrouter = require('./detailrouter');
var request_mothed = require('../../public/request_mothedn');
var router = express.Router()

router.get('/',function(req,res){
    res.render('school/user/userdetail');
})

//加载请求并发送表格数据

router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    console.log(detailrouter.data)
    query.classesId = detailrouter.data.id;
    //query.roleId = 3;//3代表班级角色id
    request_mothed('/classes/student','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data']['content'];
            var resdata = {"code":0,"msg":"","count":data['data']['totalElements'],"data":resdataarry};
            res.send(resdata);
        }else if(data.code==0){
            //console.log('班级表格'+data.msg);
            res.send('查询数据失败');
        }else{
            res.send('查询数据失败');
        }
    })

})
//单个删除
router.post('/delete',function(req,res){
    var query = req.body.id;
    request_mothed('/classes/student','DELETE',query,(data)=>{
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




//到达更新用户

router.get('/updatauser',function(req,res){
    var resdata = detailrouter.data;
    var updatadata = resdata;
    console.log(updatadata)
    res.render('school/user/updatauser',{updatadata})
})


//提交更新班级信息

router.post('/updatauser',function(req,res){
    var query = req.body;
    request_mothed('/classes/student','put',query,(data)=>{
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

    request_mothed('/classes/student/deleteBatchStudent','post',resobj,(data)=>{
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

//加载该具体内容
router.use('/detail/detailrouter',detailrouter);

module.exports = router;