let express = require('express');
let router = express.Router();

router.get('/test', (req,res,next)=> {
    res.render('common-test', {title: '公共接口测试'})
})
router.use('/upload', require('./upload'))

module.exports = router;
