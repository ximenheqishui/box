const dbUtils = require('../../../util/db-util')

module.exports = {

    async create(model) {
        let result = await dbUtils.insertData('user', model)
        return result
    },

    /**
     * 分页查询数据
     * @param  {int} pn  第几页
     * @param {int} pageSize   每页多少条
     */
    async getByPage(pn,pageSize) {
        let result = await dbUtils.findDataByPage("user",(pn-1)*pageSize, pn*pageSize)
        return result
    },

    /**
     * 计总数
     */
    async count() {
        let result = await dbUtils.count('user')
        return result
    },

    /**
     * 根据id删除角色
     * @param  {int} id 菜单id
     * @return {object|null}     删除结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('role',id)
        return result
    },

    /**
     * 根据id更新角色
     */
    async update(model,id) {
        let result = await dbUtils.updateData('role',model,id)
        return result
    },

    /**
     * 根据更新角色权限
     * @param  {array} menuIds 菜单的id数组
     * @param  {int} roleId 角色的id
     */
    async roleMenu(menuIds,roleId) {

        // 先删掉所有权限
        let _sql = "DELETE FROM ?? WHERE role_id = ?"
        await dbUtils.query(_sql, ['role_menu', roleId])

        // 再添加新的
        let arr = []
        for (let i=0; i< menuIds.length; i++) {
            let str = `(${menuIds[i]},${roleId})`
            arr.push(str)
        }
        let values = arr.join(',')
        _sql = `INSERT INTO role_menu(menu_id,role_id) VALUES ${values}`
        let result = await dbUtils.query(_sql,[])
        return result
    },

    /**
     * 根据roleId获取权限
     * @param  {int} roleId 角色的id
     */
    async getRoleMenu(roleId) {
        let _sql = "SELECT * FROM ?? WHERE role_id = ? "
        let result = await dbUtils.query(_sql,['role_menu',roleId])
        let arr = []
        result.forEach(function(item){
            arr.push(item.menu_id)
        })
        return arr
    },
}
