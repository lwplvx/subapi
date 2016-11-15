var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var session = require('express-session');


var routes = require('./routes/index');
var users = require('./routes/users');
var apps = require('./routes/apps');
var home = require('./routes/home');
var test = require('./routes/test');
var consoles = require('./routes/console');

var app = express(); 

 app.use(session({ 
   secret: 'secret',
    cookie:{ 
      maxAge: 1000*60*30
   }
 }));


var ejs=require("ejs");
//app.open='{{';
//app.close='}}'; 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", ejs.__express); // or   app.engine("html",require("ejs").renderFile);
//app.set("view engine","ejs");
app.set('view engine', 'html'); 


global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/test', test);
app.use('/app',apps);
app.use('/console',consoles);

app.use('/login', routes); // 即为为路径 /login 设置路由
app.use('/register', routes); // 即为为路径 /register 设置路由
app.use('/home', home); // 即为为路径 /home 设置路由

 
app.use('/upload', routes); // 即为为路径 /upload 设置路由
  

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
