const dbUtils = require('../../../util/db-util')
const articleTypeModels = require('./articleType.js')

module.exports = {


    /**
     * 创建用户
     * @param  {Object} model  用户对象
     */
    async create(model) {
        let result = await dbUtils.insertData('article', model)
        return result
    },

    /**
     * 根据id删除用户
     * @param  {array} ids 菜单id
     * @return {object|null}     删除结果
     */
    async delById(ids) {
        let result = await dbUtils.deleteDataByIds('article', ids)
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
     * 分页查询数据
     * @param  {object} query  查询参数
     */
    async getArticle(query) {
        let {
            pn,
            page_size,
            title,
            type_id,
            keyword,
            end_date,
            start_date,
            status
        } = query
        let result = {}

        let _sqlUser = "select article.*,article_type.name as type_name " +
            "FROM article " +
            "LEFT JOIN  article_type on article.type_id = article_type.id where 1=1 "

        let _sqlCount = "SELECT COUNT(*) AS total_count FROM article where 1=1 "



        let _sql = ''
        let arr = []

        if (title !== '' && title !== undefined ) {
            _sql += ` and article.title like ?`
            arr.push(`%${title}%`)
        }
        if (type_id !== '' && type_id !== undefined ) {
            let type_ids = []
            async function getTree(id) {
                type_ids.push(id)
                let result = await articleTypeModels.getByParentId({}, id)
                if (result && result.length) {
                    for (let i = 0; i < result.length; i++) {
                        await getTree(result[i].id)
                    }
                }
            }
            await getTree(type_id)
            _sql += ` and article.type_id in (${type_ids})`
        }


        if (keyword !== '' && keyword !== undefined ) {
            _sql += ` and article.keyword like ?`
            arr.push(`%${keyword}%`)
        }

        if (status !== '' && status !== undefined) {
            _sql += ` and article.status=?`
            arr.push(status)
        }

        if (end_date !== '' && end_date !== undefined) {
            _sql += ` and  article.create_time  between ? and ?`
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
        } else {
            result = await dbUtils.query(_sqlUser + _sql, arr)
        }
        return result
    },


    /**
     * 根据id查询用户
     * @param  {int} id  用户id
     * @param  {string} user_name 用户名
     * @param  {string} mobile 手机号
     */
    async getArticleOne(id) {
        let _sql = "select * FROM article where 1 = 1 "
        let arr = []
        _sql += ` and id = ?`
        arr.push(id)
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
