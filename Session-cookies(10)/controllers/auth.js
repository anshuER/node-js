// Point4: make the auth controller
exports.getLogin = (req, res, next) => {
  // Point11: get the value of cookies
  console.log('----', req.session.isLoggedIn);
  // Point16: install mongodb sessions
  // const isLoggedIn = req.get('Cookie')?.split('=')[1] == 'true';
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

// Point6: make the auth controller
exports.postLogin = (req, res, next) => {
  // Point10: this is creating problem because every time we redirect it will clear the req so to handle this cookies is introduce so all every where we define this will become useless.
  // req.isLoggedIn = true;
  // Point12: read more about cookies and install express-session

  // res.setHeader('Set-Cookie', 'loggedIn=true');

  // Point15: set the session here
  req.session.isLoggedIn = true;

  res.redirect('/');
};

// Point20: make controller for postLogout
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
