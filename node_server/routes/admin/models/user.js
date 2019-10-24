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
     * 根据id删除用户
     * @param  {array} ids 菜单id
     * @return {object|null}     删除结果
     */
    async delById(ids) {
        let result = await dbUtils.deleteDataByIds('user', ids)
        // 删掉所有权限
        let _sql = "DELETE FROM ?? WHERE user_id in (?)"
        await dbUtils.query(_sql, ['user_role', ids])

        // 删掉所有部门领导者
        _sql = "DELETE FROM ?? WHERE user_id in (?)"
        await dbUtils.query(_sql, ['department_user', ids])
        return result
    },


    /**
     * 根据id更新用户
     */
    async update(model, id) {
        let result = await dbUtils.updateData('user', model, id)
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

        // 再添加新的
        if (roleIds.length) {
            let arr = []
            for (let i = 0; i < roleIds.length; i++) {
                let str = `(${roleIds[i]},${userId})`
                arr.push(str)
            }
            let values = arr.join(',')
            _sql = `INSERT INTO user_role(role_id,user_id) VALUES ${values}`
            await dbUtils.query(_sql, [])
        }
    },

    /**
     * 根据用户id获取角色
     * @param  {int} userId 角色的id
     */
    async getUserRole(userId) {
        let _sql = "SELECT role_id FROM ?? WHERE user_id = ? "
        let result = await dbUtils.query(_sql, ['user_role', userId])
        let arr = []
        result.forEach(function (item) {
            arr.push(item.role_id)
        })
        return arr
    },

    /**
     * 分页查询数据
     * @param  {object} query  查询参数
     */
    async getUser(query) {
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
        let result = {}

        let _sqlUser = "select user.*,dictionary.name as sex_name,department.name as dept_name " +
            "FROM user " +
            "LEFT JOIN  dictionary on user.sex = dictionary.value and dictionary.type = 'sex' " +
            "LEFT JOIN  department on user.dept_id = department.id where 1=1 "

        let _sqlCount = "SELECT COUNT(*) AS total_count FROM user where 1=1 "



        let _sql = ''
        let arr = []

        if (user_name !== '' && user_name !== undefined ) {
            _sql += ` and user.user_name like ?`
            arr.push(`%${user_name}%`)
        }
        if (dept_id !== '' && dept_id !== undefined ) {
            let dept_ids = []
            async function getTree(id) {
                dept_ids.push(id)
                let result = await departmentModels.getByParentId({}, id)
                if (result && result.length) {
                    for (let i = 0; i < result.length; i++) {
                        await getTree(result[i].id)
                    }
                }
            }
            await getTree(dept_id)
            _sql += ` and user.dept_id in (${dept_ids})`
        }

        if (mobile !== '' && mobile !== undefined) {
            _sql += ` and user.mobile like ?`
            arr.push(`%${mobile}%`)
        }

        if (email !== '' && email !== undefined) {
            _sql += ` and user.email like ?`
            arr.push(`%${email}%`)
        }

        if (sex !== '' && sex !== undefined) {
            _sql += ` and user.sex=?`
            arr.push(sex)
        }
        if (status !== '' && status !== undefined) {
            _sql += ` and user.status=?`
            arr.push(status)
        }

        if (end_date !== '' && end_date !== undefined) {
            _sql += ` and  user.create_time  between ? and ?`
            arr.push(start_date)
            arr.push(end_date)
        }

        _sql += ' ORDER BY create_time DESC'
        // 分页和不分页的结果
        if (pn && page_size) {
            let resultTotal= await dbUtils.query(_sqlCount + _sql, arr)
            result.total = resultTotal[0].total_count
            _sql += ` LIMIT ${(pn - 1) * page_size} , ${pn * page_size}`
            result.list = await dbUtils.query(_sqlUser + _sql, arr)
            for (let i = 0; i < result.list.length; i++) {
                result.list[i].role_ids = await this.getUserRole(result.list[i].id)
            }
        } else {
            result = await dbUtils.query(_sqlUser + _sql, arr)
            for (let i = 0; i < result.length; i++) {
                result[i].role_ids = await this.getUserRole(result[i].id)
            }
        }
        return result
    },


    /**
     * 根据id查询用户
     * @param  {int} id  用户id
     * @param  {string} user_name 用户名
     * @param  {string} mobile 手机号
     */
    async getUserOne(id,user_name,mobile) {
        let _sql = "select user.*,dictionary.name as sex_name,department.name as dept_name " +
            "FROM user " +
            "LEFT JOIN  dictionary on user.sex = dictionary.value and dictionary.type = 'sex' " +
            "LEFT JOIN  department on user.dept_id = department.id where 1=1"

        let arr = []
        if (user_name) {
            _sql += ` and user.user_name = ?`
            arr.push(user_name)
        }
        if (id) {
            _sql += ` and user.id = ?`
            arr.push(id)
        }
        if (mobile) {
            _sql += ` and user.mobile = ?`
            arr.push(mobile)
        }

        let result = await dbUtils.query(_sql, arr)
        return result
    },

    /**
     *  根据部门id更新用户是否是领导者信息
     * @param  {int} dept_id 部门的id
     * @param  {object} model  用户的模型
     */
    async updateDept(model, dept_id) {
        let _sql = "UPDATE ?? SET ? WHERE dept_id = ?"
        let result = await dbUtils.query(_sql, ['user', model, dept_id])
        return result
    }
}
