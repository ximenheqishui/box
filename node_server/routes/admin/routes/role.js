const express = require('express');
const router = express.Router();
const menu = require('./../controllers/role')

router.post('/', menu.addRole)
router.delete('/', menu.delRole)
router.get('/', menu.getRole)
router.put('/', menu.upDateRole)

router.post('/menu', menu.updateRoleMenu)
router.get('/menu', menu.getRoleMenu)

module.exports = router;
