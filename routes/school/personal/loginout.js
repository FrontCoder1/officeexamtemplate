var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    //清除该角色session
    req.session['school'] = null;
    res.render('public1/back');//返回登录页面
})


module.exports = router;