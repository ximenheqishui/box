let express = require('express');
let router = express.Router();

router.use(function (req, res, next) {
    req.returnData = {
        code: 0,
        message: '成功'
    }
    next()
});

router.use('/menu', require('./menu'))

// // error handler
router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message:err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});

module.exports = router;
