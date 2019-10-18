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
     * 根据部门id删除部门
     * @param  {array} id 菜单id
     * @return {object|null}     删除结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('department',id)
        let _sql = "DELETE FROM ?? WHERE department_id IN (?)"
        await dbUtils.query(_sql, ['department_user', id])
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


    /**
     * 添加部门领导着
     * @param  {object} model 部门数据模型
     * @param  {int} department_id  部门id
     * @return {object|null}     修改结果
     */
    async updateDepartmentLeader(leader,department_id) {
        // 先删掉所有权限
        let _sql = "DELETE FROM ?? WHERE department_id in (?)"
        await dbUtils.query(_sql, ['department_user', department_id])
        let result  = {}
        if (leader && leader.length) {
            // 再添加新的
            let arr = []
            for (let i=0; i< leader.length; i++) {
                let str = `(${department_id},${leader[i]})`
                arr.push(str)
            }
            let values = arr.join(',')
            _sql = `INSERT INTO department_user(department_id,user_id) VALUES ${values}`
            result = await dbUtils.query(_sql,[])
        }
        return result
    },


    /**
     * 根据department_id获取领导者
     * @param  {int} department_id 部门的id
     */
    async getDepartmentLeader(department_id) {
        let _sql = "SELECT * FROM ?? WHERE department_id = ? "
        let result = await dbUtils.query(_sql,['department_user',department_id])
        let arr = []
        result.forEach(function(item){
            arr.push(item.user_id)
        })
        return arr
    },
}
