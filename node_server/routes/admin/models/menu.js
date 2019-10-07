const dbUtils = require('../../../util/db-util')

module.exports = {

    async create(model) {
        let result = await dbUtils.insertData('menu', model)
            .catch((err) => {
                return  err
            })
        return result
    },

    /**
     * 根据菜单父节点名查找菜单
     * @param  {int} pid  菜单的父节点
     * @return {object|null}     查找结果
     */
    async getAllByParentId(pid) {
        let _sql = "SELECT * FROM ?? WHERE parent_id = ? "
        let result = await dbUtils.query(_sql, ['menu', pid])
        return result
    },

    /**
     * 根据菜单父节点名查找可用的菜单
     * @param  {int} pid 菜单的父节点
     * @return {object|null}     查找结果
     */
    async getUsableByParentId(pid) {
        let _sql = "SELECT * FROM ?? WHERE parent_id = ? and status = 0 "
        let result = await dbUtils.query(_sql, ['menu', pid])
        return result
    },

    /**
     * 根据菜单父节点名查找可用的菜单
     * @param  {int} pid 菜单的父节点
     * @return {object|null}     查找结果
     */
    async getUsableByParentIdInids(pid,ids) {
        let _sql = "SELECT * FROM ?? WHERE parent_id = ? and status = 0 and id IN (?)"
        let result = await dbUtils.query(_sql, ['menu', pid, ids])
        return result
    },

    /**
     * 根据菜单id删除用户
     * @param  {int} id 菜单id
     * @return {object|null}     删除结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('menu',id)
        return result
    },

    /**
     * 根据菜单id更新菜单
     * @param  {object} model 菜单数据模型
     * @param  {int} id  带单id
     * @return {object|null}     修改结果
     */
    async update(model,id) {
        let result = await dbUtils.updateData('menu',model,id)
            .catch((err) => {
                return  err
            })
        return result
    },
}
