const dbUtils = require('../../../util/db-util')

module.exports = {
    /**
     * 数据库创建用户
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async create(model) {
        let result = await dbUtils.insertData('menu', model)
            .catch((err) => {
                return  err
            })
        return result
    },

    /**
     * 根据用户名查找用户信息
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    async getAllByParentId(pid) {
        let _sql = "SELECT * FROM ?? WHERE parent_id = ? "
        let result = await dbUtils.query(_sql, ['menu', pid])
            .catch((err) => {
                return  err
            })
        return result
    },

    /**
     * 根据用户名查找用户信息
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('menu',id)
            .catch((err) => {
                return  err
            })
        return result
    },
}
