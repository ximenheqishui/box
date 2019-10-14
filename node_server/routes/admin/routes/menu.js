const express = require('express');
const router = express.Router();
const menu = require('./../controllers/menu')

router.post('/', menu.addMenu)
router.delete('/', menu.delMenu)
router.get('/', menu.getMenu)
router.put('/', menu.upDateMenu)

module.exports = router;
