const imageHandle = require('../services/image-handle')

module.exports = {
    async singleFile(req, res, next) {
        try {
            let info = {
                file: '',
                path: '',
                name: ''
            }
            if (req.file) {
                console.log(req.file)
                info = {
                    file: req.file,
                    path:  'http://192.168.199.147:3000/upload/images/' +  req.file.filename
                }
            }
            await res.json(info)
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
