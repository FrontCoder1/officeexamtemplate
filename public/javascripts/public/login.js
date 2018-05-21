function gitId(a){
    return document.getElementById(a)
}
function md5(str){
    return  hex_md5(str);
}
function http_Post(data){
    var obj = new XMLHttpRequest();
    obj.open("POST", '/', true);
    obj.setRequestHeader("Content-type", "application/json");

    obj.onreadystatechange = function() {
        if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改
            var resdata = obj.responseText;
            var resobj = JSON.parse(resdata);
            if(resobj.statuscod==0){
                message.innerHTML=resobj.message;
            }else if(resobj.statuscod==1){
                message.innerHTML=resobj.message;
                if(resobj.roleId==1){
                    window.location.href = "/admin"
                }else if(resobj.roleId==2){
                    window.location.href = "/school"
                }else if(resobj.roleId==3){
                    window.location.href = "/classes"
                }
            }else{
                message.innerHTML=resobj.message;
            }
        }
        else{
            message.innerHTML='加载中...';
        }
    };
    obj.send(data);
}
function sub(){
    var number =Math.ceil(Math.random()*100)*100,
        username = gitId('username').value;
        message = gitId('showmessage');
        miup = md5(encodeURIComponent(username+number.toString()+md5(encodeURIComponent(gitId('password').value))));
        data = JSON.stringify({
            "username":username,
            "number":number,
            "password":miup
        });
    http_Post(data)
}

$(document).keyup(function (e) {//捕获文档对象的按键弹起事件
    if (e.keyCode == 13) {//按键信息对象以参数的形式传递进来了
        //此处编写用户敲回车后的代码
        sub();
    }
});