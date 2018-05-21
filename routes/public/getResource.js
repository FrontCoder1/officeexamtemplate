const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
var express = require('express');
var request_mothed = require('./request_mothed');
var router = express.Router()

const headUrl = "C:\\office-exam-student-vertx\\resource";

/*
*url:路径(格式字符串)
*
*
*
* */


module.exports = function reqmessage(requrl) {
    var tempPath = requrl.replace(/\//g, "\\");
    var originPath = headUrl+tempPath;
    return originPath;

}


