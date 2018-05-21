var express = require('express');
var router = express.Router();
var login = require('./login');
var back = require('./back');
var admin = require('./admin');
var classes = require('./classes');
var school = require('./school');
var path = require('path');


// express().use(express.static(path.join(__dirname, 'uploadFile')));

// router.get('/',(req,res)=>{
//     res.redirect('/login');
// })


//为根请求设置路由


router.use('/back',back);

//进入管理员

router.use('/admin',admin);

//进入学校
router.use('/school',school);


//进入班级
router.use('/classes',classes);

//进入登录
router.use('/',login);



//主页面

router.get('/main',(req,res)=>{
    var jsonObject1 = req.session['messages'];

    if(req.session['roleId']==1){
        jsonObject1 = req.session['admin']['messages']
    }else if(req.session['roleId']==2){
        jsonObject1 = req.session['school']['messages']
    }else if(req.session['roleId']==3){
        jsonObject1 = req.session['classes']['messages']
    }



    var keys1 = [];
    var data = [];
    for (var p1 in jsonObject1) {
        if (jsonObject1.hasOwnProperty(p1))
            keys1.push(p1);
            data.push(jsonObject1[p1])
    }
    res.render('public1/main.ejs',{restitle:keys1,resdata:data});
})

router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('public1/error');
});

module.exports = router;
