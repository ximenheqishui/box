const express = require('express');
const router = express.Router();
const department = require('./../controllers/department')

router.post('/', department.addDepartment)
router.delete('/', department.delDepartment)
router.get('/', department.getDepartment)
router.put('/', department.upDateDepartment)

module.exports = router;
