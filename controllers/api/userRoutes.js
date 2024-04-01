const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.save(() => res.status(200).json(userData));
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await User.findOne({ where: { email } });
  
      if (!userData || !(await userData.checkPassword(password))) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      req.session.save(() => {
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    const { logged_in } = req.session;
    if (logged_in) {
      req.session.destroy(() => {
        res.status(204).end(); 
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router; 