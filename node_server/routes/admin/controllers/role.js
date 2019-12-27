const roleModels = require('../models/role')

module.exports = {

    /**
     * @api {post} /admin/role 添加角色
     * @apiName addRole
     * @apiGroup role
     * @apiUse APICommon
     *
     * @apiParam {String} name  名称
     * @apiParam {String} description  描述
     *
     */
    async addRole(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                description: req.body.description,
                create_time: new Date(),
                update_time: new Date(),
            }
            let result = await roleModels.create(requestData)
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
     * @apiUse APICommon
     *
     * @apiParam {String} id  id组成的字符串以逗号隔开
     */
    async delRole(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                await roleModels.delById(ids)
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
     * @apiUse APICommon
     *
     * @apiParam {Number} id  id
     * @apiParam {String} name 角色名称
     * @apiParam {String} description 描述
     *
     */
    async upDateRole(req, res, next) {
        try {
            let requestData = {
                name: req.body.name,
                description: req.body.description
            }
            await roleModels.update(requestData, req.body.id)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },

    /**
     * @api {get} /admin/role  获取角色
     * @apiName getRole
     * @apiGroup role
     * @apiUse APICommon
     *
     * @apiParam {Number} pn  第几页: 不存在获取所有数据
     * @apiParam {Number} page_size 每页多少条：不存在获取所有数据
     */
    async getRole(req, res, next) {
        try {
            let {pn, page_size} = req.query
            if (pn && page_size) {
                req.returnData.data = await roleModels.getByPage(pn, page_size)
            } else {
                req.returnData.data =  await roleModels.getAll()
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },


    /**
     * @api {get} /admin/role/menu 获取角色的菜单权限
     * @apiName getRoleMenu
     * @apiGroup role
     * @apiUse APICommon
     *
     * @apiParam {Number} role_id  角色id
     */
    async getRoleMenu(req, res, next) {
        try {
            req.returnData.data = await roleModels.getRoleMenu(req.query.role_id)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },

    /**
     * @api {post} /admin/role/menu 修改角色的菜单权限
     * @apiName addRoleMenu
     * @apiGroup role
     * @apiUse APICommon
     *
     * @apiParam {array} permissionIds  菜单id的数组
     * @apiParam {Number} role_id 角色id
     *
     */
    async updateRoleMenu(req, res, next) {
        try {
            await roleModels.updateRoleMenu(req.body.permission_ids, req.body.role_id)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
}
