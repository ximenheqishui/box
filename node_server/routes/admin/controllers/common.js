const commonModels = require('../models/common')
const userModels = require('../models/user')
const roleModels = require('../models/role')
const menuModels = require('../models/menu')
const crypto = require("crypto")

module.exports = {

    /**
     * @api {get} /admin/role 分页获取角色
     * @apiName getRole
     * @apiGroup role
     *
     * @apiParam {Number} pn  第几页
     * @apiParam {Number} pageSize 每页多少条
     */
    async getDictionaries(req, res, next) {
        try {
            let result = await commonModels.getDictionaries()
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
    async login(req, res, next) {
        try {
            let result = await commonModels.getUser(req.body.account)
            if (result && result.length) {
                if (req.body.password == result[0].password) {
                    let secret = result[0].user_name + new Date().getTime();
                    let token = crypto.createHmac('sha256', secret).update("I am lily").digest('hex'); //加密生成返回session
                    req.session.user = result[0]
                    req.session.token = token
                    req.returnData.token = token
                    // req.session.cookie.maxAge  = 1000
                } else {
                    req.returnData.code = 1
                    req.returnData.message = '密码不正确'
                }
            } else {
                req.returnData.code = 1
                req.returnData.message = '用户不存在'
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
    async logout(req, res, next) {
        try {
            req.session.token = ''
            req.session.user = ''
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
    async userInfo(req, res, next) {
        try {
            let user = req.session.user
            user.role_ids = await userModels.getUserRole(user.id)
            let menuids = []
            for (let i = 0; i < user.role_ids.length; i++) {
                let menuid = await roleModels.getRoleMenu(user.role_ids[i])
                menuid.forEach(function (item) {
                    if (menuids.indexOf(item) == -1) {
                        menuids.push(item)
                    }
                })
            }
            let permission = []
            async function getTree(id) {
                let result = await menuModels.getUsableByParentIdInids(id,menuids)
                let noButtonResult = []
                if (result && result.length) {
                    for (let i = 0; i < result.length; i++) {
                        permission.push(result[i].unique_id)
                        result[i].children = await getTree(result[i].id)
                        if (result[i].type == 1) {
                            noButtonResult.push(result[i])
                        }
                    }
                }
                return noButtonResult
            }
            let noButtonResult = []
            let adminMenu = []
            if (menuids.length) {
                noButtonResult = await getTree(0)
            }
            noButtonResult.forEach(function(item){
                if (item.unique_id === 'admin') {
                    adminMenu = item.children
                }
            })
            user.menu = adminMenu
            user.permission = permission
            req.returnData.userInfo = user
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }
}
