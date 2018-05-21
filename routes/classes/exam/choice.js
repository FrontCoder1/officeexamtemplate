var express = require('express');
const url = require('url');
var detailrouter = require('./detailrouter');
var request_mothed = require('../../public/request_mothed');
var router = express.Router();


router.get('/',function(req,res){
    res.render('classes/exam/recordchoose');
})


router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var queryn = querydata.query;
    var query = {};
    query.classesId = req.session['classes']['id'];
    query.examId = req.session['examId'];
    query.keyWord = queryn?queryn.keyWord:'';
    request_mothed('/classes/exam/getChoice','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data'];
            for(var i=0;i<resdataarry.length;i++){
                var title =resdataarry[i].title;
                if(/^(Picture:)/.test(title)){
                    resdataarry[i]["url"] = title;
                    resdataarry[i]['title'] = "此类型为图片，可在详情里面查看";

                }
            }
            var resdata = {"code":0,"msg":"","count":data['data']['totalElements'],"data":resdataarry};
            res.send(resdata);
        }else {
            //console.log('班级试题表格'+data.msg);
            res.send('查询数据失败');
        }
    })

})


router.get('/choicedetail',function(req,res){
    var resdata = detailrouter.data;
    res.render('classes/exam/choosedetail',{choosedata:resdata})
})




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

    request_mothed('/classes/exam/choice','put',resobj,(data)=>{
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