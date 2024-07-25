exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
    // Point9: add isAuthenticated in every render
    isAuthenticated: req.isLoggedIn,
  });
};
