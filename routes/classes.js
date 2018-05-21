var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();
var login = require('./login');
var back = require('./back');
var user_add = require('./classes/user/add'),
    user_see = require('./classes/user/see');

var coujson = require('./public/coujson');
var exam_record = require('./classes/exam/record');
var exam_see = require('./classes/exam/see');
var personal_information = require('./classes/personal/information'),
    personal_loginOut = require('./classes/personal/loginout');

//为根请求设置路由


router.use('/',(req,res,next)=>{
    console.log(req.session);
    if(!req.session['classes'] && req.url!='/back'){
        res.redirect('/classes/back');
    }else {
        next();
    }
})



router.get('/',(req,res)=>{
        //读取响应角色的json
        fs.readFile(path.join(__dirname, "../public/json/classes1.json"),'utf-8',(err,data)=>{
            if(err) {
                console.log(err);
                res.status(500).send('读取文件失败').end();
            }else{

                var resdata = coujson(data);


                res.render('public1/admin',{sideitems:resdata,role:req.session['classes'].username});
            }
        })

})


//返回登录
router.use('/back',back)

//学生用户管理
router.use('/user/add',user_add);
router.use('/user/see',user_see);




// 考试管理


router.use('/exam/record',exam_record);
router.use('/exam/see',exam_see);


//个人中心


router.use('/personal/information',personal_information);
router.use('/personal/loginout',personal_loginOut);


module.exports = router;
