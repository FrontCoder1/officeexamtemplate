const http = require('http');
const url = require('url');
const querystring = require('querystring');
var request_mothed = require('./request_mothed');

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


module.exports = request_mothed;