const menuModels = require('../models/menu')

module.exports = {
    async getMenu(req, res, next) {
        try {
            async function getTree (id) {
                let result = await menuModels.getAllByParentId(id)
                if (result && result.length) {
                    for (let i=0; i < result.length; i++){
                        result[i].children = await getTree(result[i].id)
                    }
                }
                return result
            }
            let result = await getTree(0)
            if (result.code) {
                req.returnData.code = 1
                req.returnData.message = '查询失败'
                if (req.app.get('env') === 'development') {
                    req.returnData.error = result
                }
            } else {
                req.returnData.data = result
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    async addMenu(req, res, next) {
        try {
            let requestData = {
                icon: req.body.icon,
                last_menu: parseInt(req.body.last_menu),
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                path: req.body.path,
                sort_order: parseInt(req.body.sort_order),
                status: parseInt(req.body.status),
                type: parseInt(req.body.type),
                unique_id: req.body.unique_id,
                url: req.body.url
            }
            let result = await menuModels.create(requestData)
            if (result.code) {
                req.returnData.code = 1
                req.returnData.message = '添加失败'
                if (req.app.get('env') === 'development') {
                    req.returnData.error = result
                }
            } else {
                req.returnData.data ={id: result.insertId}
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    async delMenu(req, res, next) {
        try {
            let result = await menuModels.delById(req.params.id.split(','))
            if (result.code) {
                req.returnData.code = 1
                req.returnData.message = '删除失败'
                if (req.app.get('env') === 'development') {
                    req.returnData.error = result
                }
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
}
