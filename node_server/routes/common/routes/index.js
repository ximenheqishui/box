let express = require('express');
let imageHandle = require('../services/image-handle');
let router = express.Router();


router.get('/test',async (req,res,next)=> {
    let result = ''
    try {
        result = await  imageHandle.createWater()
    }catch (e) {
        next(e)
    }
    res.render('common-test', {title: '公共接口测试',url: result.path})
})
router.use('/upload', require('./upload'))

module.exports = router;
