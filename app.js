var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const multer = require("multer");
var index = require('./routes/index');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'uploadFile')));


app.use(cookieParser('sessionuseid'));
app.use(session({
    secret: 'sessionuseid',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*30 // default session expiration is set to 30 minutes
    }
}));
app.use(function(req, res, next){
    req.session._garbage = Date();
    req.session.touch();
    next();
});

// app.use(session({
//     secret: 'sessionuseid',//与cookieParser中的一致
//     resave: true,
//     cookie:{
//         maxAge: 1000*60*30 // default session expiration is set to 1 hour
//     },
//     saveUninitialized:true
// }));


app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('/public1/error');
});

module.exports = app;
