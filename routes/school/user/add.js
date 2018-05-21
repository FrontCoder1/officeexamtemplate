var express = require('express');
var request_mothed = require('../../public/request_mothedn');
var router = express.Router()

router.get('/',function(req,res){
    res.render('school/user/adduser');
})


//批量生成用户
router.post('/saveBatch',function(req,res){
    var query = req.body;
    query.schoolId = req.session['school'].id;
    query.startTime = req.session['school'].startTime;
    query.stopTime = req.session['school'].stopTime;
    request_mothed('/school/classes','post',query,(data)=>{
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


module.exports = router;