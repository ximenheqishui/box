const express = require('express');
const router = express.Router();
const dictionaries = require('./../controllers/dictionaries')

router.post('/', dictionaries.addDictionaries)
router.delete('/', dictionaries.delDictionaries)
router.get('/', dictionaries.getDictionaries)
router.put('/', dictionaries.upDateDictionaries)

module.exports = router;
