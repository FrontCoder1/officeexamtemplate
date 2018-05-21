var express = require('express');
const url = require('url');
var detailrouter = require('./detailrouter');
var examdetail = require('./examdetail');
var request_mothed = require('../../public/request_mothed');
var router = express.Router()

router.get('/',function(req,res){
    res.render('school/exam/seeexam');
})

//加载请求并发送表格数据

router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    query.schoolId = req.session['school']['id'];
    request_mothed('/school/exam','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data']['content'];
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
//查看详情

router.use('/examdetail',examdetail);


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

    request_mothed('/school/exam/deleteBatch','put',resobj,(data)=>{
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