var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'admin'})
});
router.get('/chat', function (req, res, next) {
    res.render('chat', {nsp: req.query.nsp,room: req.query.room})
});

router.get('/common-test', function (req, res, next) {
    res.render('common-test', {title:123,url :123})
});

router.use('/common', require('./common/routes'))
router.use('/admin', require('./admin/routes'))
router.use('/weixin-xcx', require('./weixin-xcx/routes'))
// router.use('/weixin-gzh', require('./weixin-gzh/routes'))


module.exports = router;
