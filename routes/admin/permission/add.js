var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.send("holle   my name  is hexin an 这是添加权限")
})


module.exports = router;