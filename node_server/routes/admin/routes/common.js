const express = require('express');
const router = express.Router();
const common = require('./../controllers/common')

router.get('/dictionaries', common.getDictionaries)

module.exports = router;
