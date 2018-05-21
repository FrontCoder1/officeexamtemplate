var express = require('express');
const url = require('url');
var choice = require('./choice');
var operation =require('./operation')
var request_mothed = require('../../public/request_mothed');
var router = express.Router();


/*
* 加载开始组织测试信息页面
* */
router.get('/',function(req,res){
    res.render('classes/exam/record',{resdata:req.session['classes']});
})


router.post('/',function(req,res){
    var query = req.body;
    console.log(query);
    request_mothed('/classes/exam','post',query,(data)=>{
        req.session['examId'] = data.data;
        var resdata = null;
        if(data.code==1||data.code==-1){
            resdata = {state:data.code,msg:data.msg};
        }else{
            resdata = {state:-1,msg:"未知错误"};
        }

        res.send(resdata);
    })

})

//进入选择选择题
router.use('/choice',choice);
//进入选择操作题
router.use('/operation',operation);



module.exports = router;