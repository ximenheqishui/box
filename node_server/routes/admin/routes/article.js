const express = require('express');
const router = express.Router();
const article = require('./../controllers/article')

router.post('/', article.addArticle)
router.delete('/', article.delArticle)
router.get('/', article.getArticle)
router.get('/one', article.getArticleOne)
router.put('/', article.upDateArticle)

module.exports = router;
