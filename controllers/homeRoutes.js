const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/', async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      res.render('home', {
        posts: posts.map(post => post.get({ plain: true })),
        logged_in: req.session.logged_in,
        user_name: req.session.user_name,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
          },
        ],
      });
  
      if (!post) {
        return res.status(404).json({ message: 'No post found with this id!' });
      }
  
      const user_id = req.session.user_id;
  
      res.render('post', {
        post: post.get({ plain: true }),
        user_id,
        logged_in: req.session.logged_in,
        user_name: req.session.user_name,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});
  
router.get('/profile', withAuth, async (req, res) => {
    try {
      const user = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.render('profile', {
        ...user.get({ plain: true }),
        logged_in: true,
        user_name: req.session.user_name,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      return res.redirect('/profile');
    }
  
    res.render('login');
});

module.exports = router;