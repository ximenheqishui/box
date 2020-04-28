const dbUtils = require('../../../util/db-util')
const articleTypeModels = require('./articleType.js')

module.exports = {

    /**
     * 创建文章
     * @param  {Object} model  文章对象
     */
    async create(model) {
        let result = await dbUtils.insertData('article', model)
        return result
    },

    /**
     * 根据id删除文章
     * @param  {array} ids 菜单id
     * @return {object|null}     删除结果
     */
    async delById(ids) {
        let result = await dbUtils.deleteDataByIds('article', ids)
        return result
    },


    /**
     * 根据id更新文章
     */
    async update(model, id) {
        let result = await dbUtils.updateData('article', model, id)
        return result
    },



    /**
     * 分页和不分页查询数据
     * @param  {object} query  查询参数
     */
    async getArticle(query) {
        let {
            id,
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

        // 查询条件有id的之间返回一条数据的结果
        if (id !== '' && id !== undefined) {
            _sql += ` and article.id=?`
            arr.push(id)
            return  await dbUtils.query(_sqlUser + _sql, arr)
        }

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
            _sql += ` LIMIT ${(pn - 1) * page_size} , ${page_size}`
            result.list = await dbUtils.query(_sqlUser + _sql, arr)
        } else {
            result = await dbUtils.query(_sqlUser + _sql, arr)
        }
        console.log(result)
        return result
    }
}
