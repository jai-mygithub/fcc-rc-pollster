'use strict';

var _passport = require('./config/passport');

var _passport2 = _interopRequireDefault(_passport);

var _polls = require('./controllers/polls');

var polls = _interopRequireWildcard(_polls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import passport that is configured with strategies
var requireAuth = _passport2.default.authenticate('jwt', { session: false });

module.exports = function (app) {

  //project routes

  app.post('/api/newpoll', requireAuth, polls.newpoll);

  app.get('/api/polls/:pollId', polls.pollDetails);

  app.delete('/api/polls/:pollId', requireAuth, polls.deletePoll);

  app.get('/api/mypolls', requireAuth, polls.myPolls);
  app.get('/api/polls', polls.polls);

  app.post('/api/newvote', polls.newVote);

  app.post('/api/newoption', requireAuth, polls.newOption);

  app.get('/api/profile', requireAuth, function (req, res) {
    res.json({
      displayName: req.user.displayName,
      photo: req.user.photo
    });
  });

  //signin - signout routes
  app.get('/api/signin/twitter', _passport2.default.authenticate('twitter'));
  app.get('/api/signin/twitter/callback', _passport2.default.authenticate('twitter'), function (req, res) {
    res.redirect('/signin?' + req.session.access_token);
  });
};