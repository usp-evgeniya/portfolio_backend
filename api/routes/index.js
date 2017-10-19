const express = require('express');
const router = express.Router();

const ctrlBlog = require('../controllers/blog');

router.get('/blog', ctrlBlog.getArticle);
router.post('/blog', ctrlBlog.createArticle);
router.put('/blog/:id', ctrlBlog.editArticle);
router.delete('/blog/:id', ctrlBlog.deleteArticle);

module.exports = router;