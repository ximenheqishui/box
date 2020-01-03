const express = require('express');
const router = express.Router();
const caseType = require('./../controllers/caseType')

router.post('/', caseType.addCaseType)
router.delete('/', caseType.delCaseType)
router.get('/', caseType.getCaseType)
router.put('/', caseType.upDateCaseType)

module.exports = router;
