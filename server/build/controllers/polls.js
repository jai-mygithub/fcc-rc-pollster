'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _poll = require('../models/poll');

var _poll2 = _interopRequireDefault(_poll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';


exports.newpoll = function (req, res, next) {
  _poll2.default.find().exec(function (err, polls) {
    if (err) {
      console.log(err);
    }
    var totalPolls = polls.length;
    var poll = new _poll2.default({
      userId: req.user.id,
      pollId: totalPolls + 1,
      title: req.body.title,
      options: req.body.options
    });
    poll.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({ pollId: data.pollId });
      }
    });
  });
};

exports.newOption = function (req, res, next) {
  _poll2.default.findOne({ pollId: req.body.pollId }).exec(function (err, poll) {
    if (err) {
      res.status(500).send('Unable to connect to database');
    }
    if (poll) {
      poll.options.push({ title: req.body.title, count: 1 });
      poll.markModified('options');
      poll.save(function (err, data) {
        if (err) {
          console.log(err);
        }
        res.send('Option added with your vote');
      });
    } else {
      res.status(404).send('Poll not found');
    }
  });
};

exports.pollDetails = function (req, res, next) {
  _poll2.default.findOne({ pollId: req.params.pollId }).exec(function (err, poll) {
    if (err) {
      res.status(500).send('Unable to connect to database');
    }
    if (poll) {
      res.json({
        title: poll.title,
        options: poll.options
      });
    } else {
      res.status(404).send('Poll not found');
    }
  });
};

exports.deletePoll = function (req, res, next) {
  _poll2.default.findOneAndRemove({ pollId: req.params.pollId }).exec(function (err) {
    if (err) {
      res.status(500).send('Unable to connect to database');
    }
    res.end();
  });
};

exports.newVote = function (req, res, next) {
  _poll2.default.findOne({ pollId: req.body.pollId }).exec(function (err, poll) {
    if (err) {
      res.status(500).send('Unable to connect to database');
    }
    if (poll) {
      poll.options[req.body.selected].count += 1;
      poll.markModified('options');
      poll.save(function (err, data) {
        if (err) {
          console.log(err);
        }
        res.send('Vote posted');
      });
    } else {
      res.status(404).send('Poll not found');
    }
  });
};

exports.myPolls = function (req, res, next) {
  _poll2.default.find({ userId: req.user.id }, 'pollId title options').exec(function (err, poll) {
    if (err) {
      res.status(500).send('Unable to connect to database');
    }
    if (poll && poll.length > 0) {
      res.json(poll);
    } else {
      res.status(404).send('Polls not found');
    }
  });
};

exports.polls = function (req, res, next) {
  _poll2.default.find({}, 'pollId title options').exec(function (err, poll) {
    if (err) {
      res.status(500).send('Unable to connect to database');
    }
    if (poll && poll.length > 0) {
      res.json(poll);
    } else {
      res.status(404).send('Polls not found');
    }
  });
};