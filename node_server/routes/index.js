var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'admin'})
});

router.use('/common', require('./common/routes'))
router.use('/admin', require('./admin/routes'))
router.use('/weixin-xcx', require('./weixin-xcx/routes'))
router.use('/weixin-gzh', require('./weixin-gzh/routes'))


module.exports = router;
