const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middleware/AuthMiddleware');

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
});

router.post('/', validateToken, async (req, res) => {
    const comment = req.body;
    comment.username = req.user.username;
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;
