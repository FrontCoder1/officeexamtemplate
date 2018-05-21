var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    req.session['classes'] = null;//清空classes的session
    res.render('public1/back');//返回登录页面
})


module.exports = router;