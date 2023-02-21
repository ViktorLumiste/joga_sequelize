const express = require('express');
const router = express.Router();
const articleAdminController = require('../controllers/admin/article')

router.post('/create', articleAdminController.createArticle);
router.post('/edit/:id', articleAdminController.updateArticle);
router.get('/edit/:id', articleAdminController.updateArticle);
module.exports = router;
