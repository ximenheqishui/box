const dbUtils = require('../../../util/db-util')

module.exports = {

    /**
     * 根据菜单父节点名查找菜单
     * @param  {int} pid  菜单的父节点
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
                obj[item.type] = []
                obj[item.type].push(item)
            }
        })
        return obj
    },
}
