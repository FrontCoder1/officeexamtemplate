var express = require('express');
const url = require('url');
var detailrouter = require('./detailrouter');
var request_mothed = require('../../public/request_mothed');
var router = express.Router();
const path = require('path');
var fs = require('fs');
var downfile = require('../../public/downfile');
var archiver = require('archiver');
var schoolUrl;

router.get('/',function(req,res){
    res.render('school/questions/seequestions',{});
})

//加载请求并发送表格数据

router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    query.schoolId = req.session['school']['id'];
    request_mothed('/school/question','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data']['content'];
            for(var i=0;i<resdataarry.length;i++){
                var title =resdataarry[i].title;
                if(/^(Picture:)/.test(title)){
                    resdataarry[i]["url"] = title;
                    resdataarry[i]['title'] = "该题为图片试题，请在详情中查看";
                }
            }

            //console.log(resdataarry)
            var resdata = {"code":0,"msg":"","count":data['data']['totalElements'],"data":resdataarry};
            res.send(resdata);
        }else if(data.code==0){
            console.log('学校试题表格'+data.msg);
            res.send('查询数据失败');
        }else{
            res.send('查询数据失败')
        }
    })

})

//单个删除
router.post('/delete',function(req,res){
    var query = req.body.id;
    request_mothed('/school/question','DELETE',query,(data)=>{
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

//查看选择题详情

router.get('/choosedetail',function(req,res){
    var resdata = detailrouter.data;

    res.render('school/questions/choosedetail',{choosedata:resdata})
})

//查看操作题详情

router.get('/optiondetail',function(req,res){
    var resdata = detailrouter.data;
    res.render('school/questions/optiondetail',{optiondata:resdata})
})

//到达更新选择题

router.get('/updatachoose',function(req,res){
    var resdata = detailrouter.data;
    var updatadata = resdata;
    res.render('school/questions/updatachoose',{updatadata})
})


//提交更新选择题

router.post('/updatachoose',function(req,res){
    var query = req.body;
    request_mothed('/school/question','put',query,(data)=>{
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
        }else{
            let resdata = {
                state:0,
                msg:'未知错误'
            };
            res.send(resdata);
        }
    })
})

//批量删除

router.post('/deleteBatch',function(req,res) {
    var query = req.body.data;
    var reqdata = JSON.parse(query);
    var str = "";
    for (var i = 0; i < reqdata.length; i++) {
        if (i < reqdata.length - 1) {
            str += `${reqdata[i]},`
        } else {
            str += `${reqdata[i]}`
        }
    }
    var resobj = {ids: str};

    request_mothed('/school/question/deleteBatch','put',resobj,(data)=>{
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
        }else{
            let resdata = {
                state:0,
                msg:'未知错误'
            };
            res.send(resdata);
        }
    })
})


router.get('/downschool/isSure',(req,res)=>{
    var id = req.session['school'].id;
    console.log("-----学校-----");
    console.log(id);
    if(id) {
        var fileUrl  = `/school/question/export?schoolId=${id}`;
        var date = new Date().toLocaleDateString()+' '+new Date().getTime();
        var mypath = path.join(__dirname, '../../../public/upload/')+date+'.xlsx';
        console.log(fileUrl);
        downfile(fileUrl,mypath,(name)=>{
            var newname = path.dirname(mypath)+'/'+name;
            schoolUrl = newname;
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
                    schoolUrl = undefined;

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
        schoolUrl = undefined;

        res.send(resData);
    }



});



router.get('/downschool',(req,res)=>{

    if(schoolUrl) {
        var newname = schoolUrl;
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


router.use('/detail/detailrouter',detailrouter);




module.exports = router;