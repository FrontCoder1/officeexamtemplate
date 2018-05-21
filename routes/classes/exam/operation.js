var express = require('express');
const url = require('url');
var detailrouter = require('./detailrouter');
var request_mothed = require('../../public/request_mothed');
var router = express.Router();



router.get('/',function(req,res){
    res.render('classes/exam/recordopter');
})

//加载表格
router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var queryn = querydata.query;
    var query = {};
    query.classesId = req.session['classes']['id'];
    query.examId = req.session['examId'];
    query.keyWord = queryn?queryn.keyWord:'';
    request_mothed('/classes/exam/getOperation','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data'];

            console.log("------操作题-------");
            console.log(resdataarry.length);

            var resdata = {"code":0,"msg":"","count":data['data']['totalElements'],"data":resdataarry};

            res.send(resdata);
        }else {
            console.log('班级试题表格'+data.msg);
            res.send('查询数据失败');
        }
    })

})


router.get('/operationdetail',function(req,res){
    var resdata = detailrouter.data;
    res.render('classes/exam/optiondetail',{optiondata:resdata})
})

//保存操作题
router.post('/save',function(req,res) {
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
    var resobj = {examPaper: str};
    resobj.id = req.session['examId'];

    request_mothed('/classes/exam/operation','put',resobj,(data)=>{
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