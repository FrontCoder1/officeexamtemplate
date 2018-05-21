var request = require('request');
const fs = require('fs');
const reqURL = require('./reqURL.json');
const reqHost = reqURL.hostName;


module.exports = function downloadFile(uri,filename,callback){
    var basename = '';
    var url = `http://${reqHost}:10006`+uri;
    //var name = fs.createWriteStream(filename);
    request
        .get(url)
        .on('response', function (response) {
            var header = response.headers['content-disposition'];
            console.log("----服务器返回文件名-----");
            console.log(header);
            try{
                basename=decodeURI(header.split('=')[1]);
            }catch(e){
                fs.unlink(filename,(err)=>{
                    if(err) {
                        console.log('文件下载失败'+err);
                    }
                })
            }
        })
        .pipe(fs.createWriteStream(filename))
        .on('close', ()=>{
            callback(basename);
        })
}

