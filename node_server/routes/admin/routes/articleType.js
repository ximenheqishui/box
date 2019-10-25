const express = require('express');
const router = express.Router();
const articleType = require('./../controllers/articleType')

router.post('/', articleType.addArticleType)
router.delete('/', articleType.delArticleType)
router.get('/', articleType.getArticleType)
router.put('/', articleType.upDateArticleType)

module.exports = router;
