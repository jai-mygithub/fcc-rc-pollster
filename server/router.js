//import passport that is configured with strategies
import passport from './config/passport';
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {

  //project routes
  app.get('/api/profile', requireAuth, (req, res) => {
    res.json({
      displayName: req.user.displayName,
      photo: req.user.photo
    });
  });

  //signin - signout routes
  app.get('/api/signin/twitter', passport.authenticate('twitter'));
  app.get('/api/signin/twitter/callback', passport.authenticate('twitter'),
    (req, res) => {
      res.redirect(`/signin?${req.session.access_token}`);
    }
  );

}