const url = require('url');
const fs = require('fs');
const path = require('path');


module.exports=function renamedelete(mypath,newname,name,callback){
    fs.rename(mypath,newname,(err)=>{
        var status = 0;
        if(err) {
            callback(status);
            return;
        }
        else{
            res.download(newname,name,(err)=>{
                if(err) {
                    console.log('文件下载失败'+err);
                    callback(status);
                    return;
                }
                else{
                    fs.unlink(newname,(err)=>{
                        if(err) {
                            console.log('文件下载失败'+err);
                            callback(status);
                            return;
                        }else{
                            console.log('文件下载成功');
                            status=1;
                            callback(status);
                            return;
                        }
                    })
                }
            })
        }
    })
}