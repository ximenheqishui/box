const dbUtils = require('../../../util/db-util')
const departmentModels = require('./department')

module.exports = {


    /**
     * 创建用户
     * @param  {Object} model  用户对象
     */
    async create(model) {
        let result = await dbUtils.insertData('user', model)
        return result
    },

    /**
     * 分页查询数据
     * @param  {int} pn  第几页
     * @param {int} pageSize   每页多少条
     */
    async getByPage(query) {
        let {
            pn,
            page_size,
            user_name,
            dept_id,
            end_date,
            start_date,
            mobile,
            email,
            sex,
            status
        } = query
        let _sql = "select user.*,dictionary.name as sex_name,department.name as dept_name " +
            "FROM user " +
            "LEFT JOIN  dictionary on user.sex = dictionary.value and dictionary.type = 'sex' " +
            "LEFT JOIN  department on user.dept_id = department.id where 1=1"
        if (user_name !== '') {
            _sql += ` and user.user_name like '%${user_name}%'`
        }
        if (dept_id !== '') {
            async function getTree(id) {
                let result = await departmentModels.getByParentId({}, id)
                if (result && result.length) {
                    for (let i = 0; i < result.length; i++) {
                        let children = await getTree(result[i].id)
                        if (children.length) {
                            result[i].children = children
                        }
                    }
                }
                return result
            }

            let dept = await getTree(dept_id)
            let dept_ids = [dept_id]
            dept.forEach(function (item) {
                dept_ids.push(item.id)
            })
            _sql += ` and user.dept_id in (${dept_ids})`
        }

        if (mobile !== '') {
            _sql += ` and user.mobile like '%${mobile}%'`
        }

        if (email !== '') {
            _sql += ` and user.email like '%${email}%'`
        }

        if (sex !== '') {
            _sql += ` and user.sex=${sex}`
        }
        if (status !== '') {
            _sql += ` and user.status=${status}`
        }

        if (end_date !== '') {
            _sql += ` and  user.create_time  between '${start_date}' and '${end_date}'`
        }
        _sql += ` LIMIT ? , ?`
        let result = await dbUtils.query(_sql, [(pn - 1) * page_size, pn * page_size])
        for (let i = 0; i < result.length; i++) {
            result[i].role_ids = await this.getUserRole(result[i].id)
        }
        return result
    },

    /**
     * 计总数
     */
    async count(query) {
        let {
            user_name,
            dept_id,
            end_date,
            start_date,
            mobile,
            email,
            sex,
            status
        } = query
        let _sql = "SELECT COUNT(*) AS total_count FROM user where 1=1 "
        if (user_name !== '') {
            _sql += ` and user.user_name like '%${user_name}%'`
        }
        if (dept_id !== '') {
            async function getTree(id) {
                let result = await departmentModels.getByParentId({},id)
                if (result && result.length) {
                    for (let i = 0; i < result.length; i++) {
                        let children = await getTree(result[i].id)
                        if (children.length) {
                            result[i].children = children
                        }
                    }
                }
                return result
            }

            let dept = await getTree(dept_id)
            let dept_ids = [dept_id]
            dept.forEach(function (item) {
                dept_ids.push(item.id)
            })
            _sql += ` and user.dept_id in (${dept_ids})`
        }

        if (mobile !== '') {

            _sql += ` and user.mobile like '%${mobile}%'`
        }

        if (email !== '') {
            _sql += ` and user.email like '%${email}%'`
        }

        if (sex !== '') {
            _sql += ` and user.sex=${sex}`
        }
        if (status !== '') {
            _sql += ` and user.status=${status}`
        }

        if (end_date !== '') {
            _sql += ` and  user.create_time  between '${start_date}' and '${end_date}'`
        }
        let result = await dbUtils.query(_sql, [])
        return result
    },

    /**
     * 根据id删除角色
     * @param  {int} id 菜单id
     * @return {object|null}     删除结果
     */
    async delById(id) {
        let result = await dbUtils.deleteDataByIds('user', id)
        return result
    },

    /**
     * 根据id更新角色
     */
    async update(model, id) {
        let result = await dbUtils.updateData('user', model, id)
        return result
    },
    /**
     * 根据id更新角色
     */
    async updateDept(model, dept_id) {
        let _sql = "UPDATE ?? SET ? WHERE dept_id = ?"
        let result = await dbUtils.query(_sql, ['user', model, dept_id])
        return result
    },

    /**
     *  添加用户的角色
     * @param  {array} roleIds 角色的id
     * @param  {int} userId  用户的id
     */
    async userRole(roleIds, userId) {

        // 先删掉所有权限
        let _sql = "DELETE FROM ?? WHERE user_id = ?"
        await dbUtils.query(_sql, ['user_role', userId])

        if (roleIds.length) {
            // 再添加新的
            let arr = []
            for (let i = 0; i < roleIds.length; i++) {
                let str = `(${roleIds[i]},${userId})`
                arr.push(str)
            }
            let values = arr.join(',')
            _sql = `INSERT INTO user_role(role_id,user_id) VALUES ${values}`
            await dbUtils.query(_sql, [])
        }
        return
    },

    /**
     * 根据roleId获取权限
     * @param  {int} roleId 角色的id
     */
    async getUserRole(userId) {
        let _sql = "SELECT * FROM ?? WHERE user_id = ? "
        let result = await dbUtils.query(_sql, ['user_role', userId])
        let arr = []
        result.forEach(function (item) {
            arr.push(item.role_id)
        })
        return arr
    },


    /**
     * 分页查询数据
     * @param  {int} pn  第几页
     * @param {int} pageSize   每页多少条
     */
    async getDepartmentUser(dept_id) {
        let _sql = `select * FROM user where dept_id = ?`
        let result = await dbUtils.query(_sql, [dept_id])
        return result
    },
}
