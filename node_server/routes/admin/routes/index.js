const express = require('express');
const router = express.Router();

router.use(async function (req, res, next) {
    req.returnData = {
        code: 0,
        message: '成功'
    }
    if (req.path === '/login' || req.path === '/excelExport' ) {
        next()
    } else {
        if (!req.session.user || req.cookies['Admin-Token'] !== req.session.token ) {
            res.json({code: 2, message: '登录超时请重新登录'})
        }else{
            next()
        }
    }
});


router.use('/', require('./common'))
router.use('/menu', require('./menu'))
router.use('/role', require('./role'))
router.use('/department', require('./department'))
router.use('/user', require('./user'))


// // error handler
router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message:err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});

module.exports = router;
