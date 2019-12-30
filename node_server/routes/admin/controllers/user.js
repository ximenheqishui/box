const userModels = require('../models/user')
const departmentModels = require('../models/department')
const cryptoUtil= require("../../../util/crypto-util")

module.exports = {

    /**
     * @api {post} /admin/user 添加用户
     * @apiName addUser
     * @apiGroup user
     * @apiUse APICommon
     *
     * @apiParam {String} user_name  用户名称
     * @apiParam {String} email  邮箱
     * @apiParam {number} mobile  手机号
     * @apiParam {number} sex  性别：0未知、1是男、2是女
     * @apiParam {number} dept_id  部门id
     * @apiParam {string} dept_path  部门所在层的id的数组字符串，前端回显用
     * @apiParam {Number} status  是否启用 ：0 是启用、1 是不启用
     * @apiParam {string} avatar  用户头像url
     * @apiParam {string} password  用户密码
     *
     */
    async addUser(req, res, next) {
        try {
            let requestData = {
                user_name: req.body.user_name,
                email: req.body.email,
                mobile: req.body.mobile,
                sex: req.body.sex || 0,
                dept_id: req.body.dept_id || 0,
                dept_path: req.body.dept_path,
                status: req.body.status || 0,
                avatar: req.body.avatar,
                create_time: new Date(),
                update_time: new Date(),
            }
            if (req.body.password !== '') {
                requestData.password = cryptoUtil.createPass(req.body.password)
            } else {
                requestData.password = cryptoUtil.createPass('123456')
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
     * @api {delete} /admin/user 删除用户
     * @apiName DelUser
     * @apiGroup user
     * @apiUse APICommon
     *
     * @apiParam {String} id  id组成的字符串以逗号隔开
     */
    async delUser(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                await userModels.delById(ids)
                await departmentModels.delDepartmentLeader(ids)
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {put}  /admin/user 修改用户
     * @apiName updateUser
     * @apiGroup user
     * @apiUse APICommon
     *
     * @apiParam {Number} id  用户id
     * @apiParam {String} user_name  用户名称
     * @apiParam {String} email  邮箱
     * @apiParam {number} mobile  手机号
     * @apiParam {number} sex  性别：0未知、1是男、2是女
     * @apiParam {number} dept_id  部门id
     * @apiParam {string} dept_path  部门所在层的id的数组字符串，前端回显用
     * @apiParam {Number} status  是否启用 ：0 是启用、1 是不启用
     * @apiParam {string} avatar  用户头像url
     * @apiParam {string} password  用户密码
     *
     */
    async upDateUser(req, res, next) {
        try {
            let requestData = {}
            if (!req.body.id) {
                requestData = {
                    password: cryptoUtil.createPass(req.body.password)
                }
                await userModels.update(requestData, req.user.id)
            } else {
                requestData = {
                    user_name: req.body.user_name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    sex: req.body.sex || 0,
                    dept_id: req.body.dept_id || 0,
                    dept_path: req.body.dept_path,
                    status: req.body.status || 0,
                    avatar: req.body.avatar
                }
                if (req.body.password !== '') {
                    requestData.password = cryptoUtil.createPass(req.body.password)
                }

                let result =  await userModels.getUserOne(req.body.id,null,null)

                await userModels.update(requestData, req.body.id)
                await userModels.userRole(req.body.role_ids, req.body.id)
                if (result[0].dept_id != requestData.dept_id ) {
                     await departmentModels.delDepartmentLeader([req.body.id])
                }
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {get} /admin/user 获取用户
     * @apiName getUser
     * @apiGroup user
     * @apiUse APICommon
     *
     * @apiParam {Number} pn  第几页: 不存在获取所有符合筛选条件数据
     * @apiParam {Number} page_size 每页多少条：不存在获取所有符合筛选条件数据
     * @apiParam {String} user_name  用户名称
     * @apiParam {String} email  邮箱
     * @apiParam {number} mobile  手机号
     * @apiParam {number} sex  性别：0未知、1是男、2是女
     * @apiParam {number} dept_id  部门id
     * @apiParam {Number} status  是否启用 ：0 是启用、1 是不启用
     * @apiParam {string} start_date  开始时间
     * @apiParam {string} end_date  结束时间
     */
    async getUser(req, res, next) {
        try {
            req.returnData.data =  await userModels.getUser(req.query)
            // req.returnData.data.token = '123'   /*java 返回一个token */
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }
}
