const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const comments = await Comment.findAll();
      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve comments' });
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const { commentBody, post_id } = req.body;
      const { username, user_id } = req.session;
  
      if (!username) {
        return res.status(401).json({ error: 'User is not authenticated.' });
      }
  
      const newComment = await Comment.create({
        commentBody,
        username,
        post_id,
        user_id,
      });
  
      res.status(201).json(newComment);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Failed to create comment' });
    }
});

module.exports = router;