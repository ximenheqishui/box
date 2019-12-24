const dbUtils = require('../../../util/db-util')

module.exports = {

    /**
     * 获取数据字典
     * @return {object|null}     查找结果
     */
    async getDictionaries() {
        let _sql = "SELECT * FROM ??"
        let result = await dbUtils.query(_sql, ['dictionary'])
        let obj = {}
        result.forEach(function (item) {
            if (obj[item.type]) {
                obj[item.type].push(item)
            } else {
                obj[item.type] = [item]
            }
        })
        return obj
    }
}
