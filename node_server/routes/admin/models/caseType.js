const dbUtils = require('../../../util/db-util')

module.exports = {

    /**
     *  创建文章类别
     * @param  {object} model  创建的数据
     * @return {object}     创建结果
     */
    async create(model) {
        let result = await dbUtils.insertData('case_type', model)
        return result
    },


    /**
     * 根据文章父节点名查找文章
     * @param  {int} pid  文章的父节点
     * @return {object|null}     查找结果
     */
    async getByParentId(query,pid) {
        let {
            status
        } = query
        let _sql = "SELECT * FROM ?? WHERE parent_id = ? "
        let arr = ['case_type', pid]
        if (status !== '' &&  status !== undefined ) {
            _sql += ' and status = ?'
            arr.push(status)
        }
        _sql += ' ORDER BY sort_order ASC'
        let result = await dbUtils.query(_sql, arr)
        return result
    },


    /**
     * 根据文章类别id删除文章类别
     * @param  {array} id 菜单id
     * @return {object|null}     删除结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('case_type',id)
        return result
    },

    /**
     * 根据文章类别id更新类别
     * @param  {object} model 类别数据模型
     * @param  {int} id  类别id
     * @return {object|null}     修改结果
     */
    async update(model,id) {
        let result = await dbUtils.updateData('case_type',model,id)
        return result
    }

}
