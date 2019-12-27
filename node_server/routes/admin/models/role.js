const dbUtils = require('../../../util/db-util')

module.exports = {

    /**
     * 创建角色
     * @param  {Object} model  角色的对象
     */
    async create(model) {
        let result = await dbUtils.insertData('role', model)
        return result
    },

    /**
     * 根据id删除角色
     * @param  {array} id 角色id的集合
     * @return {object|null}   删除结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('role',id)
        let _sql = "DELETE FROM ?? WHERE role_id IN (?)"
        await dbUtils.query(_sql, ['role_menu', id])
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
     * 分页查询数据
     * @param  {int} pn  第几页
     * @param {int} page_size   每页多少条
     */
    async getByPage(pn,page_size) {
        let result = {}
        let resultTotal = await this.count()
        let list = await dbUtils.findDataByPage("role",(pn-1)*page_size, pn*page_size)
        result.total = resultTotal[0].total_count
        result.list = list
        return result
    },

    /**
     * 计总数
     */
    async count() {
        let result = await dbUtils.count('role')
        return result
    },


    /**
     * @description 获取所有数据
     */
    async getAll() {
        let _sql = 'SELECT * FROM ??'
        let result = await dbUtils.query(_sql,"role")
        return result
    },


    /**
     * 根据更新角色权限
     * @param  {array} menuIds 菜单的id数组
     * @param  {int} role_id 角色的id
     */
    async updateRoleMenu(menuIds,role_id) {
        // 先删掉所有权限
        let _sql = "DELETE FROM ?? WHERE role_id = ?"
        await dbUtils.query(_sql, ['role_menu', role_id])
        let result  = {}
        if (menuIds && menuIds.length) {
            // 再添加新的
            let arr = []
            for (let i=0; i< menuIds.length; i++) {
                let str = `(${menuIds[i]},${role_id})`
                arr.push(str)
            }
            let values = arr.join(',')
            _sql = `INSERT INTO role_menu(menu_id,role_id) VALUES ${values}`
            result = await dbUtils.query(_sql,[])
        }
        return result
    },

    /**
     * 根据role_id获取权限
     * @param  {int} role_id 角色的id
     */
    async getRoleMenu(role_id) {
        let _sql = "SELECT * FROM ?? WHERE role_id = ? "
        let result = await dbUtils.query(_sql,['role_menu',role_id])
        let arr = []
        result.forEach(function(item){
            arr.push(item.menu_id)
        })
        return arr
    },
}
