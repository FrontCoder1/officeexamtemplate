const http = require('http');
const fs = require('fs');
const reqURL = require('./reqURL.json');
const reqHost = reqURL.hostName;





module.exports = function uploadn(path,filepath,reqdata,callback) {
    let boundaryKey = '----' + new Date().getTime();    // 用于标识请求数据段
    let options = {
        host: `http://${reqHost}`, // 远端服务器域名
        port: 10006, // 远端服务器端口号
        method: 'POST',
        path: path, // 上传服务路径
        headers: {
            'Content-Type': 'multipart/form-data; boundary=' + boundaryKey,
            'Connection': 'keep-alive'
        }
    };
    let req = http.request(options, function(res){
        res.setEncoding('utf8');
        var resdata = '';
        res.on('data', function(chunk) {
            console.log('body: ' + chunk);
            resdata+=chunk;
        });

        res.on('end', function() {
            console.log(resdata);
            var postobj = JSON.parse(resdata);
            callback(postobj);
        });
    });

    req.write(
        `--${boundaryKey}rn Content-Disposition: form-data; name="file";"rn Content-Type: text/plain`
    );

    // 创建一个读取操作的数据流
    let fileStream = fs.createReadStream(filepath);
    fileStream.pipe(req, {end: false});
    fileStream.on('end', function() {
        req.end('rn--' + boundaryKey + '--');
    });
}