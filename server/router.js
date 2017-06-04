//import passport that is configured with strategies
import passport from './config/passport';
import * as polls from './controllers/polls';
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {

  //project routes

  app.post('/api/newpoll', requireAuth, polls.newpoll);

  app.get('/api/polls/:pollId', polls.pollDetails);

  app.delete('/api/polls/:pollId', requireAuth, polls.deletePoll);

  app.get('/api/mypolls', requireAuth, polls.myPolls);
  app.get('/api/polls', polls.polls);

  app.post('/api/newvote', polls.newVote);

  app.post('/api/newoption', requireAuth, polls.newOption);

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