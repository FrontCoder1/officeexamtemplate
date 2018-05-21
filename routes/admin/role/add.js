var express = require('express');
var request_mothed = require('../../public/request_mothedn');
var router = express.Router();

router.get('/',function(req,res){
    res.render('admin/role/addrole');
})

router.post('/save',function(req,res){
    var query = req.body;
    request_mothed('/admin/role','post',query,(data)=>{
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