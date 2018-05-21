var express = require('express');
var router = express.Router();


router.post('/choose',function (req,res,next) {
    var reqdata = req.body;
    let resdata = {
        state:1,
        msg:'成功'
    }
    router.data = reqdata;
    res.send(resdata);
})

router.post('/option',function (req,res,next) {
    var reqdata = req.body;
    let resdata = {
        state:1,
        msg:'成功'
    }
    router.data = reqdata;
    res.send(resdata);
})

router.post('/updatachoose',function (req,res,next) {
    var reqdata = req.body;
    let resdata = {
        state:1,
        msg:'成功'
    }
    router.data = reqdata;
    res.send(resdata);
})

module.exports = router;