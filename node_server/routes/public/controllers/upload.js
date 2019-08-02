const sharp = require('sharp');
const path = require('path')

module.exports = {
    async singleFile(req, res, next) {
        /**
         * 这里要解释一下的 从来没有用过 所以逻辑还是要说一说的
         * 1、这个函数中报错不会被路由错误的中间获取到 所以要加一个try catch 把异常抛给 路由处理函数
         * 2、try 中只能接到同步的错误  异步的错误不归catch管了
         * 3、Promise 没有用 catch函数来处理异常 那个这个异常就直接抛出
         * 4、Promise  resolve 最后正确执行的返回值
         * 5、下面简单的几行代码 菜鸟根本就看不懂的
         * 6、图片处理
         *
         * */
        try {
            let newPath = await new Promise((resolve, reject) => {
                let image = path.join(req.file.destination, 'new' + req.file.filename)
                sharp(req.file.path)
                    .rotate(180)
                    .extract({ left: 10, top: 10, width: 200, height: 200 })
                    .resize(300)
                    .extend({
                        top: 10,
                        bottom: 20,
                        left: 10,
                        right: 10,
                        background: { r: 0, g: 0, b: 0, alpha: 1 }
                    })
                    .toFile(image, (err) => {
                    if (err) reject(err)
                    resolve(image)
                });
            })
            let info = {
                newPath: newPath,
                file: req.file,
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
