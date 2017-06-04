`use strict`;
import User from '../models/user';
import Poll from '../models/poll';

exports.newpoll = (req, res, next) => {
  Poll.find().exec((err, polls) => {
    if (err) { console.log(err); }
    const totalPolls = polls.length;
    const poll = new Poll({
      userId: req.user.id,
      pollId: totalPolls + 1,
      title: req.body.title,
      options: req.body.options
    });
    poll.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ pollId: data.pollId });
      }
    });
  });
}

exports.newOption = (req, res, next) => {
  Poll.findOne({ pollId: req.body.pollId }).exec((err, poll) => {
    if (err) { res.status(500).send('Unable to connect to database'); }
    if (poll) {
      poll.options.push({ title: req.body.title, count: 1 })
      poll.markModified('options');
      poll.save((err, data) => {
        if (err) { console.log(err); }
        res.send('Option added with your vote');
      });
    } else {
      res.status(404).send('Poll not found');
    }
  })
}


exports.pollDetails = (req, res, next) => {
  Poll.findOne({ pollId: req.params.pollId }).exec((err, poll) => {
    if (err) { res.status(500).send('Unable to connect to database'); }
    if (poll) {
      res.json({
        title: poll.title,
        options: poll.options
      });
    } else {
      res.status(404).send('Poll not found');
    }
  });
}

exports.deletePoll = (req, res, next) => {
  Poll.findOneAndRemove({ pollId: req.params.pollId }).exec(err => {
    if (err) { res.status(500).send('Unable to connect to database'); }
    res.end();
  })
}

exports.newVote = (req, res, next) => {
  Poll.findOne({ pollId: req.body.pollId }).exec((err, poll) => {
    if (err) { res.status(500).send('Unable to connect to database'); }
    if (poll) {
      poll.options[req.body.selected].count += 1;
      poll.markModified('options');
      poll.save((err, data) => {
        if (err) { console.log(err); }
        res.send('Vote posted');
      });
    } else {
      res.status(404).send('Poll not found');
    }
  });
}

exports.myPolls = (req, res, next) => {
  Poll.find({ userId: req.user.id }, 'pollId title options').exec((err, poll) => {
    if (err) { res.status(500).send('Unable to connect to database'); }
    if (poll && poll.length > 0) {
      res.json(poll);
    } else {
      res.status(404).send('Polls not found');
    }
  })
}

exports.polls = (req, res, next) => {
  Poll.find({}, 'pollId title options').exec((err, poll) => {
    if (err) { res.status(500).send('Unable to connect to database'); }
    if (poll && poll.length > 0) {
      res.json(poll);
    } else {
      res.status(404).send('Polls not found');
    }
  })
}
