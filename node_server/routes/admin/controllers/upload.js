const imageHandle = require('../services/image-handle')
const config = require('../../../config')

module.exports = {
    async singleFile(req, res, next) {
        try {
            let data = {
                code: 0,
                message: '成功'
            }
            if (req.file) {
                console.log(req.file)
                data.data = {
                    size: req.file.size,
                    original_name: req.file.originalname,
                    path: `http://${config.ip}:${config.port}/upload/images/` +  req.file.filename
                }
            } else {
                data = {
                    code: 1,
                    message: '没有上传文件',
                }
            }
            await res.json(data)
        } catch (e) {
            next(e)
        }
    },
    async singleImage(req, res, next) {
        try {
            let backInfo = await imageHandle.imageHandle({
               file:req.file,
               width: 300
            })
            let info = {
                file: req.file,
                path: backInfo.path,
                new_path: backInfo.new_path,
                name: 'admin'
            }
            await res.json(info)
        } catch (e) {
            next(e)
        }
    },
    async arrayFile(req, res, next) {
        try {
            let info = {
                file: req.files,
                name: 'admin'
            }
            await res.json(info)
        } catch (e) {
            next(e)
        }
    },
    async arrayObjFile(req, res, next) {
        try {
            let info = {
                file: req.files,
                name: 'admin'
            }
            await res.json(info)
        } catch (e) {
            next(e)
        }
    }
}
