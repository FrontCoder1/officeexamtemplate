var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();
var login = require('./login');
var back = require('./back');
var user_add = require('./school/user/add'),
    user_see = require('./school/user/see');

var coujson = require('./public/coujson');
var exam_see = require('./school/exam/see');
var question_add = require('./school/question/add'),
    question_see = require('./school/question/see');
var personal_information = require('./school/personal/information'),
    personal_loginOut = require('./school/personal/loginout');
//为根请求设置路由

// express().use(express.static(path.join(__dirname, 'uploadFile')));

router.use('/',(req,res,next)=>{
    console.log(req.session);
    if(!req.session['school'] && req.url!='/back'){
        res.redirect('/school/back');
    }else {
        next();
    }
})




router.get('/',(req,res)=>{
        //读取响应角色的json
        fs.readFile(path.join(__dirname, "../public/json/school1.json"),'utf-8',(err,data)=>{
            if(err) {
                console.log(err);
                res.status(500).send('读取文件失败').end();
            }else{
                var resdata = coujson(data);
                res.render('public1/admin',{sideitems:resdata,role:req.session['school'].username});
            }
        })

})

//返回登录页面路由
router.use('/back',back);

//添加班级用户和查看班级用户
router.use('/user/add',user_add);
router.use('/user/see',user_see);



// 考试管理
router.use('/exam/see',exam_see);
//

//试题管理
router.use('/question/add',question_add);
router.use('/question/see',question_see);
//
// //个人中心
//
//
router.use('/personal/information',personal_information);
router.use('/personal/loginout',personal_loginOut);


module.exports = router;
