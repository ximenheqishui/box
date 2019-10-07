const express = require('express');
const {getDate} = require('../../../util/redis')
const router = express.Router();

router.use(async function (req, res, next) {
    req.returnData = {
        code: 0,
        message: '成功'
    }
    let user = await getDate(req.cookies['Admin-Token'])
    console.log(user)
    req.user = user
    next()
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
