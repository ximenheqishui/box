const express = require('express');
const router = express.Router();
const common = require('./../controllers/common')

router.get('/dictionaries', common.getDictionaries)
router.post('/login', common.login)
router.get('/userInfo', common.userInfo)
router.get('/logout', common.logout)
router.get('/export/:page', common.excelExport)

module.exports = router;
