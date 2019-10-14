const dbUtils = require('../../../util/db-util')

module.exports = {

    /**
     *  创建菜单
     * @param  {object} model  创建的数据
     * @return {object}     创建结果
     */
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
    async getByParentId(query,pid) {
        let {
            status
        } = query

        let _sql = "SELECT * FROM menu WHERE parent_id = ? "

        if (status !== '' &&  status !== undefined ) {
            _sql += ` and menu.status=${status}`
        }

        let result = await dbUtils.query(_sql, [pid])
        return result
    },

    /**
     * 删除菜单
     * @param  {array} id 菜单id
     * @return {object|null}     删除结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('menu',id)
        let _sql = "DELETE FROM ?? WHERE menu_id IN (?)"
        await dbUtils.query(_sql, ['role_menu', id])
        return result
    },

    /**
     * 根据菜单id更新菜单
     * @param  {object} model 菜单数据模型
     * @param  {int} id  菜单id
     * @return {object|null}     修改结果
     */
    async update(model,id) {
        let result = await dbUtils.updateData('menu',model,id)
            .catch((err) => {
                return  err
            })
        return result
    },

    /**
     * 根据父节点查找   可用有权限的菜单
     * @param  {int} pid 菜单的父节点
     * @param  {array} ids 有权限的id
     * @return {object|null}   查找结果
     */
    async getUsableByParentIdInIds(pid,ids) {
        let _sql = "SELECT * FROM ?? WHERE parent_id = ? and status = 0 and id IN (?)"
        let result = await dbUtils.query(_sql, ['menu', pid, ids])
        return result
    }
}
