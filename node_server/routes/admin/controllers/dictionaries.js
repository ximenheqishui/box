const dictionariesModels = require('../models/dictionaries')

module.exports = {

    /**
     * @api {post} /admin/dictionaries 添加字段
     * @apiName addDictionaries
     * @apiGroup dictionaries
     * @apiUse APICommon
     *
     * @apiParam {String} name  名称
     * @apiParam {int} value 值
     * @apiParam {String} type  类型
     * @apiParam {String} description  描述
     *
     */
    async addDictionaries(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                value: req.body.value,
                type: req.body.type,
                description: req.body.description
            }
            let result = await dictionariesModels.create(requestData)
            req.returnData.data = {id: result.insertId}
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {delete} /admin/dictionaries 删除字段
     * @apiName DelDictionaries
     * @apiGroup dictionaries
     * @apiUse APICommon
     *
     * @apiParam {String} id  id组成的字符串以逗号隔开
     */
    async delDictionaries(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                await dictionariesModels.delById(ids)
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {put} /admin/dictionaries 修改字段
     * @apiName updateDictionaries
     * @apiGroup dictionaries
     * @apiUse APICommon
     *
     * @apiParam {Number} id  id
     * @apiParam {String} name 角色名称
     * @apiParam {int} value 值
     * @apiParam {String} type  类型
     * @apiParam {String} description 描述
     *
     */
    async upDateDictionaries(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                value: req.body.value,
                type: req.body.type,
                description: req.body.description
            }
            await dictionariesModels.update(requestData, req.body.id)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },

    /**
     * @api {get} /admin/dictionaries  获取字段
     * @apiName getDictionaries
     * @apiGroup dictionaries
     * @apiUse APICommon
     *
     * @apiParam {Number} pn  第几页: 不存在获取所有数据
     * @apiParam {Number} page_size 每页多少条：不存在获取所有数据
     */
    async getDictionaries(req, res, next) {
        try {
            let {pn, page_size} = req.query
            if (pn && page_size) {
                req.returnData.data = await dictionariesModels.getByPage(pn, page_size)
            } else {
                req.returnData.data =  await dictionariesModels.getAll()
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }
}
