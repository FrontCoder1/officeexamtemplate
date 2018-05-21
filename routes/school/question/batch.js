var express = require('express');
const path = require("path");
var request_mothed = require('../../public/request_mothed');
const multer = require("multer");
var upload = multer({ dest: path.join(__dirname, '../../../downLoad') });
const fs = require('fs');
var router = express.Router();



//加载批量添加页面
router.get('/',(req,res)=>{
    res.render('school/questions/addBatch');
})



router.post('/',upload.single('file'),(req,res,next)=>{
    var filen = req.file;
    console.log("------批量上传文件信息--------");
    console.log(filen);
    var pat = path.extname(filen.originalname);
    var oldname = filen.path;
    var date = new Date().toLocaleDateString()+''+new Date().getTime();
    var newname = filen.path+date+pat;
    var query = {};
    query.schoolId = req.session['school'].id;
    query.path = newname;
    fs.rename(oldname,newname,(err)=>{
        if(err) {
            console.log(err);
            fs.unlink(oldname,(err)=>{
                if(err) {
                    console.log('修改失败'+err);
                }
            })
            let resdata = {
                state:0,
                msg:'批量添加失败'
            };
            res.send(resdata);
        }
        else{
            request_mothed('/school/question/saveBatch','post',query,(data)=>{
                if(data.code==1){
                    console.log(data);
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
                    fs.unlink(newname,(err)=>{
                        if(err) {
                            console.log('文件修改失败'+err);
                        }
                    })
                    res.send(resdata);
                }else {
                    let resdata = {
                        state:0,
                        msg:'未知错误'
                    };
                    fs.unlink(newname,(err)=>{
                        if(err) {
                            console.log('文件修改失败'+err);
                        }
                    })
                    res.send(resdata);
                }
            })
        }
    })

})

router.get('/downmould',(req,res)=>{
    var mypath = path.join(__dirname, '../../../public/file/question.xlsx');
    res.download(mypath,(err)=>{
        if(err) {
            console.log(err);
        }else{
            //console.log('模板下载成功');
        }
    })
})




module.exports = router;