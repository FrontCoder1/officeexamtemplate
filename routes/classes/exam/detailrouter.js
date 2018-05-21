var express = require('express');
var router = express.Router();


router.post('/examdetail',function (req,res,next) {
    var reqdata = req.body;
    let resdata = {
        state:1,
        msg:'成功'
    }
    router.data = reqdata;
    res.send(resdata);
})

router.post('/choicedetail',function (req,res,next) {
    var reqdata = req.body;
    let resdata = {
        state:1,
        msg:'成功'
    }
    router.data = reqdata;
    res.send(resdata);
})

router.post('/operationdetail',function (req,res,next) {
    var reqdata = req.body;
    let resdata = {
        state:1,
        msg:'成功'
    }
    router.data = reqdata;
    res.send(resdata);
})

module.exports = router;