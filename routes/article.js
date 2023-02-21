const express = require('express');
const router = express.Router();
const articleController = require('../controllers/admin/article');
const articleAdminController = require('../controllers/admin/article')

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug)
router.get('/articles/:author_id', articleController.getArticleByAuthor)

router.post('/create', articleAdminController.createArticle);
module.exports = router;
