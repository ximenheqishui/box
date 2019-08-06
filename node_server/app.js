let createError = require('http-errors');
let express = require('express');
let path = require('path');
let fs = require('fs');
let cookieParser = require('cookie-parser');
// 用redis长时间存贮session不至于服务器重启session丢失
const session = require("./util/session_redis")
let logger = require('morgan');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', false);

if (app.get('env') === 'development') {
    app.use(logger('dev'));
    const chokidar = require('chokidar');
    // 文件监视实现node开发的热更新    路由也要有响应的修改才生效
    const watcher = chokidar.watch([path.join(__dirname, './routes')], {});
    watcher.on('ready', function () {
        watcher.on('all', function () {
            console.log("Clearing require.cache");
            // 删除包换server的引用缓存
            Object.keys(require.cache).forEach(function (id) {
                if (/[\/\\]routes[\/\\]/.test(id)) delete require.cache[id];
            });
        });
    });
} else {
    let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
    app.use(logger('combined', {stream: accessLogStream}))
}
app.disable('etag'); // 禁用动态接口的缓存 304
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session)

app.use(express.static(path.join(__dirname, 'public')));

// 只有这样才能请清除掉 require.cacthe
app.use(function (req, res, next) {
    require('./routes/index')(req, res, next);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // app.env是等于process.env.NODE_ENV的  若果NODE_ENV没有设置  env默认等于 development。  开发环境下一定要设置为 environment 很多包的性能会提升30%以上
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;
