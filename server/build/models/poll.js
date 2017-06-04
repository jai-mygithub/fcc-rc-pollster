'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  userId: Schema.Types.ObjectId,
  pollId: { type: Number, unique: true },
  title: String,
  options: Array
});

module.exports = mongoose.model('poll', Poll);