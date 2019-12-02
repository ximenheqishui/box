const express = require('express');
const router = express.Router();
const redis = require("../../../util/redis")

const commonRouter = require('./common')
const menuRouter = require('./menu')
const roleRouter = require('./role')
const departmentRouter = require('./department')
const userRouter = require('./user')
const articleTypeRouter = require('./articleType')
const articleRouter = require('./article')

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
 * @apiDefine APICommon  全局方法  定义了一个全局apiDoc方法
 * @apiHeader {String} Admin-Token Users unique access-key.
 */



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
    if (req.path === '/login' || req.path.startsWith('/excelExport') ){
        next()
    } else {
        let user = await redis.getDate(req.get('Admin-Token'))
        req.user = user
        // 这个地方要做每个接口的权限
        // console.log(req.method)
        // console.log(req.originalUrl)
        // console.log(req.baseUrl)
        // console.log(req.path)
        if (!user) {
            res.json({code: 2, message: '未登录'})
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
router.use('/articleType', articleTypeRouter)
router.use('/article', articleRouter)


// error handler
router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});

module.exports = router;
