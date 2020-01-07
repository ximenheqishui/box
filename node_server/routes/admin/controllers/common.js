const commonModels = require('../models/common')
const userModels = require('../models/user')
const roleModels = require('../models/role')
const menuModels = require('../models/menu')
const cryptoUtil = require("../../../util/crypto-util")
const redis = require("../../../util/redis")
const Excel = require('exceljs/modern.nodejs');


/**
 * @api {all} /null  返回的常规格式
 * @apiName returnCommon
 * @apiGroup common
 * @apiErrorExample {json} 服务器代码错误:
 *     HTTP/1.1 500  服务器错误
 *     {
 *       "error": "错误信息",
 *       "message": "具体的所有的信息在开发模式下才会有信息"
 *     }
 * @apiSuccessExample {json} 成功:
 *     HTTP/1.1 200 OK
 *     {
 *      "code": 0,
 *      "message": "成功了"
 *     }
 *      HTTP/1.1 200 OK
 *     {
 *      "code": 2,
 *      "message": "登录超时或未登录"
 *     }
 * */




module.exports = {
    /**
     * @api {get} /admin/dictionaries 获取全部的数据字典
     * @apiName getDictionaries
     * @apiUse APICommon
     * @apiGroup common
     *
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
     * @api {post} /admin/login 登录
     * @apiName login
     * @apiGroup common
     *
     * @apiParam {string} account  账户
     * @apiParam {string} password 密码
     */
    async login(req, res, next) {
        try {
            let result = await userModels.getUserOne(null, req.body.account, null)
            if (result && result.length) {
                if (cryptoUtil.createPass(req.body.password) === result[0].password) {
                    let user = result[0]
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
                    let menu = await menuModels.getUsableById(menuIds)
                    user.permission= menu.map(function(item){
                        return item.unique_id
                    })
                    let menuAll = await menuModels.getUsableByIdAll()
                    user.uniqueAll= menuAll.map(function(item){
                        return item.unique_id
                    })
                    let token = await redis.setLoginToken(user)
                    req.returnData.data = {
                        token: token
                    }
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
     * @api {get} /admin/logout 退出
     * @apiName logout
     * @apiUse APICommon
     * @apiGroup common
     *
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
     * @api {get} /admin/userInfo 获取用户信息
     * @apiName getUserInfo
     * @apiUse APICommon
     * @apiGroup common
     *
     */
    async getUserInfo(req, res, next) {
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
            req.returnData.data = user
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },

    /**
     * @api {put} /admin/userInfo 修改用户信息
     * @apiName putUserInfo
     * @apiUse APICommon
     * @apiGroup common
     *
     *
     * @apiParam {String} user_name  用户名称
     * @apiParam {String} email  邮箱
     * @apiParam {number} mobile  手机号
     * @apiParam {number} sex  性别：0未知、1是男、2是女
     * @apiParam {string} avatar  用户头像url
     * @apiParam {string} password  用户密码
     */
    async updateUserInfo(req, res, next) {
        try {
            let requestData = {
                user_name: req.body.user_name,
                email: req.body.email,
                mobile: req.body.mobile,
                sex: req.body.sex || 0,
                avatar: req.body.avatar
            }
            if (req.body.password !== '') {
                requestData.password = cryptoUtil.createPass(req.body.password)
            }
            await userModels.update(requestData, req.user.id)
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },


    /**
     * @api {get} /admin/excelExport 导出
     * @apiName excelExport
     * @apiUse APICommon
     * @apiGroup common
     *
     */
    async excelExport(req, res, next) {
        try {
            var workbook = new Excel.Workbook()
            workbook.creator = 'Me';
            workbook.created = new Date();
            // 创建一个红色标签颜色的工作表
            var worksheet = workbook.addWorksheet('Sheet1', {properties: {tabColor: {argb: 'FFC0000'}}});
            delete req.query.pn
            delete req.query.page_size
            let page = req.params.page
            switch (page) {
                case 'user':
                    let data = await userModels.getUser(req.query)
                    worksheet.columns = [
                        {header: 'Id', key: 'id', width: 10},
                        {header: '用户名', key: 'user_name', width: 32},
                        {header: '头像', key: 'avatar', width: 32},
                        {header: '性别', key: 'sex_name', width: 32},
                        {header: '邮箱', key: 'email', width: 32},
                        {header: '手机号', key: 'mobile', width: 32},
                        {header: '所属部门', key: 'dept_name', width: 32},
                        {header: '创建时间', key: 'create_time', width: 32}
                    ];
                    worksheet.addRows(data);
                    break;
                default:
                    break
            }
            let buffer = await workbook.xlsx.writeBuffer()
            res.attachment(`${page}.xlsx`);
            await res.end(buffer, 'binary');
        } catch (e) {
            next(e)
        }
    }

}
