const caseTypeModels = require('../models/caseType')

module.exports = {

    /**
     * @api {post} /admin/caseType 添加案件分类
     * @apiName addCaseType
     * @apiUse APICommon
     * @apiGroup caseType
     *
     * @apiParam {String} name  分类名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status  是否启用  0 是启用  1 是不启用
     */
    async addCaseType(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                sort_order: req.body.sort_order,
                status: req.body.status
            }
            let result = await caseTypeModels.create(requestData)
            req.returnData.data = {id: result.insertId}
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {delete} /admin/caseType 删除案件分类
     * @apiName DelCaseType
     * @apiGroup caseType
     * @apiUse APICommon
     *
     * @apiParam {String} id  以逗号隔开的id字符串
     */
    async delCaseType(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                let allIds = []

                // 查询树的递归函数
                async function getTree(id) {
                    let result = await caseTypeModels.getByParentId(req.query, id)
                    if (result && result.length) {
                        for (let i = 0; i < result.length; i++) {
                            allIds.push(result[i].id)
                            await getTree(result[i].id)
                        }
                    }
                }

                // 查询id下的所有子节点
                for (let i = 0; i < ids.length; i++) {
                    await getTree(parseInt(ids[i]))
                }
                // 把当前的id也加入数组中
                allIds = allIds.concat(ids)
                // 删除所有的在allIds的部门
                await caseTypeModels.delById(allIds)
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {put} /admin/caseType 修改案件分类
     * @apiName updateCaseType
     * @apiGroup caseType
     * @apiUse APICommon
     *
     * @apiParam {Number} id  案件id
     * @apiParam {String} name  案件名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status  是否启用  0 是启用  1 是不启用
     *
     */
    async upDateCaseType(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                sort_order: req.body.sort_order,
                status: req.body.status
            }
            await caseTypeModels.update(requestData, req.body.id)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {get} /admin/caseType 获取案件分类
     * @apiName getCaseType
     * @apiGroup caseType
     * @apiUse APICommon
     *
     * @apiParam {Number} status  是否启用 ：0 是启用、1 是不启用、空或者不存在为全部
     */
    async getCaseType(req, res, next) {
        try {
            async function getTree(id) {
                let result = await caseTypeModels.getByParentId(req.query, id)
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

            let result = await getTree(0)
            req.returnData.data = result
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }

}
