const http = require('http');
const url = require('url');
const fs = require('fs');
const spath = require('path');
const querystring = require('querystring');
const reqURL = require('./reqURL.json');
const reqHost = reqURL.hostName;


/*
*path:路径(格式字符串)
*
* method:请求方法（格式字符串）
*
* reqdata：往服务器发送数据（格式对象）
*
* callfun： 用于返回数据的字符串（回调函数）
*
* */

module.exports = function reqmessage(path,method,reqdata,callfun) {
    if (method.toLocaleUpperCase() == 'GET') {
        var postData = querystring.stringify(reqdata);
        var options = {
            hostname: reqHost,
            port: 10006,
            path: path + '?' + postData,
            method: 'GET'
        };
        //console.log(options.path);
        var reqn = http.request(options, (resn) => {
            console.log(`状态码: ${resn.statusCode}`);
            console.log(`响应头: ${JSON.stringify(resn.headers)}`);
            resn.setEncoding('utf8');
            var postString = '';
            resn.on('data', (chunk) => {
                postString += chunk;
            });
            resn.on('end', () => {
                var postobj = JSON.parse(postString);
                console.log('响应中已无数据。');
                callfun(postobj);
            });
        });

        reqn.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });

        reqn.end();

    } else if (method.toLocaleUpperCase() == 'UPLOAD') {
        var postData = querystring.stringify(reqdata)
        var options = {
            hostname: reqHost,
            port: 10006,
            path: path + '?' + postData,
            method: 'GET'
        };
        var date = new Date().toLocaleDateString()+' '+new Date().getTime();
        var mypath = spath.join(__dirname, '../../public/upload/')+date+'.xlsx';
        var stream = fs.createWriteStream(mypath);
        var reqn = http.request(options, (resn) => {
            console.log(`状态码: ${resn.statusCode}`);
            console.log(`响应头: ${JSON.stringify(resn.headers)}`);
            resn.setEncoding('utf8');
            var postString = '';
            resn.on('data', (chunk) => {
                postString += chunk;
                chunk.pipe(stream).on('close');
            });
            resn.on('end', () => {
                var resdata = {};
                resdata.header = resn.headers;
                resdata.content = postString;
                console.log('响应中已无数据。');
                callfun(resdata);
            });
        });

        reqn.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });

        reqn.end();

    } else if (method.toLocaleUpperCase() == 'POST') {
        var postData = querystring.stringify(reqdata);
        var options = {
            hostname: reqHost,
            port: 10006,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        var reqn = http.request(options, (resn) => {
            console.log(`状态码: ${resn.statusCode}`);
            console.log(`响应头: ${JSON.stringify(resn.headers)}`);
            resn.setEncoding('utf8');
            var postString = '';
            resn.on('data', (chunk) => {
                postString += chunk;
            });
            resn.on('end', () => {
                var postobj = JSON.parse(postString);
                console.log('响应中已无数据。');
                callfun(postobj);
            });
        });

        reqn.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });
        reqn.write(postData);

        reqn.end();
    }
    else if (method.toLocaleUpperCase() == 'DELETE') {
        var postData = querystring.stringify(reqdata);
        var options = {
            hostname: reqHost,
            port: 10006,
            path: path + '/' + reqdata,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        var reqn = http.request(options, (resn) => {
            console.log(`状态码: ${resn.statusCode}`);
            console.log(`响应头: ${JSON.stringify(resn.headers)}`);
            resn.setEncoding('utf8');
            var postString = '';
            resn.on('data', (chunk) => {
                postString += chunk;
            });
            resn.on('end', () => {
                console.log(postString)
                var postobj = JSON.parse(postString);
                console.log('响应中已无数据。');
                callfun(postobj);
            });
        });

        reqn.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });

        reqn.end();
    }else if (method.toLocaleUpperCase() == 'PUT') {
        var postData = querystring.stringify(reqdata);
        var options = {
            hostname: reqHost,
            port: 10006,
            path: path,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        var reqn = http.request(options, (resn) => {
            console.log(`状态码: ${resn.statusCode}`);
            console.log(`响应头: ${JSON.stringify(resn.headers)}`);
            resn.setEncoding('utf8');
            var postString = '';
            resn.on('data', (chunk) => {
                postString += chunk;
            });
            resn.on('end', () => {
                console.log(postString)
                var postobj = JSON.parse(postString);
                console.log('响应中已无数据。');
                callfun(postobj);
            });
        });

        reqn.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });
        reqn.write(postData);

        reqn.end();
    }
}


