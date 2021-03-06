const express = require('express');
const router = express.Router();
const common = require('./../controllers/common')

router.post('/login', common.login)
router.get('/userInfo', common.getUserInfo)
router.put('/userInfo', common.updateUserInfo)
router.get('/logout', common.logout)
router.get('/export/:page', common.excelExport)

module.exports = router;
