const withAuth = (req, res, next) => {
    req.session.logged_in ? next() : res.redirect('/login');
};
  
module.exports = withAuth;
  