const articleModels = require('../models/article')
const articleTypeModels = require('../models/articleType')

module.exports = {

    /**
     * @api {post} /admin/articleType 添加文章分类
     * @apiName addArticleType
     * @apiUse APICommon
     * @apiGroup articleType
     *
     * @apiParam {String} name  分类名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status  是否启用  0 是启用  1 是不启用
     */
    async addArticle(req, res, next) {
        try {
            let requestData = {
                title: req.body.title,
                type_id: req.body.type_id || 0,
                type_path: req.body.type_path,
                keyword: req.body.keyword,
                description: req.body.description,
                content: req.body.content,
                cover: req.body.cover,
                status: req.body.status || 0,
                create_time: new Date(),
                update_time: new Date(),
            }
            let result = await articleModels.create(requestData)
            req.returnData.data = {id: result.insertId}
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {delete} /admin/articleType 删除文章分类
     * @apiName DelArticleType
     * @apiGroup articleType
     * @apiUse APICommon
     *
     * @apiParam {String} id  以逗号隔开的id字符串
     */
    async delArticle(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                await articleModels.delById(ids)
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {put} /admin/articleType 修改文章分类
     * @apiName updateArticleType
     * @apiGroup articleType
     * @apiUse APICommon
     *
     * @apiParam {Number} id  文章id
     * @apiParam {String} name  文章名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status  是否启用  0 是启用  1 是不启用
     *
     */
    async upDateArticle(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                sort_order: req.body.sort_order,
                status: req.body.status
            }
            await articleTypeModels.update(requestData, req.body.id)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {get} /admin/articleType 获取文章分类
     * @apiName getArticleType
     * @apiGroup articleType
     * @apiUse APICommon
     *
     * @apiParam {Number} status  是否启用 ：0 是启用、1 是不启用、空或者不存在为全部
     */
    async getArticle(req, res, next) {
        try {
            req.returnData.data =  await articleModels.getArticle(req.query)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },



    /**
     * @api {get} /admin/articleType 获取文章分类
     * @apiName getArticleType
     * @apiGroup articleType
     * @apiUse APICommon
     *
     * @apiParam {Number} status  是否启用 ：0 是启用、1 是不启用、空或者不存在为全部
     */
    async getArticleOne(req, res, next) {
        try {
            req.returnData.data = {}
            let result=  await articleModels.getArticleOne(req.query.id)
            if (result && result.length) {
                req.returnData.data =  result[0]
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }

}
