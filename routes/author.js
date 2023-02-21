const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/admin/author')

router.get('/', AuthorController.getAllAuthors);
router.get('/:id', AuthorController.getAuthorById)

module.exports = router;
