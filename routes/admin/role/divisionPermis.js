var express = require('express');
const url = require('url');
var detailrouter = require('./detailrouter');
var request_mothed = require('../../public/request_mothedn');
var router = express.Router();

router.get('/',function(req,res){
    res.render('admin/role/divisionPermis');
})

router.get('/table',function(req,res){
    var querydata = url.parse(req.url,true);
    var query = querydata.query;
    request_mothed('/admin/role','get',query,(data)=>{
        if(data.code==1){
            var resdataarry = data['data']['content'];
            //根据角色的英文名添加cname为对应的汉语名称
            for(var i=0;i<resdataarry.length;i++){
                if(resdataarry[i].name=='admin'){
                    resdataarry[i].cname='管理员'
                }else if(resdataarry[i].name=='school'){
                    resdataarry[i].cname='学校'
                }else if(resdataarry[i].name=='classes'){
                    resdataarry[i].cname='班级'
                }else if(resdataarry[i].name=='student'){
                    resdataarry[i].cname='学生'
                }
                else{
                    resdataarry[i].cname='未知用户'
                }
            }
            var resdata = {"code":0,"msg":"","count":data['data']['totalElements'],"data":resdataarry};
            res.send(resdata);
        }else{
            console.log('管理员角色权限分配表格'+data.msg);
            res.send('查询数据失败');
        }
    })
})


router.get('/permisdetail',(req,res)=>{
    var query = {};
    query.roleId = detailrouter.data.id;
    request_mothed('/admin/rolePermission/getAllPermissions','post',query,(data)=>{
        if(data.code==1){
            var alreadypermis = data.data['0'];
            var allpermis = data.data['1'];
            for(var i=0;i<alreadypermis.length;i++){
                for(var j=0;j<allpermis.length;j++){
                    if(alreadypermis[i]['id']==allpermis[j]['id']){
                        allpermis[j].select = 1;
                    }
                }
            }
            var resdata = allpermis;
            res.render('admin/role/permisdetail',{resdata});
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

router.post('/permisdetail/save',function(req,res) {
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
    var resobj = {roleId:detailrouter.data.id,ids: str};
    console.log(resobj)

    request_mothed('/admin/rolePermission/saveRolePermission','post',resobj,(data)=>{
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
        }else{
            let resdata = {
                state:0,
                msg:'未知错误'
            };
            res.send(resdata);
        }
    })
})


router.use('/detail/detailrouter',detailrouter);


module.exports = router;