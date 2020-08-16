const express = require('express');
const router = express.Router();
const common = require('./../controllers/common')




router.post('/login', common.login)
router.get('/userInfo', common.getUserInfo)
router.put('/userInfo', common.updateUserInfo)
router.get('/logout', common.logout)
router.get('/export/:page', common.excelExport)




router.get('/salesman', function(req,res,next){
    req.returnData.data = [{
                id:123, // 单据编号
                processer: '制单人李四', // 制单人
                salesman_id: '1001', // 业务员代码
                salesman_name: '业务员', // 业务员姓名
                start_date: '2020-06-16', // 开始时间
                end_date: '2020-06-20', // 结束时间
                reason: '请客户吃饭', // 审批理由
                long_date: '', // 长日期
                create_time: '2020-6-23 12:12:11', // 制单时间
                money: 1000, // 特批金额
                auditor_1: '张三', // 一级审核人
                audit_date_1: '2020-6-23', // 一级审核时间
                audit_reason_1: '说的有道理啊' // 一级审核原因
            }]
    res.json(req.returnData)
})



router.post('/ok', function(req,res,next){
    req.returnData.data = {}
    res.json(req.returnData)
})
router.delete('/ok', function(req,res,next){
    req.returnData.data = {}
    res.json(req.returnData)
})
router.get('/ok', function(req,res,next){
    req.returnData.data = {}
    res.json(req.returnData)
})
router.put('/ok', function(req,res,next){
    req.returnData.data = {}
    res.json(req.returnData)
})




module.exports = router;
