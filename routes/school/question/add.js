var express = require('express');
const path = require("path");
var request_mothed = require('../../public/request_mothed');
const multer = require("multer");
var upload = multer({ dest: path.join(__dirname, '../../../uploadFile') });
const fs = require('fs');
var router = express.Router();
const batch = require('./batch');


//加载添加页面
router.get('/',function(req,res){
    res.render('school/questions/addchoose');
})



router.post('/questionImg',upload.single('file'),(req,res)=> {

    console.log("------学校添加试题图片------");
    var file = req.file;
    var query = req.body;
    var filen = file;
    var fileitemname = filen.fieldname;
    var pat = path.extname(filen.originalname);
    var oldname = filen.path;
    var date = new Date().toLocaleDateString() + '' + new Date().getTime();
    var newname = filen.path + date + pat;
    var finaName = filen.filename + date + pat;
    fs.renameSync(oldname, newname);


    var resdata = {
        "code": 0 //0表示成功，其它失败
        , "msg": "上传成功" //提示信息一般上传失败后返回
        , "data": {
            "src": "/"+finaName
        }
    }
    res.send(resdata)
})



router.post('/save',(req,res)=>{
    var query = req.body;
    console.log("--------添加单个试题信息-----");

    query.schoolId = req.session['school'].id;
    query.school = req.session['school'].name;
    console.log(query);

    request_mothed('/school/question','post',query,(data)=>{
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            res.send(resdata);
        }else if(data.code==-1){
            let resdata = {
                state:0,
                msg:data.msg
            };
            res.send(resdata);
        }else {
            let resdata = {
                state:0,
                msg:'未知错误'
            };
            res.send(resdata);
        }
    })

})



router.post('/save',upload.fields([
    {name:'title',maxCount:1},
    {name:'option_a',maxCount:1},
    {name:'option_b',maxCount:1},
    {name:'option_c',maxCount:1},
    {name:'option_d',maxCount:1}
]),(req,res)=>{
    var files = req.files;
    //console.log(files);
    //console.log(req.body);
    var query = req.body;
    query.schoolId = req.session['school'].id;
    query.school = req.session['school'].name;

    for(var i in files){
        var filename = files[i];
        var filen = filename[0];
        var fileitemname = filen.fieldname;
        var pat = path.extname(filen.originalname);
        var oldname = filen.path;
        var date = new Date().toLocaleDateString()+''+new Date().getTime();
        var newname = filen.path+date+pat;
        var finaName = filen.filename+date+pat;
        fs.renameSync(oldname, newname);
        query[fileitemname] = "Picture:"+finaName;
    }

    request_mothed('/school/question','post',query,(data)=>{
        console.log(data);
        if(data.code==1){
            let resdata = {
                state:1,
                msg:data.msg
            };
            res.send(resdata);
        }else if(data.code==-1){
            let resdata = {
                state:0,
                msg:data.msg
            };
            res.send(resdata);
        }else {
            let resdata = {
                state:0,
                msg:'未知错误'
            };
            res.send(resdata);
        }
    })

})

//批量添加路由
router.use('/batch',batch);




module.exports = router;