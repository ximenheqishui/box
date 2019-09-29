let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let fs = require('fs');


let app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,Cache-Control, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
app.set('views', path.join(__dirname));
app.set('view cache', false);
app.set('view engine', 'ejs');

// create a write stream (in append mode)
// let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
// app.use(logger('combined', { stream: accessLogStream }))

app.use(logger('dev'));
app.disable('etag'); // 禁用动态接口的缓存 304

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../dist')));



// 只有这样才能清除掉 require.cacthe
app.use(function(req,res,next){
    require('./routes/index')(req, res, next);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
