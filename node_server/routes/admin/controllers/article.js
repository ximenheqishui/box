const articleModels = require('../models/article')

module.exports = {

    /**
     * @api {post} /admin/article 添加文章
     * @apiName addArticle
     * @apiUse APICommon
     * @apiGroup article
     *
     * @apiParam {String} title  文章名称
     * @apiParam {Number} type_id 文章类别ID
     * @apiParam {String} type_path 文章类别路径
     * @apiParam {String} keyword  关键词
     * @apiParam {String} description  文章描述
     * @apiParam {String} content  文章内容
     * @apiParam {String} cover  文章封面url
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
     * @api {delete} /admin/article 删除文章
     * @apiName DelArticle
     * @apiGroup article
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
     * @api {put} /admin/article 修改文章
     * @apiName updateArticle
     * @apiGroup article
     * @apiUse APICommon
     *
     * @apiParam {String} title  文章名称
     * @apiParam {Number} id  文章id
     * @apiParam {Number} type_id 文章类别ID
     * @apiParam {String} type_path 文章类别路径
     * @apiParam {String} keyword  关键词
     * @apiParam {String} description  文章描述
     * @apiParam {String} content  文章内容
     * @apiParam {String} cover  文章封面url
     * @apiParam {Number} status  是否启用  0 是启用  1 是不启用
     *
     */
    async upDateArticle(req, res, next) {
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
                update_time: new Date(),
            }
            await articleModels.update(requestData, req.body.id)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {get} /admin/article 获取文章
     * @apiName getArticle
     * @apiGroup article
     * @apiUse APICommon
     *
     * @apiParam {Number} id  文章id
     * @apiParam {Number} pn  第几页: 不存在获取所有符合筛选条件数据
     * @apiParam {Number} page_size 每页多少条：不存在获取所有符合筛选条件数据
     * @apiParam {String} title  文章名称
     * @apiParam {String} type_id  文章类别
     * @apiParam {String} keyword  关键词
     * @apiParam {Number} status  是否启用 ：0 是启用、1 是不启用
     * @apiParam {string} start_date  开始时间
     * @apiParam {string} end_date  结束时间
     */
    async getArticle(req, res, next) {
        try {
            req.returnData.data =  await articleModels.getArticle(req.query)
            console.log(req.returnData)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }
}
