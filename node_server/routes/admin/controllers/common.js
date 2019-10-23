const commonModels = require('../models/common')
const userModels = require('../models/user')
const roleModels = require('../models/role')
const menuModels = require('../models/menu')
const cryptoUtil = require("../../../util/crypto-util")
const redis = require("../../../util/redis")
const Excel = require('exceljs/modern.nodejs');

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
                if (cryptoUtil.createPass(req.body.password) === result[0].password) {
                    let token = await redis.setLoginSession(result[0])
                    req.returnData.token = token
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
            redis.delToken(req.get('Admin-Token'))
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
            let user = req.user
            user.role_ids = await userModels.getUserRole(user.id)
            let menuIds = []
            for (let i = 0; i < user.role_ids.length; i++) {
                let menuId = await roleModels.getRoleMenu(user.role_ids[i])
                menuId.forEach(function (item) {
                    if (menuIds.indexOf(item) == -1) {
                        menuIds.push(item)
                    }
                })
            }
            let permission = []

            async function getTree(id) {
                let result = await menuModels.getUsableByParentIdInIds(id, menuIds)
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
            if (menuIds.length) {
                noButtonResult = await getTree(0)
            }
            noButtonResult.forEach(function (item) {
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
    },

    /**
     * @api {get} /admin/role 分页获取角色
     * @apiName getRole
     * @apiGroup role
     *
     * @apiParam {Number} pn  第几页
     * @apiParam {Number} pageSize 每页多少条
     */
    async excelExport(req, res, next) {
        try {
            var workbook = new Excel.Workbook()
            workbook.creator = 'Me';
            workbook.lastModifiedBy = 'Her';
            workbook.created = new Date(1985, 8, 30);
            workbook.modified = new Date();
            workbook.lastPrinted = new Date(2016, 9, 27);

            // 创建一个红色标签颜色的工作表
            var worksheet = workbook.addWorksheet('My Sheet', {properties: {tabColor: {argb: 'FFC0000'}}});

            worksheet.columns = [
                {header: 'Id', key: 'id', width: 10},
                {header: 'Name', key: 'name', width: 32},
                {header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1}
            ];

            worksheet.addRow({id: 1, name: 'John Doe', DOB: new Date(1970, 1, 1)});
            worksheet.addRow({id: 2, name: 'Jane Doe', DOB: new Date(1965, 1, 7)});

            let buffer = await workbook.xlsx.writeBuffer()
            // res.setHeader('Content-Type', 'application/octet-stream');
            res.attachment('ress.xlsx');
            await res.end(buffer, 'binary');
        } catch (e) {
            next(e)
        }
    }

}
