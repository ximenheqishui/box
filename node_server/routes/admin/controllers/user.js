const userModels = require('../models/user')
const cryptoUtil= require("../../../util/crypto-util")

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
    async addUser(req, res, next) {
        try {
            let requestData = {
                user_name: req.body.user_name,
                password: cryptoUtil.createPass(req.body.password),
                email: req.body.email,
                mobile: req.body.mobile,
                sex: parseInt(req.body.sex) || 0,
                dept_id: parseInt(req.body.dept_id) || 0,
                dept_path: req.body.dept_path,
                status: parseInt(req.body.status) || 0,
                avatar: req.body.avatar,
                create_time: new Date()
            }
            let result = await userModels.create(requestData)
            await userModels.userRole(req.body.role_ids, result.insertId)
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
    async delUser(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                await userModels.delById(ids)
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
    async upDateUser(req, res, next) {
        try {
            let requestData = {}
            if (!req.body.id) {
                requestData = {
                    password: cryptoUtil.createPass(req.body.password)
                }
                await userModels.update(requestData, req.session.user.id)
            } else {
                requestData = {
                    user_name: req.body.user_name,
                    password: cryptoUtil.createPass(req.body.password),
                    email: req.body.email,
                    mobile: req.body.mobile,
                    sex: parseInt(req.body.sex) || 0,
                    dept_id: parseInt(req.body.dept_id) || 0,
                    dept_path: req.body.dept_path,
                    status: parseInt(req.body.status) || 0,
                    avatar: req.body.avatar
                }
                await userModels.update(requestData, req.body.id)
                await userModels.userRole(req.body.role_ids, req.body.id)
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
    async getUser(req, res, next) {
        try {
            let result = {}
            result.totalCount = await userModels.count(req.query)
            result.totalCount = result.totalCount[0].total_count
            result.list = await userModels.getByPage(req.query)
            req.returnData.data = result
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
    async getDepartmentUser(req, res, next) {
        try {
            let {dept_id} = req.query
            req.returnData.data = await userModels.getDepartmentUser(dept_id)
            req.returnData.leader = []
            req.returnData.data.forEach(function (item) {
                if (item.leader == 1) {
                    req.returnData.leader.push(item.id)
                }
            })
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }
}
