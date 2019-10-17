const departmentModels = require('../models/department')
const userModels = require('../models/user')

module.exports = {

    /**
     * @api {post} /admin/department 添加部门
     * @apiName addDepartment
     * @apiGroup department
     *
     * @apiParam {String} name  部门名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status  是否启用  0 是启用  1 是不启用
     */
    async addDepartment(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                sort_order: req.body.sort_order,
                status: req.body.status
            }
            let result = await departmentModels.create(requestData)
            req.returnData.data = {id: result.insertId}
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {delete} /admin/department 删除部门
     * @apiName DelDepartment
     * @apiGroup department
     *
     * @apiParam {String} id  以逗号隔开的id字符串
     */
    async delDepartment(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                let allIds = []
                // 查询树的递归函数
                async function getTree(id) {
                    let result = await departmentModels.getByParentId(req.query,id)
                    if (result && result.length) {
                        for (let i = 0; i < result.length; i++) {
                            allIds.push(result[i].id)
                            await getTree(result[i].id)
                        }
                    }
                }
                // 查询id下的所有子节点
                for (let i = 0; i < ids.length; i++){
                    await getTree(parseInt(ids[i]))
                }
                // 把当前的id也加入数组中
                allIds = allIds.concat(ids)
                // 删除所有的在allIds的菜单
                await departmentModels.delById(allIds)
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {put} /admin/department 修改部门
     * @apiName updateDepartment
     * @apiGroup department
     *
     * @apiParam {Number} id  部门id
     * @apiParam {String} name  部门名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status  是否启用  0 是启用  1 是不启用
     *
     */
    async upDateDepartment(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                sort_order: req.body.sort_order,
                status: req.body.status,
                leader: req.body.leader
            }
            await departmentModels.update(requestData, req.body.id)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {get} /admin/department 获取部门
     * @apiName getDepartment
     * @apiGroup department
     *
     * @apiParam {Number} status  是否启用 ：0 是启用、1 是不启用、空或者不存在为全部
     */
    async getDepartment(req, res, next) {
        try {
            async function getTree(id) {
                let result = await departmentModels.getByParentId(req.query,id)
                if (result && result.length) {
                    for (let i = 0; i < result.length; i++) {
                       let children  = await getTree(result[i].id)
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
    },
}
