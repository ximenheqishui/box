const sharp = require('sharp');
const path = require('path')
/**
 * 图片处理务操作
 */

module.exports = {
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
    async imageHandle(info) {
        let result = {
            path: '',
            new_path: '',
        }
        if (info.file) {
            await new Promise((resolve, reject) => {
                let image = path.join(info.file.destination, 'new' + info.file.filename)
                sharp(info.file.path)
                    .resize(info.width)
                    .composite([{ input: path.join(__dirname,'water.png'), gravity: 'south' }])
                    .toFile(image, (err) => {
                        if (err) reject(err)
                        resolve(image)
                    });
            })
            result.path = '/upload/images/' + info.file.filename
            result.new_path = '/upload/images/' + 'new' + info.file.filename
        }
        return result
    }
}
