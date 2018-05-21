var express = require('express');
const fs = require('fs');
const path = require('path');
var router = express.Router();
var login = require('./login');
var back = require('./back');
var user_add = require('./admin/user/add'),
    user_see = require('./admin/user/see');
var permission_add = require('./admin/permission/add'),
    permission_see = require('./admin/permission/see');
var role_add = require('./admin/role/add'),
    role_see = require('./admin/role/see');
role_divisionPermis = require('./admin/role/divisionPermis');
var type_add = require('./admin/type/add'),
    type_see = require('./admin/type/see');
var question_add = require('./admin/question/add'),
    question_see = require('./admin/question/see');


var coujson = require('./public/coujson');
var exam_record = require('./admin/exam/record');
var personal_information = require('./admin/personal/information'),
    personal_loginOut = require('./admin/personal/loginout');
//为根请求设置路由


router.use('/',(req,res,next)=>{
    if(!req.session['admin'] && req.url!='/back'){
        res.redirect('/admin/back');
    }else {
        next();
    }
})


//加载admin页面路由
router.get('/',(req,res)=>{
        //读取响应角色的json
        fs.readFile(path.join(__dirname, "../public/json/admin1.json"),'utf-8',(err,data)=>{
            if(err) {
                console.log(err);
                res.status(500).send('读取文件失败').end();
            }else{

                var resdata = coujson(data);
                res.render('public1/admin',{sideitems:resdata,role:req.session['admin'].username});
            }
        })
})

//返回登录页面
router.use('/back',back);

//加载学校用户
router.use('/user/add',user_add);
router.use('/user/see',user_see);


//权限管理


router.use('/permission/add',permission_add);
router.use('/permission/see',permission_see);


// 角色管理


router.use('/role/add',role_add)
router.use('/role/see',role_see)
router.use('/role/divisionPermis',role_divisionPermis)



// 类型管理


router.use('/type/add',type_add);
router.use('/type/see',type_see);

// 试题管理


router.use('/question/add',question_add);
router.use('/question/see',question_see);


// 考试管理


router.use('/exam/record',exam_record);


//个人中心


router.use('/personal/information',personal_information);
router.use('/personal/loginout',personal_loginOut);


module.exports = router;
