const express = require('express');
const router = express.Router();
const caseC = require('./../controllers/case')

router.post('/', caseC.addCase)
router.post('/party', caseC.addCaseParty)
router.delete('/', caseC.delCase)
router.get('/', caseC.getCase)
router.put('/', caseC.upDateCase)

module.exports = router;
