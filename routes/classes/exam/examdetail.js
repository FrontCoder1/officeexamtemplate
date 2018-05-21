var express = require('express');
const url = require('url');
const fs = require('fs');
const path = require('path');
var request_mothed = require('../../public/request_mothed');
var downfile = require('../../public/downfile');
var detailrouter = require('./detailrouter');
var router = express.Router();
var classScoreUrl;
var classAnswerUrl;



router.get('/',function(req,res){
    res.render('classes/exam/examdetail');
})

//加载表格
router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    var resdata = detailrouter.data;
    query.examId = resdata.id;
    request_mothed('/classes/score','get',query,(data)=>{
        if(data.code==1){

            var resdataarry = data['data']['content'];
            if(resdataarry.length==0){
                req.session['classes']['examId'] = undefined;
            }else{
                req.session['classes']['examId'] = resdataarry[0].examId;
            }
            //拿到该班级的examId

            var resdata = {"code":0,"msg":"","count":data['data']['totalElements'],"data":resdataarry};
            res.send(resdata);
        }else{
            console.log('班级考试记录表格'+data.msg);
            res.send('查询数据失败');
        }
    })

})


// router.get('/downclassscore',(req,res)=>{
//     var id = req.session['classes']['id'];
//     var fileUrl  = `/classes/score/export?id=${id}`;
//     var date = new Date().toLocaleDateString()+' '+new Date().getTime();
//     var mypath = path.join(__dirname, '../../../public/upload/')+date+'.xls';
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
    // if(!id) {
    //     var resData = {
    //         'state': -1,
    //         'msg':"该班级还没成绩"
    //     };
    //     classScoreUrl = undefined;
    //
    //     res.send(resData);
    // }
    var fileUrl  = `/classes/score/export?examId=${id}`;
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

    var id = req.session['classes']['examId'];
    if(id) {
        var fileUrl  = `/classes/score/classScore?examId=${id}`;
        console.log(fileUrl);
        var date = new Date().toLocaleDateString()+''+new Date().getTime();
        var mypath = path.join(__dirname, '../../../public/upload/')+date+'.zip';
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

    // var id = req.session['classes']['examId'];
    // var fileUrl  = `/classes/score/classScore?examId=${id}`;
    // console.log(fileUrl);
    // var date = new Date().toLocaleDateString()+''+new Date().getTime();
    // var mypath = path.join(__dirname, '../../../public/upload/')+date+'.zip';
    // downfile(fileUrl,mypath,(name)=>{
    //     var newname = path.dirname(mypath)+'/'+name;
    //     fs.rename(mypath,newname,(err)=>{
    //         if(err) {
    //             console.log(err);
    //             fs.unlink(mypath,(err)=>{
    //                 if(err) {
    //                     console.log('文件下载失败'+err);
    //                 }
    //             })
    //         }
    //         else{
    //             res.download(newname,name,(err)=>{
    //                 if(err) {
    //                     console.log('文件下载失败'+err);
    //                     fs.unlink(newname,(err)=>{
    //                         if(err) {
    //                             console.log('文件下载失败'+err);
    //                         }
    //                     })
    //                 }
    //                 else{
    //                     fs.unlink(newname,(err)=>{
    //                         if(err) {
    //                             console.log('文件下载失败'+err);
    //                         }else{
    //                             console.log('文件下载成功');
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // });
})

router.get('/persondown',(req,res)=>{
    var querydata = url.parse(req.url,true);
    console.log("-----个人答卷信息------");

    var userId = querydata.query.userId;//userId
    var examId = querydata.query.examId;//examId
    var fileUrl  = `/classes/score/down?examId=${examId}&userId=${userId}`;
    console.log(fileUrl);
    var date = new Date().toLocaleDateString()+''+new Date().getTime();
    var mypath = path.join(__dirname, '../../../public/upload/')+date+'.zip';
    downfile(fileUrl,mypath,(name)=>{
        var newname = path.dirname(mypath)+'/'+name;
        console.log(newname);
        fs.rename(mypath,newname,(err)=>{
            if(err) {
                console.log(err);
                fs.unlink(mypath,(err)=>{
                    if(err) {
                        console.log('文件下载失败'+err);
                        res.status(404);
                        res.render('public1/error');
                    }
                })
            }
            else{
                res.download(newname,name,(err)=>{
                    if(err) {
                        console.log('文件下载失败'+err);
                        fs.unlink(newname,(err)=>{
                            if(err) {
                                console.log('文件下载失败'+err);
                            }
                        })
                    }
                    else{
                        fs.unlink(newname,(err)=>{
                            if(err) {
                                console.log('文件下载失败'+err);
                            }else{
                                console.log('文件下载成功');
                            }
                        })
                    }
                })
            }
        })
    });
})


module.exports = router;