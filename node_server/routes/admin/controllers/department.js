const departmentModels = require('../models/department')
const userModels = require('../models/user')

module.exports = {

    /**
     * @api {post} /admin/role 添加角色
     * @apiName addRole
     * @apiGroup role
     *
     * @apiParam {String} name  名称
     * @apiParam {String} description  描述
     *
     */
    async addDepartment(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                sort_order: parseInt(req.body.sort_order),
                status: parseInt(req.body.status)
            }
            let result = await departmentModels.create(requestData)
            req.returnData.data = {id: result.insertId}
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {delete} /admin/role 删除角色
     * @apiName DelRole
     * @apiGroup role
     *
     * @apiParam {String} id  id组成的字符串以逗号隔开
     */
    async delDepartment(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                if (ids.length === 1) {
                    let arr = [ids[0]]

                    async function getTree(id) {
                        let result = await departmentModels.getAllByParentId(id)
                        if (result && result.length) {
                            for (let i = 0; i < result.length; i++) {
                                arr.push(result[i].id)
                                await getTree(result[i].id)
                            }
                        }
                    }

                    await getTree(parseInt(arr[0]))
                    await departmentModels.delById(arr)
                } else {
                    await departmentModels.delById(ids)
                }
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {put} /admin/role 修改角色
     * @apiName updateRole
     * @apiGroup role
     *
     * @apiParam {Number} id  id
     * @apiParam {String} name 角色名称
     * @apiParam {String} description 描述
     *
     */
    async upDateDepartment(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                sort_order: parseInt(req.body.sort_order),
                status: parseInt(req.body.status),
            }
            await departmentModels.update(requestData, req.body.id)
            await userModels.updateDept({leader:0},req.body.id)
            for(let i=0;i< req.body.leader;i++){
                await userModels.update({leader:1},req.body.leader[i])
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {get} /admin/role 分页获取角色
     * @apiName getRole
     * @apiGroup role
     *
     * @apiParam {Number} pn  第几页
     * @apiParam {Number} pageSize 每页多少条
     */
    async getDepartment(req, res, next) {
        try {
            async function getTree(id) {
                let result = await departmentModels.getAllByParentId(id)
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
