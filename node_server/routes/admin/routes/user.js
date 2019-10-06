const express = require('express');
const router = express.Router();
const user = require('./../controllers/user')

router.post('/', user.addUser)
router.delete('/', user.delUser)
router.get('/', user.getUser)
router.put('/', user.upDateUser)
router.get('/department', user.getDepartmentUser)


module.exports = router;
