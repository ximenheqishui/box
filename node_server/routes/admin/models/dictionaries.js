const dbUtils = require('../../../util/db-util')

module.exports = {

    /**
     * 创建角色
     * @param  {Object} model  角色的对象
     */
    async create(model) {
        let result = await dbUtils.insertData('dictionary', model)
        return result
    },

    /**
     * 根据id删除角色
     * @param  {array} id 角色id的集合
     * @return {object|null}   删除结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('dictionary',id)
        return result
    },


    /**
     * 根据id更新角色
     */
    async update(model,id) {
        let result = await dbUtils.updateData('dictionary',model,id)
        return result
    },

    /**
     * 分页查询数据
     * @param  {int} pn  第几页
     * @param {int} page_size   每页多少条
     */
    async getByPage(pn,page_size) {
        let result = {}
        let resultTotal = await this.count()
        let list = await dbUtils.findDataByPage("dictionary",(pn-1)*page_size, Number(page_size),  'ORDER BY type DESC')
        result.total = resultTotal[0].total_count
        result.list = list
        return result
    },

    /**
     * 计总数
     */
    async count() {
        let result = await dbUtils.count('dictionary')
        return result
    },


    /**
     * @description 获取所有数据
     */
    async getAll() {
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
