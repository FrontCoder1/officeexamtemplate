var express = require('express');
const url = require('url');
const fs = require('fs');
const path = require('path');
var detailrouter = require('./detailrouter');
var request_mothed = require('../../public/request_mothed');
var downfile = require('../../public/downfile');
var router = express.Router();
var classScoreUrl;
var classAnswerUrl;

router.get('/',function(req,res){
    res.render('school/exam/examdetail');
})


router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    query.examId = detailrouter.data.id;
    request_mothed('/school/score','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data']['content'];
            if(resdataarry.length==0){
                req.session['school']['examId'] = undefined;
            }else{
                req.session['school']['examId'] = resdataarry[0].examId;
            }
            var resdata = {"code":0,"msg":"","count":data['data']['totalElements'],"data":resdataarry};
            res.send(resdata);
        }else if(data.code==0){
            console.log('班级考试记录表格'+data.msg);
            res.send('查询数据失败');
        }else{
            res.send('查询数据失败');
        }
    })

})

router.get('/downclassscore',(req,res)=>{
    if(classScoreUrl) {
        var newname = classScoreUrl;
        res.download(newname, (err) => {
            if (err) {
                console.log('文件下载失败' + err);
                fs.unlink(newname, (err) => {
                    if (err) {
                        console.log('文件下载失败' + err);
                    }
                })
            }
            else {
                fs.unlink(newname, (err) => {
                    if (err) {
                        console.log('文件下载失败' + err);
                    } else {
                        console.log('文件下载成功');
                    }
                })
            }
        })
    }else{
        var resData = {
            'state': -1,
            'msg':"下载出错"
        };

        res.send(resData);
    }
})

router.get('/downclassscore/isSure',(req,res)=>{

    var id = detailrouter.data.id;

    var fileUrl  = `/school/score/export?examId=${id}`;
    console.log("------学校下载成绩---------");
    console.log(fileUrl)
    var date = new Date().toLocaleDateString()+''+new Date().getTime();
    var mypath = path.join(__dirname, '../../../public/upload/')+date+'.xlsx';
    downfile(fileUrl,mypath,(name)=>{
        var newname = path.dirname(mypath)+'/'+name;
        classScoreUrl = newname;
        fs.rename(mypath,newname,(err)=>{
            if(err) {
                console.log(err);
                fs.unlink(mypath,(err)=>{
                    if(err) {
                        console.log('文件下载失败'+err);
                    }
                })
                var resData = {
                    'state': -1,
                    'msg':"下载出错"
                };
                classScoreUrl = undefined;

                res.send(resData);
            }
            else{
                var resData = {
                    'state': 1,
                    'msg':"准备下载"
                }

                res.send(resData);
            }
        })
    });

});



router.get('/downclassanswer/isSure',(req,res)=>{

    var id = req.session['school']['examId'];
    if(id) {
        var fileUrl  = `/school/score/downClassScore?examId=${id}`;
        console.log(fileUrl);
        var date = new Date().toLocaleDateString()+' '+new Date().getTime();
        var mypath = path.join(__dirname, '../../../public/upload/')+date+'.xlsx';
        downfile(fileUrl,mypath,(name)=>{
            var newname = path.dirname(mypath)+'/'+name;
            classAnswerUrl = newname;
            fs.rename(mypath,newname,(err)=>{
                if(err) {
                    console.log(err);
                    fs.unlink(mypath,(err)=>{
                        if(err) {
                            console.log('文件下载失败'+err);
                        }
                    })
                    var resData = {
                        'state': -1,
                        'msg':"下载出错"
                    };
                    classAnswerUrl = undefined;

                    res.send(resData);
                }
                else{
                    var resData = {
                        'state': 1,
                        'msg':"准备下载"
                    }

                    res.send(resData);
                }
            })
        });

    }else{
        var resData = {
            'state': -1,
            'msg':"此次测试未有答卷"
        };
        classAnswerUrl = undefined;

        res.send(resData);
    }



});



router.get('/downclassanswer',(req,res)=>{

    if(classAnswerUrl) {
        var newname = classAnswerUrl;
        res.download(newname, (err) => {
            if (err) {
                console.log('文件下载失败' + err);
                fs.unlink(newname, (err) => {
                    if (err) {
                        console.log('文件下载失败' + err);
                    }
                })
            }
            else {
                fs.unlink(newname, (err) => {
                    if (err) {
                        console.log('文件下载失败' + err);
                    } else {
                        console.log('文件下载成功');
                    }
                })
            }
        })
    }else{
        var resData = {
            'state': -1,
            'msg':"下载出错"
        };

        res.send(resData);
    }


})


// router.get('/downclassanswer',(req,res)=>{
//     var id = detailrouter.data.classesId;
//     var fileUrl  = `/school/score/downClassScore?classesId=${id}`;
//     var date = new Date().toLocaleDateString()+' '+new Date().getTime();
//     var mypath = path.join(__dirname, '../../../public/upload/')+date+'.zip';
//     downfile(fileUrl,mypath,(name)=>{
//         var newname = path.dirname(mypath)+'/'+name;
//         fs.rename(mypath,newname,(err)=>{
//             if(err) {
//                 console.log(err);
//                 fs.unlink(mypath,(err)=>{
//                     if(err) {
//                         console.log('文件下载失败'+err);
//                     }
//                 })
//             }
//             else{
//                 res.download(newname,name,(err)=>{
//                     if(err) {
//                         console.log('文件下载失败'+err);
//                         fs.unlink(newname,(err)=>{
//                             if(err) {
//                                 console.log('文件下载失败'+err);
//                             }
//                         })
//                     }
//                     else{
//                         fs.unlink(newname,(err)=>{
//                             if(err) {
//                                 console.log('文件下载失败'+err);
//                             }else{
//                                 console.log('文件下载成功');
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     });
// })


module.exports = router;