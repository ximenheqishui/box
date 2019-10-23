const express = require('express');
const router = express.Router();
const redis = require("../../../util/redis")

const commonRouter = require('./common')
const menuRouter = require('./menu')
const roleRouter = require('./role')
const departmentRouter = require('./department')
const userRouter = require('./user')

/**
 * @description 模拟请求延迟
 * */
router.use(async function (req, res, next) {
    await new Promise(resolve => {
        setTimeout(function () {
            resolve()
        }, 500)
    })
    next()
})

/**
 * @description 接口过滤器
 * */
router.use(async function (req, res, next) {
    // 返回值的模板
    req.returnData = {
        code: 0,
        message: '成功'
    }

    // 不需要登录的接口
    if (req.path === '/login' || req.path === '/excelExport') {
        next()
    } else {
        let user = await redis.getDate(req.get('Admin-Token'))
        req.user = user
        if (!user) {
            res.json({code: 2, message: '登录超时请重新登录'})
        } else {
            next()
        }
    }
});

router.use('/', commonRouter)
router.use('/menu', menuRouter)
router.use('/role', roleRouter)
router.use('/department', departmentRouter)
router.use('/user', userRouter)


// error handler
router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});

module.exports = router;
