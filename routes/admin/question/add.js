var express = require('express');
const path = require("path");
var request_mothed = require('../../public/request_mothed');
var uploadn = require('../../public/uploadn');
const multer = require("multer");
var upload = multer({ dest: path.join(__dirname, '../../public/upload') });
var router = express.Router();


//加载添加页面
router.get('/',function(req,res){
    res.render('admin/questions/addchoose');
})

router.get('/batch',(req,res)=>{
    res.render('admin/questions/addBatch');
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


// router.post('/save',(req,res)=>{
//     var query = req.body;
//     request_mothed('/admin/question','post',query,(data)=>{
//         if(data.code==1){
//             let resdata = {
//                 state:1,
//                 msg:data.msg
//             };
//             res.send(resdata);
//         }else if(data.code==-1){
//             let resdata = {
//                 state:0,
//                 msg:data.msg
//             };
//             res.send(resdata);
//         }else {
//             let resdata = {
//                 state:0,
//                 msg:'未知错误'
//             };
//             res.send(resdata);
//         }
//     })
//
// })

module.exports = router;