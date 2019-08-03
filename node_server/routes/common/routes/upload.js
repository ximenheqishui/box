const express = require('express');
const path = require('path')
const multer  = require('multer')
const controllers = require('../controllers/upload')

let router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req)
        cb(null, path.join(__dirname, '../../../', 'public/upload/images'))
    },
    filename: function (req, file, cb) {
        // console.log(req)
        cb(null, Date.now() + '-' + file.originalname)
    }
})
let upload = multer({ storage: storage })
/**
 * 单文件上传   ‘file’ = file
 * */
router.post(
    '/single',
    upload.single('file'),
    controllers.singleFile
)
/**
 * 多文件件上传   ‘files’ = [file,file]
 * */
router.post(
    '/array_file',
    upload.array('files', 12),
    controllers.arrayFile
)
/**
 * 多文件件上传   'files_1’ = file,'files_2’ = [file,file],
 * */
router.post(
    '/array_obj_file',
    upload.fields([{ name: 'files_1', maxCount: 1 }, { name: 'flies_2', maxCount: 12 }]),
    controllers.arrayObjFile
)

/**
 * 上传图片并对图片进行修改   ‘file’ = file
 * */
router.post(
    '/single_image',
    upload.single('file'),
    controllers.singleImage
)

// 接口的错误处理  error handler
router.use(function(err, req, res, next) {
    let info= {
        message:err.message,
        error: req.app.get('env') === 'development' ? err : {}
    }
    res.status(err.status || 500);
    res.json(info);
});

module.exports = router;
