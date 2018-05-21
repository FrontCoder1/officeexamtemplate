var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
    res.render('public1/back');
})

/*请求登录页面*/



module.exports = router;