const dbUtils = require('../../../util/db-util')

module.exports = {

    /**
     *  创建部门
     * @param  {object} model  创建的数据
     * @return {object}     创建结果
     */
    async create(model) {
        let result = await dbUtils.insertData('department', model)
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
        let _sql = "SELECT * FROM ?? WHERE parent_id = ? "
        if (status !== '' &&  status !== undefined ) {
            _sql += ` and status=${status}`
        }
        let result = await dbUtils.query(_sql, ['department', pid])
        return result
    },


    /**
     * 根据菜单id删除用户
     * @param  {array} id 菜单id
     * @return {object|null}     删除结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('department',id)
        return result
    },

    /**
     * 根据菜单id更新部门
     * @param  {object} model 部门数据模型
     * @param  {int} id  部门id
     * @return {object|null}     修改结果
     */
    async update(model,id) {
        let result = await dbUtils.updateData('department',model,id)
        return result
    },
}
