var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    req.session['admin'] = null;//清空admin中session
    res.render('public1/back');//返回登录页面
})


module.exports = router;