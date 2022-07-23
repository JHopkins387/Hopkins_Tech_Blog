const withAuth = (req, res, next) => {
  //if no session is open, then it should redirect to login page
  if (!req.session.user_id) {
    res.redirect('/login');
    //else, go to next function
  } else {
    next();
  }
}

module.exports = withAuth;