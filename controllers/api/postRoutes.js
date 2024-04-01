const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/edit-post/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
      
      if (!postData) {
        return res.status(404).json({ message: 'No post found with this id!' });
      }
  
      res.render('edit-post', {
        post: postData.get({ plain: true }),
        logged_in: req.session.logged_in,
        editing: true, 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const { user_id } = req.session;
      const newPost = await Post.create({ ...req.body, user_id });
      res.status(201).json(newPost); 
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id } = req.session;
      
      const [updatedCount] = await Post.update(
        { ...req.body },
        { where: { id, user_id } }
      );
  
      if (updatedCount === 0) {
        return res.status(404).json({ message: 'No post found with this id!' });
      }
  
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id } = req.session;
      
      const deletedCount = await Post.destroy({ where: { id, user_id } });
  
      if (deletedCount === 0) {
        return res.status(404).json({ message: 'No post found with this id!' });
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;