var express = require('express');
const fs = require('fs');
const path = require('path');
var request_mothed = require('./public/request_mothedn');
var router = express.Router();


router.get('/',function(req,res){
    res.render('public1/login');
})

/*请求登录页面*/


router.post('/',function (req,res,next) {
    var requser = req.body;
    var postData = {
            'allData': requser.password,
            'username' : requser.username,
            'random': requser.number
        };

    request_mothed('/login','put',postData,(data)=>{
        var postobj = data;
        if(postobj.code==1){
            var roleId = data['data']['user']['roleId'];
            req.session['roleId'] = roleId;
            var resobj = {
                'statuscod':1,
                'roleId':roleId,
                'message':data.msg
            };
            if(roleId==1){
                var menu = JSON.stringify(postobj['data']['menu']);
                var resmessage = postobj['data']['admin'];
                var messages = {
                    "学校数目":resmessage[0],
                    "试题数目":resmessage[1],
                    "测试次数":resmessage[2],
                    "权限个数":resmessage[3]
                };
                req.session['admin']=postobj['data']['user'];
                req.session['admin']['messages'] = messages;
                fs.writeFile(path.join(__dirname, "../public/json/admin1.json"),menu,'utf-8',(err,data)=>{
                    if(err) {
                        console.log(err);
                        res.status(500).end();
                    }else{
                        router.data = postobj.data.user;
                        res.send(JSON.stringify(resobj));
                    }
                })
            }else if(roleId==2){
                var menu = JSON.stringify(postobj['data']['menu']);
                var resmessage = postobj['data']['school'];
                var messages = {
                    "班级数目":resmessage[0],
                    "试题数目":resmessage[1],
                    "测试次数":resmessage[2],
                    "学生总数":resmessage[3]
                };
                req.session['school']=postobj['data']['user'];
                req.session['school']['messages'] = messages;

                fs.writeFile(path.join(__dirname, "../public/json/school1.json"),menu,'utf-8',(err,data)=>{
                    if(err) {
                        console.log(err);
                        res.status(500).end();
                    }else{
                        router.data = postobj.data.user;
                        res.send(JSON.stringify(resobj));
                    }
                })
            }else if(roleId==3){
                var menu = JSON.stringify(postobj['data']['menu']);
                var resmessage = postobj['data']['classes'];
                var messages = {
                    "学生人数":resmessage[0],
                    "测试次数":resmessage[1],
                    "试题数目":resmessage[2],
                    "学校人数":resmessage[3]
                };

                req.session['classes']=postobj['data']['user'];
                req.session['classes']['messages'] = messages;

                fs.writeFile(path.join(__dirname, "../public/json/classes1.json"),menu,'utf-8',(err,data)=>{
                    if(err) {
                        console.log(err);
                        res.status(500).end();
                    }else{
                        router.data = postobj.data.user;
                        res.send(JSON.stringify(resobj));
                    }
                })
            }
        }else if(postobj.code==-1){
            var resobj = {
                'statuscod':0,
                'message':data.msg
            }
            res.send(JSON.stringify(resobj));
        }else{
            var resobj = {
                        'statuscod':0,
                        'message':'服务器错误，请稍后再试'
                    }
            res.send(JSON.stringify(resobj));
        }
    });

})

module.exports = router;